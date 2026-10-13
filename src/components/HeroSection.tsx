"use client";

import React, { useEffect, useState } from "react";
import { PROFILE } from "@/lib/profile-data";
import { sound } from "@/lib/audio";
import {
  ChevronDown,
  Mail,
  MapPin,
  ArrowUpRight,
  Sparkles,
  Shield,
  BotMessageSquare,
} from "lucide-react";
import { LinkedinIcon } from "./icons";
import { OPEN_TWIN_EVENT } from "./DigitalTwinChat";

export function HeroSection() {
  const [visible, setVisible] = useState(false);
  const [typedLines, setTypedLines] = useState(0);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setVisible(true));
    const interval = setInterval(() => {
      setTypedLines((prev) => {
        if (prev >= 4) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 400);
    return () => {
      cancelAnimationFrame(frame);
      clearInterval(interval);
    };
  }, []);

  const terminalLines = [
    "$ ssh cesarmartinez@enterprise.core",
    "> Conectando a IBM Global Services...",
    "> Cargando módulos agénticos... ██████████ 100%",
    "> Status: ONLINE // 20+ años de experiencia activa",
  ];

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        paddingTop: "100px",
        paddingBottom: "60px",
      }}
    >
      <div
        className="app-container"
        style={{
          width: "100%",
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "40px",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Cyber Terminal Intro */}
        <div
          style={{
            width: "100%",
            maxWidth: "620px",
            overflowWrap: "anywhere",
            background: "rgba(7, 8, 14, 0.95)",
            border: "1px solid rgba(0, 240, 255, 0.2)",
            borderRadius: "12px",
            padding: "16px 20px",
            fontFamily: "var(--font-mono)",
            fontSize: "0.8rem",
            lineHeight: "1.9",
            color: "#64748b",
            textAlign: "left",
            boxShadow: "0 0 30px rgba(0, 240, 255, 0.08)",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "6px",
              marginBottom: "10px",
            }}
          >
            <span
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: "#ef4444",
              }}
            />
            <span
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: "#f59e0b",
              }}
            />
            <span
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: "#10b981",
              }}
            />
          </div>
          {terminalLines.map((line, i) => (
            <div
              key={i}
              style={{
                opacity: typedLines > i ? 1 : 0,
                transform:
                  typedLines > i ? "translateX(0)" : "translateX(-10px)",
                transition: "all 0.4s ease",
                color: i === 3 ? "#10b981" : i === 0 ? "#00f0ff" : "#64748b",
              }}
            >
              {line}
              {i === typedLines - 1 && (
                <span
                  style={{
                    display: "inline-block",
                    width: "8px",
                    height: "14px",
                    background: "#00f0ff",
                    marginLeft: "4px",
                    animation: "beacon-pulse 1s infinite",
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Status Badges */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            justifyContent: "center",
          }}
        >
          <span className="cyber-badge">
            <span className="status-beacon" />
            Disponible para Proyectos
          </span>
          <span className="cyber-badge violet">
            <Sparkles size={13} />
            Ingeniero Agéntico
          </span>
          <span className="cyber-badge emerald">
            <Shield size={13} />
            IBM Certified
          </span>
        </div>

        {/* Hero Heading */}
        <div>
          <h1
            className="gradient-text-cyan"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.2rem, 5.5vw, 4.2rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              marginBottom: "20px",
            }}
          >
            {PROFILE.name}
          </h1>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1rem, 2vw, 1.35rem)",
              color: "#94a3b8",
              maxWidth: "700px",
              margin: "0 auto",
              lineHeight: 1.5,
            }}
          >
            {PROFILE.title}
          </p>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.85rem",
              color: "#00f0ff",
              marginTop: "14px",
              letterSpacing: "0.08em",
            }}
          >
            {PROFILE.specialization}
          </p>
        </div>

        {/* Location tag */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "#64748b",
            fontSize: "0.9rem",
          }}
        >
          <MapPin size={16} />
          <span>{PROFILE.location}</span>
        </div>

        {/* Stats Bar */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(180px, 100%), 1fr))",
            gap: "16px",
            width: "100%",
            maxWidth: "820px",
          }}
        >
          {PROFILE.stats.map((stat, i) => (
            <div
              key={i}
              className="glass-panel glow-cyan-border"
              style={{
                padding: "20px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.8rem",
                  fontWeight: 800,
                  color: "#00f0ff",
                  lineHeight: 1,
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: "#e2e8f0",
                  marginTop: "6px",
                }}
              >
                {stat.label}
              </div>
              <div
                style={{
                  fontSize: "0.75rem",
                  color: "#64748b",
                  marginTop: "4px",
                }}
              >
                {stat.desc}
              </div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div
          style={{
            display: "flex",
            gap: "14px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <a
            href="#trayectoria"
            className="btn-primary"
            onClick={() => sound.playClick()}
          >
            <span>Explorar Trayectoria</span>
            <ArrowUpRight size={16} />
          </a>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => window.dispatchEvent(new Event(OPEN_TWIN_EVENT))}
            style={{ cursor: "pointer", borderColor: "rgba(139, 92, 246, 0.45)" }}
          >
            <BotMessageSquare size={16} color="#a78bfa" />
            <span>Pregúntale a mi gemelo IA</span>
          </button>
          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            onClick={() => sound.playClick()}
          >
            <LinkedinIcon size={16} />
            <span>LinkedIn</span>
          </a>
          <a
            href={`mailto:${PROFILE.email}`}
            className="btn-secondary"
            onClick={() => sound.playClick()}
          >
            <Mail size={16} />
            <span>Email</span>
          </a>
        </div>

        {/* Scroll indicator */}
        <a
          href="#sobre-mi"
          style={{
            marginTop: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            color: "#64748b",
            fontSize: "0.75rem",
            fontFamily: "var(--font-mono)",
            animation: "float 3s ease-in-out infinite",
            textDecoration: "none",
          }}
        >
          <span>SCROLL_DOWN</span>
          <ChevronDown size={18} />
        </a>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
      `}</style>
    </section>
  );
}
