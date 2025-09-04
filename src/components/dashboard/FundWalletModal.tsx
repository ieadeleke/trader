// FundWalletModal.tsx
"use client";

import React, { useState } from "react";
import { Modal } from "antd";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { apiFetch } from "@/utils/api";
import { useToast } from "@/context/ToastContext";
import { useEffect } from "react";

interface FundWalletModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function FundWalletModal({ open, onClose, onSuccess }: FundWalletModalProps) {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState<string>("card");
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const { successToast, errorToast } = useToast();
  const [bankDetails, setBankDetails] = useState<any>(null);
  const [cryptoAddress, setCryptoAddress] = useState<string>("");

  // Fetch bank details when bank method selected
  useEffect(() => {
    const loadBankDetails = async () => {
      if (method !== "bank") return;
      try {
        const res = await apiFetch("/api/funding/bank-details", { method: "GET", auth: true });
        if (res.ok) {
          const data = await res.json();
          setBankDetails((data?.data ?? data) || null);
        } else {
          setBankDetails(null);
        }
      } catch {
        setBankDetails(null);
      }
    };
    loadBankDetails();
  }, [method]);

  // Fetch crypto address when crypto method selected and asset/network provided
  useEffect(() => {
    const loadCryptoAddress = async () => {
      if (method !== "crypto") return;
      const asset = formData.asset;
      const network = formData.network;
      if (!asset || !network) return;
      try {
        const qs = new URLSearchParams({ asset: String(asset), network: String(network) }).toString();
        const res = await apiFetch(`/api/funding/crypto-address?${qs}`, { method: "GET", auth: true });
        if (res.ok) {
          const data = await res.json();
          const addr = (data?.data?.address ?? data?.address ?? "") as string;
          setCryptoAddress(addr || "");
        } else {
          setCryptoAddress("");
        }
      } catch {
        setCryptoAddress("");
      }
    };
    loadCryptoAddress();
  }, [method, formData.asset, formData.network]);

  const handleSubmit = async () => {
    if (!amount || Number(amount) <= 0) return;
    if (method === "card") {
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
    } else {
      // Non-card: create a funding request (pending verification)
      try {
        setLoading(true);
        const res = await apiFetch('/api/funding/request', {
          method: 'POST',
          auth: true,
          json: {
            method,
            amount: Number(amount),
            asset: formData.asset || undefined,
            network: formData.network || undefined,
            meta: formData,
          },
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          throw new Error(data?.message || 'Funding request failed');
        }
        // If bank and proof file provided, upload proof
        const created = data?.data || data;
        if (method === 'bank' && formData?.proofFile && created?._id) {
          const fd = new FormData();
          fd.append('file', formData.proofFile);
          try {
            const up = await apiFetch(`/api/funding/${created._id}/proof`, {
              method: 'POST',
              auth: true,
              // @ts-ignore
              body: fd,
            });
            if (!up.ok) {
              const uj = await up.json().catch(() => ({}));
              console.warn('Proof upload failed', uj);
            }
          } catch (e) {
            console.warn('Proof upload error', e);
          }
        }
        successToast('Funding request submitted');
        setSubmitted(true);
        if (onSuccess) onSuccess();
      } catch (e: any) {
        console.error(e);
        errorToast(e?.message || 'Funding request failed');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleClose = () => {
    setAmount("");
    setSubmitted(false);
    setMethod("card");
    setFormData({});
    onClose();
  };

  const handleChange = (key: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [key]: value }));
  };

  return (
    <Modal open={open} onCancel={handleClose} footer={null} centered className="rounded-2xl">
      <div className="p-4 space-y-4">
        {!submitted ? (
          <>
            <h2 className="text-xl font-semibold text-center text-white font-ibm">
              Fund Wallet
            </h2>

            {/* Amount */}
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

            {/* Funding Method */}
            <div className="space-y-2">
              <Label className="text-white">Funding Method</Label>
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
                  <SelectItem value="card">Card (Stripe)</SelectItem>
                  <SelectItem value="crypto">Crypto Deposit</SelectItem>
                  <SelectItem value="bank">Bank Transfer</SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Dynamic Fields based on method */}
            {method === "crypto" && (
              <>
                <div className="space-y-2">
                  <Label className="text-white">Preferred Asset</Label>
                  <Input
                    placeholder="e.g. USDT, BTC, ETH"
                    value={formData.asset || ""}
                    onChange={(e) => handleChange("asset", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white">Blockchain Network</Label>
                  <Input
                    placeholder="e.g. Tron, Ethereum, BSC"
                    value={formData.network || ""}
                    onChange={(e) => handleChange("network", e.target.value)}
                  />
                </div>
                {formData.asset && formData.network && (
                  <div className="space-y-2">
                    <Label className="text-white">Deposit Address</Label>
                    <div className="flex gap-2">
                      <Input readOnly value={cryptoAddress || "Unavailable"} />
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => cryptoAddress && navigator.clipboard?.writeText(cryptoAddress)}
                      >
                        Copy
                      </Button>
                    </div>
                    <p className="text-xs text-gray-300">
                      Only send {formData.asset} on {formData.network}. Sending other assets or on other networks may result in loss of funds.
                    </p>
                  </div>
                )}
              </>
            )}

            {method === "bank" && (
              <>
                <div className="space-y-2">
                  <Label className="text-white">Reference/Note</Label>
                  <Input
                    placeholder="Add a note/reference for your transfer"
                    value={formData.reference || ""}
                    onChange={(e) => handleChange("reference", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white">Payment Proof (optional)</Label>
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      setFormData((prev: any) => ({ ...prev, proofFile: f }));
                    }}
                    className="block w-full text-sm text-[#eaecef] file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90"
                  />
                  <p className="text-xs text-gray-400">Upload a screenshot or PDF of your bank transfer.</p>
                </div>
                <div className="grid grid-cols-1 gap-2 text-white/90 text-sm">
                  <div className="border border-border rounded p-3">
                    <div className="flex justify-between"><span>Bank Name</span><span className="font-medium">{bankDetails?.bankName || '—'}</span></div>
                    <div className="flex justify-between"><span>Account Name</span><span className="font-medium">{bankDetails?.accountName || '—'}</span></div>
                    <div className="flex justify-between items-center gap-2">
                      <span>Account Number</span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium select-all">{bankDetails?.accountNumber || '—'}</span>
                        {bankDetails?.accountNumber && (
                          <Button type="button" size="sm" variant="secondary" onClick={() => navigator.clipboard?.writeText(String(bankDetails.accountNumber))}>Copy</Button>
                        )}
                      </div>
                    </div>
                    {bankDetails?.iban && (
                      <div className="flex justify-between items-center gap-2"><span>IBAN</span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium select-all">{bankDetails?.iban}</span>
                          <Button type="button" size="sm" variant="secondary" onClick={() => navigator.clipboard?.writeText(String(bankDetails.iban))}>Copy</Button>
                        </div>
                      </div>
                    )}
                    {bankDetails?.swift && (
                      <div className="flex justify-between"><span>SWIFT/BIC</span><span className="font-medium">{bankDetails?.swift}</span></div>
                    )}
                  </div>
                  <p className="text-xs text-gray-300">Make a transfer to the account above, then submit this request so our team can verify and credit your wallet.</p>
                </div>
              </>
            )}

            {method === "paypal" && (
              <div className="space-y-2">
                <Label className="text-white">PayPal Email</Label>
                <Input
                  type="email"
                  placeholder="Enter your PayPal email"
                  value={formData.paypalEmail || ""}
                  onChange={(e) => handleChange("paypalEmail", e.target.value)}
                />
              </div>
            )}

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-7 text-sm bg-primary text-white rounded-lg"
            >
              {method === "card"
                ? loading
                  ? "Processing..."
                  : "Pay with Card"
                : loading ? "Submitting..." : "Submit Funding Request"}
            </Button>
          </>
        ) : (
          <div className="text-center space-y-4 py-10">
            <h2 className="text-xl font-semibold text-white font-ibm">
              Request Received 🎉
            </h2>
            <p className="text-gray-300">
              Your funding request has been submitted. Please reach out to the admin
              to complete the process. Include your preferred method and amount.
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
