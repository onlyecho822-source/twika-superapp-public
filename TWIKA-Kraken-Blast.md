# TWIKA — Kraken Blast
### Product Review · Launch Kickoff · Who Does What

---

## What Is TWIKA?

TWIKA is a **reverse-auction gig economy super app** built for Chicago, going global.

The model is simple and brutal in the best way: a customer posts a job and sets a price. Workers in the area see it and bid **down** to win it. The customer picks the lowest bid. No surge pricing. No algorithm. No middleman setting rates. Workers compete — customers always win.

It is the opposite of Uber, DoorDash, and Instacart. Those platforms take 30–40% and set the price. TWIKA takes 20% and lets the market decide.

---

## What Is Live Right Now

| Service | Status | Starting Price |
|---|---|---|
| Rideshare | **LIVE** | From $7 |
| Food Delivery | **LIVE** | From $7 |
| Grocery Delivery | **LIVE** | From $9 |
| Laundry Pickup | **LIVE** | From $9 |
| Medical Transport | **LIVE** | From $16.50 |
| Car Rental | **LIVE** | Customer sets rate |
| Cannabis Delivery | Coming Soon | Pending IL Law |
| Peer Car Rental (Turo-style) | Coming Soon | P2P |
| Stays & Rentals (Airbnb-style) | Coming Soon | P2P |
| Barter Exchange | **LIVE** at /board | Free |

---

## The Platform — What's Built

**Customer Flow**
1. Customer opens the app, picks a service, enters pickup/dropoff
2. App calculates price: $6 base + $1/mile + 7.5% IL tax + 20% TWIKA cut
3. Customer posts the job — workers in the area are notified instantly
4. Workers bid down (competitive auction, 30-second auto-accept timer)
5. Customer picks the best bid, pays through Stripe, job is done

**Worker Flow**
1. Worker signs up at `/join` — free, 2 minutes, no commitment
2. Sets services, vehicle type, availability
3. Sees live open jobs on their dashboard — bids in real time
4. Wins job → earns 80% of the accepted bid + 100% of tips
5. Paid via Stripe Connect direct deposit

**Admin / Operations**
- Full Admin Dashboard at `/admin` — jobs, users, bids, revenue, referrals, feedback
- Backend Manager at `/manager` — site health, DB status, team management
- Community Trade Board at `/board` — free barter exchange, no money required
- Providers Directory at `/providers` — browse available workers by service

---

## The Numbers

| Metric | Value |
|---|---|
| TWIKA cut per job | 20% of accepted bid |
| Worker earns | 80% of accepted bid + 100% of tips |
| Base fare | $6 + $1/mile |
| IL Tax | 7.5% |
| Minimum bid floor | $0.80/mile |
| Stripe processing | ~2.9% + $0.30 (standard) |

**Example:** Customer posts a rideshare for $15. Worker bids $12. Customer accepts.
- Worker earns: $9.60 (80%)
- TWIKA earns: $2.40 (20%)
- Customer paid: $12

---

## What Makes This Different

**1. Workers set their own price.** No algorithm. No fixed rate. A worker with a slow day bids lower to win. A worker with a premium vehicle bids higher and wins on trust.

**2. No surge pricing. Ever.** Uber charges 3x on New Year's Eve. TWIKA doesn't. The market self-corrects — more demand means more workers show up to bid.

**3. Multi-modal workers.** Car, bike, moped, scooter, on foot. A food delivery on a bike in Wicker Park is cheaper than a car. The customer benefits.

**4. 6 services in one app.** Rideshare, food, grocery, laundry, medical transport, car rental. One login. One wallet. One trust layer.

**5. Community layer.** The Trade Board lets anyone post "I have X, I want Y" — no money required. This builds neighborhood loyalty that no gig app has.

---

## Who Needs to Kick This Off

### Role 1 — The Operator (Nathan / Owner)
**You are already this person.**

Your immediate actions:
- [ ] Hit **Publish** in the Manus Management UI — the app is built and ready
- [ ] Enable GitHub Pages at https://github.com/onlyecho822-source/twika-superapp-public/settings/pages
- [ ] Claim your Stripe sandbox at https://dashboard.stripe.com/claim_sandbox/YWNjdF8xVHFVWHVBWjdZRkxlaFZnLDE3ODQwNzU1MTQv100XKboVENt (deadline: Sept 6, 2026)
- [ ] Share `/join` link with your first 10 workers in Chicago
- [ ] Post in Chicago Facebook groups, Nextdoor, Reddit r/chicago — "Workers wanted, you set your own pay"

---

### Role 2 — The First Worker (Chicago-based, any vehicle)
**This person makes or breaks the launch.**

What they need to know:
- Go to **https://twikasuper-sfinbkx7.manus.space/join**
- Sign up free — takes 2 minutes
- Set your services (rideshare, food, etc.) and vehicle type
- Open the Worker Dashboard and watch for live jobs
- Bid on anything within your range — you set the price
- Win the job, do the work, get paid 80% via Stripe

The pitch to them: *"Uber takes 40% and tells you what to charge. TWIKA takes 20% and you set your own rate. You're the boss."*

---

### Role 3 — The First Customer (Chicago resident)
**This person validates the model.**

What they need to know:
- Go to **https://twikasuper-sfinbkx7.manus.space**
- Sign in, pick a service, enter your pickup and dropoff
- See the price estimate (transparent breakdown — base + miles + tax)
- Post the job — workers near you will bid within minutes
- Pick the lowest bid, pay through the app, done

The pitch to them: *"No surge pricing. Workers compete for your business. You always get the best price."*

---

### Role 4 — The Community Connector (Optional, High Value)
**A local Chicago organizer, church leader, neighborhood captain, or social media influencer.**

What they do:
- Spread the word in their network — workers AND customers
- Post the Trade Board link for neighbors who want to barter services
- Become a TWIKA ambassador — gets a referral code, earns credit for every worker they bring in

---

## The 3-Day Launch Sequence

**Day 1 — Seed the Supply**
- Get 5–10 workers signed up and available in Chicago
- Confirm at least 1 worker per service category is live

**Day 2 — Post the First Job**
- Nathan or a trusted person posts a real job (rideshare or food delivery)
- Worker bids, job completes, payment processes
- Screenshot the completed transaction — this is your proof of concept

**Day 3 — Go Public**
- Post the proof-of-concept screenshot on social media
- Share the landing page and app link
- Open the customer waitlist to the public

---

## The One Thing That Kills This

**No workers on the platform when the first customer posts a job.**

If a customer posts a job and no one bids within 5 minutes, they leave and never come back. The entire launch strategy must be **supply-first**. Get workers signed up before you advertise to customers.

---

## Links

| Resource | URL |
|---|---|
| Live App | https://twikasuper-sfinbkx7.manus.space |
| Worker Signup | https://twikasuper-sfinbkx7.manus.space/join |
| Post a Job | https://twikasuper-sfinbkx7.manus.space/rider/post |
| Trade Board | https://twikasuper-sfinbkx7.manus.space/board |
| Admin Dashboard | https://twikasuper-sfinbkx7.manus.space/admin |
| Landing Page Repo | https://github.com/onlyecho822-source/twika-superapp-public |
| Echo Sovereign API | http://34.139.8.122:8822 |

---

*Built by Manus · Operated by Nathan Poinsette · Chicago, IL · Going Global*
*TWIKA SuperApp — The Pricing You Deserve, The Platform You Control*
