"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/* =========================
   STATIC DATA
========================= */
const INTENTS = [
  { label: "💍 Marriage", desc: "Looking for a life partner" },
  { label: "❤️ Serious", desc: "Meaningful long-term relationship" },
  { label: "💬 Casual", desc: "Dating & getting to know people" },
  { label: "🔥 One Night", desc: "Short-term connection" },
];

const EXTRA_IMAGES = [
  { src: "/extra1.jpg", alt: "Couple meeting", label: "💍 Marriage", desc: "Find your life partner" },
  { src: "/extra2.jpg", alt: "Dating event", label: "❤️ Serious", desc: "Meaningful connections" },
  { src: "/extra3.jpg", alt: "Travel together", label: "💬 Casual", desc: "Fun and casual dating" },
  { src: "/extra4.jpg", alt: "Friendship moments", label: "🔥 One Night", desc: "Short-term connections" },
  { src: "/extra5.jpg", alt: "Romantic dinner", label: "💍 Marriage", desc: "Romantic experiences" },
  { src: "/extra6.jpg", alt: "Outdoor adventure", label: "❤️ Serious", desc: "Shared adventures" },
];

export default function Home() {
  const welcomeRef = useRef<HTMLDivElement>(null);
  const [showReferral, setShowReferral] = useState(false);

  useEffect(() => {
    if (!welcomeRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => setShowReferral(!entry.isIntersecting),
      { threshold: 0.1 }
    );

    observer.observe(welcomeRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    /* ================= OUTER BACKGROUND ================= */
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-50 to-white p-4 sm:p-6">

      {/* ================= OUTSET PAGE FRAME ================= */}
      <div
        className="min-h-full rounded-3xl border-[10px] shadow-2xl bg-white"
        style={{
          borderStyle: "outset",
          borderColor: "#f9a8d4", // pink-300
        }}
      >

        {/* ================= REFERRAL MESSAGE ================= */}
        {showReferral && (
          <motion.div
            className="fixed top-30 right-6 bg-blue-500 text-white rounded-2xl shadow-xl px-6 py-4 z-30 max-w-xs"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="font-semibold text-lg">GIVEAWAY TIME!</div>
            <ul className="text-sm mt-2 space-y-1">
              <li>Refer 10 people → ₦2000 transfer 💸</li>
              <li>Refer 30 people → Peak Milk 🥛</li>
              
              <li>Refer 50 people → Indomie Carton 🍜</li>
              <li className="text-xs mt-1">Age 18–100 welcome ✅</li>
                            <li className="text-xs bg-red-500 mt-1">Contact for your reward ✅</li>

            </ul>
          </motion.div>
        )}

        {/* ================= CONTENT ================= */}
        <section className="flex flex-col items-center px-6 py-12 space-y-12">

          {/* ===== WELCOME CARD ===== */}
          <motion.div
            ref={welcomeRef}
            className="
              rounded-3xl
              p-8
              max-w-3xl
              text-center
              bg-gradient-to-br from-pink-100 via-pink-50 to-white
              border-2 border-pink-300
              shadow-2xl shadow-pink-300/50
            "
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Welcome to InstantConnect
            </h1>
            <p className="text-gray-700 text-lg">
              Discover meaningful relationships, real connections, and clear intentions.
              Whether you want marriage, serious dating, or a respectful connection —
              InstantConnect is built for you.
            </p>
          </motion.div>

          {/* ===== EXTRA IMAGES ===== */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl">
            {EXTRA_IMAGES.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative rounded-2xl overflow-hidden shadow-lg"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 w-full bg-black/60 p-3">
                  <div className="text-pink-300 font-bold">{img.label}</div>
                  <div className="text-white text-xs">{img.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ===== INTENT CARDS ===== */}
          <div className="grid grid-cols-2 gap-6 max-w-4xl w-full">
            {INTENTS.map((intent) => (
              <div
                key={intent.label}
                className="bg-white rounded-2xl p-5 text-center shadow-md border hover:shadow-lg transition"
              >
                <div className="text-pink-500 font-bold text-lg">{intent.label}</div>
                <div className="text-gray-500 text-sm">{intent.desc}</div>
              </div>
            ))}
          </div>

          {/* ===== CTA ===== */}
          <div className="bg-white rounded-2xl shadow-lg border p-6 flex gap-5 flex-col sm:flex-row">
            <Link
              href="/auth/register"
              className="flex-1 rounded-2xl bg-gray-900 px-8 py-4 text-white text-lg font-semibold text-center"
            >
              Get Started
            </Link>

            <Link
              href="/auth/login"
              className="flex-1 rounded-2xl border px-8 py-4 text-gray-700 text-lg font-medium text-center"
            >
              Sign in
            </Link>
          </div>

          {/* ===== HERO IMAGE ===== */}
          <div className="w-full flex justify-center mt-12">
            <Image
              src="/hero.jpg"
              alt="InstantConnect hero"
              width={1200}
              height={700}
              className="rounded-3xl shadow-2xl w-full max-w-3xl object-cover"
            />
          </div>

        </section>
      </div>
    </div>
  );
}
