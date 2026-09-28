# AGENTS.md — velobrat-landing

Single-page Vite + React 19 + TS landing (`ru`). No router, no tests, no CI.

## Commands

- `npm run dev` — dev server on `:5174`
- `npm run build` — `tsc -b && vite build` (typecheck runs as part of build; fix TS errors first)
- `npm run lint` — `oxlint` (not ESLint; config in `.oxlintrc.json`)
- `npm run preview` — preview on `:4174`
- No test / format / typecheck-only scripts.

## Structure

- Entry: `index.html` → `src/main.tsx` → `src/App.tsx`
- `src/App.tsx` composes sections in order: Header, Hero, Inside, Garage, Wear, Wiki, Audience, Roadmap, CTA, Footer (+ ProgressBar/StickyCTA defined inline)
- `src/components/*.tsx` — one file per section; `icons.tsx` shared icons
- `src/styles/tokens.css` — design tokens (`--brand: #0077ff`, dark theme); `src/styles/landing.css` — all layout
- `src/lib/mocks.ts` — `VK_URL`, article/AI demo data; `src/lib/zapnoty.ts` — live lead client; `src/lib/leads.ts` — legacy generic adapter (not used by UI)
- `public/` served as-is; `vite.config.ts`: `base: '/'`, keep it (a non-root base caused a black screen before — see git log)

## TypeScript gotchas

Project refs (`tsconfig.app.json` + `tsconfig.node.json`) with strict flags:
- `noUnusedLocals` / `noUnusedParameters` — build fails on unused vars
- `verbatimModuleSyntax` — use `import type` for types
- `erasableSyntaxOnly` — no enums / parameter properties / namespaces
- `allowImportingTsExtensions` — `main.tsx` imports `./App.tsx` with extension; follow that

## Lead form — do not break

- `CTA.tsx` → `submitZapLead()` in `src/lib/zapnoty.ts` → hardcoded `ZAP_URL` (form id in file header)
- Required fields: `contact`, `page`, honeypot `_hp_e3be16085a` (empty string if untouched), `_submit_time` (module-load `t0`, enforces `min_submit_time_ms = 3000` server-side), `_request_id`
- Retry (30s/8s/8s + backoff), offline queue in `localStorage` (`zap_queue_*`, 50 items, 7-day TTL), `online` + delayed drain — preserve this behavior
- Validation in `CTA.tsx:isValidContact` accepts email / VK URL / @handle / RU phone; error/success copy is Russian — keep it
- `src/lib/leads.ts` (`VITE_LEAD_URL` / `VITE_LEAD_TOKEN` / `VITE_TG_CHAT_ID`) is an unused alternative backend; don't wire it in unless asked

## Conventions

- Fonts via `@fontsource/*` imports in `main.tsx` (Inter/Montserrat/JetBrains Mono, cyrillic subsets) — don't switch to Google Fonts CDN
- Styles: plain CSS with `var(--*)` tokens; no Tailwind/CSS-in-JS. Brand color always `var(--brand)`
- Copy is Russian; keep a11y patterns already in place (`skip-link`, `aria-live` on form status, labelled sections)
- `.opencode/` is gitignored local scratch — don't commit it
