import { useEffect, useRef, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { site, services, enquiryHref } from "./content";

export function toggleTheme() {
  const el = document.documentElement;
  const dark = el.dataset.theme ? el.dataset.theme === "dark" : !matchMedia("(prefers-color-scheme: light)").matches;
  el.dataset.theme = dark ? "light" : "dark";
  try { localStorage.setItem("theme", el.dataset.theme); } catch { /* ignore */ }
}
export async function copyText(t: string) { try { await navigator.clipboard.writeText(t); return true; } catch { return false; } }
export function downloadCard() {
  const v = `BEGIN:VCARD\nVERSION:3.0\nFN:${site.name}\nNICKNAME:${site.brand}\nTITLE:IT Support, Networking and Software\nEMAIL:${site.email}\nURL:${site.linkedin}\nEND:VCARD\n`;
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([v], { type: "text/vcard" })); a.download = "Moses-Adaze.vcf"; a.click(); URL.revokeObjectURL(a.href);
}

export function Photo({ src, alt, cls }: { src: string; alt: string; cls?: string }) {
  const [bad, setBad] = useState(false);
  return bad ? null : <img className={cls} src={src} alt={alt} loading="lazy" onError={() => setBad(true)} />;
}

const P: Record<string, string> = {
  it: "M4 6h16v10H4zM8 20h8M12 16v4",
  cctv: "M3 8l12-3 2 6-12 3zM17 11l4 1M9 17v3",
  student: "M12 4l9 4-9 4-9-4zM7 11v5c3 2 7 2 10 0v-5",
  academic: "M5 4h10a3 3 0 013 3v13H8a3 3 0 01-3-3zM9 8h5M9 12h5",
};
export const Icon = ({ k }: { k: string }) =>
  <svg className="ico" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={P[k] ?? P.it} /></svg>;

export function HeroArt() {
  const N = (x: number, y: number, l: string, d: string) => (
    <g transform={`translate(${x} ${y})`}><rect x="-36" y="-36" width="72" height="72" rx="18" className="nbox" />
      <path d={d} transform="translate(-12 -12)" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <text y="58" textAnchor="middle" className="nlab">{l}</text></g>);
  const W = (d: string, i: number) => <path key={i} d={d} className="wire" pathLength={1} style={{ animationDelay: `${0.15 * i}s` }} />;
  return (
    <svg viewBox="0 0 520 440" role="img" aria-label="Illustration of a router connected to access points, cameras, a smart lock, a recorder and a phone" className="heroart">
      {["M260 210L110 95", "M260 210L410 95", "M260 210L440 300", "M260 210L260 360", "M260 210L80 300"].map(W)}
      <g className="core" transform="translate(260 210)"><circle r="54" className="ring" /><circle r="38" className="nbox" />
        <path d="M-14 6h28v8h-28zM-8 6v-10M8 6v-10M-18 -14a22 22 0 0136 0" transform="translate(0 -2)" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" /></g>
      {N(110, 95, "Wireless access", "M2 9a14 14 0 0120 0M6 13a8 8 0 0112 0M10 17a3 3 0 014 0M12 21h.01")}
      {N(410, 95, "NVR recorder", "M2 6h20v12H2zM6 10h6M6 14h3M18 12h.01")}
      {N(440, 300, "CCTV camera", "M2 8l13-4 2 7-13 4zM17 11l5 1M8 19v3")}
      {N(260, 360, "Smart lock", "M5 11h14v10H5zM8 11V7a4 4 0 018 0v4M12 15v2")}
      {N(80, 300, "USSD phone", "M7 2h10v20H7zM11 18h2")}
    </svg>
  );
}

export function ArchDiagram() {
  const B = (x: number, y: number, t: string, planned = false) => (
    <g><rect x={x} y={y} width="150" height="56" rx="12" className={planned ? "abox plan" : "abox"} /><text x={x + 75} y={y + 34} textAnchor="middle" className="alab">{t}</text></g>);
  return (
    <figure className="arch">
      <svg viewBox="0 0 640 250" role="img" aria-label="Architecture: Flutter app and planned USSD gateway call a FastAPI backend that stores data in PostgreSQL">
        {B(10, 20, "Flutter app")}{B(10, 150, "USSD gateway", true)}{B(245, 85, "FastAPI backend")}{B(480, 85, "PostgreSQL")}
        <path d="M160 48L245 100M160 178L245 130M395 113H480" className="awire" /><path d="M160 178L245 130" className="awire plan" />
        <text x="320" y="200" textAnchor="middle" className="alab small">Alembic migrations · QR identifiers · audit trail</text>
      </svg>
      <figcaption className="cap">Dashed box: planned, not yet demonstrated.</figcaption>
    </figure>
  );
}

const MENU = "Asset Registry\n1. Register an asset\n2. Verify ownership\n3. Transfer ownership\n4. My assets";
export function UssdSim() {
  const [scr, setScr] = useState(MENU); const [mode, setMode] = useState("menu"); const [v, setV] = useState("");
  const send = (e: FormEvent) => {
    e.preventDefault(); const t = v.trim().toUpperCase(); setV("");
    if (mode === "menu") {
      if (t === "1") { setScr("Register an asset\nRegistration is completed in the mobile app or with an agent.\n0. Back"); setMode("info"); }
      else if (t === "2") { setScr("Verify ownership\nEnter asset ID\n(try VO-1001)"); setMode("verify"); }
      else if (t === "3") { setScr("Transfer ownership\nThe current owner approves first, then the new owner confirms.\n0. Back"); setMode("info"); }
      else if (t === "4") { setScr("My assets\n1. Sample phone (VO-1001)\n0. Back"); setMode("info"); }
      else setScr("Invalid choice.\n" + MENU);
    } else if (mode === "verify") {
      setScr(t === "VO-1001" ? "VO-1001\nPhone (sample)\nStatus: Registered\nNo transfer disputes on record\n0. Back" : "Asset ID not found.\n0. Back"); setMode("info");
    } else if (t === "0") { setScr(MENU); setMode("menu"); }
  };
  return (
    <div className="sim">
      <form className="phone" onSubmit={send}>
        <pre className="screen" aria-live="polite">{scr}</pre>
        <label className="sr" htmlFor="ussd">Reply</label>
        <div className="reply"><input id="ussd" value={v} onChange={e => setV(e.target.value)} placeholder="Reply" autoComplete="off" /><button className="btn" type="submit">Send</button></div>
      </form>
      <div><p>Try it: choose <b>2</b>, then enter <b>VO-1001</b>. Enter <b>0</b> to go back.</p>
        <p className="muted">This is a simulation with sample data to show the intended access flow. It is not connected to the live system, and the USSD channel is still planned.</p>
        <button type="button" className="btn ghost" onClick={() => { setScr(MENU); setMode("menu"); }}>Reset</button></div>
    </div>
  );
}

export function Wizard() {
  const [step, setStep] = useState(0);
  const [d, setD] = useState({ svc: services[0].title, name: "", city: "", need: "" });
  const [err, setErr] = useState("");
  const next = () => {
    if (step === 1 && (!d.name.trim() || d.need.trim().length < 10)) { setErr("Enter your name and describe what you need (at least 10 characters)."); return; }
    setErr(""); setStep(s => s + 1);
  };
  const topic = `${d.svc}. Name: ${d.name}. Location: ${d.city || "not given"}. Details: ${d.need}`;
  return (
    <div className="card wiz">
      <p className="muted">Step {step + 1} of 3</p>
      {step === 0 && <fieldset><legend>What do you need?</legend>{services.map(s => <label key={s.id} className="opt"><input type="radio" name="svc" checked={d.svc === s.title} onChange={() => setD({ ...d, svc: s.title })} /> {s.title}</label>)}</fieldset>}
      {step === 1 && <div className="stack">
        <div><label htmlFor="w-n">Your name</label><input id="w-n" value={d.name} onChange={e => setD({ ...d, name: e.target.value })} autoComplete="name" /></div>
        <div><label htmlFor="w-c">City or location</label><input id="w-c" value={d.city} onChange={e => setD({ ...d, city: e.target.value })} /></div>
        <div><label htmlFor="w-d">What do you need?</label><textarea id="w-d" rows={4} value={d.need} onChange={e => setD({ ...d, need: e.target.value })} /></div></div>}
      {step === 2 && <div><h3>Review</h3><p><b>Service:</b> {d.svc}</p><p><b>Name:</b> {d.name}</p><p><b>Location:</b> {d.city || "Not given"}</p><p><b>Details:</b> {d.need}</p>
        <p className="muted">Pricing is confirmed with you directly. Sending opens {site.whatsapp ? "WhatsApp" : "your email app"} with this message ready.</p></div>}
      {err && <p className="fe" role="alert">{err}</p>}
      <div className="cta">{step > 0 && <button type="button" className="btn ghost" onClick={() => setStep(s => s - 1)}>Back</button>}
        {step < 2 ? <button type="button" className="btn" onClick={next}>Continue</button> : <a className="btn" href={enquiryHref(topic)} {...(site.whatsapp ? { target: "_blank", rel: "noopener" } : {})}>Send enquiry</a>}</div>
    </div>
  );
}

export function ScrollBar() {
  const [w, setW] = useState(0);
  useEffect(() => { const f = () => { const h = document.documentElement; setW(h.scrollHeight > h.clientHeight ? (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100 : 0); };
    addEventListener("scroll", f, { passive: true }); return () => removeEventListener("scroll", f); }, []);
  return <div className="prog" style={{ width: w + "%" }} aria-hidden="true" />;
}

export function Palette() {
  const nav = useNavigate(); const [open, setOpen] = useState(false); const [q, setQ] = useState(""); const [i, setI] = useState(0); const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const k = (e: KeyboardEvent) => { if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setOpen(o => !o); } if (e.key === "Escape") setOpen(false); };
    const o = () => setOpen(true); addEventListener("keydown", k); addEventListener("open-palette", o);
    return () => { removeEventListener("keydown", k); removeEventListener("open-palette", o); };
  }, []);
  useEffect(() => { if (open) { setQ(""); setI(0); setTimeout(() => ref.current?.focus(), 0); } }, [open]);
  const acts: [string, () => void][] = [
    ...([["Home", "/"], ["About", "/about"], ["Projects", "/projects"], ["VeriOwn case study", "/projects/veriown"], ["Experience", "/experience"], ["Services", "/services"], ["Business portfolio", "/business"], ["Student assistance", "/services/student-assistance"], ["Academic support", "/services/academic-support"], ["Skills", "/skills"], ["Contact", "/contact"]] as [string, string][]).map(([l, to]) => ["Go to " + l, () => nav(to)] as [string, () => void]),
    ["Switch theme", toggleTheme], ["Copy email address", () => { void copyText(site.email); }], ["Download contact card", downloadCard], ["Open LinkedIn", () => window.open(site.linkedin, "_blank", "noopener")]];
  const list = acts.filter(([l]) => l.toLowerCase().includes(q.toLowerCase()));
  const run = (a?: [string, () => void]) => { if (a) { setOpen(false); a[1](); } };
  if (!open) return null;
  return (
    <div className="pal" onMouseDown={e => { if (e.target === e.currentTarget) setOpen(false); }}>
      <div className="pbox" role="dialog" aria-modal="true" aria-label="Quick actions">
        <input ref={ref} value={q} placeholder="Search pages and actions" aria-label="Search pages and actions" onChange={e => { setQ(e.target.value); setI(0); }}
          onKeyDown={e => { if (e.key === "ArrowDown") { e.preventDefault(); setI(x => Math.min(x + 1, list.length - 1)); } if (e.key === "ArrowUp") { e.preventDefault(); setI(x => Math.max(x - 1, 0)); } if (e.key === "Enter") run(list[i]); }} />
        <ul role="listbox">{list.length ? list.map((a, n) => <li key={a[0]} role="option" aria-selected={n === i} className={n === i ? "on" : ""} onMouseEnter={() => setI(n)} onClick={() => run(a)}>{a[0]}</li>) : <li>No matches</li>}</ul>
        <p className="muted small">Ctrl or Cmd + K to open. Esc to close.</p>
      </div>
    </div>
  );
}

export function EnquiryForm({ id, topics }: { id: string; topics: string[] }) {
  const [st, setSt] = useState<"idle" | "sending" | "done" | "fail">("idle"); const [msg, setMsg] = useState(""); const [err, setErr] = useState<Record<string, string>>({});
  async function go(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); const f = e.currentTarget; const d = new FormData(f);
    const v = { name: String(d.get("name") ?? "").trim(), email: String(d.get("email") ?? "").trim(), topic: String(d.get("topic") ?? ""), message: String(d.get("message") ?? "").trim() };
    const x: Record<string, string> = {};
    if (!v.name) x.name = "Enter your name."; if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) x.email = "Enter a valid email address."; if (v.message.length < 10) x.message = "Describe your request in at least 10 characters.";
    setErr(x); if (Object.keys(x).length) return;
    if (!site.formEndpoint) { location.href = `mailto:${site.email}?subject=${encodeURIComponent(v.topic + " enquiry from " + v.name)}&body=${encodeURIComponent(v.message + "\n\nFrom: " + v.name + " (" + v.email + ")")}`; setSt("done"); setMsg("Your email app should now open with the message ready. Nothing is sent until you press send there."); return; }
    setSt("sending");
    try { const r = await fetch(site.formEndpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(v) }); if (!r.ok) throw new Error(); setSt("done"); setMsg("Message sent. I will reply by email with questions or a quotation."); f.reset(); }
    catch { setSt("fail"); setMsg(`Could not send. Please email ${site.email} directly.`); }
  }
  const E = (k: string) => err[k] ? <p className="fe" id={`${id}-${k}-e`}>{err[k]}</p> : null;
  return (
    <form onSubmit={go} noValidate className="card wiz">
      <div><label htmlFor={`${id}-name`}>Your name</label><input id={`${id}-name`} name="name" autoComplete="name" aria-invalid={!!err.name} />{E("name")}</div>
      <div><label htmlFor={`${id}-email`}>Your email</label><input id={`${id}-email`} name="email" type="email" autoComplete="email" aria-invalid={!!err.email} />{E("email")}</div>
      <div><label htmlFor={`${id}-topic`}>What do you need help with?</label><select id={`${id}-topic`} name="topic">{topics.map(t => <option key={t}>{t}</option>)}</select></div>
      <div><label htmlFor={`${id}-message`}>Briefly describe your request</label><textarea id={`${id}-message`} name="message" rows={4} aria-invalid={!!err.message} />{E("message")}</div>
      <p className="muted small">Please do not send matriculation numbers, ID documents, passwords or private records here. I will ask for only what is needed once we agree the scope.</p>
      <button className="btn" type="submit" disabled={st === "sending"}>{st === "sending" ? "Sending..." : "Send enquiry"}</button>
      <p role="status" aria-live="polite" className={st === "fail" ? "fe" : "ok"}>{msg}</p>
    </form>
  );
}
