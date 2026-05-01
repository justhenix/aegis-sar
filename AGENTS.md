# AGENTS.md - Aegis-SAR

## Purpose

Aegis-SAR is a hackathon MVP for search-and-rescue drone imagery. The app currently prioritizes a polished demo flow: upload or mock a drone frame, show tactical dashboard feedback, classify an incident, display severity/confidence, and provide a rescue action.

Keep changes demo-safe, fast to review, and honest about what is mocked versus connected to a real backend or model.

## Current project state

- Frontend MVP exists in `app/page.js` as a single client-side dashboard.
- Styling tokens and tactical UI utilities live in `app/globals.css`.
- Mock analysis is the reliable demo path right now.
- FastAPI backend, `/analyze-frame`, SQLite incident history, frontend/backend wiring, README setup docs, and demo assets are still active follow-up work.
- Do not present Qwen-VL, Llama Vision, AMD MI300X, ROCm, FastAPI, or SQLite as fully integrated unless the code proves it.

## Tech stack

- Framework: Next.js 16.2.4 App Router
- UI: React 19.2.4
- Styling: Tailwind CSS 4 via `@tailwindcss/postcss`
- Linting: ESLint 9 with `eslint-config-next/core-web-vitals`
- Package manager: npm, because `package-lock.json` exists and scripts are in `package.json`
- Planned backend: FastAPI + Python
- Planned database: SQLite for MVP incident logging
- Planned model layer: Qwen-VL or Llama 3.2 Vision, with mock fallback for demo reliability

## Key commands

Run from the repository root.

```bash
npm install
npm run dev
npm run lint
npm run build
npm start
```

No test command exists yet. Do not invent one. If adding tests, add the script to `package.json` in the same change.

## Project layout

```text
app/
  globals.css    # Tailwind import, tactical design tokens, global CSS utilities/animations
  layout.js      # Root layout, Geist fonts, metadata
  page.js        # Main dashboard MVP and mock analysis flow
public/          # Static assets
```

Keep this section updated only when the layout changes in a way agents cannot infer quickly.

## Product invariants

- The demo must work without a live AI backend.
- Mock mode must remain available even after backend integration.
- Upload flow must degrade gracefully if the backend is offline.
- The intelligence result shape is:

```json
{
  "incident": "possible_survivor",
  "severity": "high",
  "confidence": 0.84,
  "action": "Send rescue team through eastern access route."
}
```

- Supported severity values are `high`, `medium`, and `low`.
- The action directive should be the most visually obvious result.
- The UI should feel like SAR/tactical command software, not a generic SaaS dashboard.

## Frontend conventions

- Use client components when browser APIs are required, such as file upload previews with `URL.createObjectURL`.
- Preserve the current rugged HUD style: dark zinc backgrounds, high-contrast text, square corners, compact mono labels, minimal clutter.
- Prefer existing CSS variables in `app/globals.css` for global colors and tactical effects.
- Keep state local until backend integration requires shared API state.
- Keep the desktop layout as a 70/30 Drone Feed / Intelligence Hub split.
- Keep the mobile layout stacked and usable.
- Do not add heavy UI libraries for simple dashboard components.
- Do not add icons, maps, charts, or animations that distract from upload -> analysis -> directive.

## Backend conventions once implemented

- Create the backend in a clear `backend/` directory unless an existing backend structure appears first.
- Expected endpoint: `POST /analyze-frame`.
- Accept uploaded images as multipart form data.
- Return the same incident JSON shape used by the mock frontend.
- Add a basic health endpoint.
- Enable local frontend CORS only for development.
- Keep mock response support available for demo mode and outage fallback.
- If adding SQLite logging, store: `id`, `filename`, `incident`, `severity`, `confidence`, `action`, `created_at`.
- Add `GET /incidents` only when SQLite persistence exists.

## Non-obvious patterns

- `app/page.js` intentionally contains the full MVP dashboard in one file right now. Split components only when it improves clarity or unlocks backend integration; do not refactor just for architecture purity during hackathon work.
- The mock flow intentionally simulates latency before returning `MOCK_RESULT`. Preserve this storytelling effect unless replacing it with a real loading state from the backend.
- Event log entries are local-only for now. Do not persist them until the SQLite incident-history task is being implemented.
- README currently describes the intended full system, while the code is ahead on frontend and behind on backend/model integration. When updating docs, distinguish “implemented”, “mocked”, and “planned”.

## Quality checks before finishing

Always run:

```bash
npm run lint
npm run build
```

For UI changes, also manually verify:

- fresh load shows `NO ACTIVE INCIDENT`
- upload button accepts an image and shows preview
- mock mode triggers loading, then shows incident/severity/confidence/action
- event log updates during the demo flow
- desktop layout keeps the 70/30 split
- mobile layout stacks without broken controls

## Boundaries

### Allowed without asking

- Edit frontend files under `app/`
- Improve copy, accessibility labels, empty/loading states, and responsive layout
- Add small helper functions or local components
- Add mock/demo assets under `public/` when useful
- Add README setup/demo notes that match the actual code

### Ask first

- Adding or removing npm/Python dependencies
- Moving from JavaScript to TypeScript
- Large component restructuring
- Adding a new backend/database directory structure
- Changing the API response shape
- Removing mock mode
- Changing project license
- Making deployment-specific configuration changes

### Never

- Commit secrets, `.env*`, credentials, API keys, model tokens, or cloud credentials
- Claim real survivor detection accuracy from mock data
- Remove demo fallback behavior
- Break the upload -> analysis -> directive flow
- Introduce blocking network calls that make the demo fail when offline
- Force-push or rewrite shared history
- Modify generated output directories such as `.next/`, `out/`, `build/`, or `dist/`

## Documentation rules

- Keep README honest for judges: describe the real implemented flow separately from planned FastAPI/model/SQLite work.
- Include local setup commands when updating README.
- Add screenshots, sample images, demo URL, and demo script only after they exist.
- Prefer short, high-signal docs over broad architecture summaries.
- No overly used emoji, jargons, or over-hyped writing.

## Git hygiene

- Make focused commits that map to one feature or issue.
- Mention the issue number when a change clearly completes one.
