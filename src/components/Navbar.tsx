"use client";

import React, { useState, useEffect } from "react";
import { sound } from "@/lib/audio";
import { Terminal, Volume2, VolumeX, Menu, X, ArrowUpRight } from "lucide-react";

interface NavbarProps {
  onToggleTerminal: () => void;
  terminalOpen: boolean;
}

export function Navbar({ onToggleTerminal, terminalOpen }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const active = sound.toggle();
    setSoundEnabled(active);
  };

  const navItems = [
    { label: "Sobre Mí", href: "#sobre-mi" },
    { label: "Trayectoria Profesional", href: "#trayectoria" },
    { label: "Portafolio Futuro", href: "#portafolio" },
    { label: "Contacto", href: "#contacto" },
  ];

  const handleNavClick = () => {
    sound.playClick();
    setMobileMenuOpen(false);
  };

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "all 0.3s ease",
        background: scrolled
          ? "rgba(7, 9, 14, 0.88)"
          : "rgba(7, 9, 14, 0.45)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: scrolled
          ? "1px solid rgba(0, 240, 255, 0.15)"
          : "1px solid rgba(255, 255, 255, 0.05)",
      }}
    >
      <div
        className="app-container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "76px",
        }}
      >
        {/* Brand / Logo */}
        <a
          href="#"
          onClick={() => sound.playClick()}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            textDecoration: "none",
          }}
        >
          <div
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, rgba(0, 240, 255, 0.15), rgba(139, 92, 246, 0.15))",
              border: "1px solid rgba(0, 240, 255, 0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#00f0ff",
              fontWeight: 800,
              fontFamily: "var(--font-mono)",
              fontSize: "1.05rem",
              letterSpacing: "0.05em",
              boxShadow: "0 0 15px rgba(0, 240, 255, 0.2)",
            }}
          >
            CMB
          </div>
          <div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "1.1rem",
                letterSpacing: "0.02em",
                color: "#ffffff",
                whiteSpace: "nowrap",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
              className="nav-name"
            >
              Cesar Martinez Baeza
              <span
                className="nav-hide-mobile"
                style={{
                  fontSize: "0.65rem",
                  color: "#00f0ff",
                  fontFamily: "var(--font-mono)",
                  padding: "1px 6px",
                  borderRadius: "4px",
                  background: "rgba(0, 240, 255, 0.1)",
                  border: "1px solid rgba(0, 240, 255, 0.2)",
                }}
              >
                SR. ARCHITECT
              </span>
            </div>
            <div
              className="nav-hide-mobile"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "0.75rem",
                color: "#94a3b8",
                fontFamily: "var(--font-mono)",
              }}
            >
              <span className="status-beacon" />
              <span>CORE ONLINE // IBM & AGENTIC LABS</span>
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav
          style={{
            display: "none",
            alignItems: "center",
            gap: "28px",
          }}
          className="desktop-nav"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={handleNavClick}
              style={{
                fontSize: "0.9rem",
                color: "#94a3b8",
                fontWeight: 500,
                transition: "color 0.2s ease",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#00f0ff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#94a3b8";
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          {/* Audio FX Toggle */}
          <button
            className="nav-hide-mobile"
            onClick={handleSoundToggle}
            aria-label="Alternar Efectos de Sonido"
            title={soundEnabled ? "Audio FX Activo" : "Activar Audio FX"}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              background: soundEnabled
                ? "rgba(0, 240, 255, 0.15)"
                : "rgba(255, 255, 255, 0.04)",
              border: soundEnabled
                ? "1px solid rgba(0, 240, 255, 0.4)"
                : "1px solid rgba(255, 255, 255, 0.1)",
              color: soundEnabled ? "#00f0ff" : "#94a3b8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>

          {/* Terminal Console Trigger */}
          <button
            onClick={() => {
              sound.playClick();
              onToggleTerminal();
            }}
            title="Consola de Comandos Agéntica"
            style={{
              height: "40px",
              padding: "0 14px",
              borderRadius: "10px",
              background: terminalOpen
                ? "rgba(0, 240, 255, 0.2)"
                : "rgba(255, 255, 255, 0.04)",
              border: terminalOpen
                ? "1px solid #00f0ff"
                : "1px solid rgba(255, 255, 255, 0.1)",
              color: terminalOpen ? "#00f0ff" : "#cbd5e1",
              fontFamily: "var(--font-mono)",
              fontSize: "0.8rem",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            <Terminal size={16} />
            <span style={{ display: "none" }} className="terminal-btn-text">
              Consola
            </span>
          </button>

          {/* Contact Direct CTA */}
          <a
            href="#contacto"
            onClick={handleNavClick}
            className="btn-primary"
            style={{
              padding: "9px 18px",
              fontSize: "0.85rem",
              display: "none",
            }}
            id="nav-contact-cta"
          >
            <span>Conectar</span>
            <ArrowUpRight size={15} />
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => {
              sound.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            aria-label="Abrir Menú"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              background: "rgba(255, 255, 255, 0.04)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            className="mobile-menu-trigger"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            background: "rgba(10, 13, 22, 0.98)",
            borderBottom: "1px solid rgba(0, 240, 255, 0.2)",
            padding: "20px 24px 28px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            backdropFilter: "blur(20px)",
          }}
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={handleNavClick}
              style={{
                fontSize: "1.05rem",
                color: "#e2e8f0",
                padding: "8px 0",
                borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span>{item.label}</span>
              <ArrowUpRight size={16} color="#00f0ff" />
            </a>
          ))}
          <a
            href="#contacto"
            onClick={handleNavClick}
            className="btn-primary"
            style={{ marginTop: "12px", width: "100%", textAlign: "center" }}
          >
            Iniciar Contacto Directo
          </a>
        </div>
      )}

      <style jsx>{`
        @media (min-width: 900px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-menu-trigger {
            display: none !important;
          }
          #nav-contact-cta {
            display: inline-flex !important;
          }
          .terminal-btn-text {
            display: inline !important;
          }
        }
      `}</style>
    </header>
  );
}
