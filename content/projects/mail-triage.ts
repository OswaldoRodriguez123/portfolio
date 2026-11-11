import type { Project } from "@/content/types";

export const project: Project = {
  slug: "mail-triage",
  year: 2026,
  stack: [
    "Python",
    "Microsoft Graph",
    "SQLite",
    "OpenCode",
    "Keychain",
  ],
  links: {
    repo: "https://github.com/OswaldoRodriguez123/mail-triage",
  },
  featured: true,
  en: {
    title: "mail-triage — Junk mail triage CLI",
    tagline:
      "A local CLI that sorts your junk mail into delete, rescue or review — with reasons.",
    role: "Solo developer — CLI, classifier and OpenCode skill",
    problem: [
      "My junk mail folder fills with two very different populations: scams impersonating banks and Microsoft, and legitimate promotions I actually subscribed to. Deleting everything risks losing the receipt I was waiting for; ignoring the folder means the real phishing hides among the discount codes.",
      "Provider-side spam filters give a binary answer and no reason, and cloud mail cleaners want full mailbox access. I wanted a local tool that classifies each message, tells me why, and never moves anything without my confirmation.",
    ],
    approach: [
      {
        title: "Local-first, no cloud services",
        body: [
          "Everything runs on Python's standard library plus SQLite and macOS Keychain, storing decisions and learning from my corrections on disk. Nothing leaves the machine.",
          "I rejected cloud mail-cleaning services: they require root access to the mailbox over OAuth or password, and the data they see is more sensitive than the problem warrants.",
        ],
      },
      {
        title: "A classifier with explicit reasons",
        body: [
          "Every message gets a 0–1 risk score and a human-readable reason: suspected impersonation, a reply-to different from the sender, a brand-new domain, SPF/DKIM failures, urgency cues. Legitimate mail rescued to the inbox prints why it was rescued.",
          "I rejected a black-box model: without reasons I cannot audit false positives, and one wrong auto-delete teaches you never to trust the tool again.",
        ],
      },
      {
        title: "Human-in-the-loop, learning from corrections",
        body: [
          "Nothing is deleted or moved without an explicit confirmation, and `undo` reverses the last batch. Corrections feed allowed/blocked domain lists; a domain gets an automatic rule only after three matching explicit corrections.",
          "I rejected automatic deletion: the cost of a mistake (losing a receipt, an appointment, a contract) is asymmetric, so the design keeps a human as the final gate.",
        ],
      },
      {
        title: "Provider-agnostic core, one backend today",
        body: [
          "The engine talks to a `MailProvider` interface; only Outlook (Microsoft Graph, device-code flow) is implemented today, with Gmail and generic IMAP ready to plug in without touching the classifier. `scan`, `purge`, `undo` and `feedback` all accept `--provider`.",
          "I rejected hard-wiring Graph into the classifier: the triage logic should not change when the transport does.",
        ],
      },
    ],
    results: [
      "Open-sourced with CI tests (GitHub Actions) and an OpenCode skill wrapping the CLI for interactive use.",
      "Every triage run produces an auditable report: score and reason per message, and full undo for any batch.",
      "TODO(metric): messages triaged / false-positive rate",
    ],
  },
  es: {
    title: "mail-triage — Triaje de correo basura",
    tagline:
      "Un CLI local que ordena tu correo basura en borrar, rescatar o revisar — con razones.",
    role: "Desarrollo completo — CLI, clasificador y skill de OpenCode",
    problem: [
      "Mi carpeta de correo basura se llena de dos poblaciones muy distintas: estafas que suplantan bancos y a Microsoft, y promociones legítimas a las que sí estoy suscrito. Borrar todo arriesga perder el comprobante que estaba esperando; ignorar la carpeta deja el phishing real escondido entre los códigos de descuento.",
      "Los filtros del proveedor dan una respuesta binaria y sin motivo, y los limpiadores de correo en la nube quieren acceso completo al buzón. Quería una herramienta local que clasifique cada mensaje, diga por qué y nunca mueva nada sin mi confirmación.",
    ],
    approach: [
      {
        title: "Local-first, sin servicios en la nube",
        body: [
          "Todo corre sobre la biblioteca estándar de Python más SQLite y Keychain de macOS, guardando decisiones y aprendiendo de mis correcciones en disco. Nada sale de la máquina.",
          "Descarté los servicios de limpieza de correo en la nube: exigen acceso total al buzón vía OAuth o contraseña, y los datos que ven son más sensibles de lo que el problema justifica.",
        ],
      },
      {
        title: "Un clasificador con razones explícitas",
        body: [
          "Cada mensaje recibe un puntaje de riesgo 0–1 y una razón legible: posible suplantación de marca, reply-to distinto del remitente, dominio registrado hace días, fallos SPF/DKIM, urgencia. El correo legítimo rescatado a la bandeja de entrada imprime por qué fue rescatado.",
          "Descarté un modelo de caja negra: sin razones no puedo auditar falsos positivos, y un solo auto-borrado equivocado te enseña a nunca volver a confiar en la herramienta.",
        ],
      },
      {
        title: "Humano en el bucle, aprendiendo de correcciones",
        body: [
          "Nada se borra ni se mueve sin una confirmación explícita, e `undo` revierte el último lote. Las correcciones alimentan listas de dominios permitidos/bloqueados; un dominio recibe una regla automática solo tras tres correcciones explícitas coincidentes.",
          "Descarté el borrado automático: el costo de un error (perder un comprobante, una cita, un contrato) es asimétrico, por lo que el diseño mantiene a un humano como puerta final.",
        ],
      },
      {
        title: "Núcleo agnóstico del proveedor, un backend hoy",
        body: [
          "El motor habla con una interfaz `MailProvider`; solo Outlook (Microsoft Graph, device-code flow) está implementado hoy, con Gmail e IMAP listos para enchufarse sin tocar el clasificador. `scan`, `purge`, `undo` y `feedback` aceptan `--provider`.",
          "Descarté acoplar Graph al clasificador: la lógica de triaje no debería cambiar cuando cambia el transporte.",
        ],
      },
    ],
    results: [
      "Publicado en GitHub con tests en CI (GitHub Actions) y una skill de OpenCode que envuelve el CLI para uso interactivo.",
      "Cada corrida produce un informe auditable: puntaje y razón por mensaje, y undo completo de cualquier lote.",
      "TODO(metric): mensajes triados / tasa de falsos positivos",
    ],
  },
};
