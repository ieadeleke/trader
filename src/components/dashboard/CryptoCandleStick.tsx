// MultiAssetChart.tsx
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import CandlestickChart from "react-candlestick-chart";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface Candle {
  date: number; // keep as timestamp
  open: number;
  high: number;
  low: number;
  close: number;
}

const COINS = ["bitcoin", "ethereum", "stellar"] as const;
const STOCKS = ["AAPL", "MSFT", "GOOGL"] as const;
const COMMODITIES = ["GOLD", "WTI", "SILVER"] as const;
const BONDS = ["US10Y"] as const;
const FOREX = ["EURUSD", "GBPUSD", "USDJPY", "USDCHF", "AUDUSD"] as const;

type AssetType = "all" | "crypto" | "stock" | "commodity" | "bond" | "forex";
type ChartType = "candlestick" | "line" | "area" | "bar";

interface Props {
  assetType?: AssetType;
  symbol?: string;
  controls?: boolean; // show internal selectors
}

export const MultiDashboardAssetChart: React.FC<Props> = (props) => {
  const controlled = useMemo(() => props.assetType && props.symbol, [props.assetType, props.symbol]);
  const [assetType, setAssetType] = useState<AssetType>(props.assetType || "crypto");
  const [chartType, setChartType] = useState<ChartType>("candlestick");
  const [symbol, setSymbol] = useState<string>(props.symbol || "bitcoin");
  const [data, setData] = useState<Candle[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [chartWidth, setChartWidth] = useState<number>(800);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const RO = (window as any).ResizeObserver;
    const ro = RO ? new RO((entries: any[]) => {
      for (const entry of entries) {
        const w = (entry.contentRect && entry.contentRect.width) || el.clientWidth || 800;
        setChartWidth(Math.max(320, Math.floor(w)));
      }
    }) : null;
    if (ro) ro.observe(el);
    // initial measure
    setChartWidth(Math.max(320, Math.floor(el.clientWidth || 800)));
    return () => { ro && ro.disconnect(); };
  }, []);

  useEffect(() => {
    if (props.assetType) setAssetType(props.assetType);
    if (props.symbol) setSymbol(props.symbol);
  }, [props.assetType, props.symbol]);

  useEffect(() => {
    (async () => {
      let url = "";
      let transform: (raw: any) => Candle[] = () => [];

      if (assetType === "crypto") {
        url = `https://api.coingecko.com/api/v3/coins/${symbol}/ohlc?vs_currency=usd&days=30`;
        transform = (raw: number[][]) =>
          raw.map((item) => ({
            date: item[0], // keep as timestamp (ms)
            open: item[1],
            high: item[2],
            low: item[3],
            close: item[4],
          }));
      }

      if (assetType === "stock" || assetType === "commodity") {
        if (assetType === "commodity" && symbol === "WTI") {
          const teKey = process.env.NEXT_PUBLIC_TRADING_ECONOMICS_KEY;
          url = `https://api.tradingeconomics.com/markets/commodity/CL1:COM?c=${teKey}`;
          transform = (raw: any) => {
            const series = raw[0]?.historicalData || [];
            return series.slice(-60).map((d: any) => ({
              date: new Date(d.date).getTime(),
              open: Number(d.open),
              high: Number(d.high),
              low: Number(d.low),
              close: Number(d.close),
            }));
          };
        } else {
          const key = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_KEY;
          const mappedSymbol = assetType === 'commodity' && symbol === 'GOLD' ? 'XAUUSD' : assetType === 'commodity' && symbol === 'SILVER' ? 'XAGUSD' : symbol;
          url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${mappedSymbol}&apikey=${key}`;
          transform = (raw: any) => {
            const series = raw["Time Series (Daily)"] || {};
            return Object.entries(series)
              .slice(0, 60)
              .map(([date, ohlc]: any) => ({
                date: new Date(date).getTime(), // convert to timestamp
                open: parseFloat(ohlc["1. open"]),
                high: parseFloat(ohlc["2. high"]),
                low: parseFloat(ohlc["3. low"]),
                close: parseFloat(ohlc["4. close"]),
              }))
              .reverse();
          };
        }
      }

      if (assetType === "bond") {
        url = `https://api.tradingeconomics.com/markets/bond/${symbol}?c=YOUR_API_KEY`;
        transform = (raw: any) => {
          const series = raw[0]?.historicalData || [];
          return series.slice(-30).map((d: any) => ({
            date: new Date(d.date).getTime(), // timestamp
            open: d.open,
            high: d.high,
            low: d.low,
            close: d.close,
          }));
        };
      }

      if (assetType === "forex") {
        const key = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_KEY;
        const from = symbol.slice(0, 3);
        const to = symbol.slice(3, 6);
        url = `https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=${from}&to_symbol=${to}&apikey=${key}`;
        transform = (raw: any) => {
          const series = raw["Time Series FX (Daily)"] || {};
          return Object.entries(series)
            .slice(0, 60)
            .map(([date, ohlc]: any) => ({
              date: new Date(date).getTime(), // timestamp
              open: parseFloat(ohlc["1. open"]),
              high: parseFloat(ohlc["2. high"]),
              low: parseFloat(ohlc["3. low"]),
              close: parseFloat(ohlc["4. close"]),
            }))
            .reverse();
        };
      }

      try {
        const res = await fetch(url);
        const raw = await res.json();
        setData(transform(raw));
      } catch (err) {
        console.error(err);
        setData([]);
      }
    })();
  }, [assetType, symbol]);

  const options =
    assetType === "crypto"
      ? COINS
      : assetType === "stock"
      ? STOCKS
      : assetType === "commodity"
      ? COMMODITIES
      : assetType === "forex"
      ? FOREX
      : BONDS;

  const renderChart = () => {
    if (chartType === "candlestick" && data.length > 0) {
      return (
        <CandlestickChart
          id="multi-asset-chart"
          data={data}
          width={chartWidth}
          height={500}
          decimal={2}
          ColorPalette={{
            background: "#161b26",
            grid: "#222631",
            tick: "#b2b5be",
            greenCandle: "#22c55e",
            redCandle: "#ef4444",
          }}
        />
      );
    }

    if (chartType === "line") {
      return (
        <ResponsiveContainer width="100%" height={500}>
          <LineChart data={data}>
            <CartesianGrid stroke="#222631" />
            <XAxis
              dataKey="date"
              tickFormatter={(ts) => new Date(ts).toLocaleDateString()}
            />
            <YAxis />
            <Tooltip labelFormatter={(ts) => new Date(ts).toLocaleString()} />
            <Line
              type="monotone"
              dataKey="close"
              stroke="#facc15"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      );
    }

    if (chartType === "area") {
      return (
        <ResponsiveContainer width="100%" height={500}>
          <AreaChart data={data}>
            <CartesianGrid stroke="#222631" />
            <XAxis
              dataKey="date"
              tickFormatter={(ts) => new Date(ts).toLocaleDateString()}
            />
            <YAxis />
            <Tooltip labelFormatter={(ts) => new Date(ts).toLocaleString()} />
            <Area
              type="monotone"
              dataKey="close"
              stroke="#facc15"
              fill="#facc15"
              fillOpacity={0.3}
            />
          </AreaChart>
        </ResponsiveContainer>
      );
    }

    if (chartType === "bar") {
      return (
        <ResponsiveContainer width="100%" height={500}>
          <BarChart data={data}>
            <CartesianGrid stroke="#222631" />
            <XAxis
              dataKey="date"
              tickFormatter={(ts) => new Date(ts).toLocaleDateString()}
            />
            <YAxis />
            <Tooltip labelFormatter={(ts) => new Date(ts).toLocaleString()} />
            <Bar dataKey="close" fill="#facc15" />
          </BarChart>
        </ResponsiveContainer>
      );
    }

    return null;
  };

  const showControls = props.controls !== false && !controlled;

  return (
    <div className="space-y-4" ref={containerRef} style={{ width: "100%", overflowX: "hidden" }}>
      {showControls && (
        <div className="flex justify-between items-center">
          {/* Dropdown to select asset type */}
          <div>
            <label htmlFor="asset-type" className="text-primary mr-2">
              View Markets:
            </label>
            <select
              id="asset-type"
              value={assetType}
              onChange={(e) => {
                setAssetType(e.target.value as AssetType);
                setSymbol(
                  e.target.value === "crypto"
                    ? "bitcoin"
                    : e.target.value === "stock"
                    ? "AAPL"
                    : e.target.value === "commodity"
                    ? "GOLD"
                    : "US10Y"
                );
              }}
            >
              <option value="crypto">Crypto</option>
              <option value="stock">Stock</option>
              <option value="commodity">Commodity</option>
              <option value="bond">Bond</option>
            </select>
          </div>

          {/* Dropdown to select symbol */}
          <div>
            <label htmlFor="symbol-select" className="text-primary mr-2">
              Select:
            </label>
            <select
              id="symbol-select"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
            >
              {options.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Dropdown to select chart type */}
          <div>
            <label htmlFor="chart-type" className="text-primary mr-2">
              Chart Type:
            </label>
            <select
              id="chart-type"
              value={chartType}
              onChange={(e) => setChartType(e.target.value as ChartType)}
            >
              <option value="candlestick">Candlestick</option>
              <option value="line">Line</option>
              <option value="area">Area</option>
              <option value="bar">Bar</option>
            </select>
          </div>
        </div>
      )}
      {renderChart()}
    </div>
  );
};
