# Copilot Instructions

## Architecture
- The root app is a `Next.js 15` App Router project deployed to Cloudflare via OpenNext; deployment wiring lives in `open-next.config.ts` and `wrangler.jsonc`.
- User-facing pages live under `src/app/[locale]`; localization is handled by `next-intl` through `src/i18n/routing.ts`, `src/middleware.ts`, and `messages/en.json` + `messages/zh.json`.
- API routes stay outside locale routing in `src/app/api/*`; the locale middleware explicitly excludes `/api` and static asset paths.
- The main naming flow is orchestrated in `src/components/JapaneseNameGenerator.tsx`: it runs basic questions, preset advanced questions, up to 3 follow-up rounds, then final name generation.
- Frontend LLM calls go through `src/lib/chat-client.ts`, which always posts to the app-local `/api/chat` endpoint rather than calling Gemini directly from the browser.
- AI responses are expected to be JSON but may arrive wrapped in markdown code fences; `parseJsonFromResponse` in `src/components/JapaneseNameGenerator.tsx` is the compatibility layer to preserve.
- `src/app/api/chat/route.ts` and `src/app/api/family-crest/route.ts` duplicate origin whitelist + CORS logic and both depend on `getGeminiApiKey()` from `src/lib/gemini-api-key.ts`; keep them aligned when changing request validation or env handling.
- The homepage is partially file-driven: `src/app/[locale]/page.tsx` reads `新版本PSEO改造/keyword/keyword.json` from disk at render/build time to surface SEO category cards.

## Data Service Boundary
- `tools/data-service` is a separate Cloudflare Worker with its own `package.json`, `wrangler.jsonc`, and deploy lifecycle; treat it as a sibling service, not part of the Next.js runtime.
- The data service uses `Hono` + Cloudflare `D1`; the entrypoint is `tools/data-service/src/index.ts` and the API surface is documented in `tools/data-service/API.md`.
- Name and keyword filtering is driven by a `filter_rule` DSL compiled to SQL in `tools/data-service/src/lib/filter.ts`; extend the whitelist/operator logic there before adding new filterable fields.
- D1 JSON-array columns are stored as JSON strings and normalized via helpers such as `parseNameRow`/`toJsonString`; follow that pattern instead of mixing raw strings and arrays.
- `tools/data-service/vendor/japanese-personal-name-dataset` is vendored third-party source data; avoid editing it unless you are intentionally refreshing imported datasets.

## Workflows
- Root app commands: `npm run dev`, `npm run build`, `npm run preview`, `npm run deploy`, `npm run cf-typegen`.
- Data service commands: run from `tools/data-service` with `npm run dev`, `npm run typecheck`, `npm run db:init:local`, `npm run db:seed:local`, and remote equivalents.
- Root `README.md` is still the default Next.js boilerplate; prefer `env-setup.md`, `usage-guide.md`, `wrangler.jsonc`, and package scripts for real project behavior.
- Local LLM work expects `GEMINI_API_KEY` in `.env.local`; deployed environments use Wrangler secrets. `ALLOWED_ORIGINS` is optional in development but required in production-like environments.
- For manual verification of the chat stack, use `src/app/[locale]/test-chat/page.tsx` or the generator flow under `src/app/[locale]/generate/page.tsx`.
- There is no committed automated test suite at the root today; for app changes, prefer targeted verification with `npm run build` or the smallest relevant manual flow.

## Conventions
- Keep UI copy in `messages/en.json` and `messages/zh.json`; the codebase is bilingual, so preserve existing Chinese comments/content unless the feature explicitly standardizes it.
- When changing question shapes or result payloads, update `src/types/naming.ts`, prompt builders in `src/lib/naming-questions.ts`, and the rendering/parsing logic in `src/components/JapaneseNameGenerator.tsx` together.
- When changing prompt text, prefer editing prompt builder helpers and translation catalogs instead of hardcoding strings inside components.
- Keep locale-aware pages in `src/app/[locale]`; add non-localized HTTP endpoints under `src/app/api` so middleware exclusions continue to work.
- If you touch SEO category behavior, check both the keyword source files in `新版本PSEO改造/keyword/` and the homepage loader in `src/app/[locale]/page.tsx`.
- If you add or rename D1 fields, update the schema SQL, route handlers, helper serialization, and `API.md` together because the service exposes those shapes directly.

## Examples
- Adding a new naming question usually means touching `src/lib/naming-questions.ts`, `src/types/naming.ts`, `src/components/JapaneseNameGenerator.tsx`, and both locale message files.
- Adding a new filterable attribute in the data service usually means touching `tools/data-service/src/db/schema.sql`, `tools/data-service/src/lib/filter.ts`, route serialization helpers, and `tools/data-service/API.md`.
