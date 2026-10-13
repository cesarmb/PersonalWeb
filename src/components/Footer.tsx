"use client";

import React, { useSyncExternalStore } from "react";
import { PROFILE } from "@/lib/profile-data";
import { Mail, ArrowUp, Code2 } from "lucide-react";
import { LinkedinIcon } from "./icons";
import { sound } from "@/lib/audio";

const noopSubscribe = () => () => {};

export function Footer() {
  const year = useSyncExternalStore(noopSubscribe, () => new Date().getFullYear(), () => null);
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(255, 255, 255, 0.06)",
        padding: "40px 0 32px",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div className="app-container">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
          }}
        >
          {/* Back to Top */}
          <a
            href="#hero"
            onClick={() => sound.playClick()}
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              background: "rgba(255, 255, 255, 0.04)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#94a3b8",
              transition: "all 0.2s ease",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(0, 240, 255, 0.4)";
              e.currentTarget.style.color = "#00f0ff";
              e.currentTarget.style.transform = "translateY(-3px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
              e.currentTarget.style.color = "#94a3b8";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <ArrowUp size={18} />
          </a>

          {/* Links */}
          <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            <a
              href={`mailto:${PROFILE.email}`}
              onClick={() => sound.playClick()}
              style={{
                color: "#64748b",
                transition: "color 0.2s",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#00f0ff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#64748b")}
            >
              <Mail size={18} />
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              style={{
                color: "#64748b",
                transition: "color 0.2s",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#8b5cf6")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#64748b")}
            >
              <LinkedinIcon size={18} />
            </a>
          </div>

          {/* Copyright */}
          <div
            style={{
              textAlign: "center",
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              color: "#475569",
              lineHeight: 1.8,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
              }}
            >
              <Code2 size={12} />
              <span>
                Diseñado & Construido por {PROFILE.name}
              </span>
            </div>
            <div>
              © {year} — Enterprise meets Edgy.
              Todos los derechos reservados.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
