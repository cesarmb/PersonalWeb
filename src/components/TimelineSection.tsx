"use client";

import React, { useEffect, useRef, useState } from "react";
import { PROFILE, WorkExperience } from "@/lib/profile-data";
import {
  Building2,
  Calendar,
  MapPin,
  Clock,
  ChevronDown,
  ChevronUp,
  Star,
} from "lucide-react";
import { sound } from "@/lib/audio";

function categoryColor(cat: WorkExperience["category"]) {
  switch (cat) {
    case "current":
      return { bg: "rgba(0, 240, 255, 0.08)", border: "rgba(0, 240, 255, 0.3)", text: "#00f0ff", label: "Actual" };
    case "financial":
      return { bg: "rgba(16, 185, 129, 0.08)", border: "rgba(16, 185, 129, 0.3)", text: "#10b981", label: "Financiero" };
    case "enterprise":
      return { bg: "rgba(139, 92, 246, 0.08)", border: "rgba(139, 92, 246, 0.3)", text: "#8b5cf6", label: "Enterprise" };
    case "legacy":
      return { bg: "rgba(245, 158, 11, 0.08)", border: "rgba(245, 158, 11, 0.3)", text: "#f59e0b", label: "Modernización" };
  }
}

function TimelineCard({
  exp,
  index,
  isVisible,
}: {
  exp: WorkExperience;
  index: number;
  isVisible: boolean;
}) {
  const [expanded, setExpanded] = useState(index === 0);
  const colors = categoryColor(exp.category);

  return (
    <div
      style={{
        display: "flex",
        gap: "24px",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.12}s`,
      }}
    >
      {/* Timeline Spine */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexShrink: 0,
          width: "40px",
        }}
      >
        <div
          style={{
            width: "18px",
            height: "18px",
            borderRadius: "50%",
            background: colors.bg,
            border: `2px solid ${colors.border}`,
            boxShadow: `0 0 12px ${colors.bg}`,
            position: "relative",
            zIndex: 2,
          }}
        >
          {exp.category === "current" && (
            <span
              className="status-beacon"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "6px",
                height: "6px",
              }}
            />
          )}
        </div>
        <div
          style={{
            width: "2px",
            flexGrow: 1,
            background: `linear-gradient(to bottom, ${colors.border}, rgba(255, 255, 255, 0.05))`,
            minHeight: "40px",
          }}
        />
      </div>

      {/* Card */}
      <div
        className="glass-panel"
        style={{
          flexGrow: 1,
          padding: "28px",
          marginBottom: "16px",
          borderColor: expanded ? colors.border : undefined,
          boxShadow: expanded ? `0 8px 30px -10px ${colors.bg}` : undefined,
          cursor: "pointer",
        }}
        onClick={() => {
          sound.playClick();
          setExpanded(!expanded);
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: "12px",
            marginBottom: "12px",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                  fontSize: "0.7rem",
                  fontFamily: "var(--font-mono)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  padding: "3px 10px",
                  borderRadius: "9999px",
                  background: colors.bg,
                  border: `1px solid ${colors.border}`,
                  color: colors.text,
                }}
              >
                {exp.category === "current" && <span className="status-beacon" style={{ width: "5px", height: "5px" }} />}
                {colors.label}
              </span>
            </div>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.25rem",
                fontWeight: 700,
                color: "#f8fafc",
              }}
            >
              {exp.role}
            </h3>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: colors.text,
                fontWeight: 600,
                fontSize: "0.95rem",
                marginTop: "4px",
              }}
            >
              <Building2 size={16} />
              <span>{exp.company}</span>
            </div>
          </div>
          <div
            style={{
              textAlign: "right",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: "4px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "0.82rem",
                color: "#94a3b8",
              }}
            >
              <Calendar size={14} />
              <span>{exp.period}</span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "0.78rem",
                color: "#64748b",
              }}
            >
              <Clock size={13} />
              <span>{exp.duration}</span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "0.78rem",
                color: "#64748b",
              }}
            >
              <MapPin size={13} />
              <span>{exp.location}</span>
            </div>
          </div>
        </div>

        {/* Summary always visible */}
        <p
          style={{
            color: "#94a3b8",
            fontSize: "0.9rem",
            lineHeight: 1.65,
            marginBottom: "12px",
          }}
        >
          {exp.summary}
        </p>

        {/* Highlight */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "0.8rem",
            color: colors.text,
            fontWeight: 600,
            marginBottom: expanded ? "16px" : "0",
          }}
        >
          <Star size={14} />
          <span>{exp.highlight}</span>
        </div>

        {/* Expanded Content */}
        {expanded && (
          <div
            style={{
              borderTop: "1px solid rgba(255, 255, 255, 0.06)",
              paddingTop: "16px",
              animation: "fadeIn 0.35s ease",
            }}
          >
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                marginBottom: "18px",
              }}
            >
              {exp.bulletPoints.map((bp, i) => (
                <li
                  key={i}
                  style={{
                    display: "flex",
                    gap: "10px",
                    fontSize: "0.88rem",
                    color: "#cbd5e1",
                    lineHeight: 1.6,
                  }}
                >
                  <span style={{ color: colors.text, flexShrink: 0, marginTop: "2px" }}>▸</span>
                  <span>{bp}</span>
                </li>
              ))}
            </ul>

            {/* Tech Tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {exp.techStack.map((tech, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: "0.72rem",
                    fontFamily: "var(--font-mono)",
                    padding: "3px 10px",
                    borderRadius: "6px",
                    background: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    color: "#94a3b8",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Toggle indicator */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
            color: "#475569",
          }}
        >
          {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </div>
    </div>
  );
}

export function TimelineSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="trayectoria"
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
          <div className="section-tag">Trayectoria Profesional</div>
          <h2 className="section-title gradient-text-violet">
            Más de Dos Décadas de Impacto Corporativo
          </h2>
          <p className="section-subtitle" style={{ marginBottom: "48px" }}>
            Un recorrido continuo desde la modernización de mainframes hasta la
            orquestación de sistemas autónomos.
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {PROFILE.experiences.map((exp, i) => (
              <TimelineCard
                key={exp.id}
                exp={exp}
                index={i}
                isVisible={isVisible}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
