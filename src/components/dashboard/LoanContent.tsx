// LoansPage.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Modal, Table, message } from "antd";

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
  const [collateral, setCollateral] = useState("");

  const [activeLoans, setActiveLoans] = useState<Loan[]>([]);

  // Mock loan offers
  const loanOffers = [
    { id: 1, apr: 12, duration: 30, collateral: "BTC" },
    { id: 2, apr: 15, duration: 90, collateral: "ETH" },
    { id: 3, apr: 20, duration: 180, collateral: "USDT" },
  ];

  // Handle new loan application
  const handleApply = () => {
    if (!amount || !duration || !collateral) {
      message.error("Fill in all fields!");
      return;
    }

    const offer = loanOffers.find((o) => o.duration === Number(duration) && o.collateral === collateral);
    if (!offer) {
      message.error("Invalid loan offer.");
      return;
    }

    const startDate = new Date();
    const dueDate = new Date(startDate);
    dueDate.setDate(startDate.getDate() + Number(duration));

    const newLoan: Loan = {
      id: activeLoans.length + 1,
      amount: Number(amount),
      apr: offer.apr,
      duration: offer.duration,
      collateral,
      startDate,
      dueDate,
      balance: Number(amount),
      status: "Active",
    };

    setActiveLoans((prev) => [...prev, newLoan]);
    setAmount("");
    setDuration("");
    setCollateral("");
    setOpen(false);
    message.success("Loan successfully created!");
  };

  // Calculate accrued interest daily
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLoans((loans) =>
        loans.map((loan) => {
          if (loan.status !== "Active") return loan;

          const daysElapsed = Math.floor((Date.now() - loan.startDate.getTime()) / (1000 * 60 * 60 * 24));
          const dailyRate = loan.apr / 365 / 100;
          const interest = loan.amount * dailyRate * daysElapsed;

          const updatedBalance = loan.amount + interest;

          let status: Loan["status"] = loan.status;
          if (loan.balance <= 0) status = "Repaid";
          else if (Date.now() > loan.dueDate.getTime()) status = "Overdue";

          return { ...loan, balance: updatedBalance, status };
        })
      );
    }, 5000); // refresh every 5s

    return () => clearInterval(interval);
  }, []);

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
    message.success("Repayment successful!");
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
          <Button onClick={() => setOpen(true)} className="mt-4 w-full">
            Apply for Loan
          </Button>
        </CardContent>
      </Card>

      {/* Active Loans */}
      <Card className="bg-[#1e1e2d] text-white">
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold mb-4">My Active Loans</h2>
          <Table
            dataSource={activeLoans}
            columns={[
              { title: "Amount", dataIndex: "amount", key: "amount" },
              { title: "APR", dataIndex: "apr", key: "apr", render: (val) => `${val}%` },
              { title: "Duration", dataIndex: "duration", key: "duration", render: (val) => `${val} days` },
              { title: "Collateral", dataIndex: "collateral", key: "collateral" },
              { title: "Balance", dataIndex: "balance", key: "balance", render: (val) => `$${val.toFixed(2)}` },
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
      <Modal open={open} onCancel={() => setOpen(false)} footer={null} centered>
        <div className="p-4 space-y-4">
          <h2 className="text-xl font-semibold text-center text-white font-ibm">Apply for Loan</h2>

          <div className="space-y-2">
            <Label className="text-white">Amount</Label>
            <Input
              type="number"
              placeholder="Enter loan amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white">Duration</Label>
            <Select onValueChange={setDuration} value={duration}>
              <SelectTrigger className="w-full h-[3.2rem]">
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

          <div className="space-y-2 mb-4">
            <Label className="text-white">Collateral</Label>
            <Select onValueChange={setCollateral} value={collateral}>
              <SelectTrigger className="w-full h-[3.2rem]">
                <SelectValue placeholder="Select collateral" />
              </SelectTrigger>
              <SelectContent>
                {loanOffers.map((offer) => (
                  <SelectItem key={offer.id} value={offer.collateral}>
                    {offer.collateral}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleApply} className="w-full py-6">
            Submit Loan Request
          </Button>
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
