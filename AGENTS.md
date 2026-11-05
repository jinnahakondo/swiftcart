<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# SwiftCart

Next.js 16 App Router ecommerce app (React 19, Tailwind v4, shadcn/ui). Auth and Mongo scaffolding exist, but the storefront still serves hardcoded product data.

## Commands

- Use **pnpm** (lockfile + `packageManager: pnpm@12.15.0`), not npm/yarn.
- `pnpm dev` / `pnpm build` / `pnpm start`
- `pnpm lint` runs bare `eslint`; there is no `next lint` or lint-fix script.
- Typecheck with `pnpm exec tsc --noEmit`; there is no typecheck or test script and no test suite.
- `pnpm-workspace.yaml` only pins build approvals — this is a single-package repo, not a workspace.

## Next.js 16 specifics

- `next.config.ts` enables `cacheComponents` and `partialPrefetching`. Data fetching is dynamic by default; uncached data outside `<Suspense>` blocks prerendering. Read `node_modules/next/dist/docs/01-app/02-guides/` before adding caching or data-fetching code.
- `middleware` is renamed to `proxy` in this version. `proxy.ts` at the repo root re-exports Auth.js `auth`; do not add `middleware.ts`.
- Route props use generated global types (`LayoutProps<"/">`, `PageProps`) — do not import them from a module.
- Tailwind v4 has no `tailwind.config`; design tokens live in `app/globals.css` (`:root`, `.dark`, `@theme`). Turbopack's CSS loader is configured in `next.config.ts`; leave it intact.

## Layout and conventions

- `@/*` maps to the repo root: `@/components/...`, `@/lib/...`, `@/app/...`.
- Routes: `/`, `/shop`, `/shop/[slug]`, `(auth)/login`, `(auth)/signup`; Auth.js handler is `app/api/auth/[...nextauth]/route.ts`.
- Product data is hardcoded in `app/asset/asset.ts` (products, logo, hero slides). `/shop` is a placeholder and `/shop/[slug]` looks products up there; Mongo product models are not wired in.
- `lib/db/dbConnection.ts` is a cached Mongoose connector that throws on import if `MONGODB_URI` is missing. User model: `lib/Schemas/userSchema.ts` (password is `select: false`).
- Required env vars in gitignored `.env.local`: `MONGODB_URI`, `AUTH_SECRET`, `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`. Never commit or print their values.
- Auth.js v5 beta lives in `app/auth.ts`; the credentials `authorize` callback is a stub that always succeeds and does not query Mongo. Signup does not create users.
- `lib/utils.ts` re-exports `cn` from the `cn` npm package (not `clsx`/`tailwind-merge`).
- `components/ui/*` is shadcn-generated (`components.json`, style `radix-nova`). Add primitives with `pnpm exec shadcn add <component>` instead of hand-editing generated files.
- Remote product images use plain `<img>`; if converting them to `next/image`, add an `images.remotePatterns` entry for `images.unsplash.com`.

## Current baseline (Nov 2026)

`pnpm lint` already fails on `lib/db/dbConnection.ts` (`no-explicit-any`), and `pnpm exec tsc --noEmit` already fails in `LoginCard.tsx` (undefined `setEmail`/`setPassword`) and `Navbar.tsx` (stale `Login`/`Signup` imports). These are pre-existing, not caused by your change; fix only when in scope.
