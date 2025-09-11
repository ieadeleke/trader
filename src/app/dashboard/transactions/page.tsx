"use client";
import React, { useEffect, useMemo, useState } from "react";
import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import { apiFetch } from "@/utils/api";
import { useToast } from "@/context/ToastContext";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";

interface TxItem {
  _id: string;
  type: "deposit" | "withdraw";
  amount: number;
  status: "pending" | "completed" | "failed";
  txHash?: string;
  asset?: { _id: string; symbol?: string; name?: string } | string;
  createdAt?: string;
}

export default function TransactionsPage() {
  const { errorToast } = useToast();
  const [items, setItems] = useState<TxItem[]>([]);
  const [funding, setFunding] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<"tx" | "funding">("tx");
  const [withdrawals, setWithdrawals] = useState<any[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  // Date range filter removed
  const [txPage, setTxPage] = useState<number>(1);
  const [txTotal, setTxTotal] = useState<number>(0); // unused when client-paginating
  const [frPage, setFrPage] = useState<number>(1);
  const [frTotal, setFrTotal] = useState<number>(0); // unused when client-paginating
  const pageSize = 10;

  const load = async () => {
    setLoading(true);
    try {
      const [txRes, frRes, wdRes] = await Promise.all([
        apiFetch(`/api/transactions`, { method: "GET", auth: true }),
        apiFetch(`/api/funding/my-requests`, { method: "GET", auth: true }),
        apiFetch(`/api/withdrawals/my-requests`, { method: "GET", auth: true }),
      ]);
      const txData = await txRes.json();
      const frData = await frRes.json();
      const wdData = await wdRes.json();
      const txPayload = txData?.data ?? txData;
      const frPayload = frData?.data ?? frData;
      const wdPayload = wdData?.data ?? wdData;
      const list: TxItem[] = Array.isArray(txPayload) ? txPayload : (txPayload?.items || []);
      const frList: any[] = Array.isArray(frPayload) ? frPayload : (frPayload?.items || []);
      const wdList: any[] = Array.isArray(wdPayload) ? wdPayload : (wdPayload?.items || []);
      setItems(list);
      setFunding(frList);
      setWithdrawals(wdList);
      setTxTotal(list.length);
      setFrTotal(frList.length);
    } catch (e) {
      errorToast("Failed to load transactions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const filteredTx = useMemo(() => {
    if (statusFilter === 'all') return items;
    return items.filter((t) => t.status === statusFilter);
  }, [items, statusFilter]);
  const filteredFunding = useMemo(() => {
    if (statusFilter === 'all') return funding;
    return funding.filter((f) => f.status === statusFilter);
  }, [funding, statusFilter]);
  const filteredWithdrawals = useMemo(() => {
    if (statusFilter === 'all') return withdrawals;
    return withdrawals.filter((w) => w.status === statusFilter);
  }, [withdrawals, statusFilter]);

  const totalTxPages = Math.max(1, Math.ceil(filteredTx.length / pageSize));
  const totalFrPages = Math.max(1, Math.ceil(filteredFunding.length / pageSize));
  const totalWdPages = Math.max(1, Math.ceil(filteredWithdrawals.length / pageSize));
  const visibleTx = filteredTx.slice((txPage - 1) * pageSize, txPage * pageSize);
  const visibleFunding = filteredFunding.slice((frPage - 1) * pageSize, frPage * pageSize);
  const [wdPage, setWdPage] = useState<number>(1);
  const visibleWithdrawals = filteredWithdrawals.slice((wdPage - 1) * pageSize, wdPage * pageSize);

  // Date range helpers removed

  return (
    <DashboardLayout pageTitle="Transaction History">
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <Tabs value={tab} onValueChange={(v) => setTab(v as any)} className="w-auto">
            <TabsList className="bg-transparent p-0">
              <TabsTrigger value="tx">Transactions</TabsTrigger>
              <TabsTrigger value="funding">Funding Requests</TabsTrigger>
              <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex items-center gap-3">
            <div className="w-56">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="h-[2.4rem]"><SelectValue placeholder="Filter status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
          </div>
        </div>

        {tab === 'tx' ? (
          <div className="border border-border rounded-lg overflow-hidden">
            <div className="grid grid-cols-5 text-xs uppercase tracking-wide bg-[#0f1115] text-[#eaecef] p-3">
              <div>Date</div>
              <div>Type</div>
              <div>Amount</div>
              <div>Asset</div>
              <div>Status</div>
            </div>
            <div className="divide-y divide-border">
              {loading ? (
                <div className="p-6 text-center text-sm text-[#eaecef]">Loading...</div>
              ) : filteredTx.length === 0 ? (
                <div className="p-6 text-center text-sm text-[#eaecef]">No transactions yet.</div>
              ) : (
                visibleTx.map((it) => (
                  <div key={it._id} className="grid grid-cols-5 p-3 text-sm text-[#eaecef]">
                    <div>{it.createdAt ? new Date(it.createdAt).toLocaleString() : "—"}</div>
                    <div className="capitalize">{it.type}</div>
                    <div>${it.amount?.toLocaleString()}</div>
                    <div>{typeof it.asset === 'object' ? (it.asset?.symbol || it.asset?.name || '') : String(it.asset || '')}</div>
                    <div>
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          it.status === "completed"
                            ? "bg-green-500/10 text-green-400"
                            : it.status === "failed"
                            ? "bg-red-500/10 text-red-400"
                            : "bg-yellow-500/10 text-yellow-400"
                        }`}
                      >
                        {it.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
          </div>
          {/* Pagination for Transactions */}
          <div className="p-3">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => { e.preventDefault(); setTxPage((p) => Math.max(1, p - 1)); }}
                    className={txPage <= 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                {Array.from({ length: totalTxPages }).map((_, i) => {
                  const page = i + 1;
                  if (totalTxPages > 7) {
                    const isFirst = page === 1;
                    const isLast = page === totalTxPages;
                    const isNear = Math.abs(page - txPage) <= 1;
                    if (!isFirst && !isLast && !isNear) return null;
                  }
                  return (
                    <PaginationItem key={page}>
                      <PaginationLink href="#" isActive={txPage === page} onClick={(e) => { e.preventDefault(); setTxPage(page); }}>
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}
                {totalTxPages > 7 && txPage < totalTxPages - 2 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => { e.preventDefault(); setTxPage((p) => Math.min(totalTxPages, p + 1)); }}
                    className={txPage >= totalTxPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      ) : tab === 'funding' ? (
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
              ) : filteredFunding.length === 0 ? (
                <div className="p-6 text-center text-sm text-[#eaecef]">No funding requests yet.</div>
              ) : (
                visibleFunding.map((it) => (
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
                      {it?.proof?.url || it?.meta?.proof?.url ? (
                        <a
                          href={it?.proof?.url || it?.meta?.proof?.url}
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
            {/* Pagination for Funding */}
            <div className="p-3">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => { e.preventDefault(); setFrPage((p) => Math.max(1, p - 1)); }}
                      className={frPage <= 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                  {Array.from({ length: totalFrPages }).map((_, i) => {
                    const page = i + 1;
                    if (totalFrPages > 7) {
                      const isFirst = page === 1;
                      const isLast = page === totalFrPages;
                      const isNear = Math.abs(page - frPage) <= 1;
                      if (!isFirst && !isLast && !isNear) return null;
                    }
                    return (
                      <PaginationItem key={page}>
                        <PaginationLink href="#" isActive={frPage === page} onClick={(e) => { e.preventDefault(); setFrPage(page); }}>
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}
                  {totalFrPages > 7 && frPage < totalFrPages - 2 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => { e.preventDefault(); setFrPage((p) => Math.min(totalFrPages, p + 1)); }}
                      className={frPage >= totalFrPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        ) : (
          <div className="border border-border rounded-lg overflow-hidden">
            <div className="grid grid-cols-5 text-xs uppercase tracking-wide bg-[#0f1115] text-[#eaecef] p-3">
              <div>Date</div>
              <div>Method</div>
              <div>Amount</div>
              <div>Details</div>
              <div>Status</div>
            </div>
            <div className="divide-y divide-border">
              {loading ? (
                <div className="p-6 text-center text-sm text-[#eaecef]">Loading...</div>
              ) : filteredWithdrawals.length === 0 ? (
                <div className="p-6 text-center text-sm text-[#eaecef]">No withdrawals yet.</div>
              ) : (
                visibleWithdrawals.map((it: any) => (
                  <div key={it._id} className="grid grid-cols-5 p-3 text-sm text-[#eaecef]">
                    <div>{it.createdAt ? new Date(it.createdAt).toLocaleString() : "—"}</div>
                    <div className="capitalize">{it.method}</div>
                    <div>${Number(it.amount || 0).toLocaleString()}</div>
                    <div className="truncate" title={it.method === 'crypto' ? it.address : it.bankDetails}>
                      {it.method === 'crypto' ? (it.address || '—') : (it.bankDetails || '—')}
                    </div>
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
                  </div>
                ))
              )}
            </div>
            {/* Pagination for Withdrawals */}
            <div className="p-3">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => { e.preventDefault(); setWdPage((p) => Math.max(1, p - 1)); }}
                      className={wdPage <= 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                  {Array.from({ length: totalWdPages }).map((_, i) => {
                    const page = i + 1;
                    if (totalWdPages > 7) {
                      const isFirst = page === 1;
                      const isLast = page === totalWdPages;
                      const isNear = Math.abs(page - wdPage) <= 1;
                      if (!isFirst && !isLast && !isNear) return null;
                    }
                    return (
                      <PaginationItem key={page}>
                        <PaginationLink href="#" isActive={wdPage === page} onClick={(e) => { e.preventDefault(); setWdPage(page); }}>
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}
                  {totalWdPages > 7 && wdPage < totalWdPages - 2 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => { e.preventDefault(); setWdPage((p) => Math.min(totalWdPages, p + 1)); }}
                      className={wdPage >= totalWdPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
