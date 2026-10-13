export interface WorkExperience {
  id: string;
  company: string;
  role: string;
  period: string;
  duration: string;
  location: string;
  category: "current" | "financial" | "enterprise" | "legacy";
  summary: string;
  bulletPoints: string[];
  techStack: string[];
  highlight: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  tagline: string;
  status: "En Desarrollo Activo" | "Prototipo Agéntico" | "Arquitectura Diseñada" | "Proof of Concept";
  badgeColor: "cyan" | "emerald" | "violet" | "amber";
  category: "Agéntico / IA" | "Microservicios" | "Modernización" | "Fintech";
  description: string;
  enterpriseContext: string;
  architectureDetails: string[];
  techStack: string[];
  demoUrl?: string;
  githubUrl?: string;
  metrics: { label: string; value: string }[];
}

export interface SkillCategory {
  title: string;
  description: string;
  iconName: string;
  skills: { name: string; level: number; note: string }[];
}

export const PROFILE = {
  name: "Cesar Martinez Baeza",
  title: "Senior Java Full Stack Developer & Enterprise Solutions Architect",
  specialization: "Ingeniería Agéntica | Microservicios de Misión Crítica | Cloud Architecture",
  location: "Ciudad de México, México",
  email: "cesar.baeza@gmail.com",
  linkedin: "https://www.linkedin.com/in/cesarmartinezbaeza",
  linkedinHandle: "cesarmartinezbaeza",
  experienceYears: "20+",
  education: {
    institution: "Universidad Tecnológica de México",
    degree: "Licenciatura en Ciencias de la Computación (Computer Science)",
    period: "1997 - 2001",
  },
  certifications: [
    {
      name: "IBM Certified Advocate - Cloud v2",
      issuer: "IBM",
      badge: "Cloud Architecture & Services",
      icon: "Cloud",
    },
    {
      name: "IBM Garage Essentials",
      issuer: "IBM",
      badge: "Agile Innovation & Enterprise Delivery",
      icon: "Zap",
    },
  ],
  stats: [
    { value: "20+", label: "Años de Experiencia", desc: "Ingeniería de software y arquitectura" },
    { value: "5+", label: "Corporaciones Globales", desc: "IBM, BNP Paribas, NY Life, Panasonic, KC" },
    { value: "100%", label: "Enfoque Resiliente", desc: "Microservicios, APIs y alta disponibilidad" },
    { value: "AI", label: "Ingeniería Agéntica", desc: "Workflows autónomos y modernización asistida" },
  ],
  bioIntro:
    "Ingeniero de desarrollo de software con más de 20 años de trayectoria en Tecnologías de la Información, participando integralmente en todo el ciclo de vida del software (SDLC) en corporaciones multinacionales de máxima criticidad operativa.",
  bioPhilosophy:
    "El verdadero poder de la tecnología moderna ocurre donde la solidez enterprise se encuentra con la frontera de la inteligencia artificial. Dos décadas diseñando microservicios Java, transacciones bancarias y plataformas de seguros me brindan el rigor arquitectónico necesario para construir sistemas agénticos que son autónomos, fiables y listos para producción empresarial.",
  
  experiences: [
    {
      id: "ibm",
      company: "IBM",
      role: "Senior Application Developer",
      period: "Julio 2021 - Presente",
      duration: "5+ años",
      location: "Área Metropolitana de la Ciudad de México",
      category: "current",
      summary:
        "Liderazgo en diseño, desarrollo y mantenimiento de aplicaciones críticas empresariales basadas en Java, con énfasis en arquitecturas de microservicios distribuidos, alta disponibilidad, seguridad y escalabilidad.",
      bulletPoints: [
        "Contribución clave a múltiples proyectos de escala corporativa colaborando en entornos ágiles multidisciplinarios.",
        "Diseño e implementación de microservicios Java con Spring Boot, priorizando rendimiento, resiliencia y seguridad bancaria/corporativa.",
        "Integración continua y despliegue en entornos cloud con observabilidad y monitorización proactiva de servicios.",
        "Aplicación de metodologías IBM Garage para iteración veloz y prototipado ágil con valor de negocio inmediato."
      ],
      techStack: ["Java", "Spring Boot", "Microservicios", "REST APIs", "Cloud Architecture", "Agile / Scrum", "Git", "DevSecOps"],
      highlight: "5+ años de excelencia continua en el núcleo de microservicios de IBM"
    },
    {
      id: "bnp-paribas",
      company: "BNP Paribas Cardif",
      role: "Senior IT Specialist",
      period: "Diciembre 2012 - Julio 2015",
      duration: "2 años 8 meses",
      location: "Ciudad de México",
      category: "financial",
      summary:
        "Especialista senior en tecnologías de la información para la división de seguros y servicios financieros globales de BNP Paribas, asegurando cumplimiento normativo y estabilidad operativa.",
      bulletPoints: [
        "Gestión y evolución de plataformas de TI transaccionales para servicios de seguros y bancaseguros.",
        "Garantía de alta disponibilidad y mitigación de riesgos operativos en procesos financieros críticos.",
        "Interconexión de servicios core con proveedores externos y pasarelas de aseguramiento con estrictas políticas de seguridad."
      ],
      techStack: ["Java", "Enterprise Architecture", "Oracle DB", "Servicios Financieros", "Integración SOAP/REST", "Seguridad Bancaria"],
      highlight: "Infraestructura tecnológica para una de las instituciones financieras líderes en Europa y LatAm"
    },
    {
      id: "new-york-life",
      company: "New York Life Insurance Company",
      role: "Software Specialist / Senior IT Specialist",
      period: "Mayo 2007 - Mayo 2012",
      duration: "5 años 1 mes",
      location: "Ciudad de México",
      category: "enterprise",
      summary:
        "Creación, desarrollo y mantenimiento de portales web y servicios empresariales en todo el ciclo de vida de desarrollo de software, fungiendo como contacto técnico primario de máxima criticidad.",
      bulletPoints: [
        "Desarrollo integral de sitios y plataformas web corporativas utilizando Java Spring Framework, HTML, CSS, JavaScript, AJAX, XML/XSL, Web Services, Oracle y SQL Server.",
        "Contacto técnico primario para resolución de incidentes críticos en la plataforma IBM FileNet, utilizada para gestión masiva de contenidos y flujos de negocio.",
        "Optimización de modelos de bases de datos relacionales en Oracle y SQL Server para acelerar tiempos de respuesta en consultas de pólizas y asegurados."
      ],
      techStack: ["Java Spring", "IBM FileNet", "Oracle", "SQL Server", "Web Services", "JavaScript", "AJAX", "XML/XSL"],
      highlight: "Líder de incidencias críticas para la plataforma IBM FileNet durante más de 5 años"
    },
    {
      id: "panasonic",
      company: "Panasonic",
      role: "Systems Analyst / IT Specialist",
      period: "Marzo 2005 - Abril 2007",
      duration: "2 años 2 meses",
      location: "Ciudad de México",
      category: "enterprise",
      summary:
        "Diseño, documentación y evaluación de proyectos de tecnologías de información, guiando la calidad y estándares corporativos para la multinacional japonesa.",
      bulletPoints: [
        "A cargo del diseño arquitectónico, evaluación de viabilidad y documentación exhaustiva de proyectos de TI.",
        "Guía y monitorización de la implementación y calidad de servicios a través del cumplimiento de procesos y estándares globales de la compañía.",
        "Desarrollo de soluciones corporativas utilizando Microsoft Framework, C#, HTML, JavaScript y bases de datos Oracle."
      ],
      techStack: ["C#", ".NET Framework", "Oracle", "JavaScript", "HTML", "Análisis de Sistemas", "Gobierno TI"],
      highlight: "Estandarización de calidad y arquitectura de servicios para la firma global Panasonic"
    },
    {
      id: "kimberly-clark",
      company: "Kimberly-Clark",
      role: "Web Developer",
      period: "Julio 2004 - Marzo 2005",
      duration: "9 meses",
      location: "Ciudad de México",
      category: "legacy",
      summary:
        "Modernización y reemplazo de sistemas heredados de misión crítica desarrollados en COBOL hacia tecnologías web modernas.",
      bulletPoints: [
        "Responsable de crear y desplegar plataformas web corporativas que permitieron modernizar y migrar sistemas heredados en COBOL.",
        "Traducción de reglas de negocio complejas desde código mainframe histórico hacia entornos distribuidos en tecnologías Microsoft.",
        "Optimización de flujos de trabajo internos y capacitación a equipos en interfaces web modernas."
      ],
      techStack: ["Migración COBOL", "Web Development", "Microsoft Technologies", "SQL Server", "Legacy Modernization"],
      highlight: "Pionero en migración de sistemas legacy mainframe COBOL a plataformas web modernas"
    }
  ] as WorkExperience[],

  skillCategories: [
    {
      title: "Backend & Microservicios",
      description: "El pilar central de arquitecturas corporativas resilientes y concurrentes",
      iconName: "Server",
      skills: [
        { name: "Java (SE / EE / 21)", level: 98, note: "Lenguaje principal desde 2007" },
        { name: "Spring Boot & Spring Cloud", level: 95, note: "Microservicios, Security, Data" },
        { name: "APIs RESTful & SOAP", level: 95, note: "Contratos de integración robustos" },
        { name: "Arquitectura Concurrente", level: 92, note: "Procesamiento multihilo y eventos" },
        { name: "Microservices Patterns", level: 94, note: "Circuit Breakers, Saga, Gateway" },
      ]
    },
    {
      title: "Ingeniería Agéntica & IA",
      description: "Sistemas autónomos corporativos, orquestación LLM y automatización",
      iconName: "Bot",
      skills: [
        { name: "Flujos de Trabajo Agénticos", level: 90, note: "Orquestación multi-agente con validación" },
        { name: "Tool Calling & API Execution", level: 92, note: "Conexión de LLMs con backends corporativos" },
        { name: "Modernización Asistida por IA", level: 94, note: "Traducción de sistemas legacy a código limpio" },
        { name: "Enterprise RAG & Embeddings", level: 88, note: "Búsqueda semántica sobre repositorios corporativos" },
      ]
    },
    {
      title: "Bases de Datos & Almacenamiento",
      description: "Modelado relacional, integridad ACID y rendimiento de consultas críticas",
      iconName: "Database",
      skills: [
        { name: "Oracle Database", level: 94, note: "PL/SQL, indexación avanzada, tuning" },
        { name: "Microsoft SQL Server", level: 92, note: "Optimización de consultas y procedimientos" },
        { name: "PostgreSQL & JPA / Hibernate", level: 90, note: "Persistencia moderna y migraciones" },
        { name: "IBM FileNet", level: 88, note: "Gestión documental y procesos de negocio B2B" },
      ]
    },
    {
      title: "Cloud & DevSecOps",
      description: "Despliegue continuo, contenedores y estándares corporativos certificados",
      iconName: "Cloud",
      skills: [
        { name: "IBM Cloud Certified", level: 90, note: "Certified Advocate - Cloud v2" },
        { name: "IBM Garage Methodology", level: 92, note: "Innovación ágil y prototipado rápido" },
        { name: "Docker & Contenedores", level: 88, note: "Microservicios empaquetados y portables" },
        { name: "Git & Pipelines CI/CD", level: 92, note: "Control de versiones y despliegue continuo" },
      ]
    },
    {
      title: "Frontend & Interfaces Web",
      description: "Experiencias de usuario de alto impacto y comunicación en tiempo real",
      iconName: "Code2",
      skills: [
        { name: "Next.js & React", level: 86, note: "Arquitectura moderna App Router" },
        { name: "JavaScript / TypeScript", level: 88, note: "Tipado estricto e interactividad fluida" },
        { name: "HTML5 & CSS3 Avanzado", level: 92, note: "Sistemas de diseño, Grid y Flexbox" },
        { name: "AJAX & Protocolos Asíncronos", level: 94, note: "Consumo de endpoints en tiempo real" },
      ]
    }
  ] as SkillCategory[],

  futurePortfolio: [
    {
      id: "nexus-agent",
      title: "NexusAgent: Enterprise Workflow Orchestrator",
      tagline: "Malla autónoma multi-agente integrada a microservicios Spring Boot",
      status: "En Desarrollo Activo",
      badgeColor: "cyan",
      category: "Agéntico / IA",
      description:
        "Plataforma agéntica corporativa que permite a modelos de lenguaje avanzados interactuar con APIs transaccionales Java en tiempo real, ejecutando tareas complejas con validación estricta de contratos OpenAPI y trazabilidad auditable.",
      enterpriseContext:
        "Resuelve la desconexión entre modelos de IA y sistemas legacy: cada acción del agente pasa por políticas de seguridad empresariales, idempotencia y registro de auditoría bancaria.",
      architectureDetails: [
        "Core en Java Spring Boot con pasarela de herramientas vía OpenAPI 3.0",
        "Orquestación de agentes con grafos de ejecución y rollback automático en caso de fallo",
        "Soporte para persistencia en PostgreSQL con vectores pgvector para memoria de contexto",
        "Dashboard interactivo en Next.js con métricas de latencia y visualización del árbol de decisiones"
      ],
      techStack: ["Java 21", "Spring Boot", "Next.js", "TypeScript", "LangGraph Pattern", "PostgreSQL", "Docker"],
      metrics: [
        { label: "Auditoría", value: "Cada acción" },
        { label: "Contratos de API", value: "OpenAPI estricto" },
        { label: "Rollback", value: "Automático" }
      ]
    },
    {
      id: "legacy-bridge",
      title: "LegacyBridge: AI Code Modernization Engine",
      tagline: "Traductor agéntico de monolitos y COBOL hacia microservicios modernos",
      status: "Prototipo Agéntico",
      badgeColor: "violet",
      category: "Modernización",
      description:
        "Inspirado en la experiencia directa en Kimberly-Clark y New York Life migrando sistemas heredados. Un pipeline agéntico que analiza código fuente histórico (COBOL, C#, monolitos antiguos), extrae las reglas de negocio canónicas y genera microservicios Java 21 / Spring Boot limpios acompañados de suite de pruebas unitarias automáticas.",
      enterpriseContext:
        "Las grandes instituciones acumulan décadas de lógica de negocio en sistemas difíciles de mantener. LegacyBridge automatiza la extracción de reglas sin perder un solo caso de borde normativo.",
      architectureDetails: [
        "Análisis sintáctico y extracción de árboles AST de archivos heredados",
        "Generador de especificaciones de comportamiento en formato Gherkin/Cucumber",
        "Síntesis automática de controladores y servicios Spring Boot con principios SOLID",
        "Generación autónoma de pruebas con JUnit 5 y Testcontainers"
      ],
      techStack: ["Agentic AST Parsing", "Java 21", "Spring Boot 3", "COBOL Modernization", "JUnit 5", "Next.js"],
      metrics: [
        { label: "Entrada", value: "COBOL · C# · Monolitos" },
        { label: "Salida", value: "Java 21 + Tests" },
        { label: "Validación", value: "Paridad funcional" }
      ]
    },
    {
      id: "fintech-shield",
      title: "FintechShield: Resilient Payment Gateway",
      tagline: "Motor de procesamiento de transacciones financieras de alta disponibilidad",
      status: "Arquitectura Diseñada",
      badgeColor: "emerald",
      category: "Fintech",
      description:
        "Arquitectura de referencia para sistemas bancarios y aseguradores de alto volumen. Combina la robustez de Java empresarial con patrones de resiliencia avanzada (Circuit Breaker, Bulkheading, Outbox Pattern) para procesar pagos y cotizaciones sin pérdida de transacciones.",
      enterpriseContext:
        "Inspirado en los estrictos estándares observados en BNP Paribas Cardif y New York Life: cumplimiento PCI, idempotencia total y tolerancia ante caídas de red de procesadores externos.",
      architectureDetails: [
        "Arquitectura orientada a eventos con Apache Kafka para desacoplamiento total",
        "Patrón Transactional Outbox para asegurar consistencia eventual sin locks distribuidos",
        "Almacenamiento particionado en Oracle / PostgreSQL con lectura réplica",
        "Resiliencia mediante Resilience4j e integración de métricas en tiempo real con Prometheus"
      ],
      techStack: ["Java 21", "Spring Cloud", "Apache Kafka", "Oracle / PostgreSQL", "Resilience4j", "Docker"],
      metrics: [
        { label: "Consistencia", value: "Outbox Pattern" },
        { label: "Resiliencia", value: "Circuit Breaker" },
        { label: "Mensajería", value: "Event-driven" }
      ]
    },
    {
      id: "cognitive-vault",
      title: "CognitiveVault: Enterprise FileNet & Knowledge RAG",
      tagline: "Indexación semántica e inteligencia agéntica sobre repositorios documentales",
      status: "Proof of Concept",
      badgeColor: "amber",
      category: "Agéntico / IA",
      description:
        "Solución inteligente que conecta silos documentales corporativos (como IBM FileNet, carpetas compartidas y almacenes S3) con agentes de consulta en lenguaje natural, permitiendo extraer respuestas instantáneas sobre contratos, pólizas y normativas complejas.",
      enterpriseContext:
        "Aprovecha el conocimiento de más de 5 años administrando incidentes críticos de IBM FileNet para resolver el problema clásico de búsqueda y auditoría en grandes repositorios corporativos.",
      architectureDetails: [
        "Conectores de ingestión para repositorios IBM FileNet P8 y sistemas documentales",
        "Pipeline de fragmentación inteligente respetando la jerarquía legal y cláusulas",
        "Indexación vectorial híbrida (búsqueda densa + BM25) para máxima precisión",
        "Agente de verificación que cita la página y párrafo exacto del documento de origen"
      ],
      techStack: ["IBM FileNet API", "Python / Java Hybrid", "Vector Search", "Spring WebFlux", "Next.js"],
      metrics: [
        { label: "Búsqueda", value: "Híbrida + BM25" },
        { label: "Respuestas", value: "Con cita exacta" },
        { label: "Formatos Soportados", value: "PDF, TIFF, XML, DOCX" }
      ]
    }
  ] as PortfolioProject[]
};
