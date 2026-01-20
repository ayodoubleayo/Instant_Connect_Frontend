"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { useUserStore } from "@/store/user.store";
import { useChatStore } from "@/store/chat.store";
import Image from "next/image";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/discover", label: "Discover" },
  { href: "/chat", label: "Chat" },
  { href: "/profile/me", label: "Profile" },
  { href: "/payment", label: "Payment" },
  { href: "/about", label: "About" },
];

const CONTACT_LINK = "https://wa.me/2348064520832";
const SWIPE_THRESHOLD = 50;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const startY = useRef<number | null>(null);

  const router = useRouter();
  const { me, hydrated, fetchMe, clear } = useUserStore();
  const unreadByMatch = useChatStore((s) => s.unreadByMatch);

  const totalUnread = Object.values(unreadByMatch).reduce(
    (a, b) => a + b,
    0
  );

  useEffect(() => {
    if (!hydrated) fetchMe();
  }, [hydrated, fetchMe]);

  async function logout() {
    try {
      await api("/auth/logout", { method: "POST" });
    } finally {
      clear();
      setOpen(false);
      router.replace("/auth/login");
      router.refresh();
    }
  }

  /* =====================
     SWIPE HANDLERS
  ===================== */
  const onTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (startY.current === null) return;

    const endY = e.changedTouches[0].clientY;
    const deltaY = endY - startY.current;

    if (deltaY > SWIPE_THRESHOLD) {
      // swipe down → open
      setOpen(true);
    }

    if (deltaY < -SWIPE_THRESHOLD) {
      // swipe up → close
      setOpen(false);
    }

    startY.current = null;
  };

  return (
    <nav
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className="
        sticky top-0 z-50 w-full
        bg-white/85 backdrop-blur
        rounded-b-2xl
        shadow-md
        border-b-2 border-transparent
        bg-clip-padding
      "
      style={{
        borderImage:
          "linear-gradient(to right, #fecaca, #fda4af, #fecaca) 1",
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* LOGO */}
        <Link
          href="/discover"
          className="flex items-center gap-3 font-extrabold tracking-tight"
        >
          <Image
            src="/icons/icon-72x72.png"
            alt="InstantConnect logo"
            width={48}
            height={48}
            className="rounded-md"
          />

          <span className="text-3xl md:text-4xl text-gray-900 leading-none">
            Instant<span className="text-red-600">Connect</span>
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="relative text-gray-700 font-medium hover:text-red-600 transition"
            >
              {l.label}

              {l.label === "Chat" && totalUnread > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs px-2 rounded-full">
                  {totalUnread}
                </span>
              )}
            </Link>
          ))}

          <a
            href={CONTACT_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 font-medium hover:text-red-600 transition"
          >
            Contact
          </a>

          {me && <Link href="/feedback">Feedback</Link>}
          {me?.role === "ADMIN" && <Link href="/admin">Admin</Link>}
          {me && <button onClick={logout}>Logout</button>}
        </div>

        {/* MOBILE TOGGLE */}
        <button
          className="md:hidden rounded-lg border border-gray-300 px-3 py-2"
          onClick={() => setOpen((o) => !o)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`
          md:hidden
          overflow-hidden
          transition-all duration-300 ease-out
          ${open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <div className="border-t bg-white px-6 py-4 space-y-4">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block text-gray-800 font-medium"
            >
              {l.label}
              {l.label === "Chat" && totalUnread > 0 && (
                <span className="ml-2 bg-red-600 text-white text-xs px-2 rounded-full">
                  {totalUnread}
                </span>
              )}
            </Link>
          ))}

          <a href={CONTACT_LINK} className="block">
            Contact
          </a>
{me && (
  <Link
    href="/feedback"
    onClick={() => setOpen(false)}
    className="block w-full text-gray-800 font-medium"
  >
    Feedback
  </Link>
)}

{me?.role === "ADMIN" && (
  <Link
    href="/admin"
    onClick={() => setOpen(false)}
    className="block w-full text-gray-800 font-medium"
  >
    Admin
  </Link>
)}

{me && (
  <button
    onClick={logout}
    className="block w-full text-left text-gray-800 font-medium"
  >
    Logout
  </button>
)}

        </div>
      </div>
    </nav>
  );
}
