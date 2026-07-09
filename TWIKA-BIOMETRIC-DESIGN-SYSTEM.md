# TWIKA Biometric Design System
## Award Nomination Architecture
*Designed: Jul 09, 2026 — For Chicago Innovation Awards 2026*

---

## THE THESIS

> "The app does not wait for you to interact with it. It reads you."

TWIKA is the first gig economy platform where the interface responds to the human body — not just the finger. Every color has a reason. Every animation has a trigger. Every sound has a meaning. The app is alive.

---

## PURPOSEFUL COLOR LANGUAGE

Every color in TWIKA carries a specific meaning. This is not decoration — it is communication.

| Color | Hex | Meaning | Where Used |
|---|---|---|---|
| **Cyan** | `#00BCD4` | Trust, transparency, water (flow of money) | Primary brand, active states, bid accepted |
| **Navy** | `#0a0f1e` | Night, safety, the city at 2am | Background, dark sections |
| **Emerald** | `#10b981` | Money earned, job complete, worker paid | Success states, completed jobs, earnings |
| **Red** | `#CE1126` | Dominican Republic, urgency, high demand | DR market, cancellation, alert |
| **Gold** | `#FFD700` | Jamaica, premium, reward unlocked | Jamaica market, sponsor rewards, gold tier |
| **Green** | `#008751` | Nigeria, growth, community | Nigeria market, community board |
| **White** | `#ffffff` | Clarity, no hidden fees, transparency | Text on dark, price display |
| **Amber** | `#f59e0b` | Caution, bid expiring, timer warning | Countdown timers, bid expiry |
| **Purple** | `#7c3aed` | AI, machine intelligence, Echo | AI Squad bids, ECHO-WORKER cards |

### The Color Tells the Story:
- When a bid arrives → **Cyan pulse** (trust is arriving)
- When a job completes → **Emerald flash** (money moves)
- When a bid expires → **Amber fade** (opportunity leaving)
- When an AI bids → **Purple glow** (machine intelligence entering)
- When you switch to DR market → **Red accent** (you are in Dominican Republic now)

---

## EYE BIO — GAZE-REACTIVE UI

### Technology: WebGazer.js (browser-based eye tracking via webcam) + Mouse-proximity fallback

### What it does:
The UI responds to where the user is looking. Cards "wake up" when gazed at. The background subtly shifts. The bid feed highlights the bid the user is focused on.

### Interactions:
1. **Card Awakening** — Service cards brighten and scale slightly when the cursor/gaze approaches. Cards at the edge of the screen are dimmed. Only what you are looking at is fully alive.
2. **Focus Spotlight** — A soft radial gradient follows the gaze point, illuminating the area of focus while dimming the periphery. Subtle. Not distracting.
3. **Bid Highlight** — In the bid list, the bid closest to the user's gaze gets a cyan left-border pulse. The user's eye is drawn to the best bid.
4. **Parallax Hero** — The hero text layers move at different speeds relative to cursor position. The headline moves 2px, the subtext moves 4px, the background moves 8px. Creates depth.

### Fallback (no webcam / permission denied):
Mouse proximity triggers all the same effects. The experience degrades gracefully — no broken UI, no permission errors shown to user.

---

## EAR BIO — AMBIENT SOUND DETECTION

### Technology: Web Audio API (MediaDevices.getUserMedia, AudioContext, AnalyserNode)

### What it does:
The app listens to the ambient environment (with permission) and responds to sound levels and voice triggers.

### Interactions:
1. **Ambient Pulse** — When ambient sound is detected above a threshold, the hero background pulse animation speeds up slightly. In a loud environment (bar, street), the app feels more energetic. In a quiet environment, it calms down.
2. **Voice Trigger** — Saying "Post a job" or "Show bids" activates the corresponding action using the Web Speech API (SpeechRecognition). No button required.
3. **Sound Reactive Bid Cards** — When a new bid arrives AND ambient sound is detected (user is in a noisy environment), the bid card animation is larger and more prominent so it cuts through visual noise.
4. **Mute Mode** — If the microphone detects near-silence for 30+ seconds, the app enters a "focus mode" — animations slow, colors soften, UI quiets down.

### Permission handling:
- First visit: no mic request. User must tap the "Enable Voice" button.
- Permission is stored in localStorage. Never re-requested without user action.
- If denied: full fallback to touch/click. No feature is lost.

---

## MOTION BIO — DEVICE MOTION REACTIONS

### Technology: DeviceMotion API, DeviceOrientation API, Intersection Observer

### What it does:
The app responds to how the user holds and moves their device.

### Interactions:
1. **Tilt Parallax** — The hero section responds to device tilt (gyroscope). Tilting the phone left/right shifts the background layer. The headline stays fixed. Creates a 3D depth effect on mobile.
2. **Shake to Refresh Bids** — Shaking the device (acceleration > 15m/s²) refreshes the bid feed with a satisfying "shake" animation on the cards. Faster than pulling to refresh.
3. **Portrait/Landscape Awareness** — Switching to landscape on the bid screen automatically expands the bid cards to a 2-column layout. Switching back collapses them.
4. **Walking Detection** — Rhythmic low-frequency motion (consistent 1-2Hz oscillation) detected as walking. When walking is detected, the app enters "glance mode" — larger text, fewer elements, higher contrast. Designed for reading while moving.
5. **Pocket Detection** — Proximity sensor + accelerometer: when the phone is face-down or in a pocket, all animations pause to save battery.

### Permission handling:
- iOS 13+ requires explicit permission for DeviceMotion. A single "Enable Motion" prompt is shown on first use of a motion feature.
- Android: no permission required.
- Desktop: mouse movement simulates tilt for testing.

---

## AWARD NOMINATION NARRATIVE

### Chicago Innovation Awards 2026 — Submission Statement

**What makes TWIKA unique:**

TWIKA is not just a gig economy app. It is the first platform where the interface reads the human body and responds in real time. Eye tracking wakes up the cards you look at. Your voice posts a job. Shaking your phone refreshes the bids. The ambient noise around you changes the energy of the animations.

Every color has a meaning. Cyan means trust. Emerald means money earned. Purple means AI is working for you. When you switch markets, the color of the entire app shifts to reflect that country's identity.

This is not a feature list. This is a philosophy: **the app should know you before you speak.**

**Social impact:**
- Chicago gig workers keep 75-90% of every transaction (vs 60% on Uber)
- 8 countries served — Dominican Republic, Puerto Rico, Jamaica, Haiti, Nigeria, Colombia, Philippines, USA
- AI agents (ARIA, DELI, ECHO-WORKER) ensure every worker gets a bid opportunity even at 3am
- Built by and for Chicago's underserved communities

**Technical innovation:**
- First reverse-auction gig economy platform with biometric UI
- WebGazer.js eye tracking in a production web app
- Web Audio API ambient detection wired to UI state
- DeviceMotion walking detection with automatic "glance mode"
- Cryptographic proof hash on every completed transaction (EchoShield)

---

## IMPLEMENTATION PRIORITY

| Feature | Browser Support | Fallback | Credit Cost |
|---|---|---|---|
| Mouse parallax (Eye Bio fallback) | 100% | N/A | Zero |
| Card awakening on hover/proximity | 100% | N/A | Zero |
| DeviceMotion tilt parallax | 85% mobile | Mouse movement | Zero |
| Shake to refresh | 85% mobile | Pull to refresh | Zero |
| Web Audio ambient pulse | 90% | Static animation | Zero |
| Voice trigger (Speech API) | 85% Chrome/Edge | Button tap | Zero |
| WebGazer.js eye tracking | 70% (needs webcam) | Mouse proximity | Zero |

**All features have graceful fallbacks. No feature breaks the app if unavailable.**
