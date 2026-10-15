import { writeFileSync } from "node:fs";
const base = (process.env.VITE_SITE_URL || "").replace(/\/$/, "");
if (!base) { console.log("VITE_SITE_URL not set: sitemap skipped."); process.exit(0); }
const routes = ["", "about", "projects", "projects/veriown", "experience", "services", "business", "services/student-assistance", "services/academic-support", "skills", "contact"];
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map(r => `<url><loc>${base}/${r}</loc></url>`).join("\n")}\n</urlset>\n`;
writeFileSync("dist/sitemap.xml", xml);
writeFileSync("dist/robots.txt", `User-agent: *\nAllow: /\nSitemap: ${base}/sitemap.xml\n`);
