import { buildTwinSystemPrompt } from "@/lib/twin-prompt";

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = process.env.OPENROUTER_MODEL || "google/gemma-4-31b-it:free";
// Tried in order by OpenRouter when the primary model is rate-limited or down.
const FALLBACK_MODELS = (
  process.env.OPENROUTER_FALLBACK_MODELS ??
  "google/gemma-4-26b-a4b-it:free,nvidia/nemotron-3-super-120b-a12b:free"
)
  .split(",")
  .map((m) => m.trim())
  .filter(Boolean);

const MAX_MESSAGES = 20;
const MAX_CHARS = 2000;
const RETRY_DELAYS_MS = [1500, 3500];

type ChatMessage = { role: "user" | "assistant"; content: string };

function isValidMessages(value: unknown): value is ChatMessage[] {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    value.every(
      (m) =>
        m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim().length > 0
    ) &&
    value[value.length - 1].role === "user"
  );
}

function errorResponse(status: number, error: string) {
  return Response.json({ error }, { status });
}

async function callOpenRouter(apiKey: string, messages: ChatMessage[], signal: AbortSignal) {
  const body = JSON.stringify({
    models: [MODEL, ...FALLBACK_MODELS],
    stream: true,
    temperature: 0.4,
    // Reasoning tokens count toward max_tokens; keep thinking short and out of the reply.
    max_tokens: 3000,
    reasoning: { effort: "low", exclude: true },
    messages: [{ role: "system", content: buildTwinSystemPrompt() }, ...messages],
  });

  // Free models are often rate-limited upstream; retry before giving up.
  for (let attempt = 0; ; attempt++) {
    const res = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "Cesar Martinez Baeza - Digital Twin",
      },
      body,
      signal,
    });
    const retryable = res.status === 429 || res.status >= 500;
    if (!retryable || attempt >= RETRY_DELAYS_MS.length) return res;
    await res.body?.cancel();
    await new Promise((r) => setTimeout(r, RETRY_DELAYS_MS[attempt]));
  }
}

// Converts OpenRouter's SSE stream into a plain-text stream of content deltas.
function toTextStream(upstream: ReadableStream<Uint8Array>) {
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buffer = "";
  let loggedModel = false;

  return upstream.pipeThrough(
    new TransformStream<Uint8Array, Uint8Array>({
      transform(chunk, controller) {
        buffer += decoder.decode(chunk, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data:")) continue; // skips ": OPENROUTER PROCESSING" keep-alives
          const data = trimmed.slice(5).trim();
          if (data === "[DONE]") continue;
          try {
            const json = JSON.parse(data);
            if (json.error) {
              controller.error(new Error(json.error.message || "Error del modelo"));
              return;
            }
            if (!loggedModel && json.model) {
              console.log(`[chat] respondiendo con ${json.model}`);
              loggedModel = true;
            }
            const delta = json.choices?.[0]?.delta?.content;
            if (delta) controller.enqueue(encoder.encode(delta));
          } catch {
            // Ignore partial or non-JSON lines
          }
        }
      },
    })
  );
}

export async function POST(request: Request) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return errorResponse(500, "El chat no está configurado (falta OPENROUTER_API_KEY).");
  }

  let messages: unknown;
  try {
    ({ messages } = await request.json());
  } catch {
    return errorResponse(400, "Solicitud inválida.");
  }
  if (!isValidMessages(messages)) {
    return errorResponse(400, "Formato de mensajes inválido.");
  }
  const trimmed = messages
    .slice(-MAX_MESSAGES)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }));

  let upstream: Response;
  try {
    upstream = await callOpenRouter(apiKey, trimmed, request.signal);
  } catch {
    return errorResponse(502, "No pude conectar con el servicio de IA. Intenta de nuevo.");
  }

  if (!upstream.ok || !upstream.body) {
    const detail = await upstream.text().catch(() => "");
    console.error(`[chat] OpenRouter ${upstream.status}: ${detail.slice(0, 300)}`);
    if (upstream.status === 429) {
      return errorResponse(
        429,
        "El modelo gratuito está saturado en este momento. Espera unos segundos y vuelve a intentarlo."
      );
    }
    return errorResponse(502, "El servicio de IA devolvió un error. Intenta de nuevo en un momento.");
  }

  return new Response(toTextStream(upstream.body), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
