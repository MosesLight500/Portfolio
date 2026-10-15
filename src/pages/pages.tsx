import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { site, enquiryHref, veriown, projects, experience, skills, services, images, studentServices, studentProcess, academicServices, academicProcess, packages, caseStudies } from "../content";
import { HeroArt, Photo, Icon, UssdSim, ArchDiagram, Wizard, EnquiryForm, downloadCard, copyText } from "../extras";

function Page({ title, desc, children }: { title: string; desc: string; children: ReactNode }) {
  useEffect(() => {
    document.title = `${title} | ${site.name}`;
    let m = document.querySelector('meta[name="description"]');
    if (!m) { m = document.createElement("meta"); m.setAttribute("name", "description"); document.head.appendChild(m); }
    m.setAttribute("content", desc);
    if (site.url) {
      let l = document.querySelector('link[rel="canonical"]');
      if (!l) { l = document.createElement("link"); l.setAttribute("rel", "canonical"); document.head.appendChild(l); }
      l.setAttribute("href", site.url.replace(/\/$/, "") + location.pathname);
    }
    window.scrollTo(0, 0);
  }, [title, desc]);
  return <>{children}</>;
}
const Sec = ({ title, children, alt }: { title?: string; children: ReactNode; alt?: boolean }) =>
  <section className={alt ? "alt" : ""}><div className="wrap">{title && <h2>{title}</h2>}{children}</div></section>;
const Hero = ({ h, p }: { h: string; p: string }) =>
  <section className="pagehead"><div className="wrap"><h1>{h}</h1><p className="lede">{p}</p></div></section>;
const Ext = ({ href, children }: { href: string; children: ReactNode }) => <a href={href} rel="noopener" target="_blank">{children}</a>;
const Enquire = ({ topic, label = "Send an enquiry" }: { topic: string; label?: string }) =>
  <a className="btn" href={enquiryHref(topic)} {...(site.whatsapp ? { target: "_blank", rel: "noopener" } : {})}>{label}</a>;

export function Home() {
  return (
    <Page title="Home" desc="First Class Computer Science and IT graduate with hands-on IT support, networking, security systems and software project experience.">
      <section className="hero"><div className="wrap herogrid"><div>
        <h1>Abieyuwa Moses Adaze</h1>
        <p className="role">Computer Science and IT graduate. IT support, networking and software.</p>
        <p className="lede">I have supported hotel and business IT environments in Lagos, built a final-year asset registry system with Flutter, FastAPI and PostgreSQL, and run ML Tech, an independent IT services brand.</p>
        <div className="cta"><Link className="btn" to="/projects">View projects</Link><Link className="btn ghost" to="/services">Explore services</Link><Link className="btn ghost" to="/contact">Contact me</Link></div></div>
        <div className="art"><HeroArt /><p className="cap">Illustration of the kinds of systems I support</p></div>
      </div></section>
      <Sec title="Featured project" alt>
        <article className="card"><h3>VeriOwn</h3><p className="muted">Final-year academic project</p>
          <p>{veriown.problem}</p><ul className="tags">{veriown.stack.map(s => <li key={s}>{s}</li>)}</ul>
          <p><Link className="btn" to="/projects/veriown">Read the case study</Link></p></article>
      </Sec>
      <Sec title="Practical IT experience">
        <div className="grid2">{experience.map(e => <article className="card" key={e.org}><h3>{e.role}</h3><p className="muted">{e.org}, {e.when}</p><ul>{e.items.slice(0, 4).map(i => <li key={i}>{i}</li>)}</ul></article>)}</div>
        <p><Link to="/experience">Full experience</Link></p>
      </Sec>
      <Sec title="Skills at a glance" alt>
        <ul className="tags">{skills.flatMap(g => g.items.slice(0, 2)).map(([n]) => <li key={n}>{n}</li>)}</ul>
        <p><Link to="/skills">Skills with honest proficiency labels</Link></p>
      </Sec>
      <Sec title="What I offer">
        <div className="grid2">{services.map(s => <article className="card" key={s.id}><Icon k={s.id} /><h3>{s.title}</h3><span className="badge">{s.state}</span><p>{s.text}</p><Link to={s.to}>Learn more</Link></article>)}</div>
      </Sec>
      <Sec title="Entrepreneurship & Client Services" alt>
        <p>Alongside technical work, I run independent services for students and small clients. Each answers a different need, and I have served paying clients in the two student services.</p>
        <div className="grid2">{services.filter(s => s.id !== "cctv").map(s => <article className="card" key={s.id}><Icon k={s.id} /><h3>{s.title}</h3><p>{s.text}</p><Link to={s.to}>Learn more</Link></article>)}</div>
        <p><Link to="/business">How the businesses fit together</Link></p>
      </Sec>
      <Sec><h2>Let us talk</h2><p>Open to IT support, junior software and networking roles, and to clients who need technology help.</p><Link className="btn" to="/contact">Contact me</Link></Sec>
    </Page>
  );
}

export function About() {
  return (
    <Page title="About" desc="Education, career journey and approach of Abieyuwa Moses Adaze, a First Class Computer Science and IT graduate.">
      <Hero h="About me" p="An early-career technology professional who learns by deploying, fixing and building real systems." />
      <Sec>
        {images.portrait && <Photo src={images.portrait} alt="Portrait of Abieyuwa Moses Adaze" cls="portrait" />}<p>I am Abieyuwa Moses Adaze, known online as MosesLight. I started in computer sales and repair, moved into field IT support for hospitality clients, built a software project as part of my degree, and have served paying clients through two independent student-focused service businesses. That mix means I am comfortable both at a router cabinet and in a code editor.</p>
        <p>My approach is practical: find out what is actually failing, fix it, then document it so the next person does not have to guess. I try to be honest about what I know well and what I am still learning.</p>
        <p>I value faith, discipline, continuous learning and building useful things. I also hope to support young people as my career grows.</p>
      </Sec>
      <Sec title="Education" alt>
        <article className="card"><h3>B.Sc. Computer Science and Information Technology</h3><p className="muted">Igbinedion University, Okada, Edo State. 2022 to 2026.</p><p>Graduated with First Class honours.</p></article>
      </Sec>
      <Sec title="Direction"><p>I am looking for roles in IT support, networking and infrastructure, and junior software development, with a growing interest in cybersecurity. I also continue to grow ML Tech.</p><Link className="btn" to="/experience">See my experience</Link></Sec>
    </Page>
  );
}

export function Projects() {
  const [q, setQ] = useState(""); const [cat, setCat] = useState("All");
  const cats = ["All", ...Array.from(new Set(projects.map(p => p.cat)))];
  const list = projects.filter(p => (cat === "All" || p.cat === cat) && (p.title + p.blurb).toLowerCase().includes(q.toLowerCase()));
  return (
    <Page title="Projects" desc="Software and infrastructure projects by Abieyuwa Moses Adaze, led by the VeriOwn asset registry.">
      <Hero h="Projects" p="Only work I can stand behind. More will be added as it is documented." />
      <Sec>
        <div className="filters">
          <label className="sr" htmlFor="q">Search projects</label>
          <input id="q" type="search" placeholder="Search projects" value={q} onChange={e => setQ(e.target.value)} />
          <div role="group" aria-label="Filter by category">{cats.map(c => <button key={c} type="button" className={"chip" + (c === cat ? " on" : "")} aria-pressed={c === cat} onClick={() => setCat(c)}>{c}</button>)}</div>
        </div>
        {list.length === 0 ? <p className="muted">No projects match. Clear the search or choose another category.</p> :
          <div className="grid2">{list.map(p => <article className="card" key={p.slug}><span className="badge">{p.cat}</span><h3>{p.title}</h3><p className="muted">{p.tag}</p><p>{p.blurb}</p><Link to={p.to}>Open</Link></article>)}</div>}
      </Sec>
    </Page>
  );
}

export function VeriOwn() {
  return (
    <Page title="VeriOwn case study" desc="VeriOwn: a hybrid multi-category asset registry for secure ownership verification and transfer, built with Flutter, FastAPI and PostgreSQL.">
      <Hero h="VeriOwn" p="A hybrid multi-category asset registry for secure ownership verification and transfer." />
      <Sec>
        <p className="notice"><strong>Status:</strong> academic prototype, not a production service. It has no live demo and no active users. Feature status below is reported by the author and should be checked against the repository.</p>
        <h3>The problem</h3><p>{veriown.problem}</p><p>{veriown.context}</p>
        <h3>My role</h3><p>Student developer and project owner for this final-year project.</p>
      </Sec>
      <Sec title="Approach and architecture" alt>
        <p>A Flutter mobile app talks to a FastAPI backend that stores asset, owner and transfer records in PostgreSQL, with Alembic managing schema migrations. Each asset receives a unique platform identifier that can be encoded as a QR code for lookup. USSD is intended as an access route for people without smartphones.</p>
        <ul className="tags">{veriown.stack.map(s => <li key={s}>{s}</li>)}</ul>
      </Sec>
      <Sec title="Implementation status">
        <ul className="status">{veriown.features.map(f => <li key={f.name}><span className={"badge " + f.status}>{f.status === "reported" ? "Reported as built" : "Planned"}</span> {f.name}</li>)}</ul>
        <p className="muted">Screenshots will be added from the real application. None are shown here because none have been supplied.</p>
      </Sec>
      <Sec title="Try the access flow" alt><UssdSim /></Sec>
      <Sec title="Architecture"><ArchDiagram /></Sec>
      <Sec title="Source code" alt>
        <p><Ext href={site.repo}>github.com/MosesLight500b/veriown</Ext></p>
        <p className="muted">The repository may be private while the project is under academic review. Walkthroughs are available on request.</p>
        <Enquire topic="VeriOwn project walkthrough" label="Request a walkthrough" />
      </Sec>
    </Page>
  );
}

export function Experience() {
  return (
    <Page title="Experience" desc="Practical IT support, networking and security-systems experience at Fraezyl Solutions and through ML Tech.">
      <Hero h="Experience" p="Real client environments, described conservatively." />
      <Sec>
        {experience.map((e, i) => <details className="card tl" key={e.org} open={i === 0}><summary><strong>{e.role}</strong><span className="muted">{e.org} · {e.when} · {e.where}</span></summary><p>{e.note}</p><ul>{e.items.map(x => <li key={x}>{x}</li>)}</ul></details>)}
        {images.work.length > 0 && <div className="gallery">{images.work.map(w => <figure key={w.src}><Photo src={w.src} alt={w.alt} /><figcaption>{w.caption}</figcaption></figure>)}</div>}
        <p className="muted">Client names are withheld. No client results or metrics are claimed.</p>
      </Sec>
    </Page>
  );
}

export function Services() {
  return (
    <Page title="Services" desc="IT support, CCTV and access control, student administrative assistance, and academic and research support.">
      <Hero h="Services" p="What I offer, and how developed each service is." />
      <Sec>
        <div className="grid2">{services.map(s => <article className="card" key={s.id} id={s.id}>
          <Icon k={s.id} /><span className="badge">{s.state}</span><h3>{s.title}</h3><p>{s.text}</p>
          <div className="cta"><Link className="btn ghost" to={s.to}>Details</Link><Enquire topic={s.title} label="Enquire" /></div></article>)}</div>
        <h2 id="quote" style={{ marginTop: "3rem" }}>Request a quote</h2><Wizard />
        <p className="muted" style={{ marginTop: "1.5rem" }}>Services are offered as described. Where a service shows "Serving clients", that is my own report: no client numbers, revenue or testimonials are published. Listing a service does not imply completed installations. Pricing is confirmed directly.</p>
      </Sec>
    </Page>
  );
}

const Steps = ({ items }: { items: [string, string][] }) => <ol className="steps">{items.map(([t, d]) => <li key={t}><strong>{t}.</strong> {d}</li>)}</ol>;

function CaseStudies({ biz }: { biz: "student" | "academic" }) {
  const list = caseStudies.filter(c => c.business === biz && c.permission === "approved");
  if (!list.length) return <p className="muted">Case studies are published only with client permission and after identifying details are removed. None are published yet.</p>;
  return <div>{list.map(c => <article className="card tl" key={c.id}><h3>{c.title}</h3><p><strong>Context:</strong> {c.context}</p><p><strong>Challenge:</strong> {c.challenge}</p><p><strong>Scope:</strong> {c.scope}</p>
    <p><strong>What I did:</strong></p><ul>{c.work.map(w => <li key={w}>{w}</li>)}</ul><p><strong>Deliverables:</strong></p><ul>{c.deliverables.map(w => <li key={w}>{w}</li>)}</ul>
    {c.outcome && <p><strong>Documented outcome:</strong> {c.outcome}</p>}{c.evidence && <Photo src={c.evidence.src} alt={c.evidence.alt} cls="evidence" />}<p className="muted">{c.confidentiality}</p></article>)}</div>;
}

function Packages() {
  const ok = packages.filter(p => p.confirmed);
  if (!ok.length) return <><p>Price depends on the scope of your work, so I give a quotation after reviewing your request.</p><Enquire topic="Academic support quotation" label="Request a quotation" /></>;
  return <div className="grid2">{ok.map(p => <article className="card" key={p.name}><h3>{p.name}</h3><p className="price">{p.price}</p><p className="muted">{p.service}</p>
    <p><strong>Scope</strong></p><ul>{p.scope.map(x => <li key={x}>{x}</li>)}</ul><p><strong>Deliverables</strong></p><ul>{p.deliverables.map(x => <li key={x}>{x}</li>)}</ul>
    <p><strong>You provide</strong></p><ul>{p.clientResponsibilities.map(x => <li key={x}>{x}</li>)}</ul><p><strong>Turnaround:</strong> {p.turnaround}</p><p><strong>Revisions:</strong> {p.revisionPolicy}</p>
    <p><strong>Not included</strong></p><ul>{p.exclusions.map(x => <li key={x}>{x}</li>)}</ul><p className="muted">{p.additionalCharges}</p></article>)}</div>;
}

export function Student() {
  return (
    <Page title="Student Clearance & Administrative Assistance" desc="Independent help with legitimate university administrative procedures: clearance, transcripts, documentation and follow-up.">
      <Hero h="Student Clearance & Administrative Assistance" p="Practical support with legitimate university administrative procedures, documentation and follow-up." />
      <Sec>
        <p className="notice">This is an independent service operated by me. It is not a university department, partner or agency, and it is not endorsed by Igbinedion University or any institution. I have no special access to university systems and cannot guarantee any institutional outcome.</p>
        <p>Students often need to work out which office to approach, what documents are required, and how to follow up. I help you understand the process and organise the work, within an agreed scope. I have served paying clients with this service; client numbers and results are not published.</p>
        <Enquire topic="Student assistance" label="Enquire About Student Assistance" />
      </Sec>
      <Sec title="Services" alt><div className="grid2">{studentServices.map(s => <article className="card" key={s.title}><h3>{s.title}</h3><p>{s.text}</p>{s.note && <p className="muted">{s.note}</p>}</article>)}</div></Sec>
      <Sec title="How it works"><Steps items={studentProcess} /><p className="muted">This is how I work with clients personally. It is not an automated system.</p></Sec>
      <Sec title="Fees and official charges" alt><p>My service fee covers the assistance I provide. Official university fees and third-party charges are separate and are stated in the quotation where they apply. The fee does not buy a guaranteed decision or turnaround time.</p></Sec>
      <Sec title="Confidentiality and authorisation"><p>I handle only the information needed for the agreed task. Where I act for you or collect documents, written authorisation and valid identification may be required. Student records and private correspondence are never published without permission.</p></Sec>
      <Sec title="Case studies" alt><CaseStudies biz="student" /></Sec>
      <Sec title="Enquire"><EnquiryForm id="student" topics={studentServices.map(s => s.title)} /></Sec>
    </Page>
  );
}

export function Academic() {
  return (
    <Page title="Academic & Research Support" desc="MLTech Academic & Research Support: research guidance, editing, formatting and presentation help for students' own work.">
      <Hero h="MLTech Academic & Research Support" p="Structured help for students organising research, seminars and final-year projects." />
      <Sec>
        <p>For undergraduate and final-year students in Nigeria, with remote support where appropriate. I have served paying clients with this service; client numbers, results and testimonials are not published.</p>
        <Enquire topic="Academic support" label="Request Academic Support" />
      </Sec>
      <Sec title="Services" alt><div className="grid2">{academicServices.map(s => <article className="card" key={s.title}><h3>{s.title}</h3><ul>{s.items.map(i => <li key={i}>{i}</li>)}</ul></article>)}</div>
        <p className="muted" style={{ marginTop: "1rem" }}>Not every component is part of every engagement. The exact scope is agreed with you before work starts.</p></Sec>
      <Sec title="How it works"><Steps items={academicProcess} /></Sec>
      <Sec title="Academic integrity" alt>
        <p>You remain responsible for your research, analysis, findings and final submission, and for following your institution's rules. I help you organise, understand, edit and present your own work.</p>
        <p>I never fabricate sources, data, survey results or findings, and I do not promise grades, originality scores, supervisor approval or a successful defence.</p></Sec>
      <Sec title="Pricing"><Packages /></Sec>
      <Sec title="Case studies and samples" alt><CaseStudies biz="academic" /></Sec>
      <Sec title="Request support"><EnquiryForm id="academic" topics={academicServices.map(s => s.title)} /></Sec>
    </Page>
  );
}

export function Business() {
  const rows = [
    { t: "ML Tech: technology services", need: "Practical IT and infrastructure needs: repairs, support, CCTV and access control.", to: "/services", s: "Offered since 2022" },
    { t: "Student Clearance & Administrative Assistance", need: "Legitimate procedural and documentation needs at university.", to: "/services/student-assistance", s: "Has served paying clients" },
    { t: "MLTech Academic & Research Support", need: "Organising research, writing support and presentations.", to: "/services/academic-support", s: "Has served paying clients" },
  ];
  return (
    <Page title="Business Portfolio" desc="How ML Tech, student administrative assistance and academic research support fit together.">
      <Hero h="Entrepreneurship & Client Services" p="Three independent ventures, each answering a different customer need." />
      <Sec><div className="grid2">{rows.map(r => <article className="card" key={r.t}><span className="badge">{r.s}</span><h3>{r.t}</h3><p>{r.need}</p><Link to={r.to}>View</Link></article>)}</div></Sec>
      <Sec title="What I publish, and what I do not" alt>
        <p>These are independent activities run by me. They are not separate registered companies. Status above is my own report.</p>
        <p>I do not publish client counts, revenue, satisfaction figures or testimonials. Case studies appear only with permission, with identities and sensitive details removed.</p></Sec>
    </Page>
  );
}

export function Skills() {
  const [lvl, setLvl] = useState("All");
  const levels = ["All", "Practical Experience", "Project Experience", "Working Knowledge", "Currently Developing"];
  const ok = (l: string) => lvl === "All" || l === lvl;
  return (
    <Page title="Skills & Certifications" desc="Technical skills with honest proficiency labels, and certification information for Abieyuwa Moses Adaze.">
      <Hero h="Skills and certifications" p="Labelled by what I have actually done, not by percentages." />
      <Sec><div className="filters" role="group" aria-label="Filter by level">{levels.map(l => <button key={l} type="button" className={"chip" + (l === lvl ? " on" : "")} aria-pressed={l === lvl} onClick={() => setLvl(l)}>{l}</button>)}</div>
        <div className="grid2">{skills.filter(g => g.items.some(([, l]) => ok(l))).map(g => <article className="card" key={g.group}><h3>{g.group}</h3>
        <ul className="rows">{g.items.filter(([, l]) => ok(l)).map(([n, l]) => <li key={n}><span>{n}</span><span className="badge">{l}</span></li>)}</ul></article>)}</div></Sec>
      <Sec title="Certifications" alt>
        <p>I have completed training related to Cisco, MikroTik and Huawei technologies. Individual credentials, titles and verification links will be listed here once confirmed.</p>
      </Sec>
    </Page>
  );
}

type FormState = "idle" | "sending" | "success" | "error";
export function Contact() {
  const [state, setState] = useState<FormState>("idle");
  const [msg, setMsg] = useState("");
  const [copied, setCopied] = useState(false);
  const [err, setErr] = useState<Record<string, string>>({});
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const v = { name: String(d.get("name") ?? "").trim(), email: String(d.get("email") ?? "").trim(), message: String(d.get("message") ?? "").trim() };
    const errs: Record<string, string> = {};
    if (!v.name) errs.name = "Enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) errs.email = "Enter a valid email address.";
    if (v.message.length < 10) errs.message = "Write at least 10 characters.";
    setErr(errs);
    if (Object.keys(errs).length) return;
    if (!site.formEndpoint) {
      location.href = `mailto:${site.email}?subject=${encodeURIComponent("Portfolio enquiry from " + v.name)}&body=${encodeURIComponent(v.message + "\n\nFrom: " + v.name + " (" + v.email + ")")}`;
      setState("success"); setMsg("Your email app should now open with the message ready. Nothing has been sent until you press send there."); return;
    }
    setState("sending");
    try {
      const r = await fetch(site.formEndpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(v) });
      if (!r.ok) throw new Error(String(r.status));
      setState("success"); setMsg("Message sent. I will reply by email."); (e.target as HTMLFormElement).reset();
    } catch { setState("error"); setMsg(`The message could not be sent. Please email ${site.email} directly.`); }
  }
  const F = ({ id, label, children }: { id: string; label: string; children: ReactNode }) =>
    <div><label htmlFor={id}>{label}</label>{children}{err[id] && <p className="fe" id={id + "-e"}>{err[id]}</p>}</div>;
  return (
    <Page title="Contact" desc="Contact Abieyuwa Moses Adaze by email, WhatsApp, LinkedIn or GitHub.">
      <Hero h="Contact" p="For roles, projects, services or collaboration." />
      <Sec><div className="cgrid">
        <div>
          <ul className="rows plain">
            <li>Email: <a href={`mailto:${site.email}`}>{site.email}</a></li>
            <li>LinkedIn: <Ext href={site.linkedin}>Moses Adaze Abieyuwa</Ext></li>
            <li>GitHub: <Ext href={site.github}>MosesLight500b</Ext></li>
          </ul>
          <Enquire topic="General enquiry" label={site.whatsapp ? "Message on WhatsApp" : "Email an enquiry"} />
          <div className="cta"><button type="button" className="btn ghost" onClick={async () => { setCopied(await copyText(site.email)); }}>{copied ? "Copied" : "Copy email"}</button><button type="button" className="btn ghost" onClick={downloadCard}>Download contact card</button></div>
        </div>
        <form onSubmit={submit} noValidate>
          <F id="name" label="Your name"><input id="name" name="name" autoComplete="name" aria-invalid={!!err.name} aria-describedby="name-e" /></F>
          <F id="email" label="Your email"><input id="email" name="email" type="email" autoComplete="email" aria-invalid={!!err.email} aria-describedby="email-e" /></F>
          <F id="message" label="Message"><textarea id="message" name="message" rows={5} aria-invalid={!!err.message} aria-describedby="message-e" /></F>
          <button className="btn" type="submit" disabled={state === "sending"}>{state === "sending" ? "Sending..." : "Send message"}</button>
          <p role="status" aria-live="polite" className={state === "error" ? "fe" : "ok"}>{msg}</p>
        </form>
      </div></Sec>
    </Page>
  );
}

export function NotFound() {
  return (
    <Page title="Page not found" desc="The page you requested does not exist.">
      <Hero h="Page not found" p="That address does not exist on this site." />
      <Sec><Link className="btn" to="/">Back to home</Link></Sec>
    </Page>
  );
}
