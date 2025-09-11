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
  const NETWORK_OPTIONS: Record<string, string[]> = {
    BTC: ["Bitcoin"],
    ETH: ["ERC20"],
    USDT: ["TRC20"],
    TRX: ["TRC20"],
  };

  // Fetch bank details when bank method selected
  useEffect(() => {
    // Bank account details are intentionally hidden in the UI now.
    // Keep hook in case of future requirements.
    setBankDetails(null);
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
          if (addr) {
            setCryptoAddress(addr);
            return;
          }
        } else {
          // no-op; we try fallback below
        }
      } catch {
        // ignore; we try fallback below
      }
      // Frontend fallback mapping if backend is not updated yet
      const a = String(asset).toUpperCase();
      const n = String(network).toUpperCase();
      const alias: Record<string, string> = { BTC: "BITCOIN", ETH: "ERC20", ETHEREUM: "ERC20", ERC20: "ERC20", TRON: "TRC20", TRC20: "TRC20", TRX: "TRC20" };
      const key = `${a}_${alias[n] || n}`;
      const MAP: Record<string, string> = {
        BTC_BITCOIN: "bc1q0rf80yd64mux8ps2v3sy4x5u2pk47sudjcf25a",
        ETH_ERC20: "0x1940c834c166156Fb1eB1389C207632AeDD64386",
        USDT_TRC20: "TGVkgF2nyQyQY35EXdbQ4gV5yoKTvoKGiy",
        TRX_TRC20: "TGVkgF2nyQyQY35EXdbQ4gV5yoKTvoKGiy",
      };
      setCryptoAddress(MAP[key] || "");
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
                </SelectContent>
              </Select>
            </div>

            {/* Dynamic Fields based on method */}
            {method === "crypto" && (
              <>
                <div className="space-y-2">
                  <Label className="text-white">Preferred Asset</Label>
                  <Select
                    value={formData.asset || ""}
                    onValueChange={(v) => {
                      // Set network based on mapping (first option) or clear
                      const opts = NETWORK_OPTIONS[v] || [];
                      setFormData((prev: any) => ({ ...prev, asset: v, network: opts[0] || "" }));
                    }}
                  >
                    <SelectTrigger className="w-full h-[3.7rem]">
                      <SelectValue placeholder="Select asset" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USDT">USDT</SelectItem>
                      <SelectItem value="BTC">BTC</SelectItem>
                      <SelectItem value="ETH">ETH</SelectItem>
                      <SelectItem value="TRX">TRX</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-white">Blockchain Network</Label>
                  {(NETWORK_OPTIONS[formData.asset] || []).length > 0 ? (
                    <Select
                      value={formData.network || ""}
                      onValueChange={(v) => handleChange("network", v)}
                    >
                      <SelectTrigger className="w-full h-[3.7rem]">
                        <SelectValue placeholder="Select network" />
                      </SelectTrigger>
                      <SelectContent>
                        {(NETWORK_OPTIONS[formData.asset] || []).map((n) => (
                          <SelectItem key={n} value={n}>{n}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      placeholder="e.g. Tron, Ethereum, Bitcoin"
                      value={formData.network || ""}
                      onChange={(e) => handleChange("network", e.target.value)}
                    />
                  )}
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
              </>
            )}

            {/* PayPal option removed */}

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
              Your funding request has been submitted. An admin will reach out to you to complete the process.
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
