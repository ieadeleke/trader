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

interface WithdrawalModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export default function WithdrawalModal({
  open,
  onClose,
  onSubmit,
}: WithdrawalModalProps) {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("");
  const [formData, setFormData] = useState<any>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (key: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    if (!amount || !method) return;
    // onSubmit({ amount, method, ...formData });
    setSubmitted(true);
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
                  <SelectItem value="paypal">PayPal</SelectItem>
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
              <>
                <div className="space-y-2">
                  <Label className="text-white">Bank Name</Label>
                  <Input
                    placeholder="Enter bank name"
                    value={formData.bankName || ""}
                    onChange={(e) => handleChange("bankName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white">Account Number</Label>
                  <Input
                    placeholder="Enter account number"
                    value={formData.accountNumber || ""}
                    onChange={(e) =>
                      handleChange("accountNumber", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white">Account Holder</Label>
                  <Input
                    placeholder="Enter account holder name"
                    value={formData.accountHolder || ""}
                    onChange={(e) =>
                      handleChange("accountHolder", e.target.value)
                    }
                  />
                </div>
              </>
            )}

            {method === "paypal" && (
              <div className="space-y-2">
                <Label className="text-white">PayPal Email</Label>
                <Input
                  type="email"
                  placeholder="Enter PayPal email"
                  value={formData.paypalEmail || ""}
                  onChange={(e) => handleChange("paypalEmail", e.target.value)}
                />
              </div>
            )}

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
            <Button
              onClick={handleSubmit}
              className="w-full py-7 text-sm bg-primary text-white rounded-lg"
            >
              Confirm Withdrawal
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
