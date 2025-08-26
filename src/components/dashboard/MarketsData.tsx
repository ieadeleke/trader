// app/trade/page.tsx (or src/pages/TradePage.tsx)
"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "antd";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import ConvertTokensModal from "./ConvertTokens"; // <- from earlier
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// ------------------------------
// Types & Constants
// ------------------------------

type AssetClass = "CRYPTO" | "STOCKS" | "COMMODITIES" | "BONDS";

// CoinGecko token ids; extend as needed
const CRYPTO_TOKENS = [
  { id: "bitcoin", symbol: "BTC" },
  { id: "ethereum", symbol: "ETH" },
  { id: "tether", symbol: "USDT" },
  { id: "ripple", symbol: "XRP" },
  { id: "solana", symbol: "SOL" },
];

// Demo lists for other asset classes (tickers only).
// Replace with your brokerage/market data provider (e.g., Finnhub, Alpha Vantage, Polygon.io).
const STOCKS = ["AAPL", "MSFT", "NVDA", "AMZN", "GOOGL"];
const COMMODITIES = ["XAUUSD", "XAGUSD", "WTI", "BRENT"];
const BONDS = ["UST10Y", "UST2Y", "BUND10Y", "GILT10Y"];

// ------------------------------
// Helpers
// ------------------------------

function formatNumber(n: number | string, max = 6) {
  const num = Number(n);
  if (Number.isNaN(num)) return String(n);
  if (Math.abs(num) >= 1) return num.toLocaleString(undefined, { maximumFractionDigits: 2 });
  return num.toLocaleString(undefined, { maximumFractionDigits: max });
}

function toChartTime(ts: number) {
  const d = new Date(ts);
  return `${d.getHours().toString().padStart(2, "0")}:${d
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
}

// Mock chart series for non-crypto assets
function generateMockSeries(len = 100, start = 100, vol = 2) {
  const data: { t: number; price: number }[] = [];
  let p = start;
  const now = Date.now();
  for (let i = len - 1; i >= 0; i--) {
    const ts = now - i * 60 * 60 * 1000; // hourly points
    p = p + (Math.random() - 0.5) * vol;
    data.push({ t: ts, price: Math.max(0.1, p) });
  }
  return data;
}

// ------------------------------
// Order Form Component (Market & Limit)
// ------------------------------

function OrderForm({ side, onSubmit, lastPrice }: { side: "BUY" | "SELL"; onSubmit: (o: any) => void; lastPrice?: number }) {
  const [type, setType] = useState<"MARKET" | "LIMIT">("MARKET");
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");

  const total = useMemo(() => {
    const px = type === "MARKET" ? (lastPrice ?? 0) : Number(price || 0);
    return Number(amount || 0) * (px || 0);
  }, [type, price, amount, lastPrice]);

  useEffect(() => {
    if (type === "MARKET") setPrice("");
  }, [type]);

  return (
    <div className="bg-[#1c1c24] rounded-2xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-white font-semibold">{side === "BUY" ? "Buy" : "Sell"}</h3>
        <Select value={type} onValueChange={(v) => setType(v as any)}>
          <SelectTrigger className="w-[130px] h-10">
            <SelectValue placeholder="Order Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="MARKET">Market</SelectItem>
            <SelectItem value="LIMIT">Limit</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {type === "LIMIT" && (
        <div className="space-y-2">
          <Label className="text-white">Price</Label>
          <Input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter limit price"
          />
        </div>
      )}

      <div className="space-y-2">
        <Label className="text-white">Amount</Label>
        <Input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
        />
      </div>

      <div className="text-gray-300 text-sm flex justify-between">
        <span>Total</span>
        <span className="text-white font-semibold">{formatNumber(total)}</span>
      </div>

      <Button
        onClick={() => onSubmit({ side, type, price: type === "MARKET" ? lastPrice : Number(price), amount: Number(amount), total })}
        className={`w-full py-3 rounded-lg ${side === "BUY" ? "bg-green-600" : "bg-red-600"} text-white`}
      >
        {side === "BUY" ? "Buy" : "Sell"}
      </Button>
    </div>
  );
}

// ------------------------------
// Simple Order Book (mock)
// ------------------------------

function OrderBook({ lastPrice }: { lastPrice?: number }) {
  const asks = useMemo(() => Array.from({ length: 8 }, () => ({ price: (lastPrice || 100) * (1 + Math.random() * 0.01), amount: Math.random() * 2 })), [lastPrice]);
  const bids = useMemo(() => Array.from({ length: 8 }, () => ({ price: (lastPrice || 100) * (1 - Math.random() * 0.01), amount: Math.random() * 2 })), [lastPrice]);

  return (
    <div className="bg-[#1c1c24] rounded-2xl p-4 space-y-3">
      <h3 className="text-white font-semibold">Order Book</h3>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <div className="text-gray-400 mb-1">Asks</div>
          <ul className="space-y-1">
            {asks.sort((a, b) => a.price - b.price).map((r, i) => (
              <li key={i} className="flex justify-between text-red-400">
                <span>{formatNumber(r.price)}</span>
                <span>{formatNumber(r.amount)}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-gray-400 mb-1">Bids</div>
          <ul className="space-y-1">
            {bids.sort((a, b) => b.price - a.price).map((r, i) => (
              <li key={i} className="flex justify-between text-green-400">
                <span>{formatNumber(r.price)}</span>
                <span>{formatNumber(r.amount)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// ------------------------------
// Recent Trades (mock)
// ------------------------------

function RecentTrades() {
  const rows = useMemo(
    () =>
      Array.from({ length: 10 }, () => ({
        side: Math.random() > 0.5 ? "BUY" : "SELL",
        price: 100 + (Math.random() - 0.5) * 2,
        amount: Math.random() * 2,
        ts: Date.now() - Math.floor(Math.random() * 60 * 60 * 1000),
      })),
    []
  );

  return (
    <div className="bg-[#1c1c24] rounded-2xl p-4 space-y-2">
      <h3 className="text-white font-semibold">Recent Trades</h3>
      <ul className="text-sm text-gray-300 space-y-1">
        {rows.map((r, i) => (
          <li key={i} className="flex justify-between">
            <span className={r.side === "BUY" ? "text-green-400" : "text-red-400"}>{r.side}</span>
            <span>{formatNumber(r.price)}</span>
            <span>{formatNumber(r.amount)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ------------------------------
// Chart Wrapper (CoinGecko for Crypto, Mock for others)
// ------------------------------

function AssetChart({ assetClass, symbolOrId, onLastPrice }: { assetClass: AssetClass; symbolOrId: string; onLastPrice?: (p: number) => void }) {
  const [series, setSeries] = useState<{ t: number; price: number }[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let ignore = false;
    const run = async () => {
      setLoading(true);
      try {
        if (assetClass === "CRYPTO") {
          // symbolOrId is CoinGecko id
          const url = `https://api.coingecko.com/api/v3/coins/${symbolOrId}/market_chart?vs_currency=usd&days=1&interval=hourly`;
          const res = await fetch(url);
          const data = await res.json();
          const prices: [number, number][] = data?.prices || [];
          const mapped = prices.map(([t, p]) => ({ t, price: p }));
          if (!ignore) {
            setSeries(mapped);
            if (mapped.length && onLastPrice) onLastPrice(mapped[mapped.length - 1].price);
          }
        } else {
          const mock = generateMockSeries(120, 100 + Math.random() * 20, 1.2);
          setSeries(mock);
          if (mock.length && onLastPrice) onLastPrice(mock[mock.length - 1].price);
        }
      } catch (e) {
        console.error(e);
        const fallback = generateMockSeries(60, 100, 1);
        setSeries(fallback);
        if (onLastPrice) onLastPrice(fallback[fallback.length - 1].price);
      } finally {
        setLoading(false);
      }
    };
    run();
    return () => {
      ignore = true;
    };
  }, [assetClass, symbolOrId, onLastPrice]);

  const data = useMemo(() => series.map((d) => ({ time: toChartTime(d.t), price: d.price })), [series]);

  return (
    <div className="bg-[#1c1c24] rounded-2xl p-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-white font-semibold">Price Chart</h3>
        {series.length > 0 && (
          <span className="text-gray-300 text-sm">Last: <span className="text-white font-semibold">${formatNumber(series[series.length - 1].price)}</span></span>
        )}
      </div>
      <div className="h-[340px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 12, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" hide />
            <YAxis domain={['auto', 'auto']} tickFormatter={(v) => String(v)} width={70} />
            <Tooltip formatter={(v: any) => [formatNumber(v), "Price"]} labelFormatter={(l) => `Time: ${l}`} />
            <Line type="monotone" dataKey="price" dot={false} strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      {loading && <div className="text-gray-400 text-sm mt-2">Loading chart…</div>}
      {assetClass !== "CRYPTO" && (
        <div className="text-amber-300 text-xs mt-3">
          Demo feed shown. Plug in a real market data API (e.g., Finnhub/Alpha Vantage/Polygon/Quandl) in <code>AssetChart</code> for {assetClass.toLowerCase()}.
        </div>
      )}
    </div>
  );
}

// ------------------------------
// Main Trade Page
// ------------------------------

export default function TradePage() {
  const [assetClass, setAssetClass] = useState<AssetClass>("CRYPTO");
  const [cryptoId, setCryptoId] = useState(CRYPTO_TOKENS[0].id);
  const [stock, setStock] = useState(STOCKS[0]);
  const [commodity, setCommodity] = useState(COMMODITIES[0]);
  const [bond, setBond] = useState(BONDS[0]);
  const [convertOpen, setConvertOpen] = useState(false);
  const [lastPrice, setLastPrice] = useState<number | undefined>(undefined);

  // Available tokens for ConvertTokensModal when in crypto
  const availableTokens = useMemo(() => CRYPTO_TOKENS.map((t) => t.id), []);

  const activeSymbol = useMemo(() => {
    switch (assetClass) {
      case "CRYPTO":
        return CRYPTO_TOKENS.find((t) => t.id === cryptoId)?.symbol + "/USD";
      case "STOCKS":
        return `${stock}/USD`;
      case "COMMODITIES":
        return commodity;
      case "BONDS":
        return bond;
    }
  }, [assetClass, cryptoId, stock, commodity, bond]);

  const handlePlaceOrder = (order: any) => {
    // TODO: Integrate with your matching engine / backend orders API
    console.log("NEW ORDER", { assetClass, symbol: activeSymbol, order });
    Modal.success({
      title: "Order received",
      content: (
        <div className="text-sm">
          <div>Asset: <b>{activeSymbol}</b></div>
          <div>Side: <b>{order.side}</b></div>
          <div>Type: <b>{order.type}</b></div>
          <div>Price: <b>{formatNumber(order.price)}</b></div>
          <div>Amount: <b>{formatNumber(order.amount)}</b></div>
          <div>Total: <b>{formatNumber(order.total)}</b></div>
        </div>
      ),
    });
  };

  return (
    <div className="p-6 grid grid-cols-12 gap-6">
      {/* Header */}
      <div className="col-span-12 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-white">Trade</h1>
        <div className="flex gap-3">
          <Button onClick={() => setConvertOpen(true)} className="bg-primary text-white rounded-lg px-4">Convert</Button>
        </div>
      </div>

      {/* Left: Chart & selectors */}
      <div className="col-span-8 space-y-4">
        {/* Asset Class Tabs */}
        <div className="bg-[#1c1c24] rounded-2xl p-4 flex items-center gap-2 flex-wrap">
          <Label className="text-white mr-2">Markets:</Label>
          <div className="flex gap-2">
            {(["CRYPTO", "STOCKS", "COMMODITIES", "BONDS"] as AssetClass[]).map((ac) => (
              <Button key={ac} onClick={() => setAssetClass(ac)} className={`px-4 py-2 rounded-xl ${assetClass === ac ? "bg-primary text-white" : "bg-[#2a2a35] text-gray-200"}`}>
                {ac}
              </Button>
            ))}
          </div>
        </div>

        {/* Pair/Instrument selector */}
        <div className="bg-[#1c1c24] rounded-2xl p-4 flex items-center gap-4">
          {assetClass === "CRYPTO" && (
            <>
              <Label className="text-white">Pair</Label>
              <Select value={cryptoId} onValueChange={setCryptoId}>
                <SelectTrigger className="w-[220px] h-12">
                  <SelectValue placeholder="Select crypto" />
                </SelectTrigger>
                <SelectContent>
                  {CRYPTO_TOKENS.map((t) => (
                    <SelectItem key={t.id} value={t.id}>{t.symbol}/USD</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </>
          )}
          {assetClass === "STOCKS" && (
            <>
              <Label className="text-white">Ticker</Label>
              <Select value={stock} onValueChange={setStock}>
                <SelectTrigger className="w-[220px] h-12">
                  <SelectValue placeholder="Select stock" />
                </SelectTrigger>
                <SelectContent>
                  {STOCKS.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </>
          )}
          {assetClass === "COMMODITIES" && (
            <>
              <Label className="text-white">Symbol</Label>
              <Select value={commodity} onValueChange={setCommodity}>
                <SelectTrigger className="w-[220px] h-12">
                  <SelectValue placeholder="Select commodity" />
                </SelectTrigger>
                <SelectContent>
                  {COMMODITIES.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </>
          )}
          {assetClass === "BONDS" && (
            <>
              <Label className="text-white">Instrument</Label>
              <Select value={bond} onValueChange={setBond}>
                <SelectTrigger className="w-[220px] h-12">
                  <SelectValue placeholder="Select bond" />
                </SelectTrigger>
                <SelectContent>
                  {BONDS.map((b) => (
                    <SelectItem key={b} value={b}>{b}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </>
          )}
          <div className="ml-auto text-gray-300">
            <span className="mr-2">Symbol:</span>
            <span className="text-white font-semibold">{activeSymbol}</span>
          </div>
        </div>

        {/* Chart */}
        <AssetChart
          assetClass={assetClass}
          symbolOrId={assetClass === "CRYPTO" ? cryptoId : (assetClass === "STOCKS" ? stock : assetClass === "COMMODITIES" ? commodity : bond)}
          onLastPrice={setLastPrice}
        />
      </div>

      {/* Right: Trading widgets */}
      <div className="col-span-4 space-y-4">
        <OrderForm side="BUY" onSubmit={handlePlaceOrder} lastPrice={lastPrice} />
        <OrderForm side="SELL" onSubmit={handlePlaceOrder} lastPrice={lastPrice} />
        <OrderBook lastPrice={lastPrice} />
        <RecentTrades />
      </div>

      {/* Convert Modal (only truly relevant for crypto, but left global) */}
      <ConvertTokensModal
        open={convertOpen}
        onClose={() => setConvertOpen(false)}
        onSubmit={(payload: any) => {
          console.log("Convert submitted", payload);
          setConvertOpen(false);
        }}
        availableTokens={availableTokens}
      />
    </div>
  );
}

// ------------------------------
// Notes:
// 1) This page uses CoinGecko only for CRYPTO charts via /market_chart.
// 2) Stocks/Commodities/Bonds currently use mock data generators.
//    Swap the mock in AssetChart with your provider's historical API.
// 3) The OrderForm calls Modal.success (antd) on submit; wire to your backend.
// 4) The chart uses recharts LineChart for simplicity; swap for candlesticks if desired.
