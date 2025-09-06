// LoansPage.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Modal, Table } from "antd";
import { useToast } from "@/context/ToastContext";
import Spinner from "@/components/ui/spin";
import { apiUrl } from "@/utils/api";

type Loan = {
  id: number;
  amount: number;
  apr: number; // Annual %
  duration: number; // days
  collateral: string;
  startDate: Date;
  dueDate: Date;
  balance: number;
  status: "Active" | "Repaid" | "Overdue";
};

export default function LoansPageContent() {
  const [open, setOpen] = useState(false);
  const [repayOpen, setRepayOpen] = useState<Loan | null>(null);
  const [amount, setAmount] = useState("");
  const [duration, setDuration] = useState("");
  // Collateral selection removed

  const [activeLoans, setActiveLoans] = useState<Loan[]>([]);
  const [fetching, setFetching] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [requestSuccess, setRequestSuccess] = useState<string | null>(null);
  const { successToast, errorToast, info } = useToast();

  // Helpers for currency formatting
  const formatWithCommas = (value: number | string) => {
    if (value === null || value === undefined) return "";
    const [intPart, decPart] = String(value).split(".");
    const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return decPart !== undefined ? `${formattedInt}.${decPart}` : formattedInt;
  };
  const parseAmount = (value: string) => {
    if (!value) return 0;
    const cleaned = value.replace(/[^0-9.]/g, "");
    const parts = cleaned.split(".");
    const normalized = parts.length > 1 ? parts[0] + "." + parts.slice(1).join("") : parts[0];
    const num = Number(normalized);
    return isNaN(num) ? 0 : num;
  };

  // Mock loan offers (reduced APRs)
  const loanOffers = [
    { id: 1, apr: 8, duration: 30, collateral: "BTC" },
    { id: 2, apr: 10, duration: 90, collateral: "ETH" },
    { id: 3, apr: 12, duration: 180, collateral: "USDT" },
  ];

  // Fetch user's loan records
  const fetchLoans = async () => {
    try {
      setFetching(true);
      const res = await fetch(apiUrl("/api/loans"), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch loans");
      const items: any[] = data?.data || data || [];
      const mapped: Loan[] = items.map((it, idx) => ({
        id: it.id ?? idx + 1,
        amount: Number(it.amount ?? it.principal ?? 0),
        apr: Number(it.apr ?? it.interestRate ?? 0),
        duration: Number(it.durationDays ?? it.duration ?? 0),
        collateral: String(it.collateral ?? it.asset ?? ""),
        startDate: it.startDate ? new Date(it.startDate) : new Date(),
        dueDate: it.dueDate ? new Date(it.dueDate) : new Date(),
        balance: Number(it.balance ?? it.outstanding ?? it.amount ?? 0),
        status: (it.status as Loan["status"]) ?? "Active",
      }));
      setActiveLoans(mapped);
    } catch (err: any) {
      errorToast(err.message || "Failed to fetch loans");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchLoans();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle new loan application
  const handleApply = async () => {
    const amtNumber = parseAmount(amount);
    if (!amtNumber || !duration) {
      errorToast("Fill in all fields!");
      return;
    }
    if (amtNumber < 20000) {
      errorToast("Minimum loan amount is $20,000");
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch(apiUrl("/api/loans/request"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          amount: amtNumber,
          duration: Number(duration),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Loan request failed");

      successToast("Loan request submitted. A support officer will reach out to you.");
      setRequestSuccess("Your request was received. A support officer will reach out to you.");
      setAmount("");
      setDuration("");
      // collateral no longer required
      // Refresh loan records
      fetchLoans();
    } catch (err: any) {
      errorToast(err.message || "Loan request failed");
    } finally {
      setSubmitting(false);
    }
  };

  // Interest accrual simulation removed to rely on backend records

  // Handle repayment
  const handleRepay = (loan: Loan, repayAmount: number) => {
    setActiveLoans((prev) =>
      prev.map((l) =>
        l.id === loan.id
          ? {
              ...l,
              balance: Math.max(0, l.balance - repayAmount),
              status: Math.max(0, l.balance - repayAmount) === 0 ? "Repaid" : l.status,
            }
          : l
      )
    );
    setRepayOpen(null);
    successToast("Repayment successful!");
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-semibold text-white">Loans</h1>

      {/* Loan Offers */}
      <Card className="bg-[#1e1e2d] text-white">
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold mb-4">Available Loan Offers</h2>
          <Table
            dataSource={loanOffers}
            columns={[
              { title: "APR", dataIndex: "apr", key: "apr", render: (val) => `${val}%` },
              { title: "Duration", dataIndex: "duration", key: "duration", render: (val) => `${val} days` },
              { title: "Collateral", dataIndex: "collateral", key: "collateral" },
            ]}
            pagination={false}
            rowKey="id"
          />
          <Button
            onClick={() => {
              setRequestSuccess(null);
              setOpen(true);
            }}
            className="mt-4 w-full"
          >
            Apply for Loan
          </Button>
        </CardContent>
      </Card>

      {/* Active Loans */}
      <Card className="bg-[#1e1e2d] text-white">
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold mb-4">My Active Loans</h2>
          <Table
            loading={fetching}
            dataSource={activeLoans}
            columns={[
              { title: "Amount", dataIndex: "amount", key: "amount", render: (val) => `$${formatWithCommas(val)}` },
              { title: "APR", dataIndex: "apr", key: "apr", render: (val) => `${val}%` },
              { title: "Duration", dataIndex: "duration", key: "duration", render: (val) => `${val} days` },
              { title: "Collateral", dataIndex: "collateral", key: "collateral" },
              { title: "Balance", dataIndex: "balance", key: "balance", render: (val) => `$${formatWithCommas(Number(val).toFixed(2))}` },
              { title: "Due Date", dataIndex: "dueDate", key: "dueDate", render: (date: Date) => new Date(date).toLocaleDateString() },
              { title: "Status", dataIndex: "status", key: "status" },
              {
                title: "Action",
                key: "action",
                render: (_, loan) =>
                  loan.status === "Active" && (
                    <Button onClick={() => setRepayOpen(loan)} size="sm" className="bg-green-600 hover:bg-green-700">
                      Repay
                    </Button>
                  ),
              },
            ]}
            pagination={false}
            rowKey="id"
          />
        </CardContent>
      </Card>

      {/* Apply Loan Modal */}
      <Modal
        open={open}
        onCancel={() => {
          setRequestSuccess(null);
          setOpen(false);
        }}
        footer={null}
        centered
      >
        <div className="p-4 space-y-4">
          <h2 className="text-xl font-semibold text-center text-white font-ibm">Apply for Loan</h2>

          <div className="space-y-2">
            <Label className="text-white">Amount</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/80">$</span>
              <Input
                type="text"
                inputMode="decimal"
                placeholder="Enter loan amount"
                value={amount}
                onChange={(e) => {
                  const raw = e.target.value;
                  const cleaned = raw.replace(/[^0-9.]/g, "");
                  const parts = cleaned.split(".");
                  const normalized = parts.length > 1 ? parts[0] + "." + parts.slice(1).join("") : parts[0];
                  const [intP, decP] = normalized.split(".");
                  const formattedInt = intP ? intP.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "";
                  const formatted = decP !== undefined ? `${formattedInt}.${decP}` : formattedInt;
                  setAmount(formatted);
                }}
                className="pl-8"
                disabled={submitting || !!requestSuccess}
              />
            </div>
            <p className="text-xs text-gray-400">Minimum amount: $20,000</p>
          </div>

          <div className="space-y-2">
            <Label className="text-white">Duration</Label>
            <Select onValueChange={setDuration} value={duration}>
              <SelectTrigger className="w-full h-[3.2rem]" disabled={submitting || !!requestSuccess}>
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                {loanOffers.map((offer) => (
                  <SelectItem key={offer.id} value={String(offer.duration)}>
                    {offer.duration} days
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Collateral selection removed */}

          {requestSuccess ? (
            <Button
              onClick={() => {
                setRequestSuccess(null);
                setOpen(false);
              }}
              className="w-full py-6"
            >
              Close
            </Button>
          ) : (
            <Button onClick={handleApply} className="w-full py-6" disabled={submitting}>
              {submitting ? <Spinner color="#fff" fontSize="20px" /> : "Submit Loan Request"}
            </Button>
          )}
          {requestSuccess && (
            <p className="text-green-400 text-sm text-center mt-2">
              {requestSuccess}
            </p>
          )}
        </div>
      </Modal>

      {/* Repayment Modal */}
      <Modal open={!!repayOpen} onCancel={() => setRepayOpen(null)} footer={null} centered>
        {repayOpen && (
          <div className="p-4 space-y-4">
            <h2 className="text-lg font-semibold text-center">Repay Loan</h2>
            <p className="text-sm text-gray-300 text-center">
              Balance: ${repayOpen.balance.toFixed(2)} | Due: {repayOpen.dueDate.toLocaleDateString()}
            </p>
            <Input
              type="number"
              placeholder="Enter repayment amount"
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter") {
                  handleRepay(repayOpen, Number((e.target as HTMLInputElement).value));
                }
              }}
            />
            <Button
              onClick={() => handleRepay(repayOpen, repayOpen.balance)}
              className="w-full py-6 bg-green-600 hover:bg-green-700"
            >
              Repay Full
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
}
