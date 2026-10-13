"use client";

import React, { useEffect, useRef, useState } from "react";
import { PROFILE, PortfolioProject } from "@/lib/profile-data";
import {
  Layers,
  Rocket,
  FlaskConical,
  Lightbulb,
  Cpu,
} from "lucide-react";
import { sound } from "@/lib/audio";

function badgeBg(color: PortfolioProject["badgeColor"]) {
  switch (color) {
    case "cyan":
      return { bg: "rgba(0, 240, 255, 0.1)", border: "rgba(0, 240, 255, 0.3)", text: "#00f0ff" };
    case "emerald":
      return { bg: "rgba(16, 185, 129, 0.1)", border: "rgba(16, 185, 129, 0.3)", text: "#10b981" };
    case "violet":
      return { bg: "rgba(139, 92, 246, 0.1)", border: "rgba(139, 92, 246, 0.3)", text: "#8b5cf6" };
    case "amber":
      return { bg: "rgba(245, 158, 11, 0.1)", border: "rgba(245, 158, 11, 0.3)", text: "#f59e0b" };
  }
}

function statusIcon(status: PortfolioProject["status"]) {
  switch (status) {
    case "En Desarrollo Activo":
      return <Rocket size={14} />;
    case "Prototipo Agéntico":
      return <FlaskConical size={14} />;
    case "Arquitectura Diseñada":
      return <Layers size={14} />;
    case "Proof of Concept":
      return <Lightbulb size={14} />;
  }
}

function ProjectCard({
  project,
  index,
  isVisible,
}: {
  project: PortfolioProject;
  index: number;
  isVisible: boolean;
}) {
  const [showDetails, setShowDetails] = useState(false);
  const colors = badgeBg(project.badgeColor);

  return (
    <div
      className="glass-panel"
      style={{
        padding: "0",
        overflow: "hidden",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`,
        borderColor: showDetails ? colors.border : undefined,
        boxShadow: showDetails ? `0 12px 40px -15px ${colors.bg}` : undefined,
      }}
    >
      {/* Top gradient bar */}
      <div
        style={{
          height: "3px",
          background: `linear-gradient(90deg, ${colors.text}, transparent)`,
        }}
      />

      <div style={{ padding: "28px" }}>
        {/* Status & Category */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "0.72rem",
              fontFamily: "var(--font-mono)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              padding: "4px 12px",
              borderRadius: "9999px",
              background: colors.bg,
              border: `1px solid ${colors.border}`,
              color: colors.text,
            }}
          >
            {statusIcon(project.status)}
            {project.status}
          </span>
          <span
            style={{
              fontSize: "0.72rem",
              fontFamily: "var(--font-mono)",
              color: "#64748b",
              padding: "4px 10px",
              borderRadius: "6px",
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
            }}
          >
            {project.category}
          </span>
        </div>

        {/* Title & Tagline */}
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.3rem",
            fontWeight: 700,
            color: "#f8fafc",
            marginBottom: "6px",
          }}
        >
          {project.title}
        </h3>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.8rem",
            color: colors.text,
            marginBottom: "16px",
            lineHeight: 1.5,
          }}
        >
          {project.tagline}
        </p>

        {/* Description */}
        <p
          style={{
            fontSize: "0.9rem",
            color: "#94a3b8",
            lineHeight: 1.7,
            marginBottom: "20px",
          }}
        >
          {project.description}
        </p>

        {/* Metrics */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${project.metrics.length}, 1fr)`,
            gap: "12px",
            marginBottom: "20px",
          }}
        >
          {project.metrics.map((m, i) => (
            <div
              key={i}
              style={{
                textAlign: "center",
                padding: "12px 8px",
                background: "rgba(255, 255, 255, 0.02)",
                borderRadius: "10px",
                border: "1px solid rgba(255, 255, 255, 0.05)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  color: colors.text,
                }}
              >
                {m.value}
              </div>
              <div
                style={{
                  fontSize: "0.68rem",
                  color: "#64748b",
                  fontFamily: "var(--font-mono)",
                  marginTop: "2px",
                }}
              >
                {m.label}
              </div>
            </div>
          ))}
        </div>

        {/* Toggle Architecture Details */}
        <button
          onClick={() => {
            sound.playClick();
            setShowDetails(!showDetails);
          }}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "10px",
            background: showDetails ? colors.bg : "rgba(255, 255, 255, 0.03)",
            border: `1px solid ${showDetails ? colors.border : "rgba(255, 255, 255, 0.06)"}`,
            color: showDetails ? colors.text : "#94a3b8",
            fontSize: "0.82rem",
            fontFamily: "var(--font-mono)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            transition: "all 0.2s ease",
            marginBottom: showDetails ? "16px" : "0",
          }}
        >
          <Cpu size={14} />
          {showDetails ? "Ocultar Detalles Arquitectónicos" : "Ver Arquitectura & Contexto Enterprise"}
        </button>

        {showDetails && (
          <div style={{ animation: "fadeSlideIn 0.35s ease" }}>
            {/* Enterprise Context */}
            <div
              style={{
                borderLeft: `3px solid ${colors.border}`,
                paddingLeft: "14px",
                marginBottom: "18px",
                fontSize: "0.85rem",
                color: "#94a3b8",
                lineHeight: 1.65,
                fontStyle: "italic",
              }}
            >
              {project.enterpriseContext}
            </div>

            {/* Architecture Bullets */}
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                marginBottom: "18px",
              }}
            >
              {project.architectureDetails.map((detail, i) => (
                <li
                  key={i}
                  style={{
                    display: "flex",
                    gap: "10px",
                    fontSize: "0.84rem",
                    color: "#cbd5e1",
                    lineHeight: 1.55,
                  }}
                >
                  <span style={{ color: colors.text, flexShrink: 0 }}>◆</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>

            {/* Tech Stack Tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {project.techStack.map((tech, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: "0.72rem",
                    fontFamily: "var(--font-mono)",
                    padding: "3px 10px",
                    borderRadius: "6px",
                    background: colors.bg,
                    border: `1px solid ${colors.border}`,
                    color: colors.text,
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export function PortfolioSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="portafolio"
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
          <div className="section-tag">Portafolio Futuro</div>
          <h2 className="section-title gradient-text-cyan">
            Proyectos en la Frontera Enterprise + AI
          </h2>
          <p className="section-subtitle" style={{ marginBottom: "48px" }}>
            Arquitecturas en desarrollo que fusionan la robustez de Java con la
            autonomía de los sistemas agénticos.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(360px, 100%), 1fr))",
              gap: "24px",
            }}
          >
            {PROFILE.futurePortfolio.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                isVisible={isVisible}
              />
            ))}
          </div>

          {/* Coming Soon Notice */}
          <div
            style={{
              marginTop: "48px",
              textAlign: "center",
              padding: "32px",
              borderRadius: "16px",
              background: "rgba(255, 255, 255, 0.02)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.85rem",
                color: "#64748b",
                marginBottom: "8px",
              }}
            >
              {"// PRÓXIMAMENTE"}
            </p>
            <p style={{ color: "#94a3b8", fontSize: "0.95rem" }}>
              Repositorios en GitHub, demos interactivas y documentación arquitectónica
              detallada en preparación. Regresa pronto o{" "}
              <a
                href="#contacto"
                style={{ color: "#00f0ff", textDecoration: "underline" }}
              >
                contáctame para más detalles
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
