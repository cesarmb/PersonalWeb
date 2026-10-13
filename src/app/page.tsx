"use client";

import React, { useState } from "react";
import { BackgroundEffect } from "@/components/BackgroundEffect";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { TimelineSection } from "@/components/TimelineSection";
import { PortfolioSection } from "@/components/PortfolioSection";
import { ContactSection } from "@/components/ContactSection";
import { TerminalDrawer } from "@/components/TerminalDrawer";
import { Footer } from "@/components/Footer";
import { DigitalTwinChat } from "@/components/DigitalTwinChat";

export default function Home() {
  const [terminalOpen, setTerminalOpen] = useState(false);

  return (
    <>
      <BackgroundEffect />
      <Navbar
        onToggleTerminal={() => setTerminalOpen(!terminalOpen)}
        terminalOpen={terminalOpen}
      />
      <main>
        <HeroSection />
        <AboutSection />
        <TimelineSection />
        <PortfolioSection />
        <ContactSection />
      </main>
      <Footer />
      <DigitalTwinChat />
      <TerminalDrawer
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
      />
    </>
  );
}
