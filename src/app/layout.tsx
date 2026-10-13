import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cesar Martinez Baeza | Senior Java Full Stack Architect & Autonomous Systems Engineer",
  description:
    "Sitio profesional de Cesar Martinez Baeza. Más de 20 años de ingeniería enterprise en IBM, BNP Paribas Cardif y New York Life. Especialista en microservicios Java de alta criticidad, cloud architecture y sistemas agénticos con IA.",
  keywords: [
    "Cesar Martinez Baeza",
    "Java Full Stack Developer",
    "Senior Solutions Architect",
    "IBM Senior Application Developer",
    "Spring Boot Microservices",
    "Ingeniero Agentico",
    "Agentic AI Engineer",
    "Cloud Architecture",
    "IBM Certified Advocate",
    "Mexico City",
  ],
  authors: [{ name: "Cesar Martinez Baeza" }],
  openGraph: {
    title: "Cesar Martinez Baeza | Enterprise Architecture meets Agentic AI",
    description:
      "20+ años de ingeniería en sistemas distribuidos y microservicios de misión crítica. Conoce mi trayectoria y proyectos futuros.",
    type: "website",
    locale: "es_MX",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${plusJakarta.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
