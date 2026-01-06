"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/lib/api";

export default function StartChat() {
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    api(`/matches/start/${id}`, { method: "POST" })
      .then((res: any) => {
        router.replace(`/chat/${res.matchId}`);
      })
      .catch(() => router.push("/discover"));
  }, [id, router]);

  return <p>Starting chat…</p>;
}
