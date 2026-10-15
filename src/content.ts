// All editable portfolio content lives here.
const env = import.meta.env;
export const site = {
  name: "Abieyuwa Moses Adaze", brand: "MosesLight", biz: "ML Tech",
  email: "mosesabieyuwa155@gmail.com",
  linkedin: "https://linkedin.com/in/moses-adaze-abieyuwa-ba878b363/",
  github: "https://github.com/MosesLight500b",
  repo: "https://github.com/MosesLight500b/veriown",
  whatsapp: String(env.VITE_WHATSAPP_NUMBER ?? "").replace(/\D/g, ""),
  formEndpoint: String(env.VITE_FORM_ENDPOINT ?? ""),
  url: String(env.VITE_SITE_URL ?? ""),
};

/** WhatsApp link when a number is configured, otherwise an email enquiry. */
export function enquiryHref(topic: string): string {
  const text = `Hello, I would like to enquire about: ${topic}`;
  return site.whatsapp
    ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`
    : `mailto:${site.email}?subject=${encodeURIComponent("Enquiry: " + topic)}&body=${encodeURIComponent(text)}`;
}

export type Status = "reported" | "planned";
export const veriown = {
  title: "Design and Implementation of a Hybrid Multi-Category Asset Registry for Secure Ownership Verification and Transfer",
  problem: "Second-hand markets expose buyers and sellers to stolen-property risk, fraudulent ownership claims and unreliable paper receipts, and it is hard to establish a clear ownership history.",
  context: "The original context is Nigeria's second-hand electronics market (phones and laptops, including the Computer Village setting). Other categories such as generators and small vehicles were considered at different planning stages.",
  stack: ["Flutter", "FastAPI", "PostgreSQL", "Alembic", "USSD", "QR codes", "GitHub"],
  features: [
    { name: "Asset registration with a unique platform identifier", status: "reported" as Status },
    { name: "Ownership verification and transfer workflow", status: "reported" as Status },
    { name: "QR code and receipt generation", status: "reported" as Status },
    { name: "Ownership history and audit trail", status: "reported" as Status },
    { name: "USSD access for users without smartphones", status: "planned" as Status },
    { name: "Agent-assisted registration and verification", status: "planned" as Status },
    { name: "Support for generators and small vehicles", status: "planned" as Status },
  ],
};

export const projects = [
  { slug: "veriown", cat: "Software", title: "VeriOwn", tag: "Final-year academic project",
    blurb: "A hybrid asset registry for secure ownership verification and transfer, built with Flutter, FastAPI and PostgreSQL.", to: "/projects/veriown" },
  { slug: "fraezyl", cat: "Infrastructure", title: "Hospitality and business IT deployments", tag: "Practical experience, anonymised",
    blurb: "Hands-on support for hotel software onboarding, wireless networks, CCTV, access control and biometric attendance in real client environments.", to: "/experience" },
];

export const experience = [
  { org: "Fraezyl Solutions Ltd", role: "IT Support Intern / IT Field Engineer", when: "April to October 2025", where: "Lagos, Nigeria",
    note: "Roughly six months of practical exposure. Tasks listed are ones I supported or assisted with unless stated; I do not claim to have designed every network or led every deployment.",
    items: ["Deployment and technical support for hotels, restaurants and business clients",
      "Hotel property management software (iLodge PMS): setup support, user profiles, access permissions and staff training",
      "CCTV, NVR and Power over Ethernet camera systems",
      "Smart door locks, card-based access, intercoms and biometric attendance devices",
      "Wireless access points and connectivity troubleshooting, including Starlink and MAC address whitelisting",
      "MikroTik administration through WinBox and WebFig, under supervision",
      "Remote support with AnyDesk and Google Meet",
      "Technical documentation, system checks and help identifying discrepancies"] },
  { org: "ML Tech / MosesLight Technology", role: "Independent IT Support and Computer Sales", when: "February 2022 to present", where: "Nigeria",
    note: "An independent technology brand, not a registered company.",
    items: ["Computer sales, repairs and accessories", "Troubleshooting and user support", "CCTV and security-system services", "Smart locks and access control"] },
];

export const skills = [
  { group: "IT support", items: [["Computer troubleshooting and maintenance", "Practical Experience"], ["Remote user support", "Practical Experience"], ["Business software onboarding and training", "Practical Experience"]] },
  { group: "Networking", items: [["MikroTik RouterOS (WinBox, WebFig)", "Practical Experience"], ["Wireless access points, Starlink, MAC whitelisting", "Practical Experience"], ["Networking fundamentals", "Working Knowledge"]] },
  { group: "Security and access systems", items: [["CCTV, NVR and PoE cameras", "Practical Experience"], ["Smart locks and card access", "Practical Experience"], ["Intercom and biometric attendance", "Practical Experience"]] },
  { group: "Software and data", items: [["Python and FastAPI", "Project Experience"], ["Flutter and Dart", "Project Experience"], ["PostgreSQL and Alembic migrations", "Project Experience"], ["REST APIs, Git and GitHub", "Working Knowledge"]] },
  { group: "Currently developing", items: [["Cybersecurity and secure deployment", "Currently Developing"], ["Role-based access control and audit logging", "Currently Developing"], ["Business automation and AI-assisted workflows", "Currently Developing"]] },
];

export const services = [
  { id: "it", title: "IT Support and Technology Services", state: "Offered",
    text: "Computer sales, repairs and accessories, troubleshooting, user support and small-business technology help.", to: "/contact" },
  { id: "cctv", title: "CCTV and Access Control", state: "Offered",
    text: "Camera systems, smart door locks and related access infrastructure for homes and businesses.", to: "/contact" },
  { id: "student", title: "Student Clearance and Administrative Assistance", state: "Serving clients",
    text: "Guidance through university administrative procedures, including clearance and transcript applications.", to: "/services/student-assistance" },
  { id: "academic", title: "MLTech Academic and Research Support", state: "Serving clients",
    text: "Research guidance, editing, formatting and presentation preparation for students who do their own work.", to: "/services/academic-support" },
];

/** Add real photos to public/images and list them here. Nothing is shown until you do. */
export const images = {
  portrait: "" as string, // e.g. "/images/moses.jpg"
  work: [] as { src: string; alt: string; caption: string }[],
};

// ---- Business content (edit freely) ----
export const studentServices = [
  { title: "Clearance assistance", text: "Understand the clearance procedure, identify outstanding requirements, organise supporting documents and follow up through legitimate channels where agreed.", note: "The fee pays for assistance, not for a guaranteed institutional decision." },
  { title: "Hostel-related administrative help", text: "Find the right office and documentation for accommodation-related procedures.", note: "I do not control room allocation or guarantee accommodation." },
  { title: "Admission-office administrative help", text: "Understand relevant processes and prepare appropriate documents for legitimate enquiries.", note: "I cannot influence admission decisions or alter records." },
  { title: "Student affairs assistance", text: "Procedural help with student-related requests: the steps involved and organising the information needed." },
  { title: "Transcript application and follow-up", text: "Understand the application procedure, organise documents and follow up where authorised.", note: "Official transcripts are issued by the institution. I assist with the process only." },
  { title: "Letters and authorisation documents", text: "Help organising application letters, authorisation letters and similar correspondence.", note: "Documents must be truthful and properly authorised. No forged signatures or fabricated records." },
];
export const studentProcess: [string, string][] = [
  ["Enquiry", "You explain the administrative task."], ["Assessment", "I clarify the request, the procedure and the documents needed."],
  ["Quotation", "You receive the scope, fee, exclusions and any expected third-party charges."], ["Authorisation", "Where I act for you or collect documents, appropriate permission and identification are obtained."],
  ["Delivery", "I carry out the agreed assistance through legitimate channels."], ["Follow-up", "I share updates and flag outstanding requirements."],
  ["Closure", "I deliver the agreed service or explain any issue outside my control."],
];
export const academicServices = [
  { title: "Final-year project support", items: ["Topic refinement and scope", "Problem and objectives review", "Proposal structure", "Literature-search help", "Methodology guidance", "Editing and formatting", "Citation review"] },
  { title: "Seminar research and preparation", items: ["Topic clarification", "Research planning", "Organising main arguments", "Document formatting", "Proofreading", "Slide preparation"] },
  { title: "Research proposal assistance", items: ["Background and problem statement", "Objectives and research questions", "Significance and scope", "Proposed methodology"] },
  { title: "Writing, editing and proofreading", items: ["Grammar and clarity", "Section organisation", "Consistent headings", "Table of contents and page numbers", "Reference lists"] },
  { title: "Formatting and document organisation", items: ["Layout to your institution's guide", "Tables and figures", "Page numbering", "Consistency checks"] },
  { title: "Presentation and defence preparation", items: ["Seminar or defence slides", "Presentation outline", "Speaker notes"] },
];
export const academicProcess: [string, string][] = [
  ["Visit and choose", "Pick the service you need."], ["Describe", "Give a short description of the request."], ["Review", "I review it and clarify the scope."],
  ["Quote", "We agree a quotation and timeline."], ["Confirm", "You confirm the engagement."], ["Deliver", "I deliver the agreed service."], ["Revisions", "Included revisions and follow-up are handled as agreed."],
];
export interface Pkg { service: string; name: string; price: string; scope: string[]; deliverables: string[]; clientResponsibilities: string[]; turnaround: string; revisionPolicy: string; exclusions: string[]; additionalCharges: string; confirmed: boolean }
/** Add packages here and set confirmed: true to publish them. Empty means "Request a quotation" is shown. */
export const packages: Pkg[] = [];
export interface CaseStudy { id: string; title: string; business: "student" | "academic"; context: string; challenge: string; scope: string; work: string[]; deliverables: string[]; outcome?: string; evidence?: { src: string; alt: string }; permission: "approved" | "pending" | "private"; confidentiality: string }
/** Only entries with permission "approved" are shown. Remove identifying details first (including document metadata). */
export const caseStudies: CaseStudy[] = [];
