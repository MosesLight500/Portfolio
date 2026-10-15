import { useEffect, useState } from "react";
import { NavLink, Link, Route, Routes, useLocation } from "react-router-dom";
import { site } from "./content";
import { ScrollBar, Palette } from "./extras";
import { Home, About, Projects, VeriOwn, Experience, Services, Student, Academic, Business, Skills, Contact, NotFound } from "./pages/pages";

const nav = [["/", "Home"], ["/about", "About"], ["/projects", "Projects"], ["/experience", "Experience"], ["/services", "Services"], ["/business", "Business"], ["/skills", "Skills"], ["/contact", "Contact"]];

function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);
  const toggleTheme = () => {
    const el = document.documentElement;
    const dark = el.dataset.theme ? el.dataset.theme === "dark" : !matchMedia("(prefers-color-scheme: light)").matches;
    const next = dark ? "light" : "dark";
    el.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch { /* storage unavailable */ }
  };
  return (
    <header className="top">
      <div className="wrap bar">
        <Link to="/" className="logo">Moses<b>Light</b></Link>
        <nav id="nav" className={open ? "open" : ""} aria-label="Main">
          {nav.map(([to, label]) => <NavLink key={to} to={to} end={to === "/"}>{label}</NavLink>)}
        </nav>
        <div className="tools">
          <button className="ib" onClick={() => window.dispatchEvent(new Event("open-palette"))} aria-label="Search and quick actions (Ctrl+K)" type="button">⌕</button>
          <button className="ib" onClick={toggleTheme} aria-label="Switch colour theme" type="button">◐</button>
          <button className="ib menu" onClick={() => setOpen(o => !o)} aria-expanded={open} aria-controls="nav" aria-label="Menu" type="button">☰</button>
        </div>
      </div>
    </header>
  );
}

export default function App() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <ScrollBar /><Palette />
      <Header />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/veriown" element={<VeriOwn />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/student-assistance" element={<Student />} />
          <Route path="/services/academic-support" element={<Academic />} />
          <Route path="/business" element={<Business />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer>
        <div className="wrap foot">
          <span>&copy; {new Date().getFullYear()} {site.name}. ML Tech is an independent brand, not a registered company.</span>
          <span className="flinks"><a href={site.github} rel="noopener">GitHub</a><a href={site.linkedin} rel="noopener">LinkedIn</a><a href={`mailto:${site.email}`}>Email</a></span>
        </div>
      </footer>
    </>
  );
}
