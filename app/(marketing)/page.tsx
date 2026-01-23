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

/* =========================
   SKELETON CARD
========================= */
function ImageSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl bg-gray-200 h-[260px] w-full" />
  );
}

export default function Home() {
  const welcomeRef = useRef<HTMLDivElement>(null);
  const [showReferral, setShowReferral] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});

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
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-50 to-white p-4 sm:p-6">
      <div
        className="min-h-full rounded-3xl border-[10px] shadow-2xl bg-white"
        style={{ borderStyle: "outset", borderColor: "#f9a8d4" }}
      >

        {/* ================= REFERRAL ================= */}
        {showReferral && (
          <motion.div
            className="fixed top-24 right-6 bg-blue-500 text-white rounded-2xl shadow-xl px-6 py-4 z-30 max-w-xs"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="font-semibold text-lg">🎉 FIRST REGISTRATION BONUS!</div>
            <div className="font-bold text-yellow-300 text-xl mt-1">#3000% Bonus 💰</div>
            <ul className="text-sm mt-2 space-y-1">
              <li>Refer 10 people → ₦2000 💸</li>
              <li>Refer 30 people → Peak Milk 🥛</li>
              <li>Refer 50 people → Indomie 🍜</li>
              <li className="text-xs">Age 18–100 welcome ✅</li>
              <li className="text-xs">USE CONTACT ABOVE TO CLAIM YOUR GIFT ✅</li>
            </ul>
          </motion.div>
        )}

        {/* ================= CONTENT ================= */}
        <section className="flex flex-col items-center px-6 py-12 space-y-12">

          {/* ===== WELCOME ===== */}
          <motion.div
            ref={welcomeRef}
            className="rounded-3xl p-8 max-w-3xl text-center bg-gradient-to-br from-pink-100 via-pink-50 to-white border-2 border-pink-300 shadow-2xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-red-600">
              Welcome to InstantConnect
            </h1>

            <p className="text-gray-700 text-lg mt-4">
              Discover meaningful relationships, real connections, and clear intentions.
            </p>
          </motion.div>

          {/* ===== EXTRA IMAGES (LAZY + SKELETON) ===== */}
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
                {!loadedImages[i] && <ImageSkeleton />}

                <Image
                  src={img.src}
                  alt={img.alt}
                  width={400}
                  height={400}
                  loading="lazy"
                  onLoad={() =>
                    setLoadedImages((prev) => ({ ...prev, [i]: true }))
                  }
                  className={`w-full h-full object-cover transition-opacity duration-500 ${
                    loadedImages[i] ? "opacity-100" : "opacity-0 absolute inset-0"
                  }`}
                />

                {loadedImages[i] && (
                  <div className="absolute bottom-0 left-0 w-full bg-black/60 p-3">
                    <div className="text-pink-300 font-bold">{img.label}</div>
                    <div className="text-white text-xs">{img.desc}</div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* ===== INTENTS ===== */}
          <div className="grid grid-cols-2 gap-6 max-w-4xl w-full">
            {INTENTS.map((intent) => (
              <div
                key={intent.label}
                className="bg-white rounded-2xl p-5 text-center shadow-md border"
              >
                <div className="text-pink-500 font-bold">{intent.label}</div>
                <div className="text-gray-500 text-sm">{intent.desc}</div>
              </div>
            ))}
          </div>

          {/* ===== CTA ===== */}
          <div className="bg-white rounded-2xl shadow-lg border p-6 flex gap-5 flex-col sm:flex-row">
            <Link href="/auth/register" className="flex-1 rounded-2xl bg-gray-900 px-8 py-4 text-white text-lg font-semibold text-center">
              Get Started
            </Link>

            <Link href="/auth/login" className="flex-1 rounded-2xl border px-8 py-4 text-gray-700 text-lg text-center">
              Sign in
            </Link>
          </div>

          {/* ===== HERO IMAGE (PRIORITY) ===== */}
          <div className="w-full flex justify-center mt-12">
            <Image
              src="/hero.jpg"
              alt="InstantConnect hero"
              width={1200}
              height={700}
              priority
              className="rounded-3xl shadow-2xl w-full max-w-3xl object-cover"
            />
          </div>

        </section>
      </div>
    </div>
  );
}
