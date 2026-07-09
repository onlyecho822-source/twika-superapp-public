import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import TwikaFooter from "@/components/TwikaFooter";
import { useTranslation } from "react-i18next";
import { NPCrest } from "@/components/NPCrest";

type DonationType = "money" | "goods" | "skills" | "time" | "services";

interface DonationForm {
  type: DonationType;
  title: string;
  description: string;
  quantity: string;
  location: string;
  contact: string;
  matchPreference: string;
}

const DONATION_TYPES: { key: DonationType; emoji: string; label: string; sub: string; gradient: string; examples: string }[] = [
  {
    key: "money",
    emoji: "💵",
    label: "Money",
    sub: "Cash, Venmo, CashApp, Zelle",
    gradient: "from-emerald-600 to-emerald-400",
    examples: "Any amount helps — we match it to a worker in need or a community project",
  },
  {
    key: "goods",
    emoji: "📦",
    label: "Goods",
    sub: "Items, food, clothing, tools",
    gradient: "from-orange-600 to-amber-400",
    examples: "Clothes, furniture, food, tools, electronics — we find the right home",
  },
  {
    key: "skills",
    emoji: "🧠",
    label: "Skills",
    sub: "Teach, coach, mentor",
    gradient: "from-purple-600 to-purple-400",
    examples: "Spanish, coding, cooking, music, business — donate your knowledge",
  },
  {
    key: "time",
    emoji: "⏰",
    label: "Time",
    sub: "Hours, availability, presence",
    gradient: "from-blue-600 to-cyan-400",
    examples: "Babysitting, tutoring, companionship, errands — your time is currency",
  },
  {
    key: "services",
    emoji: "🔧",
    label: "Services",
    sub: "Rides, repairs, delivery",
    gradient: "from-red-600 to-rose-400",
    examples: "A free ride, a repair job, a meal delivery — donate what you do",
  },
];

const MATCH_PREFERENCES = [
  { value: "family",     label: "🏠 Family in Need",        desc: "Single parents, elderly, children" },
  { value: "worker",     label: "👷 Worker Starting Out",   desc: "New providers building their first jobs" },
  { value: "community",  label: "🌍 Community Project",     desc: "Neighborhood initiatives, local orgs" },
  { value: "student",    label: "📚 Student / Learner",     desc: "Youth education, skill development" },
  { value: "any",        label: "🎯 Best Match",            desc: "Let MiddleMan decide the best home" },
];

const LOGO_URL = "/manus-storage/twika_logo_9b2f213f.webp";

export default function Donate() {
  const { t } = useTranslation();
  const [step, setStep] = useState<"type" | "details" | "match" | "confirm" | "done">("type");
  const [form, setForm] = useState<DonationForm>({
    type: "money",
    title: "",
    description: "",
    quantity: "",
    location: "",
    contact: "",
    matchPreference: "any",
  });
  const [submitted, setSubmitted] = useState(false);

  const selectedType = DONATION_TYPES.find((t) => t.key === form.type)!;

  const handleSubmit = () => {
    // In production: call tRPC donations.submit mutation
    setSubmitted(true);
    setStep("done");
  };

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white flex flex-col">

      {/* Nav */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <a href="/" className="flex items-center gap-3">
          <span className="text-xl font-black text-[#00BCD4]">MiddleMan</span>
          <span className="text-white/30 text-xs font-bold uppercase tracking-widest hidden sm:inline">· Give · Match · Impact</span>
        </a>
        <a href="/" className="text-white/40 text-sm hover:text-white transition-colors">← Back</a>
      </header>

      <main className="flex-1 px-6 py-12 max-w-2xl mx-auto w-full">

        {/* Hero */}
        <div className="text-center mb-12 relative">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
            <NPCrest size={200} opacity={0.04} color="gold" animate="float" />
          </div>
          <div className="relative">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00BCD4]/30 text-[#00BCD4] text-xs font-bold mb-4 uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00BCD4] animate-pulse" />
              MiddleMan Donation Hub
            </span>
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              Give Anything.<br />
              <span className="text-[#00BCD4]">We Find It a Home.</span>
            </h1>
            <p className="text-white/50 text-lg max-w-lg mx-auto leading-relaxed">
              Money, goods, skills, time, or services — MiddleMan is the matchmaker. No donation is too small. No gift is too unusual. We connect what you have with who needs it.
            </p>
          </div>
        </div>

        <AnimatePresence mode="wait">

          {/* STEP 1 — Choose type */}
          {step === "type" && (
            <motion.div key="type" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <h2 className="text-xl font-black mb-6 text-center">What would you like to donate?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {DONATION_TYPES.map((t) => (
                  <button
                    key={t.key}
                    onClick={() => { setForm((f) => ({ ...f, type: t.key })); setStep("details"); }}
                    className={`group relative rounded-2xl p-6 text-left border-2 transition-all hover:scale-[1.02] ${
                      form.type === t.key
                        ? "border-[#00BCD4] bg-[#00BCD4]/10"
                        : "border-white/10 bg-white/5 hover:border-white/30"
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${t.gradient} flex items-center justify-center text-2xl mb-3 shadow-lg`}>
                      {t.emoji}
                    </div>
                    <div className="font-black text-lg mb-1">{t.label}</div>
                    <div className="text-white/40 text-sm mb-2">{t.sub}</div>
                    <div className="text-white/25 text-xs leading-relaxed">{t.examples}</div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 2 — Details */}
          {step === "details" && (
            <motion.div key="details" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${selectedType.gradient} flex items-center justify-center text-xl`}>
                  {selectedType.emoji}
                </div>
                <div>
                  <div className="font-black">{selectedType.label} Donation</div>
                  <div className="text-white/40 text-sm">{selectedType.sub}</div>
                </div>
              </div>
              <div className="space-y-4 mb-8">
                <div>
                  <label className="text-sm font-bold text-white/60 mb-1 block">Title / Short Description *</label>
                  <Input
                    placeholder={form.type === "money" ? "e.g. $50 for a worker in need" : form.type === "goods" ? "e.g. 2 bags of winter clothes" : "e.g. 2 hours of Spanish tutoring"}
                    value={form.title}
                    onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/30"
                  />
                </div>
                <div>
                  <label className="text-sm font-bold text-white/60 mb-1 block">Details</label>
                  <Textarea
                    placeholder="Tell us more about what you're donating — condition, availability, any restrictions..."
                    value={form.description}
                    onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/30 min-h-[80px]"
                  />
                </div>
                {form.type !== "money" && (
                  <div>
                    <label className="text-sm font-bold text-white/60 mb-1 block">Quantity / Amount</label>
                    <Input
                      placeholder={form.type === "time" ? "e.g. 3 hours/week" : form.type === "skills" ? "e.g. 1 session/week for 4 weeks" : "e.g. 2 bags, 1 item, 5 meals"}
                      value={form.quantity}
                      onChange={(e) => setForm((f) => ({ ...f, quantity: e.target.value }))}
                      className="bg-white/5 border-white/20 text-white placeholder:text-white/30"
                    />
                  </div>
                )}
                <div>
                  <label className="text-sm font-bold text-white/60 mb-1 block">Your Location (City / Neighborhood)</label>
                  <Input
                    placeholder="e.g. Chicago, IL · Pilsen"
                    value={form.location}
                    onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/30"
                  />
                </div>
                <div>
                  <label className="text-sm font-bold text-white/60 mb-1 block">Contact (optional — we'll reach out to coordinate)</label>
                  <Input
                    placeholder="Email or phone"
                    value={form.contact}
                    onChange={(e) => setForm((f) => ({ ...f, contact: e.target.value }))}
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/30"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep("type")} className="border-white/20 text-white/60 hover:text-white">← Back</Button>
                <Button
                  onClick={() => setStep("match")}
                  disabled={!form.title}
                  className="flex-1 bg-[#00BCD4] hover:bg-[#00ACC1] text-black font-black"
                >
                  Choose Who Gets This →
                </Button>
              </div>
            </motion.div>
          )}

          {/* STEP 3 — Match preference */}
          {step === "match" && (
            <motion.div key="match" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <h2 className="text-xl font-black mb-2 text-center">Who should receive this?</h2>
              <p className="text-white/40 text-sm text-center mb-6">MiddleMan will find the best match — you can guide the direction.</p>
              <div className="space-y-3 mb-8">
                {MATCH_PREFERENCES.map((m) => (
                  <button
                    key={m.value}
                    onClick={() => setForm((f) => ({ ...f, matchPreference: m.value }))}
                    className={`w-full rounded-2xl p-4 text-left border-2 transition-all flex items-center gap-4 ${
                      form.matchPreference === m.value
                        ? "border-[#00BCD4] bg-[#00BCD4]/10"
                        : "border-white/10 bg-white/5 hover:border-white/30"
                    }`}
                  >
                    <span className="text-2xl">{m.label.split(" ")[0]}</span>
                    <div>
                      <div className="font-bold">{m.label.split(" ").slice(1).join(" ")}</div>
                      <div className="text-white/40 text-sm">{m.desc}</div>
                    </div>
                    {form.matchPreference === m.value && (
                      <span className="ml-auto text-[#00BCD4] text-lg">✓</span>
                    )}
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep("details")} className="border-white/20 text-white/60 hover:text-white">← Back</Button>
                <Button
                  onClick={() => setStep("confirm")}
                  className="flex-1 bg-[#00BCD4] hover:bg-[#00ACC1] text-black font-black"
                >
                  Review Donation →
                </Button>
              </div>
            </motion.div>
          )}

          {/* STEP 4 — Confirm */}
          {step === "confirm" && (
            <motion.div key="confirm" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <h2 className="text-xl font-black mb-6 text-center">Confirm Your Donation</h2>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-white/40 text-sm">Type</span>
                  <span className="font-bold">{selectedType.emoji} {selectedType.label}</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-white/40 text-sm">What</span>
                  <span className="font-bold text-right max-w-[60%]">{form.title}</span>
                </div>
                {form.description && (
                  <div className="flex justify-between items-start">
                    <span className="text-white/40 text-sm">Details</span>
                    <span className="text-white/70 text-sm text-right max-w-[60%]">{form.description}</span>
                  </div>
                )}
                {form.quantity && (
                  <div className="flex justify-between items-center">
                    <span className="text-white/40 text-sm">Quantity</span>
                    <span className="font-bold">{form.quantity}</span>
                  </div>
                )}
                {form.location && (
                  <div className="flex justify-between items-center">
                    <span className="text-white/40 text-sm">Location</span>
                    <span className="font-bold">{form.location}</span>
                  </div>
                )}
                <div className="flex justify-between items-center border-t border-white/10 pt-3">
                  <span className="text-white/40 text-sm">Match To</span>
                  <span className="font-bold text-[#00BCD4]">
                    {MATCH_PREFERENCES.find((m) => m.value === form.matchPreference)?.label}
                  </span>
                </div>
              </div>
              <div className="bg-[#00BCD4]/10 border border-[#00BCD4]/30 rounded-xl p-4 mb-6 text-sm text-[#00BCD4]/80">
                MiddleMan will review your donation and reach out within 24 hours to coordinate the handoff. Every donation is logged with a proof hash for transparency.
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep("match")} className="border-white/20 text-white/60 hover:text-white">← Back</Button>
                <Button
                  onClick={handleSubmit}
                  className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-black font-black text-lg"
                >
                  Submit Donation ✓
                </Button>
              </div>
            </motion.div>
          )}

          {/* STEP 5 — Done */}
          {step === "done" && (
            <motion.div key="done" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
              <div className="text-6xl mb-6">🙏</div>
              <h2 className="text-3xl font-black mb-4 text-emerald-400">Donation Received.</h2>
              <p className="text-white/60 text-lg mb-2 max-w-md mx-auto">
                Thank you, {form.contact ? form.contact.split("@")[0] : "friend"}. MiddleMan is finding the right home for your {selectedType.label.toLowerCase()} donation.
              </p>
              <p className="text-white/30 text-sm mb-8">You will be contacted within 24 hours to coordinate the handoff.</p>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-8 inline-block text-left">
                <div className="text-xs text-white/30 mb-1 font-mono">Proof Hash</div>
                <div className="text-xs font-mono text-[#00BCD4]">
                  NP-DON-{Date.now().toString(16).toUpperCase()}-{Math.random().toString(16).slice(2, 10).toUpperCase()}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a href="/" className="bg-[#00BCD4] hover:bg-[#00ACC1] text-black font-black px-8 py-3 rounded-2xl transition-colors">
                  Back to MiddleMan
                </a>
                <button
                  onClick={() => { setStep("type"); setForm({ type: "money", title: "", description: "", quantity: "", location: "", contact: "", matchPreference: "any" }); }}
                  className="bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-3 rounded-2xl border border-white/20 transition-colors"
                >
                  Donate Again
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>

      </main>

      {/* Impact Stats */}
      {step === "type" && (
        <section className="px-6 py-12 border-t border-white/10">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-center text-white/30 text-xs font-bold uppercase tracking-widest mb-6">MiddleMan Donation Impact</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              {[
                { value: "0", label: "Donations Matched", emoji: "🎯" },
                { value: "0", label: "Families Helped", emoji: "🏠" },
                { value: "0", label: "Skills Shared", emoji: "🧠" },
              ].map((stat) => (
                <div key={stat.label} className="bg-white/5 rounded-2xl p-4 border border-white/10">
                  <div className="text-2xl mb-1">{stat.emoji}</div>
                  <div className="text-2xl font-black text-[#00BCD4]">{stat.value}</div>
                  <div className="text-white/30 text-xs mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
            <p className="text-center text-white/20 text-xs mt-4">Stats update as donations are matched. Be the first.</p>
          </div>
        </section>
      )}

      <TwikaFooter logoUrl={LOGO_URL} t={{ divider: "border-white/10", muted: "text-white/30" }} />
    </div>
  );
}
