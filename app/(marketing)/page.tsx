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

/* =========================
   EXTRA IMAGES WITH LABELS
========================= */
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

  // IntersectionObserver to show referral box after welcome scrolls out
  useEffect(() => {
    if (!welcomeRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowReferral(!entry.isIntersecting); // show when welcome is NOT visible
      },
      { threshold: 0.1 }
    );

    observer.observe(welcomeRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ================= REFERRAL MESSAGE ================= */}
      {showReferral && (
        <motion.div
          className="fixed top-14 right-4 bg-blue-500 text-white rounded-2xl shadow-xl px-6 py-4 z-30 cursor-pointer hover:bg-blue-600 transition max-w-xs"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="font-semibold text-lg">GIVEAWAY TIME!</div>
          <ul className="text-sm mt-2 space-y-1">
            <li>Refer 10 people → Instant #2000 transfer 💸</li>
            <li>Refer 30 people → 1 full refill Peak Milk 🥛</li>
            <li>Refer 50 people → 1 Carton of Indomie 🍜</li>
            <li className="mt-1 text-xs">Each user will be verified. Age 18–100 welcome ✅</li>
            <li className="mt-1 text-xs bg-red-500 px-1 rounded">Send admin your account number through contact above</li>
          </ul>
        </motion.div>
      )}

      {/* ================= HERO SECTION ================= */}
      <section className="flex flex-col items-center bg-gradient-to-br from-slate-50 via-white to-slate-100 px-6 py-12 space-y-12">

        {/* ===== WELCOME CARD ===== */}
        <motion.div
          ref={welcomeRef}
          className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8 max-w-3xl text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Welcome to InstantConnect
          </h1>
          <p className="text-gray-600 text-lg">
            Discover meaningful relationships, real connections, and clear intentions. Whether you’re looking for marriage, serious dating, or a casual connection, InstantConnect is built for you.
          </p>
        </motion.div>

        {/* ===== EXTRA IMAGES GRID (3 PER ROW) ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl">
          {EXTRA_IMAGES.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative rounded-2xl overflow-hidden shadow-lg"
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-3">
                <div className="text-blue-400 font-bold text-base">{img.label}</div>
                <div className="text-white text-xs mt-1">{img.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ===== DESCRIPTION CARD ===== */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 max-w-2xl text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-gray-600 text-lg">
            InstantConnect is built for people who know what they want — whether it’s marriage, a serious relationship, or a clear, respectful connection.
          </p>
        </motion.div>

        {/* ===== INTENT CARDS (each demarcated) ===== */}
        <motion.div
          className="grid grid-cols-2 gap-6 max-w-4xl w-full"
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {INTENTS.map((intent) => (
            <motion.div
              key={intent.label}
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.35 }}
              className="bg-white/90 rounded-2xl backdrop-blur p-5 shadow-md border border-gray-200 hover:shadow-lg transition text-center"
            >
              <div className="text-blue-400 font-bold text-lg">{intent.label}</div>
              <div className="text-gray-500 text-sm mt-1">{intent.desc}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* ===== CTA BUTTONS CARD ===== */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 flex flex-col sm:flex-row gap-5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link
            href="/auth/register"
            className="flex-1 flex items-center justify-center rounded-2xl bg-gray-900 px-8 py-4 text-white text-lg font-semibold shadow-xl hover:bg-black transition"
          >
            Get Started
          </Link>

          <Link
            href="/auth/login"
            className="flex-1 flex items-center justify-center rounded-2xl border border-gray-300 bg-white px-8 py-4 text-gray-700 text-lg font-medium hover:bg-gray-50 transition"
          >
            Sign in
          </Link>
        </motion.div>

        {/* ===== HERO IMAGE AT THE BOTTOM ===== */}
        <motion.div
          className="w-full flex justify-center mt-12"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="relative w-full max-w-3xl">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-gray-200 to-gray-100 blur-2xl opacity-60" />
            <Image
              src="/hero.jpg"
              alt="InstantConnect hero image"
              width={1200}
              height={700}
              className="relative rounded-3xl shadow-2xl object-cover w-full"
              priority
            />
          </div>
        </motion.div>

      </section>
    </>
  );
}
