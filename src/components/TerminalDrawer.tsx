"use client";

import React, { useState, useRef, useEffect } from "react";
import { sound } from "@/lib/audio";
import { Terminal, X, ChevronRight } from "lucide-react";

interface TerminalDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const COMMANDS: Record<string, string[]> = {
  help: [
    "+---------------------------------------------+",
    "|  COMANDOS DISPONIBLES                       |",
    "+---------------------------------------------+",
    "|  about    > Resumen profesional             |",
    "|  skills   > Stack tecnológico               |",
    "|  exp      > Experiencia actual en IBM       |",
    "|  certs    > Certificaciones activas         |",
    "|  contact  > Datos de contacto               |",
    "|  stack    > Tecnologías principales         |",
    "|  clear    > Limpiar consola                 |",
    "|  help     > Mostrar esta ayuda              |",
    "+---------------------------------------------+",
  ],
  about: [
    "=== PERFIL PROFESIONAL ===",
    "",
    "  Nombre:    Cesar Martinez Baeza",
    "  Rol:       Senior Java Full Stack Developer",
    "             & Enterprise Solutions Architect",
    "  Exp:       20+ años en TI corporativo",
    "  Actual:    IBM — Senior Application Developer",
    "  Enfoque:   Microservicios Java · Cloud · IA Agéntica",
    "",
    "  > Trayectoria en IBM, BNP Paribas, NY Life,",
    "    Panasonic y Kimberly-Clark.",
  ],
  skills: [
    "=== STACK TECNOLÓGICO PRINCIPAL ===",
    "",
    "  [####################] EXPERTO   Java (SE/EE/21)",
    "  [####################] EXPERTO   Spring Boot & Cloud",
    "  [####################] EXPERTO   APIs RESTful & SOAP",
    "  [####################] EXPERTO   Oracle Database",
    "  [################....] AVANZADO  Git & DevSecOps",
    "  [################....] AVANZADO  IBM Cloud Certified",
    "  [################....] AVANZADO  Agentic AI Workflows",
    "  [################....] AVANZADO  Docker & Containers",
  ],
  exp: [
    "=== POSICIÓN ACTUAL ===",
    "",
    "  Empresa:   IBM",
    "  Rol:       Senior Application Developer",
    "  Período:   Julio 2021 — Presente (5+ años)",
    "  Ubicación: Área Metropolitana de CDMX",
    "",
    "  Responsabilidades clave:",
    "  ▸ Diseño de microservicios Java Spring Boot",
    "  ▸ Arquitecturas de alta disponibilidad",
    "  ▸ Integración CI/CD y observabilidad cloud",
    "  ▸ Metodología IBM Garage para prototipado ágil",
  ],
  certs: [
    "=== CERTIFICACIONES ===",
    "",
    "  ✦ IBM Certified Advocate — Cloud v2",
    "    Arquitectura y servicios Cloud empresariales",
    "",
    "  ✦ IBM Garage Essentials",
    "    Innovación ágil y entrega enterprise",
    "",
    "  ✦ Licenciatura en Ciencias de la Computación",
    "    Universidad Tecnológica de México (1997-2001)",
  ],
  contact: [
    "=== CONTACTO ===",
    "",
    "  ✉  cesar.baeza@gmail.com",
    "  🔗 linkedin.com/in/cesarmartinezbaeza",
    "  📍 Ciudad de México, México",
    "",
    "  Status:     ● ONLINE — Disponible",
    "  Respuesta:  < 24 horas",
  ],
  stack: [
    "=== TECNOLOGÍAS PRINCIPALES ===",
    "",
    "  Backend:    Java 21 · Spring Boot · Spring Cloud",
    "  APIs:       REST · SOAP · OpenAPI · GraphQL",
    "  Databases:  Oracle · PostgreSQL · SQL Server",
    "  DevOps:     Docker · Git · CI/CD · IBM Cloud",
    "  Frontend:   Next.js · React · TypeScript",
    "  AI/Agent:   LangGraph · RAG · Tool Calling",
    "  Patterns:   Microservices · CQRS · Saga · Outbox",
  ],
};

export function TerminalDrawer({ isOpen, onClose }: TerminalDrawerProps) {
  const [history, setHistory] = useState<
    { type: "input" | "output"; lines: string[] }[]
  >([
    {
      type: "output",
      lines: [
        "+-----------------------------------------------+",
        "|   CESAR MARTINEZ BAEZA — TERMINAL AGÉNTICA    |",
        "|   Enterprise Architect Console v2.0           |",
        "+-----------------------------------------------+",
        "",
        'Escribe "help" para ver los comandos disponibles.',
        "",
      ],
    },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();

    const newHistory = [
      ...history,
      { type: "input" as const, lines: [`$ ${cmd}`] },
    ];

    if (trimmed === "clear") {
      setHistory([]);
      setInput("");
      return;
    }

    if (trimmed === "") {
      setHistory(newHistory);
      setInput("");
      return;
    }

    const response = COMMANDS[trimmed];
    if (response) {
      sound.playBeep(880, 0.06);
      newHistory.push({ type: "output", lines: response });
    } else {
      sound.playBeep(220, 0.1, "square");
      newHistory.push({
        type: "output",
        lines: [
          `Error: comando "${trimmed}" no reconocido.`,
          'Escribe "help" para ver los comandos disponibles.',
        ],
      });
    }

    setHistory(newHistory);
    setInput("");
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: "360px",
        background: "rgba(5, 6, 10, 0.97)",
        borderTop: "1px solid rgba(0, 240, 255, 0.25)",
        backdropFilter: "blur(20px)",
        display: "flex",
        flexDirection: "column",
        animation: "slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        boxShadow: "0 -10px 50px rgba(0, 0, 0, 0.6)",
      }}
    >
      {/* Title Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
          borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontFamily: "var(--font-mono)",
            fontSize: "0.8rem",
            color: "#00f0ff",
          }}
        >
          <Terminal size={15} />
          <span>cmb@enterprise:~</span>
          <span className="status-beacon" style={{ width: "5px", height: "5px" }} />
        </div>
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          style={{
            width: "28px",
            height: "28px",
            borderRadius: "6px",
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            color: "#94a3b8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <X size={14} />
        </button>
      </div>

      {/* Output */}
      <div
        ref={scrollRef}
        style={{
          flexGrow: 1,
          overflowY: "auto",
          padding: "14px 20px",
          fontFamily: "var(--font-mono)",
          fontSize: "0.82rem",
          lineHeight: 1.7,
        }}
      >
        {history.map((entry, i) => (
          <div key={i} style={{ marginBottom: "6px" }}>
            {entry.lines.map((line, j) => (
              <div
                key={j}
                style={{
                  color:
                    entry.type === "input"
                      ? "#00f0ff"
                      : line.startsWith("Error")
                      ? "#ef4444"
                      : line.includes("===")
                      ? "#8b5cf6"
                      : line.includes("###")
                      ? "#10b981"
                      : "#94a3b8",
                  whiteSpace: "pre",
                }}
              >
                {line}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Input */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "12px 20px",
          borderTop: "1px solid rgba(255, 255, 255, 0.06)",
          flexShrink: 0,
        }}
      >
        <ChevronRight size={14} color="#00f0ff" />
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleCommand(input);
            }
          }}
          placeholder="Escribe un comando..."
          style={{
            flexGrow: 1,
            background: "transparent",
            border: "none",
            outline: "none",
            color: "#f8fafc",
            fontFamily: "var(--font-mono)",
            fontSize: "0.85rem",
          }}
        />
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
