# SwiftCart — Remediation Plan

**Status:** Awaiting approval (no code changes made yet)
**Scope:** Auth security, broken auth flows, responsive/a11y, catalog, Google persistence, quality gates
**Baseline:** `pnpm exec tsc --noEmit` → 3 errors; `pnpm lint` → 3 errors + 11 warnings

## Decisions

| Decision | Default in this plan | Alternative |
|---|---|---|
| Currency | Display `$` (asset data is already USD-priced) | Convert/reprice all 20 products to BDT and keep `৳` |
| Auth scope | Hashed credentials auth now; Google→Mongo persistence in Phase 5 | Credentials only, defer Google entirely |

Change the defaults before approving if you want the alternative.

---

## Phase 1 — Close the auth holes (blocking, do first)

### 1.1 Add hashing dependency

```bash
pnpm add bcryptjs
```

bcryptjs v3 ships its own types and needs no native build. Add `@types/bcryptjs` only if typecheck complains.

### 1.2 `lib/Schemas/userSchema.ts` — hash on save + sanitize output

- Add an `IUser` interface and type the schema as `Schema<IUser>`.
- Add `userSchema.pre("save", ...)`: skip when `!this.isModified("password")`, hash with cost 12.
- Add a `comparePassword(candidate: string)` method.
- Add a `toJSON` transform that deletes `password` and `__v`.
- Keep `select: false` on `password`.

### 1.3 `app/api/register/route.ts` — validate, whitelist, real status codes

Current code (`app/api/register/route.ts:10-13`) passes the raw body straight into `User.create`, which allows plaintext passwords and `role: "admin"` self-assignment.

```ts
const body = await req.json().catch(() => null);
const parsed = signupSchema.safeParse(body);
if (!parsed.success) {
  return sendErrorRes({ status: 400, message: "Invalid input" });
}
if (await User.exists({ email: parsed.data.email })) {
  return sendErrorRes({ status: 409, message: "Email already registered" });
}
await User.create({
  name: parsed.data.name,
  email: parsed.data.email,
  password: parsed.data.password, // hashed by the schema hook
  role: "user",                   // never trust the body
  provider: "credentials",
});
```

- Catch Mongo duplicate-key (`error.code === 11000`) → 409.
- Return only `{ id, name, email }` — never the document.
- Change `catch (error: any)` to `catch (error: unknown)` with `instanceof Error` narrowing.

### 1.4 `app/auth.ts` — real credentials check

Current `authorize` (`app/auth.ts:11-18`) logs the password and returns a session for any input.

```ts
authorize: async (raw) => {
  const parsed = loginSchema.safeParse(raw);
  if (!parsed.success) return null;

  await connectDB();
  const user = await User.findOne({ email: parsed.data.email }).select("+password");
  if (!user?.password) return null;
  if (!(await user.comparePassword(parsed.data.password))) return null;

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    image: user.image,
    role: user.role,
  };
}
```

- Remove the `console.log` of credentials.
- Add `session: { strategy: "jwt" }`.
- Add `callbacks.jwt` (copy `id`, `role` onto the token) and `callbacks.session` (expose them on `session.user`).
- Add `types/next-auth.d.ts` module augmentation for `Session["user"]`, `User`, and `JWT`.

### 1.5 `lib/helper.ts` — make status codes real

- Both helpers currently return `status` inside the JSON body but always send HTTP 200. Use `NextResponse.json(body, { status })`.
- Replace `data?: any` and `error?: any` with `unknown`.
- Keep the development-only `error` leak guard.

### 1.6 `lib/db/dbConnection.ts` — remove `any`

- Type the global cache:
  ```ts
  declare global {
    var mongoose:
      | { conn: Mongoose | null; promise: Promise<Mongoose> | null }
      | undefined;
  }
  ```
- Delete the `"db connected"` console log.

### 1.7 `proxy.ts` — stop running on assets

```ts
export { auth as proxy } from "./app/auth";

export const config = {
  matcher: [
    "/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpe?g|svg|webp)$).*)",
  ],
};
```

**Acceptance criteria**

- `POST /api/register` with `role: "admin"` creates a `user`.
- DB stores a bcrypt hash, never plaintext.
- Wrong password returns `null` → login fails with a toast.
- Duplicate email returns HTTP 409.
- No credentials appear in server logs.

---

## Phase 2 — Fix the broken flows

### 2.1 `components/auth/LoginCard.tsx`

- Fix corrupted class `bg-cS<HTMLForard` → `bg-card` (line 78); the "or" divider currently has no background and overlaps the rule.
- Rewrite `onSubmit` (currently ignores the result and calls `alert("submited")`, line 41-42):
  ```ts
  setIsLoading(true);
  const res = await signIn("credentials", {
    redirect: false,
    email: data.email,
    password: data.password,
  });
  setIsLoading(false);

  if (res?.error) {
    toast.error("Invalid email or password");
    return;
  }
  toast.success("Welcome back");
  router.push("/");
  router.refresh();
  ```
- Remove `alert()`.
- Either use `isGoogleLoading`/`setIsGoogleLoading` or delete them (lint warning).
- `signIn("google", { callbackUrl: "/" })`.

### 2.2 `components/auth/SignupCard.tsx`

- Handle non-2xx responses: parse `message` from the body → `toast.error(...)`.
- Clear loading in `finally`; remove `console.log(error.message)` (also a `tsc` error at line 57).
- Swap `axios` → `fetch` (single usage; removes a ~14 kB client dependency).
- Add a "Confirm password" field backed by a `refine` in the form schema.
- Add `aria-invalid` to every input so the destructive ring shows.

### 2.3 `components/navbar/Navbar.tsx`

- Delete stale `Login` and `Signup` imports (lines 16-17) and the unused `Button` import — clears 2 of the 3 `tsc` errors.
- Add `aria-label="Account"` to the profile link and labels to the Search/Cart icons.

### 2.4 `app/shop/[slug]/page.tsx`

- `if (!product) notFound();` — unknown slugs currently render an empty shell.
- Use the generated type: `PageProps<"/shop/[slug]">` instead of the manual `{ params: Promise<{ slug: string }> }`.
- Remove the unused `Button` import (line 13).
- Render stars from `Math.round(product.rating)` instead of always 5.
- Remove the empty "Reviews" tab or give it a "No reviews yet" `TabsContent`.
- Replace the Lorem ipsum block with `product.description`.

**Acceptance criteria**

- Wrong password → error toast, no session.
- Correct login → redirect to `/`.
- Duplicate email → 409 toast.
- `/shop/unknown-slug` → 404.
- `pnpm exec tsc --noEmit` is clean.

---

## Phase 3 — Responsive + accessibility pass

### 3.1 Layout

- `app/page.tsx:9`: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4`.
- `app/layout.tsx`: move `<Toaster richColors position="bottom-right" />` out of the max-width wrapper, directly under `<body>`.
- Wrap `{children}` in `<main>`.

### 3.2 Forms

- Add `id` + `htmlFor` to every `FieldLabel`/`Input` pair; the labels are currently not associated with their inputs.
- `autoComplete`: `name`, `email`, `current-password`, `new-password`.
- Password toggle: remove `tabIndex={-1}`, add `aria-label="Show password"` + `aria-pressed={showPassword}`.

### 3.3 Mobile navigation

- Preferred: `pnpm exec shadcn add sheet`, then replace the hand-rolled drawer with `Sheet` (backdrop, focus trap, Escape handling, `aria-expanded` for free).
- If kept custom: use `<button>` for Menu/Back, add `aria-expanded`/`aria-controls`, backdrop click-to-close, Escape handler, and unmount or `inert` the links when closed.

**Acceptance criteria**

- One-column grid at 375 px, no horizontal scroll.
- Every form field has an associated label.
- Password toggle is reachable by Tab and announces its state.
- Drawer traps focus, closes on Escape and backdrop click.

---

## Phase 4 — Catalog and pricing

### 4.1 `lib/data/products.ts` (new)

```ts
export const getProducts = async (): Promise<ProductType[]> => asset.products;
export const getProductBySlug = async (slug: string) =>
  asset.products.find((product) => product.slug === slug);
```

Home and detail pages consume these; this is the seam for moving to Mongo later.

### 4.2 `/shop` page

- Replace the placeholder with a heading, result count, and the shared product grid.
- Extract `components/product/ProductGrid.tsx` and use it on both `/` and `/shop`.

### 4.3 Pricing

- Add `lib/format.ts` with `formatPrice(n)` using `Intl.NumberFormat("en-US", { style: "currency", currency: "USD" })`.
- Replace every `৳` literal in `ProductCard`, the detail page, and the "Save X" badge.
- Fix the "save" calculation: use `price - discountPrice` (the detail page currently applies `Math.ceil` to the difference, and `ProductCard` labels a USD difference with `৳`).

### 4.4 Images

- `next.config.ts`: add `images.remotePatterns` for `images.unsplash.com`.
- Convert `<img>` in `ProductCard` and `ImageView` to `<Image>` with `fill` + `sizes` inside the existing relative wrappers.
- Add `sizes` to the Hero slides and product images.

**Acceptance criteria**

- `/shop` lists every product.
- Prices render consistently as USD.
- No `no-img-element` warnings.
- Unsplash images are served through the optimizer.

---

## Phase 5 — Google users in Mongo (optional this pass)

- In `app/auth.ts`, add a `signIn` callback: when `account?.provider === "google"` and the email exists, `connectDB()` then
  ```ts
  User.findOneAndUpdate(
    { email: user.email },
    { $setOnInsert: { name, image, provider: "google", role: "user" } },
    { upsert: true, new: true },
  );
  ```
- Make the `jwt` callback store the Mongo `_id` from the resolved user, not the Google profile id.
- Decide the collision policy for an existing credentials user signing in with Google. Google verifies emails, so linking is acceptable, but it must be explicit; silent linking is an account-takeover vector if that assumption ever breaks.

**Acceptance criteria**

- Google sign-in creates exactly one `User` document per email.
- Repeated sign-ins do not duplicate users.
- `session.user.id` matches the Mongo `_id`.

---

## Phase 6 — Quality gates and docs

- Rewrite `README.md`: purpose, pnpm setup, env var **names only**, route map, roadmap.
- Optional: add `"typecheck": "tsc --noEmit"` to `package.json` (there is no script today).
- Clear remaining lint warnings: unused `setIsGoogleLoading` in `SignupCard`, unused `Button` in the detail page.

---

## Verification

Run after every phase:

```bash
pnpm exec tsc --noEmit     # must be clean (currently 3 errors)
pnpm lint                  # must be clean (currently 3 errors, 11 warnings)
pnpm build                 # catches cacheComponents/Suspense violations
```

Manual smoke tests:

1. Signup with a weak password → inline Zod errors, no request sent.
2. Signup valid → success toast + redirect to `/login`, hash in DB.
3. Signup same email twice → 409 toast.
4. Login wrong password → error toast, no session.
5. Login correct → redirect to `/`, `session.user.role` present.
6. `POST /api/register {"role":"admin"}` → created as `user`.
7. `/shop/unknown-slug` → 404.
8. 375 px viewport: one-column grid, drawer opens/closes, no horizontal scroll.
9. Keyboard-only: tab through the login form, reach the password toggle, submit with Enter.
10. Google sign-in (Phase 5 only) → user appears in Mongo exactly once.

---

## Risks and notes

- **Existing DB rows are plaintext.** The new hash hook does not re-hash them. Drop the `users` collection in dev; for real data, write a migration or force password resets.
- **Unique email index** may not exist on old collections. Verify with `db.users.getIndexes()`; `autoIndex` only runs in dev.
- **`cacheComponents` + session reads:** when the navbar starts reading the session, wrap it in `<Suspense>` (or use a client component) or the build fails.
- **Google account linking (Phase 5)** is the only change with a real security decision — do not ship it without confirming the verified-email assumption.
- **Adding `bcryptjs`** is the only new runtime dependency; swapping `axios` → `fetch` removes one.
- **Effort:** Phase 1 ~3 h, Phase 2 ~2 h, Phase 3 ~2 h, Phase 4 ~3 h, Phase 5 ~1.5 h, Phase 6 ~1 h.

---

## Execution order

1. Phase 1 — security (blocking; nothing else should ship before this).
2. Phase 2 — broken flows and typecheck.
3. Phase 3 — responsive/a11y.
4. Phase 4 — catalog and pricing.
5. Phase 5 — Google persistence (optional, needs a decision).
6. Phase 6 — docs and remaining warnings.

Stop and re-confirm if a phase reveals work outside this plan.
