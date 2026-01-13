"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect } from "react";

/**
 * Home Page
 *
 * LIFECYCLE TRACE:
 * module load
 * → mount
 * → SEO content rendered
 * → UI rendered
 * → idle
 * → unmount
 */

console.log("📦 [Home] MODULE LOADED");

/* =========================
   STATIC DATA (STABLE)
========================= */
const INTENTS = [
  { label: "💍 Marriage", desc: "Looking for a life partner" },
  { label: "❤️ Serious", desc: "Meaningful long-term relationship" },
  { label: "💬 Casual", desc: "Dating & getting to know people" },
  { label: "🔥 One Night", desc: "Short-term connection" },
];

export default function Home() {
  /* =========================
     LIFECYCLE EFFECT
  ========================= */
  useEffect(() => {
    console.log("🟢 [Home] PAGE MOUNTED");

    console.log(
      "📌 [Home] Primary intents:",
      INTENTS.map((i) => i.label)
    );

    console.log("🔍 [Home][SEO] Secondary searchable intents registered");

    console.log("🧠 [Home] Idle — waiting for user interaction");

    return () => {
      console.log("🏁 [Home] PAGE UNMOUNTED");
    };
  }, []);

  /* =========================
     RENDER
  ========================= */
  return (
    <>
      {/* ================= SEO (HIDDEN) ================= */}
      <section className="sr-only" aria-hidden="true">
        <h1>InstantConnect Dating Platform</h1>
        <p>
          InstantConnect is a modern dating and social connection platform
          designed for people seeking marriage, serious relationships, casual
          dating, short-term connections, and meaningful companionship.
        </p>

        <ul>
          <li>Marriage partner</li>
          <li>Serious relationship</li>
          <li>Casual dating</li>
          <li>One night connection</li>
          <li>Friends with benefits</li>
          <li>Adult student partner</li>
          <li>Gym partner</li>
          <li>Walking partner</li>
          <li>Travel partner</li>
          <li>Prayer partner</li>
          <li>Reading partner</li>
          <li>Emotional support partner</li>
        </ul>
      </section>

      {/* ================= VISIBLE UI ================= */}
      <section
        className="
          min-h-[calc(100vh-80px)]
          flex items-center
          bg-gradient-to-br
          from-slate-50 via-white to-slate-100
          overflow-hidden
        "
      >
        <div className="mx-auto w-full max-w-7xl px-6 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">

          {/* ===== LEFT CONTENT ===== */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            onAnimationComplete={() =>
              console.log("🎬 [Home] Left content animation done")
            }
          >
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 text-gray-900">
              Real Connections.
              <br />
              <span className="text-gray-700">Real Intentions.</span>
            </h1>

            <p className="text-gray-600 mb-10 max-w-xl text-lg">
              InstantConnect is built for people who know what they want —
              whether it’s marriage, a serious relationship, or a clear,
              respectful connection.
            </p>

            {/* ===== INTENT CARDS ===== */}
            <motion.div
              className="grid grid-cols-2 gap-6 mb-12"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1 } },
              }}
            >
              {INTENTS.map((intent) => (
                <motion.div
                  key={intent.label}
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.35 }}
                  className="
                    rounded-2xl
                    bg-white/80 backdrop-blur
                    p-5
                    shadow-md
                    border border-gray-200/60
                    hover:shadow-lg
                    transition
                  "
                >
                  <div className="font-semibold text-gray-900">
                    {intent.label}
                  </div>
                  <div className="text-gray-500 text-sm mt-1">
                    {intent.desc}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* ===== CTA ===== */}
            <div className="flex flex-col sm:flex-row gap-5 max-w-lg">
              <Link
                href="/auth/register"
                className="
                  flex items-center justify-center
                  rounded-2xl
                  bg-gray-900
                  px-8 py-4
                  text-white text-lg font-semibold
                  shadow-xl
                  hover:bg-black
                  transition
                "
              >
                Get Started
              </Link>

              <Link
                href="/auth/login"
                className="
                  flex items-center justify-center
                  rounded-2xl
                  border border-gray-300
                  bg-white
                  px-8 py-4
                  text-gray-700 text-lg font-medium
                  hover:bg-gray-50
                  transition
                "
              >
                Sign in
              </Link>
            </div>
          </motion.div>

          {/* ===== RIGHT IMAGE ===== */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            onAnimationComplete={() =>
              console.log("🖼️ [Home] Hero image visible")
            }
          >
            <div className="relative">
              <div
                className="
                  absolute -inset-4
                  rounded-3xl
                  bg-gradient-to-tr
                  from-gray-200 to-gray-100
                  blur-2xl
                  opacity-60
                "
              />
              <Image
                src="/hero.jpg"
                alt="InstantConnect dating and relationship platform"
                width={700}
                height={700}
                priority
                className="
                  relative
                  rounded-3xl
                  shadow-2xl
                  object-cover
                "
              />
            </div>
          </motion.div>

        </div>
      </section>
    </>
  );
}
