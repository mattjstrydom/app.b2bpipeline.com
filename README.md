# B2B Pipeline — Partner/Channel Pipeline (PRM-lite)

The affordable B2B partner pipeline: track partner deals, referrals, and commissions
in one simple tool. Built with Next.js 14 (App Router) + Supabase + Tailwind.

> **Status:** `next build` passes (all 6 routes compile). Needs a Supabase project to run.

---

## 0. Prerequisites

- Node.js 18.18+ or 20+
- A free [Supabase](https://supabase.com) account
- (Optional) a Stripe account for billing — **not required** to run the MVP

---

## 1. Create the Supabase project

1. Go to https://supabase.com/dashboard → **New project**.
2. Name it (e.g. `b2bpipeline`), set a strong DB password, pick a region.
3. Wait ~1 min for it to provision.

---

## 2. Run the database schema

1. In the Supabase dashboard, open **SQL Editor** → **New query**.
2. Open `supabase/schema.sql` from this repo, paste the **entire** contents into the editor.
3. Click **Run**.

This creates:
- Tables: `orgs`, `users`, `partners`, `referrals`, `deals`, `commissions`, `payouts`
- Row-Level Security (RLS) policies scoped per-org
- A **signup trigger** (`on_auth_user_created`) that auto-creates an org + `users`
  row when someone signs up. **This is required** — without it the dashboard can't
  resolve your `org_id` and the app shows no data.

> You can verify by running: `select * from orgs;` (empty until first signup).

---

## 3. Get your API keys

1. In Supabase, go to **Project Settings → API**.
2. Copy:
   - **Project URL** (looks like `https://xxxx.supabase.co`)
   - **anon public** key (the long `eyJ...` string)

---

## 4. Configure environment

1. Copy the example env file:
   ```bash
   cp .env.example .env.local
   ```
2. Edit `.env.local` and paste your values:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```
   (Leave `STRIPE_*` blank for now — billing is stubbed in the UI.)

---

## 5. Install & run

```bash
npm install
npm run dev
```

Open http://localhost:3000.

> First load: the landing page is static. Click **Start free** → **Sign up** with
> any email + password. The signup trigger creates your org. You'll be redirected
> to `/dashboard`.

---

## 6. Use it (happy path — proves the MVP works)

1. **Partners tab** → add a partner (e.g. "Acme Reseller", type `reseller`, rate `0.10`).
2. **Pipeline tab** → **+ New deal**, name it, set amount (e.g. `5000`), assign the partner, stage `registered`.
3. Move the deal → **✓ Won**.
4. A **commission** row is auto-created: `5000 × 0.10 = 500`, status `pending`.
5. **Payouts tab** → **Download CSV** → you get a clean commission export.

That's the whole loop, with zero spreadsheet use. ✅

---

## 7. Deploy (Vercel, recommended)

1. Push this folder to a GitHub repo.
2. In Vercel, **New Project** → import the repo.
3. Add the same env vars (Step 4) in Vercel → Project Settings → Environment Variables.
4. Deploy. Set `NEXT_PUBLIC_APP_URL` to your production URL.
5. (Optional) Wire Stripe: add `STRIPE_SECRET_KEY` + `STRIPE_WEBHOOK_SECRET`, then
   build the `/api/checkout` route referencing `lib/stripe.ts` (not yet scaffolded —
   see "Not yet built" below).

---

## Project structure

```
app/
  layout.tsx            # root layout + globals
  page.tsx             # marketing landing + pricing
  login/page.tsx       # signup + signin (client)
  dashboard/
    page.tsx            # server: auth check + data load
    DashboardClient.tsx # client shell: tabs, stat cards
    KanbanBoard.tsx     # deal board + auto-commission on Won
    PartnerList.tsx     # partner CRUD
    ReferralList.tsx    # referral tracking
    PayoutExport.tsx    # CSV export
lib/
  supabaseClient.ts     # browser client
  supabaseServer.ts     # server client (cookies)
  commission.ts         # stages + commission math
supabase/
  schema.sql            # tables + RLS + signup trigger
```

---

## Not yet built (honest scope)

- **Stripe billing enforcement** — tiers are displayed but plans aren't gated by
  payment yet. `lib/stripe.ts` is referenced in spec but not created.
- **HubSpot / Stripe deal sync** — CSV import is the MVP bridge.
- **Partner self-serve portal** — partners are managed by the org owner only.
- **Automated payouts** (Stripe Connect) — CSV export is the v1 stand-in.
- **Alerts** (email/Slack on stage change) — n8n wiring described in spec, not coded.

## Security note

`next@14.2.5` carries a published advisory. Before any real deploy, bump to the
latest patched 14.2.x (`npm i next@^14.2.33` or newer) and re-run `npm run build`.
