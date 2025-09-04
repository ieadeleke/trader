"use client";
import React, { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import { apiFetch } from "@/utils/api";
import { useToast } from "@/context/ToastContext";

interface FundingReq {
  _id: string;
  method: "bank" | "crypto" | "paypal" | "card";
  amount: number;
  asset?: string;
  network?: string;
  status: "pending" | "approved" | "rejected";
  meta?: any;
  createdAt?: string;
}

export default function TransactionsPage() {
  const { errorToast } = useToast();
  const [items, setItems] = useState<FundingReq[]>([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await apiFetch("/api/funding/my-requests", { method: "GET", auth: true });
      const data = await res.json();
      const list: FundingReq[] = (data?.data ?? data) || [];
      setItems(Array.isArray(list) ? list : []);
    } catch (e) {
      errorToast("Failed to load transactions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <DashboardLayout pageTitle="Transaction History">
      <div className="p-6">
        <div className="border border-border rounded-lg overflow-hidden">
          <div className="grid grid-cols-6 text-xs uppercase tracking-wide bg-[#0f1115] text-[#eaecef] p-3">
            <div>Date</div>
            <div>Method</div>
            <div>Amount</div>
            <div>Asset/Network</div>
            <div>Status</div>
            <div>Proof</div>
          </div>
          <div className="divide-y divide-border">
            {loading ? (
              <div className="p-6 text-center text-sm text-[#eaecef]">Loading...</div>
            ) : items.length === 0 ? (
              <div className="p-6 text-center text-sm text-[#eaecef]">No transactions yet.</div>
            ) : (
              items.map((it) => (
                <div key={it._id} className="grid grid-cols-6 p-3 text-sm text-[#eaecef]">
                  <div>{it.createdAt ? new Date(it.createdAt).toLocaleString() : "—"}</div>
                  <div className="capitalize">{it.method}</div>
                  <div>${it.amount?.toLocaleString()}</div>
                  <div>{[it.asset || "USD", it.network].filter(Boolean).join(" / ")}</div>
                  <div>
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        it.status === "approved"
                          ? "bg-green-500/10 text-green-400"
                          : it.status === "rejected"
                          ? "bg-red-500/10 text-red-400"
                          : "bg-yellow-500/10 text-yellow-400"
                      }`}
                    >
                      {it.status}
                    </span>
                  </div>
                  <div>
                    {it?.meta?.proof?.url ? (
                      <a
                        href={it.meta.proof.url}
                        target="_blank"
                        className="underline text-blue-400"
                      >
                        View
                      </a>
                    ) : (
                      "—"
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

