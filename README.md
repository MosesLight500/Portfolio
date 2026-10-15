# MosesLight Professional Portfolio

Multi-page portfolio for Abieyuwa Moses Adaze. React 18+, TypeScript, Vite, React Router. No backend, no database.

## 1. Prerequisites
Node.js 20 or newer and npm.

## 2. Extract
Unzip `MosesLight-Professional-Portfolio.zip` and open the folder in a terminal.

## 3. Install
    npm install

## 4. Run locally
    npm run dev        # http://localhost:5173

## 5. Production build
    npm run build      # runs tsc, vite build, then sitemap generation
    npm run preview    # serve dist/ locally

## 6. Contact form and WhatsApp
Copy `.env.example` to `.env` and set:
- `VITE_WHATSAPP_NUMBER`: digits only with country code. Until set, every "Enquire" button opens an email enquiry instead.
- `VITE_FORM_ENDPOINT`: a Formspree-style endpoint. Until set, the form opens the visitor's email app and says clearly that nothing is sent until they press send.
- `VITE_SITE_URL`: your domain. Enables canonical links, `sitemap.xml` and the sitemap line in `robots.txt`.
Only public values belong in `VITE_` variables. Never put secrets in frontend code.

## 7. Updating content
Everything editable (text, projects, experience, skills, services, links) is in `src/content.ts`. Page copy for About, Student Assistance and Academic Support is in `src/pages/pages.tsx`. Colours and type are CSS variables at the top of `src/styles.css`.

## Photos
No photos are included. To add real ones, put files in `public/images/` and set `images.portrait` and `images.work` in `src/content.ts`. They appear on About and Experience automatically, with alt text and captions you write. The illustrations (hero, architecture) are original SVGs in `src/extras.tsx`.

## Features
Command palette (Ctrl/Cmd+K), scroll progress, quote-request wizard on Services, VeriOwn USSD flow simulator (sample data, labelled), skills filter, project search and filter, expandable experience, copy email, downloadable contact card, light and dark theme.

## 8. Deploy
Any static host. Single-page routing needs a fallback to `index.html`:
- Netlify: deploy `dist/` (`public/_redirects` is included).
- Vercel: import the project (`vercel.json` is included), build command `npm run build`, output `dist`.
- Cloudflare Pages: build `npm run build`, output `dist`, SPA fallback is automatic.

## 9. Details that still need your confirmation
- CGPA (reported ~4.89/5.00): not published until checked against your transcript.
- Hadriel Technology (Jan 2020 to Jun 2022): omitted because the dates overlap ML Tech and need confirming.
- Fraezyl job title (Intern or IT Field Engineer) and which tasks you led versus assisted.
- VeriOwn feature status: marked "Reported as built" or "Planned" from your own description. The repository could not be inspected when this was built. Update `veriown.features` in `src/content.ts` after checking the code. USSD is marked Planned.
- Which student-assistance and academic services you currently offer (all listed ones need your confirmation), and that you want the paying-client statements published.
- Academic packages: add confirmed prices and inclusions to `packages` in `src/content.ts` (set `confirmed: true`). Until then the page shows "Request a quotation".
- Case studies: add to `caseStudies` in `src/content.ts`. Only entries with `permission: "approved"` display. Before approving, remove identifying details from documents, including headers, footers, comments, tracked changes, images and file metadata.
- GreenCore Commodities: not shown. Add only if you confirm status and want it public.
- Church and community leadership: not shown. Add if you want it public.
- Certifications: titles, IDs and dates needed.

## 10. Assets and integrations to supply
- WhatsApp number, form endpoint, domain (see section 6).
- Real VeriOwn screenshots (add images to `public/` and reference them on the case-study page).
- A social preview image and a photo, if wanted. No stock or fake imagery is included.

## Checks performed when built
TypeScript type check and production build passed. Not performed: browser testing of every route, external link checking, ESLint, live form submission.
