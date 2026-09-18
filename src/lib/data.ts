export const portfolioData = {
  personal: {
    name: "Mohamed Ahmed Romy",
    title: "Mechatronics Engineer & Full-Stack Developer",
    summary: "High-caliber Mechatronics Engineering student with a 3.6/4.0 CGPA. A dual-certified SOLIDWORKS Professional (CSWP/CSWA) with a specialized focus on Hardware-Software Co-design. Expert in architecting distributed automation ecosystems utilizing Django 5.2, Asynchronous Task Queues, and Generative AI (LLMs).",
    email: "romememo541@gmail.com",
    phone: "+20 103 066 3478",
    linkedin: "https://www.linkedin.com/in/mohamed-ahmed-romy-811198323",
    github: "https://github.com/memo-123-code"
  },
  education: {
    university: "Zagazig National University, Egypt",
    degree: "Bachelor of Mechatronics Engineering",
    duration: "2023 – Present",
    gpa: "3.6/4.0"
  },
  skills: {
    mechanical: ["SOLIDWORKS (CSWP/CSWA)", "DFM/DFA", "FEA", "CFD", "Solar PV Design"],
    software: ["Django 5.2", "DRF", "WebSockets", "Celery", "Redis", "PostgreSQL", "Next.js"],
    automation: ["Siemens TIA Portal", "S7-1200/1500", "HMI/SCADA", "Classic Control"],
    ai: ["LLM Integration (Groq, Google GenAI)", "Pandas", "NumPy", "Python Automation"]
  },
  projects: [
    {
      title: "QuickHandy",
      category: "WEB DEV",
      description: "A comprehensive digital platform for maintenance and home services. Features real-time tracking, live dispatch engines, and secure eKYC logic for service providers.",
      images: ["/images/quickhandy.jpeg"]
    },
    {
      title: "Cortex",
      category: "WEB DEV",
      description: "A professional digital transformation and business operations system designed for advanced operational tracking and ecosystem management.",
      images: ["/images/cortex.png"]
    },
    {
      title: "Unified Mechatronics System Platform (ZNUE-Portal)",
      category: "WEB DEV",
      description: "A high-availability portal for mechatronics students utilizing Django 5.2, Redis/Celery task queues, and an integrated AI RAG system.",
      images: ["/images/znue-portal.jpeg"]
    },
    {
      title: "Mechatronics Data",
      category: "WEB DEV",
      description: "An academic assistance and curriculum guide platform tailored specifically for Mechatronics Engineering students at Zagazig National University.",
      images: ["/images/mechatronics-data.jpeg"]
    },
    {
      title: "Romex Smart Home",
      category: "AUTOMATION",
      description: "A comprehensive IoT smart home dashboard monitoring indoor climate, device status, overall security, and daily energy consumption.",
      images: ["/images/romex.jpeg"]
    }
  ],
  experience: [
    {
      role: "Industrial Maintenance & Diagnostics Intern",
      company: "Mantrac Egypt Summer Training",
      date: "Jul 2025",
      description: "Conducted hardware-level diagnostics on Caterpillar ECUs, interpreting CAN-bus data.",
      images: ["/images/mantrac.jpg"]
    },
    {
      role: "Systems Engineering & Control Intern",
      company: "HA Consulting Group",
      date: "Summer 2024",
      description: "Intensive hands-on training in Classic Control, Siemens PLC Basic Programming, and Motor Drives.",
      images: ["/images/ha-1.jpg", "/images/ha-2.jpg", "/images/ha-3.jpg", "/images/ha-4.jpg"]
    },
    {
      role: "Automotive Mechanical & Electrical Diploma",
      company: "Engovation & InstaFix",
      date: "2024",
      description: "Comprehensive training in automotive diagnostics and electrical systems.",
      images: ["/images/auto-1.jpg", "/images/auto-2.jpg", "/images/auto-3.jpg"]
    }
  ],
  certifications: [
    { name: "SOLIDWORKS CAD Design Professional (CSWP)", issuer: "Dassault Systèmes", images: ["/images/cswp.jpg"] },
    { name: "SOLIDWORKS Design Associate (CSWA)", issuer: "Dassault Systèmes", images: ["/images/cswa.jpg"] },
    { name: "3DSwymer Associate", issuer: "Dassault Systèmes", images: ["/images/3dswymer.jpg"] },
    { name: "Build with AI", issuer: "Google & ITI", images: ["/images/build-with-ai.jpg"] },
    { name: "Classic Control", issuer: "Ministry of Industry", images: ["/images/classic-control.jpg"] },
    { name: "Solidworks Training", issuer: "Engovation", images: ["/images/engovation-1.jpg", "/images/engovation-2.jpg"] },
    { name: "Cable Manufacturing Technology", issuer: "Elsewedy", images: ["/images/elsewedy-1.jpg"] },
    { name: "C++ Programming Internship", issuer: "CodeAlpha", images: ["/images/codealpha.jpg"] }
  ],
  workshops: [
    { name: "SWUGN & Dassault Events & Workshops", issuer: "Dassault Systèmes", images: ["/images/sw-event-1.jpg", "/images/sw-event-2.jpg", "/images/sw-event-3.jpg", "/images/sw-event-4.jpg", "/images/sw-event-5.jpg", "/images/sw-event-6.jpg", "/images/sw-event-7.jpg", "/images/sw-event-8.jpg"] },
    { name: "Achievement & Hackathon", issuer: "Zagazig University", images: ["/images/zagazig-1.jpg", "/images/zagazig-2.jpg"] }
  ]
};
