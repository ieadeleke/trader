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
  // Autotrade state
  const [autoAssetType, setAutoAssetType] = useState<AssetType>("crypto");
  const [autoSymbolsText, setAutoSymbolsText] = useState<string>("bitcoin");
  const [autoLeverage, setAutoLeverage] = useState<string>("1");
  const [autoRiskPct, setAutoRiskPct] = useState<string>("1");
  const [autoSlPct, setAutoSlPct] = useState<string>("0.5");
  const [autoTpPct, setAutoTpPct] = useState<string>("1");
  const [autoSignal, setAutoSignal] = useState<string>("momentum");
  const [autoLbShort, setAutoLbShort] = useState<string>("3");
  const [autoLbLong, setAutoLbLong] = useState<string>("8");
  const [autoAtrEnabled, setAutoAtrEnabled] = useState<boolean>(false);
  const [autoAtrPeriod, setAutoAtrPeriod] = useState<string>("14");
  const [autoAtrSlMult, setAutoAtrSlMult] = useState<string>("1.5");
  const [autoAtrTpMult, setAutoAtrTpMult] = useState<string>("2");
  const [autoMinFreeMarginPct, setAutoMinFreeMarginPct] = useState<string>("10");
  const [autoDailyMaxLossPct, setAutoDailyMaxLossPct] = useState<string>("20");
  const [autoAvoidDup, setAutoAvoidDup] = useState<boolean>(true);
  const [autoSizingMode, setAutoSizingMode] = useState<string>("percent");
  const [autoFixedNotional, setAutoFixedNotional] = useState<string>("0");
  const [autoKellyFraction, setAutoKellyFraction] = useState<string>("5");
  const [autoOverridesText, setAutoOverridesText] = useState<string>("[]");
  const [autoMaxConcurrent, setAutoMaxConcurrent] = useState<string>("1");
  const [autoIntervalSec, setAutoIntervalSec] = useState<string>("60");
  const [autoRunning, setAutoRunning] = useState<boolean>(false);
  const [autoNextRunSec, setAutoNextRunSec] = useState<number | null>(null);
  const [autoPaused, setAutoPaused] = useState<boolean>(false);
  const [autoResumeAt, setAutoResumeAt] = useState<string | null>(null);
  const [loadingAuto, setLoadingAuto] = useState<boolean>(false);
  const [savingAuto, setSavingAuto] = useState<boolean>(false);
  const [startingAuto, setStartingAuto] = useState<boolean>(false);
  const [stoppingAuto, setStoppingAuto] = useState<boolean>(false);

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
        // Load autotrade settings + status
        try {
          setLoadingAuto(true);
          const sres = await apiFetch('/api/trade/autotrade', { method: 'GET', auth: true });
          if (sres.ok) {
            const sdata = await sres.json();
            const cfg = sdata?.data ?? sdata ?? {};
            if (cfg?.assetType) setAutoAssetType(cfg.assetType as AssetType);
            if (Array.isArray(cfg?.symbols)) setAutoSymbolsText(cfg.symbols.join(","));
            if (cfg?.leverage != null) setAutoLeverage(String(cfg.leverage));
            if (cfg?.riskPerTradePct != null) setAutoRiskPct(String(cfg.riskPerTradePct));
            if (cfg?.maxConcurrentPositions != null) setAutoMaxConcurrent(String(cfg.maxConcurrentPositions));
            if (cfg?.intervalSec != null) setAutoIntervalSec(String(cfg.intervalSec));
            if (cfg?.slPct != null) setAutoSlPct(String(cfg.slPct));
            if (cfg?.tpPct != null) setAutoTpPct(String(cfg.tpPct));
            if (cfg?.signalType) setAutoSignal(String(cfg.signalType));
            if (cfg?.lookbackShort != null) setAutoLbShort(String(cfg.lookbackShort));
            if (cfg?.lookbackLong != null) setAutoLbLong(String(cfg.lookbackLong));
            if (cfg?.atrEnabled != null) setAutoAtrEnabled(Boolean(cfg.atrEnabled));
            if (cfg?.atrPeriod != null) setAutoAtrPeriod(String(cfg.atrPeriod));
            if (cfg?.atrSlMult != null) setAutoAtrSlMult(String(cfg.atrSlMult));
            if (cfg?.atrTpMult != null) setAutoAtrTpMult(String(cfg.atrTpMult));
            if (cfg?.minFreeMarginPct != null) setAutoMinFreeMarginPct(String(cfg.minFreeMarginPct));
            if (cfg?.dailyMaxLossPct != null) setAutoDailyMaxLossPct(String(cfg.dailyMaxLossPct));
            if (cfg?.avoidDuplicateSide != null) setAutoAvoidDup(Boolean(cfg.avoidDuplicateSide));
            if (cfg?.sizingMode) setAutoSizingMode(String(cfg.sizingMode));
            if (cfg?.fixedNotionalUSD != null) setAutoFixedNotional(String(cfg.fixedNotionalUSD));
            if (cfg?.kellyFractionPct != null) setAutoKellyFraction(String(cfg.kellyFractionPct));
            if (Array.isArray(cfg?.overrides)) setAutoOverridesText(JSON.stringify(cfg.overrides, null, 2));
          }
          const tres = await apiFetch('/api/trade/autotrade/status', { method: 'GET', auth: true });
          if (tres.ok) {
            const tdata = await tres.json();
            const st = tdata?.data ?? tdata ?? {};
            setAutoRunning(!!st?.running);
            setAutoNextRunSec(typeof st?.nextRunInSec === 'number' ? st.nextRunInSec : null);
            if (st?.paused != null) {
              setAutoPaused(!!st.paused);
              setAutoResumeAt(st?.resumeAt ? new Date(st.resumeAt).toLocaleString() : null);
            }
          }
        } catch {}
      } catch (e) {
        // ignore
      } finally {
        setLoadingPortfolio(false);
        setLoadingAuto(false);
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

  // Autotrade helpers
  const saveAutoSettings = async () => {
    try {
      setSavingAuto(true);
      const symbols = autoSymbolsText.split(',').map(s => s.trim()).filter(Boolean);
      // Parse overrides JSON if provided
      let overrides: any = undefined;
      try {
        overrides = JSON.parse(autoOverridesText || '[]');
        if (!Array.isArray(overrides)) throw new Error('Overrides must be an array');
      } catch (e:any) {
        throw new Error('Overrides JSON invalid. Expect an array of objects.');
      }
      const res = await apiFetch('/api/trade/autotrade', { method: 'POST', auth: true, json: {
        assetType: autoAssetType,
        symbols,
        leverage: Number(autoLeverage) || 1,
        riskPerTradePct: Number(autoRiskPct) || 1,
        maxConcurrentPositions: Number(autoMaxConcurrent) || 1,
        intervalSec: Number(autoIntervalSec) || 60,
        sizingMode: autoSizingMode,
        fixedNotionalUSD: Number(autoFixedNotional) || 0,
        kellyFractionPct: Number(autoKellyFraction) || 0,
        slPct: Number(autoSlPct) || 0,
        tpPct: Number(autoTpPct) || 0,
        signalType: autoSignal,
        lookbackShort: Number(autoLbShort) || 3,
        lookbackLong: Number(autoLbLong) || 8,
        atrEnabled: !!autoAtrEnabled,
        atrPeriod: Number(autoAtrPeriod) || 14,
        atrSlMult: Number(autoAtrSlMult) || 1.5,
        atrTpMult: Number(autoAtrTpMult) || 2,
        minFreeMarginPct: Number(autoMinFreeMarginPct) || 0,
        dailyMaxLossPct: Number(autoDailyMaxLossPct) || 0,
        avoidDuplicateSide: !!autoAvoidDup,
        overrides,
      }});
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || 'Failed to save');
      successToast('Autotrade settings saved');
    } catch(e:any){ errorToast(e.message || 'Failed to save autotrade'); }
    finally { setSavingAuto(false); }
  };

  const refreshAutoStatus = async () => {
    try {
      const tres = await apiFetch('/api/trade/autotrade/status', { method: 'GET', auth: true });
      if (tres.ok) {
        const tdata = await tres.json();
        const st = tdata?.data ?? tdata ?? {};
        setAutoRunning(!!st?.running);
        setAutoNextRunSec(typeof st?.nextRunInSec === 'number' ? st.nextRunInSec : null);
      }
    } catch {}
  };

  useEffect(() => {
    if (!autoRunning) return;
    const t = setInterval(refreshAutoStatus, 5000);
    return () => clearInterval(t);
  }, [autoRunning]);

  const startAuto = async () => {
    try {
      setStartingAuto(true);
      const symbols = autoSymbolsText.split(',').map(s => s.trim()).filter(Boolean);
      let overrides: any = undefined;
      try {
        overrides = JSON.parse(autoOverridesText || '[]');
        if (!Array.isArray(overrides)) throw new Error('Overrides must be an array');
      } catch (e:any) {
        throw new Error('Overrides JSON invalid. Expect an array of objects.');
      }
      const res = await apiFetch('/api/trade/autotrade/start', { method: 'POST', auth: true, json: {
        assetType: autoAssetType,
        symbols,
        leverage: Number(autoLeverage) || 1,
        riskPerTradePct: Number(autoRiskPct) || 1,
        maxConcurrentPositions: Number(autoMaxConcurrent) || 1,
        intervalSec: Number(autoIntervalSec) || 60,
        sizingMode: autoSizingMode,
        fixedNotionalUSD: Number(autoFixedNotional) || 0,
        kellyFractionPct: Number(autoKellyFraction) || 0,
        slPct: Number(autoSlPct) || 0,
        tpPct: Number(autoTpPct) || 0,
        signalType: autoSignal,
        lookbackShort: Number(autoLbShort) || 3,
        lookbackLong: Number(autoLbLong) || 8,
        atrEnabled: !!autoAtrEnabled,
        atrPeriod: Number(autoAtrPeriod) || 14,
        atrSlMult: Number(autoAtrSlMult) || 1.5,
        atrTpMult: Number(autoAtrTpMult) || 2,
        minFreeMarginPct: Number(autoMinFreeMarginPct) || 0,
        dailyMaxLossPct: Number(autoDailyMaxLossPct) || 0,
        avoidDuplicateSide: !!autoAvoidDup,
        overrides,
      }});
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || 'Start failed');
      setAutoRunning(true);
      successToast('Autotrade started');
      refreshAutoStatus();
    } catch(e:any){ errorToast(e.message || 'Failed to start autotrade'); }
    finally { setStartingAuto(false); }
  };

  const stopAuto = async () => {
    try {
      setStoppingAuto(true);
      const res = await apiFetch('/api/trade/autotrade/stop', { method: 'POST', auth: true });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || 'Stop failed');
      setAutoRunning(false);
      setAutoNextRunSec(null);
      successToast('Autotrade stopped');
    } catch(e:any){ errorToast(e.message || 'Failed to stop autotrade'); }
    finally { setStoppingAuto(false); }
  };

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
              <div className="flex flex-col gap-3">
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

          {/* Autotrade */}
          <Card className="bg-[#1e1e2d] text-white mt-4">
            <CardContent className="p-4 space-y-3">
              <h3 className="text-lg font-semibold">Autotrade</h3>
              {autoPaused && (
                <div className="bg-yellow-600/30 border border-yellow-500 text-yellow-200 text-sm p-2 rounded">
                  Autotrade paused due to risk controls. Resumes {autoResumeAt || 'later'}.
                </div>
              )}
              {loadingAuto && (
                <div className="w-full flex justify-center"><Spinner /></div>
              )}
              <div>
                <Label className="text-white/80 text-sm">Asset Type</Label>
                <select
                  className="bg-transparent border px-3 py-2 rounded w-full"
                  value={autoAssetType}
                  onChange={(e) => setAutoAssetType(e.target.value as AssetType)}
                >
                  <option value="crypto">Crypto</option>
                  <option value="stock">Stock</option>
                  <option value="commodity">Commodity</option>
                  <option value="forex">Forex</option>
                </select>
              </div>
              <div>
                <Label className="text-white/80 text-sm">Symbols (comma-separated)</Label>
                <Input value={autoSymbolsText} onChange={(e) => setAutoSymbolsText(e.target.value)} placeholder="bitcoin,ethereum" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-white/80 text-sm">Leverage (x)</Label>
                  <Input value={autoLeverage} onChange={(e) => setAutoLeverage(e.target.value)} placeholder="1" />
                </div>
                <div>
                  <Label className="text-white/80 text-sm">Risk per Trade (%)</Label>
                  <Input value={autoRiskPct} onChange={(e) => setAutoRiskPct(e.target.value)} placeholder="1" />
                </div>
                <div className="col-span-2">
                  <Label className="text-white/80 text-sm">Sizing Mode</Label>
                  <select className="bg-transparent border px-3 py-2 rounded w-full" value={autoSizingMode} onChange={(e)=>setAutoSizingMode(e.target.value)}>
                    <option value="percent">Percent of Wallet</option>
                    <option value="fixed">Fixed Notional (USD)</option>
                    <option value="kelly">Kelly Fraction (%)</option>
                  </select>
                </div>
                {autoSizingMode === 'fixed' && (
                  <div className="col-span-2">
                    <Label className="text-white/80 text-sm">Fixed Notional (USD)</Label>
                    <Input value={autoFixedNotional} onChange={(e)=>setAutoFixedNotional(e.target.value)} placeholder="100" />
                  </div>
                )}
                {autoSizingMode === 'kelly' && (
                  <div className="col-span-2">
                    <Label className="text-white/80 text-sm">Kelly Fraction (%)</Label>
                    <Input value={autoKellyFraction} onChange={(e)=>setAutoKellyFraction(e.target.value)} placeholder="5" />
                  </div>
                )}
                <div>
                  <Label className="text-white/80 text-sm">Max Concurrent</Label>
                  <Input value={autoMaxConcurrent} onChange={(e) => setAutoMaxConcurrent(e.target.value)} placeholder="1" />
                </div>
                <div>
                  <Label className="text-white/80 text-sm">Interval (sec)</Label>
                  <Input value={autoIntervalSec} onChange={(e) => setAutoIntervalSec(e.target.value)} placeholder="60" />
                </div>
                <div>
                  <Label className="text-white/80 text-sm">Stop Loss (%)</Label>
                  <Input value={autoSlPct} onChange={(e) => setAutoSlPct(e.target.value)} placeholder="0.5" />
                </div>
                <div>
                  <Label className="text-white/80 text-sm">Take Profit (%)</Label>
                  <Input value={autoTpPct} onChange={(e) => setAutoTpPct(e.target.value)} placeholder="1" />
                </div>
                <div>
                  <Label className="text-white/80 text-sm">Signal</Label>
                  <select className="bg-transparent border px-3 py-2 rounded w-full" value={autoSignal} onChange={(e)=>setAutoSignal(e.target.value)}>
                    <option value="momentum">Momentum (SMA)</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3 col-span-2">
                  <div>
                    <Label className="text-white/80 text-sm">SMA Short</Label>
                    <Input value={autoLbShort} onChange={(e) => setAutoLbShort(e.target.value)} placeholder="3" />
                  </div>
                  <div>
                    <Label className="text-white/80 text-sm">SMA Long</Label>
                    <Input value={autoLbLong} onChange={(e) => setAutoLbLong(e.target.value)} placeholder="8" />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <input type="checkbox" checked={autoAtrEnabled} onChange={(e)=>setAutoAtrEnabled(e.target.checked)} />
                <Label className="text-white/80 text-sm">Use ATR for SL/TP</Label>
              </div>
              {autoAtrEnabled && (
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <Label className="text-white/80 text-sm">ATR Period</Label>
                    <Input value={autoAtrPeriod} onChange={(e)=>setAutoAtrPeriod(e.target.value)} placeholder="14" />
                  </div>
                  <div>
                    <Label className="text-white/80 text-sm">ATR SL Mult</Label>
                    <Input value={autoAtrSlMult} onChange={(e)=>setAutoAtrSlMult(e.target.value)} placeholder="1.5" />
                  </div>
                  <div>
                    <Label className="text-white/80 text-sm">ATR TP Mult</Label>
                    <Input value={autoAtrTpMult} onChange={(e)=>setAutoAtrTpMult(e.target.value)} placeholder="2" />
                  </div>
                </div>
              )}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-white/80 text-sm">Min Free Margin (%)</Label>
                  <Input value={autoMinFreeMarginPct} onChange={(e)=>setAutoMinFreeMarginPct(e.target.value)} placeholder="10" />
                </div>
                <div>
                  <Label className="text-white/80 text-sm">Daily Max Loss (%)</Label>
                  <Input value={autoDailyMaxLossPct} onChange={(e)=>setAutoDailyMaxLossPct(e.target.value)} placeholder="20" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" checked={autoAvoidDup} onChange={(e)=>setAutoAvoidDup(e.target.checked)} />
                <Label className="text-white/80 text-sm">Avoid opening same-side trade on same symbol</Label>
              </div>
              <div>
                <Label className="text-white/80 text-sm">Per-Symbol Overrides (JSON array)</Label>
                <textarea className="w-full bg-transparent border rounded p-2 text-sm" rows={5} value={autoOverridesText} onChange={(e)=>setAutoOverridesText(e.target.value)} placeholder='[{"symbol":"bitcoin","slPct":0.8,"tpPct":1.6}]' />
              </div>
              <div className="flex gap-3">
                <Button className="flex-1 bg-[#475569]" disabled={savingAuto} onClick={saveAutoSettings}>
                  {savingAuto ? <Spinner color="#fff" fontSize="18px" /> : 'Save Settings'}
                </Button>
              </div>
              <div className="flex gap-3">
                <Button className="flex-1 bg-green-600 hover:bg-green-700" disabled={startingAuto || autoRunning} onClick={startAuto}>
                  {startingAuto ? <Spinner color="#fff" fontSize="18px" /> : 'Start'}
                </Button>
                <Button className="flex-1 bg-red-600 hover:bg-red-700" disabled={stoppingAuto || !autoRunning} onClick={stopAuto}>
                  {stoppingAuto ? <Spinner color="#fff" fontSize="18px" /> : 'Stop'}
                </Button>
              </div>
              <div className="text-white/70 text-xs">
                Status: {autoRunning ? 'Running' : 'Stopped'}{autoRunning && (autoNextRunSec!=null ? ` • next in ${autoNextRunSec}s` : '')}
              </div>
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
