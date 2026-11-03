# Table13 — brand site

A static, zero-build marketing site for the Table13 supper club: a cinematic
landing page and a seat-booking / prepay flow. Plain HTML + CSS + a little
vanilla JS — nothing to compile. Deploys to Vercel as-is.

## What's here

```
index.html        Landing page (hero, experience, menu series, Inner Circle, newsletter)
booking.html      Reserve-a-seat flow (tier + quantity + Razorpay/UPI, live total)
assets/styles.css Design system (warm candlelight palette, Fraunces + Inter)
assets/app.js     Booking interactivity + newsletter capture
videos/           Drop your AI-generated clips here (see videos/README.txt)
vercel.json       Static config (clean URLs)
```

## Run locally

Any static server works, e.g.:

```bash
npx serve .
# or
python3 -m http.server 3000
```

Then open http://localhost:3000

## Deploy to Vercel (via this GitHub repo)

1. Push this repo to GitHub (already done if Claude set it up for you).
2. Go to vercel.com → **Add New… → Project** → **Import** this repo.
3. Framework preset: **Other**. Build command: *(none)*. Output dir: `.` (root).
4. **Deploy.** Vercel serves the static files and gives you a URL.

Every push to the default branch redeploys automatically. For a custom
domain (table13.in), add it under the project's **Domains** tab.

## Add the AI video clips

See `videos/README.txt`. Drop `hero.mp4` and `northeast.mp4` into `videos/`,
commit, push — Vercel redeploys and the clips appear. Until then, the
candlelight motion loop plays as a graceful fallback.

## Fill in the real details

Search-and-replace these placeholders before going live:

- `[DATE]` — the next night's date
- `[SEAT PRICE]` — your per-seat price (the booking page uses indicative
  ₹4,500 / ₹6,200 in `assets/app.js` — set your real rates there)
- `[ADDRESS ON CONFIRMATION]`, `[LIC NO.]` — footer details / FSSAI licence

## Wire up real payments

`assets/app.js` has a `payBtn` click handler with a marked spot to create a
Razorpay order and open Checkout. Right now it just shows the confirmation
state so the flow is demoable. Keep your Razorpay keys on a small server /
serverless function — never in this client code.
