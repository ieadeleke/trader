// WithdrawalModal.tsx
"use client";

import React, { useState } from "react";
import { Modal } from "antd";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { apiFetch } from "@/utils/api";

interface WithdrawalModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  onSuccess?: () => void;
}

export default function WithdrawalModal({ open, onClose, onSubmit, onSuccess }: WithdrawalModalProps) {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("");
  const [formData, setFormData] = useState<any>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (key: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    if (!amount || !method) return;
    try {
      setLoading(true);
      const payload: any = { amount: Number(amount), method };
      if (method === 'crypto') {
        payload.network = formData.network || '';
        payload.wallet = formData.wallet || '';
      } else if (method === 'bank') {
        payload.bankDetails = formData.bankDetails || '';
      }
      const res = await apiFetch(`/api/withdrawals/request`, {
        method: 'POST',
        auth: true,
        json: {
          ...payload
        }
        // headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        // body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.message || 'Withdrawal request failed');
      setSubmitted(true);
      if (onSuccess) onSuccess();
    } catch (_) {
      // Keep UX simple: silently fail? Optionally wire toast here.
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setAmount("");
    setMethod("");
    setFormData({});
    setSubmitted(false);
    onClose();
  };

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      footer={null}
      centered
      className="rounded-2xl"
    >
      <div className="p-4 space-y-4">
        {!submitted ? (
          <>
            <h2 className="text-xl font-semibold text-center text-white font-ibm">
              Withdraw Funds
            </h2>

            {/* Amount */}
            <div className="space-y-2">
              <Label className="text-white" htmlFor="amount">
                Amount
              </Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            {/* Withdrawal Method */}
            <div className="space-y-2">
              <Label className="text-white">Withdrawal Method</Label>
              <Select
                onValueChange={(val) => {
                  setMethod(val);
                  setFormData({});
                }}
                value={method}
              >
                <SelectTrigger className="w-full h-[3.7rem]">
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="crypto">Crypto</SelectItem>
                  <SelectItem value="bank">Bank Transfer</SelectItem>
                  {/* <SelectItem value="mobile">Mobile Money</SelectItem> */}
                </SelectContent>
              </Select>
            </div>

            {/* Dynamic Fields */}
            {method === "crypto" && (
              <>
                <div className="space-y-2">
                  <Label className="text-white">Blockchain Network</Label>
                  <Input
                    placeholder="e.g. Ethereum, BSC, Tron"
                    value={formData.network || ""}
                    onChange={(e) => handleChange("network", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white">Wallet Address</Label>
                  <Input
                    placeholder="Enter wallet address"
                    value={formData.wallet || ""}
                    onChange={(e) => handleChange("wallet", e.target.value)}
                  />
                </div>
              </>
            )}

            {method === "bank" && (
              <div className="space-y-2">
                <Label className="text-white">Banking Details</Label>
                <Textarea
                  placeholder="Fill in your banking details"
                  value={formData.bankDetails || ""}
                  onChange={(e) => handleChange("bankDetails", e.target.value)}
                  className="text-white opacity-90"
                />
              </div>
            )}

            {/* PayPal option removed */}

            {method === "mobile" && (
              <>
                <div className="space-y-2">
                  <Label className="text-white">Provider</Label>
                  <Input
                    placeholder="e.g. MTN, Airtel, M-Pesa"
                    value={formData.provider || ""}
                    onChange={(e) => handleChange("provider", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white">Phone Number</Label>
                  <Input
                    type="tel"
                    placeholder="Enter mobile number"
                    value={formData.phone || ""}
                    onChange={(e) => handleChange("phone", e.target.value)}
                  />
                </div>
              </>
            )}

            {/* Submit Button */}
            <Button onClick={handleSubmit} disabled={loading} className="w-full py-7 text-sm bg-primary text-white rounded-lg">
              {loading ? 'Submitting...' : 'Confirm Withdrawal'}
            </Button>
          </>
        ) : (
          <div className="text-center space-y-4 py-10">
            <h2 className="text-xl font-semibold text-white font-ibm">
              Request Received 🎉
            </h2>
            <p className="text-gray-300">
              Your withdrawal request has been submitted.  
              Please reach out to the admin within the next 24 hours to complete the process.
            </p>
            <Button
              onClick={handleClose}
              className="mt-4 py-6 w-[60%] mx-auto bg-primary text-white rounded-lg"
            >
              Close
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
}
