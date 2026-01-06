"use client";

import { useState, useEffect } from "react";
import { useUserStore } from "@/store/user.store";

const TRIBES = ["Yoruba", "Igbo", "Hausa", "Edo", "Ijaw", "Other"];

/**
 * ProfileDetailsForm
 * FLOW MAP:
 * init → hydrate → input → validate → payload → store → api → exit
 */

export default function ProfileDetailsForm() {
  console.log("🟢 [ProfileDetailsForm] COMPONENT INIT");

  const { me, updateProfileDetails } = useUserStore();

  const [bio, setBio] = useState<string>(me?.bio ?? "");
  const [phone, setPhone] = useState<string>(me?.phone ?? "");

  const [relationshipIntent, setIntent] = useState<string | undefined>(
    me?.relationshipIntent ?? undefined
  );

  const [religion, setReligion] = useState<string | undefined>(
    me?.religion ?? undefined
  );

  const [preferredTribes, setTribes] = useState<string[]>(
    me?.preferredTribes ?? []
  );

  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    console.log("🧭 [ProfileDetailsForm] STATE HYDRATED", {
      bio,
      phone,
      relationshipIntent,
      religion,
      preferredTribes,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function toggleTribe(t: string) {
    console.log("🟡 [ProfileDetailsForm] toggleTribe →", t);
    setTribes((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );
  }

  async function save() {
    console.log("🚀 [ProfileDetailsForm] SAVE START");
    setError(null);

    if (!phone.trim()) {
      console.warn("⛔ phone missing");
      setError("Phone number is required");
      return;
    }

    if (phone.trim().length < 7) {
      console.warn("⛔ phone too short");
      setError("Phone number is too short");
      return;
    }

    setSaving(true);

    try {
      console.log("📦 building payload");

      const payload: {
        bio: string;
        phone: string;
        preferredTribes: string[];
        relationshipIntent?: string;
        religion?: string;
      } = {
        bio,
        phone,
        preferredTribes,
      };

      if (relationshipIntent) payload.relationshipIntent = relationshipIntent;
      if (religion) payload.religion = religion;

      console.log("📤 payload → store", payload);

      await updateProfileDetails(payload);

      console.log("🟢 save success");
      alert("Profile updated");
    } catch (err: any) {
      console.error("❌ save failed", err);
      setError(err?.message || "Failed to update profile");
    } finally {
      setSaving(false);
      console.log("🏁 SAVE END");
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Profile Details</h2>

      {error && (
        <div className="text-sm text-red-600 bg-red-50 px-4 py-2 rounded-lg">
          {error}
        </div>
      )}

      {/* PHONE */}
      <input
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone number"
        className="w-full rounded-xl border px-4 py-3"
      />

      {/* BIO */}
      <textarea
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        placeholder="About you"
        className="w-full rounded-xl border px-4 py-3"
        rows={4}
      />

      {/* INTENT */}
      <select
        value={relationshipIntent ?? ""}
        onChange={(e) => {
          const value = e.target.value || undefined;
          console.log("🧠 [ProfileDetailsForm] intent selected →", value);
          setIntent(value);
        }}
        className="w-full rounded-xl border px-4 py-3"
      >
        <option value="">Select intent</option>

        {/* Romantic */}
        <option value="ONE_NIGHT">One night</option>
        <option value="CASUAL">Casual</option>
        <option value="FRIENDS_WITH_BENEFITS">Friends with benefits</option>
        <option value="SERIOUS">Serious</option>
        <option value="MARRIAGE">Marriage</option>

        {/* Preference */}
        <option value="LOOKING_FOR_WOMAN">Looking for a woman</option>
        <option value="LOOKING_FOR_MAN">Looking for a man</option>

        {/* Social / Activity */}
        <option value="WALK_PARTNER">Walk partner</option>
        <option value="GYM_PARTNER">Gym partner</option>
        <option value="READING_PARTNER">Reading partner</option>
        <option value="TRAVEL_PARTNER">Travel partner</option>
        <option value="CLUBBING_PARTNER">Clubbing partner</option>
        <option value="STREET_FRIEND">Street friend</option>
        <option value="GIST_PARTNER">Gist partner</option>
        <option value="LAUGHTER_PARTNER">Laughing partner</option>
        <option value="PRAYING_PARTNER">Praying partner</option>

        {/* Education */}
        <option value="ADULT_STUDENT_PARTNER">
          Looking for adult student partner
        </option>

        {/* Emotional */}
        <option value="EMOTIONAL_SUPPORT">Emotional support</option>
        <option value="OTHER_PARTNER">Other</option>
      </select>

      {/* SAVE */}
      <button
        onClick={save}
        disabled={saving}
        className="w-full bg-black text-white py-3 rounded-xl"
      >
        {saving ? "Saving..." : "Save changes"}
      </button>
    </div>
  );
}
