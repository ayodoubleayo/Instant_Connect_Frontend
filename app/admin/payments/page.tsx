"use client";

import { api } from "@/lib/api";
import { useEffect, useState } from "react";

interface Payment {
  id: string;
  amount: number;
  status: string;
  benefitScope: "SELF" | "BOTH";
  reference: string;
  proofUrl?: string;

  payer: {
    id: string;
    username: string;
    email: string;
  };

  beneficiary?: {
    id: string;
    username: string;
  };

  match: {
    id: string;
  };
}

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   api<Payment[]>("/admin/payments")
  .then((data) => setPayments(data))

      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="p-6">Loading payments…</p>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Payments Review</h1>

      <div className="space-y-4">
        {payments.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded shadow p-4 space-y-2"
          >
            <p>
              <strong>Payer:</strong>{" "}
              {p.payer.username} ({p.payer.email})
            </p>

            <p>
              <strong>Paid For:</strong>{" "}
              {p.benefitScope === "SELF"
                ? "Self"
                : p.beneficiary?.username ?? "Both users"}
            </p>

            <p>
              <strong>Amount:</strong> ₦{p.amount}
            </p>

            <p>
              <strong>Status:</strong> {p.status}
            </p>

            <p>
              <strong>Reference:</strong> {p.reference}
            </p>

            {p.proofUrl && (
              <a
                href={p.proofUrl}
                target="_blank"
                className="text-blue-600 underline"
              >
                View Proof
              </a>
            )}

            {p.status === "PENDING" && (
              <button
                onClick={() =>
                  api(`/admin/payments/${p.id}/approve`, {
                    method: "POST",
                  }).then(() =>
                    setPayments((prev) =>
                      prev.map((x) =>
                        x.id === p.id
                          ? { ...x, status: "APPROVED" }
                          : x
                      )
                    )
                  )
                }
                className="mt-2 bg-green-600 text-white px-4 py-2 rounded"
              >
                Approve Payment
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
