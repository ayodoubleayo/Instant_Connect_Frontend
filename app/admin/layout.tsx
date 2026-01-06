"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    console.log("🟡 ADMIN LAYOUT: mounted");
    console.log("🟡 ADMIN LAYOUT: checking /admin/stats");

    api("/admin/stats")
      .then((res) => {
        console.log("🟢 ADMIN LAYOUT: access granted", res);
        setAllowed(true);
      })
      .catch((err) => {
        console.log("🔴 ADMIN LAYOUT: access denied", err);
        router.replace("/login");
      });
  }, []);

  if (!allowed) {
    console.log("⏳ ADMIN LAYOUT: waiting for permission");
    return <p>Checking admin access...</p>;
  }

  console.log("✅ ADMIN LAYOUT: rendering children");
  return <>{children}</>;
}
