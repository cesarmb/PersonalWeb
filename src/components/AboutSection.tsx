"use client";

import React, { useEffect, useRef, useState } from "react";
import { PROFILE } from "@/lib/profile-data";
import {
  GraduationCap,
  Award,
  Cloud,
  Zap,
  BookOpen,
  User,
  Cpu,
} from "lucide-react";

function skillTier(level: number) {
  if (level >= 93) return { label: "EXPERTO", width: 100 };
  if (level >= 88) return { label: "AVANZADO", width: 82 };
  return { label: "SÓLIDO", width: 66 };
}

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  return (
    <section
      id="sobre-mi"
      ref={sectionRef}
      style={{
        padding: "100px 0",
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
          {/* Section Header */}
          <div className="section-tag">Sobre Mí</div>
          <h2 className="section-title gradient-text-cyan">
            Ingeniería Enterprise con Visión Agéntica
          </h2>
          <p className="section-subtitle" style={{ marginBottom: "48px" }}>
            Donde la solidez de los microservicios se encuentra con la frontera
            de la inteligencia artificial autónoma.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "32px",
            }}
          >
            {/* Bio Cards */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(320px, 100%), 1fr))",
                gap: "24px",
              }}
            >
              {/* Philosophy Card */}
              <div
                className="glass-panel glow-cyan-border"
                style={{ padding: "32px" }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "20px",
                  }}
                >
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "12px",
                      background: "rgba(0, 240, 255, 0.1)",
                      border: "1px solid rgba(0, 240, 255, 0.25)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#00f0ff",
                    }}
                  >
                    <User size={22} />
                  </div>
                  <div>
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.15rem",
                        fontWeight: 700,
                        color: "#f8fafc",
                      }}
                    >
                      Trayectoria & Misión
                    </h3>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.7rem",
                        color: "#64748b",
                      }}
                    >
                      {"// "}{PROFILE.experienceYears} AÑOS EN PRODUCCIÓN
                    </span>
                  </div>
                </div>
                <p
                  style={{
                    color: "#cbd5e1",
                    fontSize: "0.95rem",
                    lineHeight: 1.75,
                    marginBottom: "16px",
                  }}
                >
                  {PROFILE.bioIntro}
                </p>
                <p
                  style={{
                    color: "#94a3b8",
                    fontSize: "0.9rem",
                    lineHeight: 1.7,
                    borderLeft: "3px solid rgba(0, 240, 255, 0.4)",
                    paddingLeft: "16px",
                    fontStyle: "italic",
                  }}
                >
                  {PROFILE.bioPhilosophy}
                </p>
              </div>

              {/* Credentials Card */}
              <div
                className="glass-panel glow-violet-border"
                style={{ padding: "32px" }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "20px",
                  }}
                >
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "12px",
                      background: "rgba(139, 92, 246, 0.1)",
                      border: "1px solid rgba(139, 92, 246, 0.25)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#8b5cf6",
                    }}
                  >
                    <Cpu size={22} />
                  </div>
                  <div>
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.15rem",
                        fontWeight: 700,
                        color: "#f8fafc",
                      }}
                    >
                      Credenciales & Formación
                    </h3>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.7rem",
                        color: "#64748b",
                      }}
                    >
                      {"// CERTIFICACIONES & EDUCACIÓN"}
                    </span>
                  </div>
                </div>

                {/* Education */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                    marginBottom: "24px",
                    padding: "16px",
                    background: "rgba(255, 255, 255, 0.03)",
                    borderRadius: "12px",
                    border: "1px solid rgba(255, 255, 255, 0.06)",
                  }}
                >
                  <GraduationCap
                    size={22}
                    color="#8b5cf6"
                    style={{ flexShrink: 0, marginTop: "2px" }}
                  />
                  <div>
                    <div
                      style={{
                        fontWeight: 600,
                        color: "#e2e8f0",
                        fontSize: "0.95rem",
                      }}
                    >
                      {PROFILE.education.degree}
                    </div>
                    <div
                      style={{
                        color: "#94a3b8",
                        fontSize: "0.85rem",
                        marginTop: "4px",
                      }}
                    >
                      {PROFILE.education.institution}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.75rem",
                        color: "#64748b",
                        marginTop: "4px",
                      }}
                    >
                      {PROFILE.education.period}
                    </div>
                  </div>
                </div>

                {/* Certifications */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  {PROFILE.certifications.map((cert, i) => {
                    const IconComp = cert.icon === "Cloud" ? Cloud : Zap;
                    return (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                          padding: "14px 16px",
                          background: "rgba(255, 255, 255, 0.03)",
                          borderRadius: "12px",
                          border: "1px solid rgba(255, 255, 255, 0.06)",
                        }}
                      >
                        <div
                          style={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "8px",
                            background: "rgba(0, 240, 255, 0.08)",
                            border: "1px solid rgba(0, 240, 255, 0.2)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            color: "#00f0ff",
                          }}
                        >
                          <IconComp size={18} />
                        </div>
                        <div>
                          <div
                            style={{
                              fontWeight: 600,
                              color: "#e2e8f0",
                              fontSize: "0.88rem",
                            }}
                          >
                            {cert.name}
                          </div>
                          <div
                            style={{
                              fontSize: "0.75rem",
                              color: "#64748b",
                              fontFamily: "var(--font-mono)",
                            }}
                          >
                            {cert.badge}
                          </div>
                        </div>
                        <Award
                          size={18}
                          color="#f59e0b"
                          style={{ marginLeft: "auto", flexShrink: 0 }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Skills Grid */}
            <div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.8rem",
                  color: "#64748b",
                  marginBottom: "20px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <BookOpen size={14} />
                <span>STACK TECNOLÓGICO COMPLETO</span>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))",
                  gap: "20px",
                }}
              >
                {PROFILE.skillCategories.map((cat, catIndex) => (
                  <div
                    key={catIndex}
                    className="glass-panel glow-cyan-border"
                    style={{
                      padding: "24px",
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible
                        ? "translateY(0)"
                        : "translateY(20px)",
                      transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${
                        0.1 * catIndex
                      }s`,
                    }}
                  >
                    <h4
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.05rem",
                        fontWeight: 700,
                        color: "#f8fafc",
                        marginBottom: "4px",
                      }}
                    >
                      {cat.title}
                    </h4>
                    <p
                      style={{
                        fontSize: "0.78rem",
                        color: "#64748b",
                        marginBottom: "18px",
                        lineHeight: 1.5,
                      }}
                    >
                      {cat.description}
                    </p>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "14px",
                      }}
                    >
                      {cat.skills.map((skill, si) => (
                        <div key={si}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              marginBottom: "6px",
                            }}
                          >
                            <span
                              style={{
                                fontSize: "0.85rem",
                                color: "#cbd5e1",
                                fontWeight: 500,
                              }}
                            >
                              {skill.name}
                            </span>
                            <span
                              style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: "0.75rem",
                                color: "#00f0ff",
                              }}
                            >
                              {skillTier(skill.level).label}
                            </span>
                          </div>
                          <div
                            style={{
                              height: "5px",
                              background: "rgba(255, 255, 255, 0.06)",
                              borderRadius: "4px",
                              overflow: "hidden",
                            }}
                          >
                            <div
                              style={{
                                height: "100%",
                                width: isVisible ? `${skillTier(skill.level).width}%` : "0%",
                                background:
                                  "linear-gradient(90deg, #00f0ff, #8b5cf6)",
                                borderRadius: "4px",
                                transition: `width 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${
                                  0.05 * si + 0.2 * catIndex
                                }s`,
                              }}
                            />
                          </div>
                          <div
                            style={{
                              fontSize: "0.7rem",
                              color: "#475569",
                              marginTop: "3px",
                            }}
                          >
                            {skill.note}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
