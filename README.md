A news feed that researches and drafts its own entries. You review and publish from `/admin`.

## Quick start

```bash
make setup-dev
```

Fill in `.env.local`.

```bash
make start-dev
```

## Environment variables

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | Postgres connection string |
| `ADMIN_PASSWORD` | Gates `/admin` and the cron endpoint |
| `ANTHROPIC_API_KEY`, `OPENAI_API_KEY`, or `AI_GATEWAY_API_KEY` | Whichever provider is active in `src/engine/config/providers.ts` |

Any `@ai-sdk/<provider>` package works the same way. Add its key under the env var name that package's own docs specify, add an export to `providers.ts`, point `digest.ts` at it.

## What it curates

`src/engine/config/generation-prompt.md`. Plain text, no code. Edit topic, sources, and inclusion criteria directly.

## Branding

`src/ui/config/site.ts`. `SITE_NAME`, `SITE_OWNER_NAME`, `SITE_OWNER_URL`, `SITE_REPO_URL`, each overridable by an env var of the same name.

## Look and feel

`src/ui/components/entry-card.tsx` renders every entry, on the public feed and in admin. Edit it once, both surfaces change. Base components are in `src/ui/components/ui/`.

## AI provider

`src/engine/config/providers.ts` exports a configured client per provider. `src/engine/lib/digest.ts` imports whichever one is active.

Anthropic direct:

```ts
import { anthropic } from '@/engine/config/providers';

model: anthropic(GENERATION_MODEL),
tools: { web_search: anthropic.tools.webSearch_20250305({ maxUses: GENERATION_MAX_SEARCHES }) },
```

Vercel AI Gateway:

```ts
import { gateway } from '@/engine/config/providers';

model: GENERATION_MODEL, // e.g. "anthropic/claude-sonnet-5", "openai/gpt-5"
tools: { web_search: gateway.tools.exaSearch({ numResults: 5, contents: { highlights: true } }) },
```

## Generation knobs

Model, max output tokens, max searches per run: `src/engine/config/generation.ts`, each overridable by an env var of the same name.

## Architecture

- `src/engine/`: database, generation logic, config. No opinion on topic or presentation.
- `src/ui/`: components, styling, branding.
- `src/app/`: Next.js routes. Wires the two together, nothing else.

## Deploying

Runs on Vercel Cron. Schedule is in `vercel.json`.

## MCP server

Not built yet. Will let an MCP client curate and publish against a deployed instance directly.
