"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useUserStore } from "@/store/user.store";
import { useRouter } from "next/navigation";

type Gender = "MALE" | "FEMALE" | "";

export default function RegisterPage() {
  const { register } = useAuth();
  const fetchMe = useUserStore((s) => s.fetchMe);
  const router = useRouter();

  const [form, setForm] = useState({
    realName: "",
    username: "",
    email: "",
    password: "",
    phone: "", // 🔴 ADDED
    relationshipIntent: "", // 🔴 ADDED
    gender: "" as Gender,
    age: "",
    location: "",
    latitude: undefined as number | undefined,
    longitude: undefined as number | undefined,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [locStatus, setLocStatus] =
    useState<"idle" | "detecting" | "success" | "failed">("idle");

  /* ================= LOCATION ================= */
  useEffect(() => {
    if (!navigator.geolocation) {
      setLocStatus("failed");
      return;
    }

    setLocStatus("detecting");

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setForm((f) => ({
          ...f,
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        }));
        setLocStatus("success");
      },
      () => setLocStatus("failed")
    );
  }, []);

  /* ================= SUBMIT ================= */
  async function submit() {
    // 🔴 VALIDATION
    if (!form.realName || !form.username || !form.email || !form.password) {
      alert("Please fill all required fields");
      return;
    }

    if (!form.phone.trim()) {
      alert("Phone number is required");
      return;
    }

    if (form.phone.trim().length < 7) {
      alert("Phone number is too short");
      return;
    }

    if (!form.relationshipIntent) {
      alert("Please select what you are looking for");
      return;
    }

    if (!form.gender) {
      alert("Please select a gender");
      return;
    }

    setLoading(true);

    try {
      // ✅ REGISTER
      await register({
        realName: form.realName,
        username: form.username,
        email: form.email,
        password: form.password,
        phone: form.phone, // 🔴 SENT
        relationshipIntent: form.relationshipIntent, // 🔴 SENT
        gender: form.gender,
        age: Number(form.age),
        location: form.location || undefined,
        latitude: form.latitude,
        longitude: form.longitude,
      });

      // ✅ HYDRATE USER
      await fetchMe();

      // ✅ REDIRECT
      router.replace("/profile/me");
    } catch (err: any) {
      alert(err?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  /* ================= UI ================= */
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-semibold">Create your account</h1>
          <p className="text-sm text-gray-500">
            Join and meet people in a respectful environment
          </p>
        </div>

        <div className="space-y-4">
          <input
            className="input"
            placeholder="First name (e.g. IFE)"
            onChange={(e) =>
              setForm({ ...form, realName: e.target.value })
            }
          />

          <input
            className="input"
            placeholder="Username"
            onChange={(e) =>
              setForm({ ...form, username: e.target.value })
            }
          />

          <input
            className="input"
            type="email"
            placeholder="Email"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            className="input"
            placeholder="Phone number"
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value })
            }
          />

          <select
            className="input"
            value={form.relationshipIntent}
            onChange={(e) =>
              setForm({ ...form, relationshipIntent: e.target.value })
            }
          >
            <option value="">What are you looking for?</option>
            <option value="ONE_NIGHT">One night</option>
            <option value="CASUAL">Casual</option>
            <option value="SERIOUS">Serious</option>
            <option value="MARRIAGE">Marriage</option>
            <option value="LOOKING_FOR_WOMAN">Looking for a woman</option>
            <option value="LOOKING_FOR_MAN">Looking for a man</option>
            <option value="GYM_PARTNER">Gym partner</option>
            <option value="TRAVEL_PARTNER">Travel partner</option>
            <option value="EMOTIONAL_SUPPORT">Emotional support</option>
            <option value="OTHER_PARTNER">Other</option>
          </select>

          <div className="relative">
            <input
              className="input pr-12"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />

            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <input
              className="input"
              type="number"
              placeholder="Age"
              onChange={(e) =>
                setForm({ ...form, age: e.target.value })
              }
            />

            <select
              className="input"
              value={form.gender}
              onChange={(e) =>
                setForm({
                  ...form,
                  gender: e.target.value as Gender,
                })
              }
            >
              <option value="">Gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </select>
          </div>

          <input
            className="input"
            placeholder="Location (e.g. Ikeja)"
            onChange={(e) =>
              setForm({ ...form, location: e.target.value })
            }
          />

          <p className="text-xs text-gray-500">
            {locStatus === "detecting" && "Detecting your location…"}
            {locStatus === "success" && "Location detected automatically"}
            {locStatus === "failed" && "You can add location later"}
          </p>
        </div>

        <button
          onClick={submit}
          disabled={loading}
          className="w-full rounded-xl bg-black py-3 text-white disabled:opacity-60"
        >
          {loading ? "Creating account…" : "Create account"}
        </button>

        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a href="/auth/login" className="font-medium hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
