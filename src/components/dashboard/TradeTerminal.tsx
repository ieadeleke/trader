"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/context/ToastContext";
import Spinner from "@/components/ui/spin";
import { MultiDashboardAssetChart } from "./CryptoCandleStick";
import { apiFetch } from "@/utils/api";
import FundWalletModal from "./FundWalletModal";
import WithdrawalModal from "./WithdrawFunds";

type AssetType = "crypto" | "stock" | "commodity" | "forex";

const COINS = ["bitcoin", "ethereum", "stellar", "litecoin", "binancecoin", "solana", "ripple"] as const;
const STOCKS = ["AAPL", "MSFT", "GOOGL", "TSLA", "AMZN", "NVDA"] as const;
const COMMODITIES = ["GOLD", "SILVER", "WTI"] as const;
const FOREX = ["EURUSD", "GBPUSD", "USDJPY", "USDCHF", "AUDUSD"] as const;

type Side = "buy" | "sell";
type OrderType = "market" | "limit";

interface Position {
  id: string;
  assetType: AssetType;
  symbol: string;
  side: Side;
  qty: number; // units
  entryPrice: number;
  leverage: number;
  marginAllocated: number; // reserved margin debited from wallet at open
  sl?: number;
  tp?: number;
  status: "open" | "closed";
  pnl: number; // realized or current
}

interface Portfolio {
  balance: number;
  positions: Position[];
  history: Position[];
}

const numberOr = (v: any, d = 0) => {
  const n = Number(v);
  return isNaN(n) ? d : n;
};

// Instrument specs
const INSTRUMENTS: Record<string, { priceStep: number; qtyStep: number; minQty: number; minNotional: number; maxLeverage: number }> = {
  bitcoin: { priceStep: 0.5, qtyStep: 0.0001, minQty: 0.0001, minNotional: 5, maxLeverage: 20 },
  ethereum: { priceStep: 0.1, qtyStep: 0.001, minQty: 0.001, minNotional: 5, maxLeverage: 20 },
  stellar: { priceStep: 0.0001, qtyStep: 1, minQty: 1, minNotional: 5, maxLeverage: 10 },
  litecoin: { priceStep: 0.05, qtyStep: 0.01, minQty: 0.01, minNotional: 5, maxLeverage: 10 },
  binancecoin: { priceStep: 0.05, qtyStep: 0.001, minQty: 0.001, minNotional: 5, maxLeverage: 10 },
  solana: { priceStep: 0.01, qtyStep: 0.01, minQty: 0.01, minNotional: 5, maxLeverage: 10 },
  ripple: { priceStep: 0.0001, qtyStep: 1, minQty: 1, minNotional: 5, maxLeverage: 10 },
  AAPL: { priceStep: 0.01, qtyStep: 1, minQty: 1, minNotional: 10, maxLeverage: 5 },
  MSFT: { priceStep: 0.01, qtyStep: 1, minQty: 1, minNotional: 10, maxLeverage: 5 },
  GOOGL: { priceStep: 0.01, qtyStep: 1, minQty: 1, minNotional: 10, maxLeverage: 5 },
  TSLA: { priceStep: 0.01, qtyStep: 1, minQty: 1, minNotional: 10, maxLeverage: 5 },
  AMZN: { priceStep: 0.01, qtyStep: 1, minQty: 1, minNotional: 10, maxLeverage: 5 },
  NVDA: { priceStep: 0.01, qtyStep: 1, minQty: 1, minNotional: 10, maxLeverage: 5 },
  GOLD: { priceStep: 0.01, qtyStep: 0.01, minQty: 0.01, minNotional: 10, maxLeverage: 10 },
  SILVER: { priceStep: 0.001, qtyStep: 0.1, minQty: 0.1, minNotional: 10, maxLeverage: 10 },
  WTI: { priceStep: 0.01, qtyStep: 0.01, minQty: 0.01, minNotional: 10, maxLeverage: 10 },
};

const snap = (v: number, step: number) => Math.round(v / step) * step;

const TradeTerminal: React.FC = () => {
  const { successToast, errorToast } = useToast();
  const [assetType, setAssetType] = useState<AssetType>("crypto");
  const [symbol, setSymbol] = useState<string>("bitcoin");
  const [side, setSide] = useState<Side>("buy");
  const [orderType, setOrderType] = useState<OrderType>("market");
  const [limitPrice, setLimitPrice] = useState<string>("");
  const [qty, setQty] = useState<string>("1");
  const [leverage, setLeverage] = useState<string>("1");
  const [useSL, setUseSL] = useState<boolean>(false);
  const [sl, setSL] = useState<string>("");
  const [useTP, setUseTP] = useState<boolean>(false);
  const [tp, setTP] = useState<string>("");
  const [placing, setPlacing] = useState<boolean>(false);

  const [positions, setPositions] = useState<Position[]>([]);
  const [history, setHistory] = useState<Position[]>([]);
  const [balance, setBalance] = useState<number>(10000); // demo balance fallback
  const [loadingPortfolio, setLoadingPortfolio] = useState<boolean>(false);
  const [depositOpen, setDepositOpen] = useState<boolean>(false);
  const [withdrawOpen, setWithdrawOpen] = useState<boolean>(false);
  const [walletAsset, setWalletAsset] = useState<string>("USD");
  const [walletAddress, setWalletAddress] = useState<string>("");
  
  const [currentPrice, setCurrentPrice] = useState<number>(0);

  const symbols = useMemo(() => {
    if (assetType === "crypto") return COINS as readonly string[];
    if (assetType === "stock") return STOCKS as readonly string[];
    if (assetType === "commodity") return COMMODITIES as readonly string[];
    return FOREX as readonly string[];
  }, [assetType]);

  // Initialize symbol on asset type change
  useEffect(() => {
    setSymbol(symbols[0]);
  }, [symbols]);

  // Price polling (uses CoinGecko for crypto, Alpha Vantage for stocks/commodities when possible)
  useEffect(() => {
    let mounted = true;
    const fetchPrice = async () => {
      try {
        if (assetType === "crypto") {
          const id = symbol;
          const res = await fetch(
            `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd`
          );
          const j = await res.json();
          const p = j?.[id]?.usd ?? 0;
          if (mounted) setCurrentPrice(p);
        } else if (assetType === "stock") {
          const key = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_KEY;
          const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${key}`;
          const res = await fetch(url);
          const j = await res.json();
          const p = Number(j?.["Global Quote"]?.["05. price"] || 0);
          if (mounted && p) setCurrentPrice(p);
          if (mounted && !p) setCurrentPrice((prev) => prev || 100);
        } else if (assetType === "commodity") {
          // commodity mapping via Alpha Vantage FX for metals
          const key = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_KEY;
          let from = "";
          if (symbol === "GOLD") from = "XAU";
          if (symbol === "SILVER") from = "XAG";
          if (from) {
            const url = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${from}&to_currency=USD&apikey=${key}`;
            const res = await fetch(url);
            const j = await res.json();
            const p = Number(j?.["Realtime Currency Exchange Rate"]?.["5. Exchange Rate"] || 0);
            if (mounted && p) setCurrentPrice(p);
            if (mounted && !p) setCurrentPrice((prev) => prev || 100);
          } else {
            // fallback small random walk
            const base = 100;
            const noise = (Math.random() - 0.5) * 2;
            if (mounted) setCurrentPrice((prev) => (prev || base) + noise);
          }
        } else {
          // forex
          const key = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_KEY;
          const from = symbol.slice(0,3);
          const to = symbol.slice(3,6);
          const url = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${from}&to_currency=${to}&apikey=${key}`;
          const res = await fetch(url);
          const j = await res.json();
          const p = Number(j?.["Realtime Currency Exchange Rate"]?.["5. Exchange Rate"] || 0);
          if (mounted && p) setCurrentPrice(p);
          if (mounted && !p) setCurrentPrice((prev) => prev || 1);
        }
      } catch (e) {
        // ignore
      }
    };
    fetchPrice();
    const t = setInterval(fetchPrice, 5000);
    return () => {
      mounted = false;
      clearInterval(t);
    };
  }, [assetType, symbol]);

  // Load positions/history from backend and wallet balance
  useEffect(() => {
    const loadPortfolio = async () => {
      setLoadingPortfolio(true);
      try {
        // fetch open positions and history
        try {
          const pres = await apiFetch('/api/trade/positions', { method: 'GET', auth: true });
          if (pres.ok) {
            const pdata = await pres.json();
            setPositions((pdata?.data ?? pdata ?? []) as Position[]);
          }
        } catch {}
        try {
          const hres = await apiFetch('/api/trade/history', { method: 'GET', auth: true });
          if (hres.ok) {
            const hdata = await hres.json();
            setHistory((hdata?.data ?? hdata ?? []) as Position[]);
          }
        } catch {}

        // Try link to wallet balance
        try {
          const wres = await apiFetch("/api/wallets", { method: "GET", auth: true });
          if (wres.ok) {
            const w = await wres.json();
            const first = Array.isArray(w) ? w[0] : Array.isArray(w?.data) ? w.data[0] : null;
            if (first && typeof first.balance !== 'undefined') {
              setBalance(Number(first.balance));
              if (first.asset) setWalletAsset(String(first.asset));
              if (first.address) setWalletAddress(String(first.address));
            }
          }
        } catch {}
      } catch (e) {
        // ignore
      } finally {
        setLoadingPortfolio(false);
      }
    };
    loadPortfolio();
  }, []);

  // No-op: server is source of truth for positions/history
  const persistPortfolio = async (_next: Portfolio) => {};

  // Update unrealized PnL and auto-close on SL/TP (server-side close)
  useEffect(() => {
    if (!currentPrice) return;
    setPositions((prev) => {
      const updated: Position[] = [];
      for (const pos of prev) {
        if (pos.status !== "open") { updated.push(pos); continue; }
        const dir = pos.side === "buy" ? 1 : -1;
        const pnl = (currentPrice - pos.entryPrice) * dir * pos.qty * pos.leverage;
        const hitSL = pos.sl && ((pos.side === "buy" && currentPrice <= pos.sl) || (pos.side === "sell" && currentPrice >= pos.sl));
        const hitTP = pos.tp && ((pos.side === "buy" && currentPrice >= pos.tp) || (pos.side === "sell" && currentPrice <= pos.tp));
        if (hitSL || hitTP) {
          // Request server-side close
          (async () => { try { await closePosition(pos.id) } catch {} })();
          updated.push(pos);
        } else {
          updated.push({ ...pos, pnl });
        }
      }
      persistPortfolio({ balance, positions: updated, history });
      return updated;
    });
  }, [currentPrice]);

  const placeOrder = async () => {
    try {
      setPlacing(true);
      const q = numberOr(qty, 0);
      const lev = Math.max(1, numberOr(leverage, 1));
      const spec = INSTRUMENTS[symbol] || { priceStep: 0.01, qtyStep: 1, minQty: 1, minNotional: 1, maxLeverage: 5 };
      const adjLev = Math.min(lev, spec.maxLeverage);
      if (!q || q <= 0) throw new Error("Quantity must be greater than 0");
      let entry = currentPrice;
      if (orderType === "limit") {
        const lp = numberOr(limitPrice, 0);
        if (!lp) throw new Error("Enter a valid limit price");
        entry = snap(lp, spec.priceStep);
      }
      const adjQty = snap(q, spec.qtyStep);
      if (adjQty < spec.minQty) throw new Error(`Min quantity is ${spec.minQty}`);
      const notional = entry * adjQty;
      if (notional < spec.minNotional) throw new Error(`Min notional is $${spec.minNotional}`);
      // Margin checks
      const feeRate = 0.001; // 0.1%
      const openFee = notional * feeRate;
      const marginRequired = notional / adjLev;
      const unrealized = positions.filter((p) => p.status === "open").reduce((s, p) => s + p.pnl, 0);
      const reservedMargin = positions.filter((p) => p.status === "open").reduce((s, p) => s + (p.marginAllocated || 0), 0);
      const equity = balance + reservedMargin + unrealized;
      const freeMargin = equity - reservedMargin; // effectively wallet balance + unrealized
      if (freeMargin < marginRequired + openFee) {
        throw new Error("Insufficient free margin for this order");
      }
      const newPos: Position = {
        id: `${Date.now()}`,
        assetType,
        symbol,
        side,
        qty: adjQty,
        entryPrice: entry,
        leverage: adjLev,
        marginAllocated: marginRequired,
        sl: useSL ? snap(numberOr(sl), spec.priceStep) : undefined,
        tp: useTP ? snap(numberOr(tp), spec.priceStep) : undefined,
        status: "open",
        pnl: 0,
      };
      // Open order on backend (server handles wallet debit/margin)
      try {
        const res = await apiFetch('/api/trade/order/open', {
          method: 'POST', auth: true,
          json: {
            assetType, symbol, side,
            orderType,
            limitPrice: orderType==='limit' ? entry : undefined,
            qty: adjQty,
            leverage: adjLev,
            sl: useSL ? snap(numberOr(sl), spec.priceStep) : undefined,
            tp: useTP ? snap(numberOr(tp), spec.priceStep) : undefined,
          },
        })
        const data = await res.json()
        if(!res.ok) throw new Error(data?.message || 'Failed to open order')
        const pf = data?.data?.portfolio
        const w = data?.data?.wallet
        if(pf){ setPositions(pf.positions||[]); setHistory(pf.history||[]) }
        if(w && typeof w.balance !== 'undefined'){ setBalance(Number(w.balance)) }
        successToast('Order placed successfully')
      } catch(e:any) {
        throw new Error(e.message || 'Backend rejected order')
      }
    } catch (e: any) {
      errorToast(e.message || "Failed to place order");
    } finally {
      setPlacing(false);
    }
  };

  const closePosition = async (id: string) => {
    try{
      const res = await apiFetch('/api/trade/order/close', { method: 'POST', auth: true, json: { id } })
      const data = await res.json()
      if(!res.ok) throw new Error(data?.message || 'Failed to close position')
      const pf = data?.data?.portfolio
      const w = data?.data?.wallet
      if(pf){ setPositions(pf.positions||[]); setHistory(pf.history||[]) }
      if(w && typeof w.balance !== 'undefined'){ setBalance(Number(w.balance)) }
      successToast('Position closed')
    }catch(e:any){ errorToast(e.message || 'Close failed') }
  };

  // Derived metrics
  const unrealizedPnL = positions.filter((p) => p.status === "open").reduce((s, p) => s + p.pnl, 0);
  const marginUsed = positions.filter((p) => p.status === "open").reduce((s, p) => s + (p.marginAllocated || 0), 0);
  const equity = balance + marginUsed + unrealizedPnL;
  const freeMargin = equity - marginUsed; // effectively wallet balance + unrealized

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="bg-[#1e1e2d] text-white">
            <CardContent className="p-4">
              <div className="flex items-center gap-4 mb-4">
                <div>
                  <Label className="text-white/80 text-sm">Market</Label>
                  <select
                    className="bg-transparent border px-3 py-2 rounded"
                    value={assetType}
                    onChange={(e) => setAssetType(e.target.value as AssetType)}
                  >
                    <option value="crypto">Crypto</option>
                    <option value="stock">Stock</option>
                    <option value="commodity">Commodity</option>
                    <option value="forex">Forex</option>
                  </select>
                </div>
                <div>
                  <Label className="text-white/80 text-sm">Symbol</Label>
                  <select
                    className="bg-transparent border px-3 py-2 rounded"
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value)}
                  >
                    {symbols.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label className="text-white/80 text-sm">Last Price</Label>
                  <div className="text-xl font-semibold">${currentPrice ? currentPrice.toFixed(2) : "-"}</div>
                </div>
              </div>
              <MultiDashboardAssetChart controls={false} assetType={assetType} symbol={symbol} />
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="bg-[#1e1e2d] text-white">
            <CardContent className="p-4 space-y-4">
              {loadingPortfolio && (
                <div className="w-full flex justify-center">
                  <Spinner />
                </div>
              )}
              <div className="grid grid-cols-2 gap-3 bg-white/5 p-3 rounded">
                <div>
                  <div className="text-white/70 text-xs">Balance</div>
                  <div className="text-lg font-semibold">${balance.toFixed(2)} {walletAsset ? walletAsset : ''}</div>
                </div>
                <div>
                  <div className="text-white/70 text-xs">Equity</div>
                  <div className="text-lg font-semibold">${equity.toFixed(2)}</div>
                </div>
                <div>
                  <div className="text-white/70 text-xs">Unrealized PnL</div>
                  <div className={`text-lg font-semibold ${unrealizedPnL>=0?"text-green-400":"text-red-400"}`}>${unrealizedPnL.toFixed(2)}</div>
                </div>
                <div>
                  <div className="text-white/70 text-xs">Margin Used</div>
                  <div className="text-lg font-semibold">${marginUsed.toFixed(2)}</div>
                </div>
                <div className="col-span-2">
                  <div className="text-white/70 text-xs">Free Margin</div>
                  <div className="text-lg font-semibold">${freeMargin.toFixed(2)}</div>
                </div>
              </div>
              <div className="flex gap-3">
                <Button className="flex-1 bg-green-600 hover:bg-green-700" onClick={() => setDepositOpen(true)}>Fund Wallet</Button>
                <Button className="flex-1 bg-red-600 hover:bg-red-700" onClick={() => setWithdrawOpen(true)}>Withdraw Wallet</Button>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="default"
                  className={`flex-1 ${side === "buy" ? "bg-green-600 hover:bg-green-700" : "bg-[#334155]"}`}
                  onClick={() => setSide("buy")}
                >
                  Buy
                </Button>
                <Button
                  variant="default"
                  className={`flex-1 ${side === "sell" ? "bg-red-600 hover:bg-red-700" : "bg-[#334155]"}`}
                  onClick={() => setSide("sell")}
                >
                  Sell
                </Button>
              </div>

              <div>
                <Label className="text-white/80 text-sm">Order Type</Label>
                <select
                  className="bg-transparent border px-3 py-2 rounded w-full"
                  value={orderType}
                  onChange={(e) => setOrderType(e.target.value as OrderType)}
                >
                  <option value="market">Market</option>
                  <option value="limit">Limit</option>
                </select>
              </div>

              {orderType === "limit" && (
                <div>
                  <Label className="text-white/80 text-sm">Limit Price</Label>
                  <Input
                    value={limitPrice}
                    onChange={(e) => setLimitPrice(e.target.value)}
                    placeholder="0.00"
                  />
                </div>
              )}

              <div>
                <Label className="text-white/80 text-sm">Quantity</Label>
                <Input value={qty} onChange={(e) => setQty(e.target.value)} placeholder="e.g. 1.5" />
              </div>

              <div>
                <Label className="text-white/80 text-sm">Leverage (x)</Label>
                <Input value={leverage} onChange={(e) => setLeverage(e.target.value)} placeholder="1" />
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" checked={useSL} onChange={(e) => setUseSL(e.target.checked)} />
                <Label className="text-white/80 text-sm">Stop Loss</Label>
              </div>
              {useSL && (
                <Input value={sl} onChange={(e) => setSL(e.target.value)} placeholder="SL price" />
              )}

              <div className="flex items-center gap-2">
                <input type="checkbox" checked={useTP} onChange={(e) => setUseTP(e.target.checked)} />
                <Label className="text-white/80 text-sm">Take Profit</Label>
              </div>
              {useTP && (
                <Input value={tp} onChange={(e) => setTP(e.target.value)} placeholder="TP price" />
              )}

              <Button className="w-full py-6" onClick={placeOrder} disabled={placing}>
                {placing ? <Spinner color="#fff" fontSize="20px" /> : `${side === "buy" ? "Buy" : "Sell"} ${symbol}`}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-[#1e1e2d] text-white">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold mb-3">Open Positions</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-white/70">
                  <tr>
                    <th>Symbol</th>
                    <th>Side</th>
                    <th>Qty</th>
                    <th>Entry</th>
                    <th>Leverage</th>
                    <th>PnL</th>
                    <th>SL</th>
                    <th>TP</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {positions.filter((p) => p.status === "open").length === 0 && (
                    <tr>
                      <td colSpan={9} className="py-4 text-center text-white/60">
                        No open positions
                      </td>
                    </tr>
                  )}
                  {positions
                    .filter((p) => p.status === "open")
                    .map((p) => (
                      <tr key={p.id} className="border-t border-white/10">
                        <td className="py-2">{p.symbol}</td>
                        <td className={p.side === "buy" ? "text-green-400" : "text-red-400"}>{p.side}</td>
                        <td>{p.qty}</td>
                        <td>${p.entryPrice.toFixed(2)}</td>
                        <td>{p.leverage}x</td>
                        <td className={p.pnl >= 0 ? "text-green-400" : "text-red-400"}>${p.pnl.toFixed(2)}</td>
                        <td>{p.sl ? `$${p.sl}` : "-"}</td>
                        <td>{p.tp ? `$${p.tp}` : "-"}</td>
                        <td>
                          <Button size="sm" className="bg-[#475569]" onClick={() => closePosition(p.id)}>
                            Close
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1e1e2d] text-white">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold mb-3">History</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-white/70">
                  <tr>
                    <th>Symbol</th>
                    <th>Side</th>
                    <th>Qty</th>
                    <th>Entry</th>
                    <th>PnL</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {history.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-4 text-center text-white/60">
                        No history yet
                      </td>
                    </tr>
                  )}
                  {history.map((h) => (
                    <tr key={h.id} className="border-t border-white/10">
                      <td className="py-2">{h.symbol}</td>
                      <td className={h.side === "buy" ? "text-green-400" : "text-red-400"}>{h.side}</td>
                      <td>{h.qty}</td>
                      <td>${h.entryPrice.toFixed(2)}</td>
                      <td className={h.pnl >= 0 ? "text-green-400" : "text-red-400"}>${h.pnl.toFixed(2)}</td>
                      <td>{h.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
    </div>

      {/* Wallet-integrated modals */}
      <FundWalletModal open={depositOpen} onClose={() => setDepositOpen(false)} />
      <WithdrawalModal open={withdrawOpen} onClose={() => setWithdrawOpen(false)} onSubmit={() => {}} />
    </div>
  );
};

export default TradeTerminal;
