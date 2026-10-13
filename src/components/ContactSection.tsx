"use client";

import React, { useEffect, useRef, useState } from "react";
import { PROFILE } from "@/lib/profile-data";
import { sound } from "@/lib/audio";
import {
  Send,
  Mail,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowUpRight,
  MessageSquare,
} from "lucide-react";
import { LinkedinIcon } from "./icons";

export function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playClick();
    setStatus("sending");

    // Open the visitor's mail client with the message pre-filled
    const subject = formData.subject || `Contacto desde el sitio web — ${formData.name}`;
    const body = `${formData.message}\n\n—\n${formData.name}\n${formData.email}`;
    window.location.href = `mailto:${PROFILE.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    setTimeout(() => {
      sound.playSuccess();
      setStatus("sent");
      setTimeout(() => setStatus("idle"), 6000);
    }, 600);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px 16px",
    borderRadius: "12px",
    background: "rgba(255, 255, 255, 0.03)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    color: "#f8fafc",
    fontSize: "0.92rem",
    fontFamily: "var(--font-sans)",
    outline: "none",
    transition: "all 0.2s ease",
  };

  return (
    <section
      id="contacto"
      ref={sectionRef}
      style={{
        padding: "100px 0 60px",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div className="app-container">
        <div
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(40px)",
            transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <div className="section-tag">Contacto</div>
          <h2 className="section-title gradient-text-cyan">
            Iniciemos una Conversación
          </h2>
          <p className="section-subtitle" style={{ marginBottom: "48px" }}>
            ¿Tienes un proyecto desafiante, una oportunidad enterprise o
            simplemente quieres conectar? Estoy disponible.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(340px, 100%), 1fr))",
              gap: "32px",
            }}
          >
            {/* Contact Info Side */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              {/* Email Card */}
              <a
                href={`mailto:${PROFILE.email}`}
                className="glass-panel glow-cyan-border"
                style={{
                  padding: "24px",
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  textDecoration: "none",
                }}
                onClick={() => sound.playClick()}
              >
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "14px",
                    background: "rgba(0, 240, 255, 0.1)",
                    border: "1px solid rgba(0, 240, 255, 0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#00f0ff",
                    flexShrink: 0,
                  }}
                >
                  <Mail size={22} />
                </div>
                <div style={{ flexGrow: 1 }}>
                  <div
                    style={{
                      fontSize: "0.78rem",
                      color: "#64748b",
                      fontFamily: "var(--font-mono)",
                      marginBottom: "4px",
                    }}
                  >
                    EMAIL DIRECTO
                  </div>
                  <div
                    style={{
                      fontSize: "1rem",
                      fontWeight: 600,
                      color: "#e2e8f0",
                    }}
                  >
                    {PROFILE.email}
                  </div>
                </div>
                <ArrowUpRight size={18} color="#475569" />
              </a>

              {/* LinkedIn Card */}
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-panel glow-violet-border"
                style={{
                  padding: "24px",
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  textDecoration: "none",
                }}
                onClick={() => sound.playClick()}
              >
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "14px",
                    background: "rgba(139, 92, 246, 0.1)",
                    border: "1px solid rgba(139, 92, 246, 0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#8b5cf6",
                    flexShrink: 0,
                  }}
                >
                  <LinkedinIcon size={22} />
                </div>
                <div style={{ flexGrow: 1 }}>
                  <div
                    style={{
                      fontSize: "0.78rem",
                      color: "#64748b",
                      fontFamily: "var(--font-mono)",
                      marginBottom: "4px",
                    }}
                  >
                    LINKEDIN PROFILE
                  </div>
                  <div
                    style={{
                      fontSize: "1rem",
                      fontWeight: 600,
                      color: "#e2e8f0",
                    }}
                  >
                    /{PROFILE.linkedinHandle}
                  </div>
                </div>
                <ArrowUpRight size={18} color="#475569" />
              </a>

              {/* Location Card */}
              <div
                className="glass-panel"
                style={{
                  padding: "24px",
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                }}
              >
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "14px",
                    background: "rgba(16, 185, 129, 0.1)",
                    border: "1px solid rgba(16, 185, 129, 0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#10b981",
                    flexShrink: 0,
                  }}
                >
                  <MapPin size={22} />
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "0.78rem",
                      color: "#64748b",
                      fontFamily: "var(--font-mono)",
                      marginBottom: "4px",
                    }}
                  >
                    UBICACIÓN
                  </div>
                  <div
                    style={{
                      fontSize: "1rem",
                      fontWeight: 600,
                      color: "#e2e8f0",
                    }}
                  >
                    {PROFILE.location}
                  </div>
                  <div
                    style={{
                      fontSize: "0.8rem",
                      color: "#64748b",
                      marginTop: "2px",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <span className="status-beacon" />
                    Disponible para trabajo remoto e híbrido
                  </div>
                </div>
              </div>

              {/* Availability Badge */}
              <div
                style={{
                  padding: "20px",
                  borderRadius: "16px",
                  background: "linear-gradient(135deg, rgba(0, 240, 255, 0.05), rgba(139, 92, 246, 0.05))",
                  border: "1px solid rgba(255, 255, 255, 0.06)",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.75rem",
                    color: "#64748b",
                    marginBottom: "8px",
                  }}
                >
                  RESPONSE TIME
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.6rem",
                    fontWeight: 700,
                    color: "#00f0ff",
                  }}
                >
                  {"< 24h"}
                </div>
                <div style={{ fontSize: "0.82rem", color: "#94a3b8", marginTop: "4px" }}>
                  Tiempo típico de respuesta
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div
              className="glass-panel glow-cyan-border"
              style={{ padding: "32px" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "24px",
                }}
              >
                <MessageSquare size={20} color="#00f0ff" />
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.15rem",
                    fontWeight: 700,
                    color: "#f8fafc",
                  }}
                >
                  Envía un Mensaje Directo
                </h3>
              </div>

              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.72rem",
                      color: "#64748b",
                      marginBottom: "6px",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Tu nombre"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "rgba(0, 240, 255, 0.5)";
                      e.currentTarget.style.boxShadow = "0 0 15px rgba(0, 240, 255, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.72rem",
                      color: "#64748b",
                      marginBottom: "6px",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "rgba(0, 240, 255, 0.5)";
                      e.currentTarget.style.boxShadow = "0 0 15px rgba(0, 240, 255, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.72rem",
                      color: "#64748b",
                      marginBottom: "6px",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Asunto
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Proyecto, oportunidad o consulta"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "rgba(0, 240, 255, 0.5)";
                      e.currentTarget.style.boxShadow = "0 0 15px rgba(0, 240, 255, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.72rem",
                      color: "#64748b",
                      marginBottom: "6px",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Mensaje
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Describe tu proyecto o consulta..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "rgba(0, 240, 255, 0.5)";
                      e.currentTarget.style.boxShadow = "0 0 15px rgba(0, 240, 255, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                    style={{
                      ...inputStyle,
                      resize: "vertical",
                      minHeight: "120px",
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn-primary"
                  style={{
                    width: "100%",
                    marginTop: "4px",
                    opacity: status === "sending" ? 0.7 : 1,
                  }}
                >
                  {status === "idle" && (
                    <>
                      <Send size={16} />
                      <span>Enviar Mensaje</span>
                    </>
                  )}
                  {status === "sending" && (
                    <>
                      <Loader2
                        size={16}
                        style={{ animation: "spin 1s linear infinite" }}
                      />
                      <span>Abriendo tu correo...</span>
                    </>
                  )}
                  {status === "sent" && (
                    <>
                      <CheckCircle2 size={16} />
                      <span>¡Listo! Envíalo desde tu correo</span>
                    </>
                  )}
                  {status === "error" && (
                    <>
                      <AlertCircle size={16} />
                      <span>Error. Intenta de nuevo.</span>
                    </>
                  )}
                </button>
              </form>

              <style jsx>{`
                @keyframes spin {
                  from { transform: rotate(0deg); }
                  to { transform: rotate(360deg); }
                }
              `}</style>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
