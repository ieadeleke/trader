// ConvertTokensModal.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface ConvertTokensModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { fromToken: string; toToken: string; amount: number }) => void;
  availableTokens: string[];
}

export default function ConvertTokensModal({ open, onClose, onSubmit, availableTokens }: ConvertTokensModalProps) {
  const [fromToken, setFromToken] = useState("");
  const [toToken, setToToken] = useState("");
  const [amount, setAmount] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [prices, setPrices] = useState<Record<string, number>>({});
  const [rate, setRate] = useState<number | null>(null);

  // Fetch live prices from CoinGecko
  useEffect(() => {
    if (!availableTokens.length) return;
    const fetchPrices = async () => {
      try {
        const ids = availableTokens.join(",");
        const res = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`
        );
        const data = await res.json();
        const newPrices: Record<string, number> = {};
        availableTokens.forEach(token => {
          newPrices[token] = data[token]?.usd || 0;
        });
        setPrices(newPrices);
      } catch (err) {
        console.error("Failed to fetch prices:", err);
      }
    };
    fetchPrices();
  }, [availableTokens]);

  // Calculate conversion rate and converted amount
  useEffect(() => {
    if (fromToken && toToken && prices[fromToken] && prices[toToken]) {
      const newRate = prices[fromToken] / prices[toToken];
      setRate(newRate);
      if (amount) {
        setConvertedAmount(Number(amount) * newRate);
      } else {
        setConvertedAmount(null);
      }
    } else {
      setRate(null);
      setConvertedAmount(null);
    }
  }, [fromToken, toToken, amount, prices]);

  const handleSubmit = () => {
    if (!fromToken || !toToken || fromToken === toToken || Number(amount) <= 0) return;
    onSubmit({ fromToken, toToken, amount: Number(amount) });
    setSubmitted(true);
  };

  const handleClose = () => {
    setFromToken("");
    setToToken("");
    setAmount("");
    setConvertedAmount(null);
    setRate(null);
    setSubmitted(false);
    onClose();
  };

  const canConvert = fromToken && toToken && fromToken !== toToken && Number(amount) > 0;

  return (
    <Modal open={open} onCancel={handleClose} footer={null} centered className="rounded-2xl">
      <div className="p-4 space-y-4">
        {!submitted ? (
          <>
            <h2 className="text-xl font-semibold text-center text-white font-ibm">Convert Tokens</h2>

            {/* From Token */}
            <div className="space-y-2">
              <Label className="text-white">From Token</Label>
              <Select onValueChange={setFromToken} value={fromToken}>
                <SelectTrigger className="w-full h-[3.7rem]">
                  <SelectValue placeholder="Select token" />
                </SelectTrigger>
                <SelectContent>
                  {availableTokens.map(token => (
                    <SelectItem key={token} value={token}>{token.toUpperCase()}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* To Token */}
            <div className="space-y-2">
              <Label className="text-white">To Token</Label>
              <Select onValueChange={setToToken} value={toToken}>
                <SelectTrigger className="w-full h-[3.7rem]">
                  <SelectValue placeholder="Select token" />
                </SelectTrigger>
                <SelectContent>
                  {availableTokens.map(token => (
                    <SelectItem key={token} value={token}>{token.toUpperCase()}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Error if same token selected */}
            {fromToken && toToken && fromToken === toToken && (
              <p className="text-red-500 text-sm">Please select different tokens to convert.</p>
            )}

            {/* Amount */}
            <div className="space-y-2">
              <Label className="text-white">Amount</Label>
              <Input
                type="number"
                placeholder="Enter amount to convert"
                value={amount}
                onChange={e => setAmount(e.target.value)}
              />
            </div>

            {/* Conversion Rate */}
            {rate && fromToken && toToken && fromToken !== toToken && (
              <div className="text-gray-400 text-sm">
                1 {fromToken.toUpperCase()} = {rate.toFixed(6)} {toToken.toUpperCase()}
              </div>
            )}

            {/* Converted Amount */}
            {convertedAmount !== null && (
              <div className="text-gray-300">
                You will receive: <span className="text-white font-semibold">{convertedAmount.toFixed(6)} {toToken.toUpperCase()}</span>
              </div>
            )}

            {/* Submit */}
            <Button
              onClick={handleSubmit}
              disabled={!canConvert}
              className={`w-full py-7 text-sm rounded-lg ${canConvert ? "bg-primary text-white" : "bg-gray-500 text-gray-300 cursor-not-allowed"}`}
            >
              Convert
            </Button>
          </>
        ) : (
          <div className="text-center space-y-4 py-10">
            <h2 className="text-xl font-semibold text-white font-ibm">Conversion Successful 🎉</h2>
            <p className="text-gray-300">
              Your {amount} {fromToken.toUpperCase()} has been converted to {convertedAmount?.toFixed(6)} {toToken.toUpperCase()}.
            </p>
            <Button onClick={handleClose} className="mt-4 py-6 w-[60%] mx-auto bg-primary text-white rounded-lg">
              Close
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
}
