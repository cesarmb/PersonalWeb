"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { BotMessageSquare, Send, X, Sparkles, RotateCcw, Loader2 } from "lucide-react";
import { sound } from "@/lib/audio";

export const OPEN_TWIN_EVENT = "open-twin-chat";

type Message = { role: "user" | "assistant"; content: string };

const GREETING =
  "¡Hola! Soy el gemelo digital de Cesar, una IA entrenada con su trayectoria profesional. Pregúntame sobre su experiencia en IBM, sus proyectos, su stack tecnológico o cómo trabaja.";

const SUGGESTIONS = [
  "¿Qué haces actualmente en IBM?",
  "¿Cuál es tu experiencia en el sector financiero?",
  "¿Qué es la ingeniería agéntica para ti?",
  "¿Qué tecnologías dominas?",
];

// Minimal, safe markdown: **bold** and "- " bullet lists.
function renderInline(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} style={{ color: "#f8fafc" }}>
        {part.slice(2, -2)}
      </strong>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    )
  );
}

function MessageBody({ content }: { content: string }) {
  const blocks: React.ReactNode[] = [];
  let list: string[] = [];
  const flush = () => {
    if (list.length) {
      blocks.push(
        <ul key={`ul-${blocks.length}`} style={{ margin: "4px 0", paddingLeft: "18px" }}>
          {list.map((item, i) => (
            <li key={i} style={{ marginBottom: "2px" }}>
              {renderInline(item)}
            </li>
          ))}
        </ul>
      );
      list = [];
    }
  };
  content.split("\n").forEach((line) => {
    const bullet = line.match(/^\s*[-*•]\s+(.*)/);
    if (bullet) {
      list.push(bullet[1]);
      return;
    }
    flush();
    if (line.trim()) {
      blocks.push(
        <p key={`p-${blocks.length}`} style={{ margin: "0 0 6px" }}>
          {renderInline(line.replace(/^#+\s*/, ""))}
        </p>
      );
    }
  });
  flush();
  return <>{blocks}</>;
}

export function DigitalTwinChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const openChat = useCallback(() => {
    sound.playClick();
    setOpen(true);
  }, []);

  useEffect(() => {
    window.addEventListener(OPEN_TWIN_EVENT, openChat);
    return () => window.removeEventListener(OPEN_TWIN_EVENT, openChat);
  }, [openChat]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const focus = setTimeout(() => inputRef.current?.focus(), 250);
    return () => {
      window.removeEventListener("keydown", onKey);
      clearTimeout(focus);
    };
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, error]);

  useEffect(() => () => abortRef.current?.abort(), []);

  const send = async (history: Message[]) => {
    setError(null);
    setStreaming(true);
    setMessages([...history, { role: "assistant", content: "" }]);
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
        signal: controller.signal,
      });
      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "No se pudo obtener respuesta.");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let text = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        text += decoder.decode(value, { stream: true });
        setMessages([...history, { role: "assistant", content: text }]);
      }
      if (!text.trim()) throw new Error("El modelo no devolvió respuesta. Intenta de nuevo.");
      sound.playSuccess();
    } catch (err) {
      if (controller.signal.aborted) return;
      setMessages(history);
      setError(err instanceof Error ? err.message : "Error inesperado.");
    } finally {
      if (abortRef.current === controller) {
        abortRef.current = null;
        setStreaming(false);
      }
    }
  };

  const submit = (text: string) => {
    const content = text.trim();
    if (!content || streaming) return;
    sound.playClick();
    setInput("");
    send([...messages, { role: "user", content }]);
  };

  const retry = () => {
    if (streaming || messages[messages.length - 1]?.role !== "user") return;
    send(messages);
  };

  const reset = () => {
    abortRef.current?.abort();
    abortRef.current = null;
    setStreaming(false);
    setMessages([]);
    setError(null);
  };

  const lastIsEmptyAssistant =
    streaming && messages[messages.length - 1]?.role === "assistant" && !messages[messages.length - 1].content;

  return (
    <>
      {/* Launcher */}
      <button
        onClick={() => (open ? setOpen(false) : openChat())}
        aria-label={open ? "Cerrar chat con el gemelo digital" : "Abrir chat con el gemelo digital"}
        className="twin-launcher"
        style={{
          position: "fixed",
          right: "24px",
          bottom: "24px",
          zIndex: 90,
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: open ? "14px" : "14px 20px 14px 16px",
          borderRadius: "999px",
          border: "1px solid rgba(0, 240, 255, 0.4)",
          background: "linear-gradient(135deg, rgba(0, 240, 255, 0.18), rgba(139, 92, 246, 0.22)), #0c0f18",
          color: "#f8fafc",
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: "0.9rem",
          cursor: "pointer",
          boxShadow: "0 10px 40px -10px rgba(0, 240, 255, 0.5)",
          transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {open ? <X size={20} /> : <BotMessageSquare size={20} color="#00f0ff" />}
        {!open && <span className="twin-launcher-label">Habla con mi gemelo IA</span>}
      </button>

      {/* Panel */}
      <div
        role="dialog"
        aria-label="Chat con el gemelo digital de Cesar"
        aria-hidden={!open}
        className="twin-panel"
        style={{
          position: "fixed",
          right: "24px",
          bottom: "96px",
          zIndex: 90,
          width: "400px",
          height: "min(620px, calc(100vh - 140px))",
          display: "flex",
          flexDirection: "column",
          background: "rgba(10, 13, 22, 0.96)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(0, 240, 255, 0.22)",
          borderRadius: "20px",
          boxShadow: "0 30px 80px -20px rgba(0, 0, 0, 0.8), 0 0 40px -15px rgba(0, 240, 255, 0.35)",
          overflow: "hidden",
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0) scale(1)" : "translateY(16px) scale(0.98)",
          pointerEvents: open ? "auto" : "none",
          visibility: open ? "visible" : "hidden",
          transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "16px 18px",
            borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
            background: "linear-gradient(90deg, rgba(0, 240, 255, 0.06), rgba(139, 92, 246, 0.06))",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, rgba(0, 240, 255, 0.2), rgba(139, 92, 246, 0.25))",
              border: "1px solid rgba(0, 240, 255, 0.3)",
              fontFamily: "var(--font-mono)",
              fontWeight: 700,
              fontSize: "0.8rem",
              color: "#00f0ff",
            }}
          >
            CMB
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.95rem" }}>
              Gemelo Digital de Cesar
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontFamily: "var(--font-mono)",
                fontSize: "0.68rem",
                color: "#64748b",
              }}
            >
              <span className="status-beacon" style={{ width: "6px", height: "6px" }} />
              {streaming ? "Escribiendo..." : "IA · vía OpenRouter"}
            </div>
          </div>
          {messages.length > 0 && (
            <button onClick={reset} title="Nueva conversación" aria-label="Nueva conversación" className="twin-icon-btn">
              <RotateCcw size={16} />
            </button>
          )}
          <button onClick={() => setOpen(false)} title="Cerrar" aria-label="Cerrar chat" className="twin-icon-btn">
            <X size={18} />
          </button>
        </div>

        {/* Messages */}
        <div
          ref={scrollRef}
          aria-live="polite"
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "18px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <Bubble role="assistant">{GREETING}</Bubble>

          {messages.length === 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "4px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.68rem",
                  color: "#64748b",
                  letterSpacing: "0.05em",
                }}
              >
                <Sparkles size={12} /> PREGUNTAS SUGERIDAS
              </div>
              {SUGGESTIONS.map((q) => (
                <button key={q} onClick={() => submit(q)} className="twin-suggestion">
                  {q}
                </button>
              ))}
            </div>
          )}

          {messages.map((m, i) =>
            m.role === "assistant" && !m.content ? null : (
              <Bubble key={i} role={m.role}>
                {m.role === "assistant" ? <MessageBody content={m.content} /> : m.content}
              </Bubble>
            )
          )}

          {lastIsEmptyAssistant && (
            <div style={{ display: "flex", gap: "5px", padding: "10px 4px" }} aria-label="Pensando">
              {[0, 1, 2].map((d) => (
                <span key={d} className="twin-dot" style={{ animationDelay: `${d * 0.15}s` }} />
              ))}
            </div>
          )}

          {error && (
            <div
              role="alert"
              style={{
                padding: "12px 14px",
                borderRadius: "12px",
                background: "rgba(239, 68, 68, 0.08)",
                border: "1px solid rgba(239, 68, 68, 0.25)",
                color: "#fca5a5",
                fontSize: "0.82rem",
                lineHeight: 1.5,
              }}
            >
              {error}
              <button onClick={retry} className="twin-retry">
                <RotateCcw size={13} /> Reintentar
              </button>
            </div>
          )}
        </div>

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit(input);
          }}
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: "10px",
            padding: "14px",
            borderTop: "1px solid rgba(255, 255, 255, 0.06)",
          }}
        >
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                submit(input);
              }
            }}
            placeholder="Pregunta sobre mi carrera..."
            rows={1}
            maxLength={2000}
            aria-label="Escribe tu pregunta"
            style={{
              flex: 1,
              resize: "none",
              maxHeight: "120px",
              padding: "12px 14px",
              borderRadius: "12px",
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              color: "#f8fafc",
              fontFamily: "var(--font-sans)",
              fontSize: "0.88rem",
              outline: "none",
              lineHeight: 1.4,
            }}
          />
          <button
            type="submit"
            disabled={streaming || !input.trim()}
            aria-label="Enviar pregunta"
            style={{
              width: "44px",
              height: "44px",
              flexShrink: 0,
              borderRadius: "12px",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, #00f0ff, #0ea5e9)",
              color: "#07080e",
              cursor: streaming || !input.trim() ? "not-allowed" : "pointer",
              opacity: streaming || !input.trim() ? 0.45 : 1,
              transition: "opacity 0.2s ease",
            }}
          >
            {streaming ? <Loader2 size={18} className="twin-spin" /> : <Send size={18} />}
          </button>
        </form>
        <div
          style={{
            textAlign: "center",
            fontSize: "0.65rem",
            color: "#475569",
            padding: "0 14px 10px",
            fontFamily: "var(--font-mono)",
          }}
        >
          Respuestas generadas por IA; pueden contener errores.
        </div>
      </div>
    </>
  );
}

function Bubble({ role, children }: { role: Message["role"]; children: React.ReactNode }) {
  const isUser = role === "user";
  return (
    <div
      style={{
        alignSelf: isUser ? "flex-end" : "flex-start",
        maxWidth: "88%",
        padding: "10px 14px",
        borderRadius: isUser ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
        background: isUser ? "linear-gradient(135deg, rgba(0, 240, 255, 0.16), rgba(14, 165, 233, 0.16))" : "rgba(255, 255, 255, 0.04)",
        border: `1px solid ${isUser ? "rgba(0, 240, 255, 0.28)" : "rgba(255, 255, 255, 0.07)"}`,
        color: isUser ? "#e0f2fe" : "#cbd5e1",
        fontSize: "0.87rem",
        lineHeight: 1.55,
        whiteSpace: isUser ? "pre-wrap" : "normal",
        overflowWrap: "anywhere",
      }}
    >
      {children}
    </div>
  );
}
