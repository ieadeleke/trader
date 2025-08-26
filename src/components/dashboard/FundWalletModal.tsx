// FundWalletModal.tsx
"use client";

import React, { useState } from "react";
import { Modal } from "antd";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface FundWalletModalProps {
  open: boolean;
  onClose: () => void;
}

export default function FundWalletModal({ open, onClose }: FundWalletModalProps) {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!amount || Number(amount) <= 0) return;
    setLoading(true);
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: Number(amount) }),
      });

      const data = await res.json();

      if (data.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        alert("Failed to create payment session.");
      }
    } catch (err) {
      console.error(err);
      alert("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onCancel={onClose} footer={null} centered className="rounded-2xl">
      <div className="p-4 space-y-4">
        <h2 className="text-xl font-semibold text-center text-white font-ibm">
          Fund Wallet
        </h2>

        <div className="space-y-2">
          <Label className="text-white" htmlFor="amount">
            Amount
          </Label>
          <Input
            id="amount"
            type="number"
            placeholder="Enter amount in USD"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-7 text-sm bg-primary text-white rounded-lg"
        >
          {loading ? "Processing..." : "Pay with Card"}
        </Button>
      </div>
    </Modal>
  );
}
