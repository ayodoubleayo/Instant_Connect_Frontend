"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";

type PaymentScope = "SELF" | "BOTH";

export default function PaymentPage() {
  const params = useSearchParams();
  const matchId = params.get("matchId");

  const [amount, setAmount] = useState<number | null>(null);
  const [baseAmount, setBaseAmount] = useState<number | null>(null);
  const [partner, setPartner] = useState<any>(null);

  const [paymentScope, setPaymentScope] =
    useState<PaymentScope>("SELF");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [reference, setReference] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  /* ===============================
     Fetch authoritative match data
  =============================== */
  useEffect(() => {
    if (!matchId) return;

    api(`/matches/${matchId}`)
      .then((res: any) => {
        setBaseAmount(res.price);
        setAmount(res.price);
        setPartner(res.partner);
      })
      .catch(() => {
        setError("Failed to load payment details");
      });
  }, [matchId]);

  /* ===============================
     React to payment scope change
  =============================== */
  useEffect(() => {
    if (baseAmount === null) return;

    if (paymentScope === "SELF") {
      setAmount(baseAmount);
    }

    if (paymentScope === "BOTH") {
      setAmount(baseAmount * 2);
    }
  }, [paymentScope, baseAmount]);

  /* ===============================
     Restore pending payment
  =============================== */
  useEffect(() => {
    if (!matchId) return;

    api(`/payments?matchId=${matchId}`)
      .then((res: any) => {
        if (res?.id && res.status === "PENDING") {
          setPaymentId(res.id);
          setReference(res.reference);
        }
      })
      .catch(() => {});
  }, [matchId]);

  /* ===============================
     Create payment
  =============================== */
  async function pay() {
    if (!matchId || amount === null) return;

    try {
      setLoading(true);
      setError(null);

      const payment = await api<any>("/payments", {
        method: "POST",
        body: JSON.stringify({
          matchId,
          amount,
           paymentScope, // 🔐 IMPORTANT
        }),
      });

      setPaymentId(payment.id);
      setReference(payment.reference);
    } catch (err: any) {
      setError(err.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  }

  /* ===============================
     Upload proof
  =============================== */
  async function uploadProof(file: File) {
    if (!paymentId) return;

    try {
      setUploading(true);

      const form = new FormData();
      form.append("proof", file);

      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/payments/${paymentId}/proof`,
        {
          method: "POST",
          credentials: "include",
          body: form,
        }
      );

      alert("Proof uploaded. Awaiting approval.");
    } catch {
      alert("Failed to upload proof");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div
      className="min-h-screen px-4 flex items-center justify-center
      bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50"
    >
      <div
        className="w-full max-w-md bg-white/80 backdrop-blur
        border border-white/60 rounded-3xl shadow-2xl p-6 space-y-6"
      >
        {/* Header */}
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-bold text-gray-900">
            Secure Payment
          </h2>
          <p className="text-sm text-gray-600">
            Manual bank transfer verification
          </p>
        </div>

        {/* Amount */}
        <div
          className="rounded-2xl p-5 text-center
          bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
        >
          <p className="text-sm opacity-90">Amount to Pay</p>
          <p className="text-4xl font-extrabold mt-1">
            ₦{amount ?? "--"}
          </p>
        </div>

        {/* Partner + Scope */}
        {partner && (
          <div className="bg-gray-50 border rounded-2xl p-4 space-y-3">
            <p className="text-sm text-gray-700 text-center">
              You are paying for{" "}
              <span className="font-semibold text-gray-900">
                {partner.realName || partner.username}
              </span>
            </p>

            <div className="space-y-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="paymentScope"
                  checked={paymentScope === "SELF"}
                  onChange={() => setPaymentScope("SELF")}
                />
                <span className="text-sm">
                  Pay for myself only
                </span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="paymentScope"
                  checked={paymentScope === "BOTH"}
                  onChange={() => setPaymentScope("BOTH")}
                />
                <span className="text-sm">
                  Pay for both of us
                </span>
              </label>
            </div>
          </div>
        )}

        {/* Bank Info */}
        <div className="space-y-3 text-sm">
          {[
            ["Bank", "First Bank of Nigeria"],
            ["Account Number", "3053851436"],
            ["Reference", reference ?? "Will be generated"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="flex justify-between items-center
              bg-white rounded-xl px-4 py-3 border"
            >
              <span className="text-gray-500">{label}</span>
              <span className="font-mono font-semibold text-gray-900 text-right">
                {value}
              </span>
            </div>
          ))}
        </div>

        {/* Action */}
        {!paymentId && (
          <button
            onClick={pay}
            disabled={loading || amount === null}
            className="w-full py-3 rounded-xl font-semibold
            bg-black text-white hover:opacity-90 transition
            disabled:opacity-50"
          >
            {loading
              ? "Processing..."
              : "I Have Completed the Transfer"}
          </button>
        )}

        {/* Proof */}
        {paymentId && (
          <div
            className="border-2 border-dashed border-orange-300
            rounded-2xl p-5 text-center space-y-3 bg-orange-50"
          >
            <p className="font-medium text-orange-700">
              ⏳ Awaiting Verification
            </p>

            <input
              type="file"
              accept="image/*"
              disabled={uploading}
              onChange={(e) => {
                if (!e.target.files?.[0]) return;
                uploadProof(e.target.files[0]);
              }}
              className="w-full text-xs"
            />
          </div>
        )}

        {error && (
          <p className="text-sm text-red-500 text-center">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
