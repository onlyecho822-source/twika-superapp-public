/**
 * AriaCopilot — MiddleMan's persistent AI companion.
 * Aria is always present. She knows where you are, what you need,
 * and she never lets you feel alone on the platform.
 *
 * "No prejudice. Just get the job done correctly and in a timely manner."
 * — Nathan Poinsette, MiddleMan Manifesto
 */

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";

// ── Context-aware messages per page ─────────────────────────────
const PAGE_MESSAGES: Record<string, string[]> = {
  "/": [
    "Hey! I'm Aria 👋 I'm here to help you every step of the way. What do you need today?",
    "New here? Tap 'Post a Job' and workers will start bidding for you within minutes.",
    "You're in control here. Workers compete for your job — you always pick the price.",
    "No surge pricing. No hidden fees. Just real workers, real bids, real savings.",
  ],
  "/rider/post": [
    "Let's get your job posted! Pick a service and I'll guide you through it.",
    "Be specific in your description — the more detail you give, the better the bids you'll get.",
    "Set your price as a starting point. Workers will bid at or below it.",
    "You're almost there! Hit 'Post Job' and bids will start coming in fast.",
  ],
  "/jobs": [
    "Here are all your active jobs. Tap any one to see the bids coming in.",
    "Bids are ranked lowest first — your best deal is always at the top.",
    "See a bid you like? Tap 'Accept' and your worker is confirmed instantly.",
    "AI agents (marked with 🤖) bid automatically — they're fast, reliable, and always competitive.",
  ],
  "/provider": [
    "Welcome to your Worker Dashboard. This is your command center.",
    "New jobs are posted every few minutes. Tap 'Browse Jobs' to start bidding.",
    "The lower your bid, the more likely you are to get picked — but bid what you're worth.",
    "Your rating grows with every completed job. Build it and earn more.",
  ],
  "/providers": [
    "These are the workers on MiddleMan. Every one of them is here to serve you.",
    "Check ratings and reviews before you post — you can request a specific worker.",
    "Workers come from Chicago, DR, PR, Jamaica, Nigeria, Colombia and more.",
  ],
  "/sponsors": [
    "Our sponsors make MiddleMan possible. Watch a short ad to unlock real rewards.",
    "Sponsor rewards can pay for your next ride or delivery. It's free money.",
    "Every sponsor here has been vetted. We only partner with businesses that serve our community.",
  ],
  "/ai-squad": [
    "Meet the AI Squad — Aria, Deli, and Echo. We bid on jobs alongside human workers.",
    "AI agents are available 24/7. We never sleep, never cancel, and always deliver.",
    "Think of us as your backup team. If no human bids, we always will.",
  ],
  "/board": [
    "The Community Board is where the community helps itself. Post what you need. Offer what you have.",
    "Help Needed, Help Wanted, and Barter — three ways to connect without money changing hands.",
    "This is the heart of MiddleMan. No algorithms. Just people helping people.",
  ],
  "/donate": [
    "Every donation finds a home here. Money, goods, skills, time — all of it matters.",
    "Post what you have. We'll match it to someone who needs it.",
    "This is MiddleMan at its purest — the platform that connects the solution to the problem.",
  ],
};

const DEFAULT_MESSAGES = [
  "I'm Aria — I'm always here if you need me. Just tap to chat.",
  "MiddleMan is built on one rule: no prejudice, just get the job done.",
  "You're never alone on this platform. I'm watching over every transaction.",
  "Questions? I'm right here. Tap me anytime.",
];

// ── Aria avatar SVG ──────────────────────────────────────────────
function AriaAvatar({ size = 40, pulse = false }: { size?: number; pulse?: boolean }) {
  return (
    <div
      className="relative flex items-center justify-center rounded-full"
      style={{
        width: size,
        height: size,
        background: "linear-gradient(135deg, #8b5cf6 0%, #00BCD4 100%)",
        boxShadow: pulse ? "0 0 0 0 rgba(139,92,246,0.7)" : "none",
      }}
    >
      {pulse && (
        <span
          className="absolute inset-0 rounded-full animate-ping"
          style={{ background: "rgba(139,92,246,0.3)" }}
        />
      )}
      <span style={{ fontSize: size * 0.5 }}>🤖</span>
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────
export function AriaCopilot() {
  const [location] = useLocation();
  const { user, isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [hasGreeted, setHasGreeted] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Get messages for current page
  const messages = PAGE_MESSAGES[location] ?? DEFAULT_MESSAGES;
  const currentMessage = messages[messageIndex % messages.length];

  // Personalize greeting
  const greeting = isAuthenticated && user?.name
    ? `Hey ${user.name.split(" ")[0]}! `
    : "";

  // Show bubble after 3 seconds on page load
  useEffect(() => {
    setMessageIndex(0);
    setDismissed(false);
    const timer = setTimeout(() => {
      if (!hasGreeted) {
        setShowBubble(true);
        setHasGreeted(true);
      } else {
        setShowBubble(true);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [location]);

  // Auto-rotate messages every 12 seconds when open
  useEffect(() => {
    if (!isOpen) return;
    const timer = setInterval(() => {
      setMessageIndex(i => i + 1);
    }, 12000);
    return () => clearInterval(timer);
  }, [isOpen]);

  // Auto-hide bubble after 8 seconds if not opened
  useEffect(() => {
    if (!showBubble || isOpen) return;
    const timer = setTimeout(() => setShowBubble(false), 8000);
    return () => clearTimeout(timer);
  }, [showBubble, isOpen]);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    setShowBubble(false);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setDismissed(true);
  }, []);

  const nextMessage = useCallback(() => {
    setMessageIndex(i => i + 1);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3">

      {/* ── Speech bubble (auto-appears) ── */}
      <AnimatePresence>
        {showBubble && !isOpen && !dismissed && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="max-w-[240px] bg-[#0a0f1e] border border-purple-500/30 rounded-2xl rounded-br-sm px-4 py-3 shadow-xl shadow-purple-900/30 cursor-pointer"
            onClick={handleOpen}
          >
            <p className="text-white text-sm leading-snug">
              <span className="text-purple-400 font-bold">Aria · </span>
              {greeting}{currentMessage}
            </p>
            <div className="absolute -bottom-2 right-4 w-4 h-4 bg-[#0a0f1e] border-r border-b border-purple-500/30 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Expanded chat panel ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="w-[300px] bg-[#0a0f1e] border border-purple-500/30 rounded-2xl shadow-2xl shadow-purple-900/40 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-gradient-to-r from-purple-900/40 to-cyan-900/20">
              <AriaAvatar size={36} pulse />
              <div className="flex-1">
                <div className="text-white font-bold text-sm">Aria</div>
                <div className="text-purple-400 text-[10px]">AI Coordinator · MiddleMan</div>
              </div>
              <button
                onClick={handleClose}
                className="text-white/40 hover:text-white/80 text-lg leading-none transition-colors"
              >
                ×
              </button>
            </div>

            {/* Message body */}
            <div className="px-4 py-4">
              <AnimatePresence mode="wait">
                <motion.p
                  key={messageIndex}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="text-white/80 text-sm leading-relaxed"
                >
                  {greeting}{currentMessage}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Quick actions */}
            <div className="px-4 pb-4 flex flex-wrap gap-2">
              {location === "/" && (
                <>
                  <a href="/rider/post" className="text-[11px] bg-[#00BCD4]/10 text-[#00BCD4] border border-[#00BCD4]/30 px-3 py-1.5 rounded-full hover:bg-[#00BCD4]/20 transition-colors no-underline">
                    Post a Job
                  </a>
                  <a href="/jobs" className="text-[11px] bg-white/5 text-white/60 border border-white/10 px-3 py-1.5 rounded-full hover:bg-white/10 transition-colors no-underline">
                    My Jobs
                  </a>
                  <a href="/board" className="text-[11px] bg-white/5 text-white/60 border border-white/10 px-3 py-1.5 rounded-full hover:bg-white/10 transition-colors no-underline">
                    Community Board
                  </a>
                </>
              )}
              {location === "/rider/post" && (
                <a href="/jobs" className="text-[11px] bg-[#00BCD4]/10 text-[#00BCD4] border border-[#00BCD4]/30 px-3 py-1.5 rounded-full hover:bg-[#00BCD4]/20 transition-colors no-underline">
                  View My Jobs
                </a>
              )}
              {location === "/provider" && (
                <a href="/jobs/browse" className="text-[11px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1.5 rounded-full hover:bg-emerald-500/20 transition-colors no-underline">
                  Browse Jobs
                </a>
              )}
              <button
                onClick={nextMessage}
                className="text-[11px] bg-purple-600/10 text-purple-400 border border-purple-500/20 px-3 py-1.5 rounded-full hover:bg-purple-600/20 transition-colors"
              >
                Next tip →
              </button>
            </div>

            {/* Footer */}
            <div className="px-4 py-2 border-t border-white/5 bg-black/20">
              <p className="text-white/20 text-[10px] text-center">
                "No prejudice. Just get the job done." — MiddleMan
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating button ── */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        onClick={isOpen ? handleClose : handleOpen}
        className="relative flex items-center justify-center rounded-full shadow-2xl shadow-purple-900/50 border-2 border-purple-500/40 transition-all"
        style={{
          width: 56,
          height: 56,
          background: "linear-gradient(135deg, #8b5cf6 0%, #00BCD4 100%)",
        }}
        title="Aria — Your MiddleMan AI Companion"
      >
        {/* Pulse ring when bubble is showing */}
        {showBubble && !isOpen && (
          <span className="absolute inset-0 rounded-full animate-ping bg-purple-500/30" />
        )}
        <span className="text-2xl">{isOpen ? "✕" : "🤖"}</span>
        {/* Unread dot */}
        {!isOpen && !dismissed && (
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-[#00BCD4] rounded-full border-2 border-[#0a0f1e] animate-bounce" />
        )}
      </motion.button>
    </div>
  );
}

export default AriaCopilot;
