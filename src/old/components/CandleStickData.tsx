// MultiAssetCandleChart.tsx
import React, { useEffect, useState } from "react";
import CandlestickChart from "react-candlestick-chart";

interface Candle {
  date: number | string;
  open: number;
  high: number;
  low: number;
  close: number;
}

const COINS = ["bitcoin", "ethereum", "stellar"] as const;
const STOCKS = ["AAPL", "MSFT", "GOOGL"] as const;
const COMMODITIES = ["GOLD", "WTI", "SILVER"] as const;
const BONDS = ["US10Y"] as const;

type CoinKey = typeof COINS[number];
type StockKey = typeof STOCKS[number];
type CommodityKey = typeof COMMODITIES[number];
type BondKey = typeof BONDS[number];

type AssetType = "crypto" | "stock" | "commodity" | "bond";

export const MultiAssetCandleChart: React.FC = () => {
  const [assetType, setAssetType] = useState<AssetType>("crypto");
  const [symbol, setSymbol] = useState<string>("bitcoin");
  const [data, setData] = useState<Candle[]>([]);

  useEffect(() => {
    (async () => {
      let url = "";
      let transform: (raw: any) => Candle[] = () => [];

      if (assetType === "crypto") {
        url = `https://api.coingecko.com/api/v3/coins/${symbol}/ohlc?vs_currency=usd&days=30`;
        transform = (raw: number[][]) =>
          raw.map((item) => ({
            date: item[0],
            open: item[1],
            high: item[2],
            low: item[3],
            close: item[4],
          }));
      }

      if (assetType === "stock") {
        url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=YOUR_API_KEY`;
        transform = (raw: any) => {
          const series = raw["Time Series (Daily)"] || {};
          return Object.entries(series)
            .slice(0, 30)
            .map(([date, ohlc]: any) => ({
              date,
              open: parseFloat(ohlc["1. open"]),
              high: parseFloat(ohlc["2. high"]),
              low: parseFloat(ohlc["3. low"]),
              close: parseFloat(ohlc["4. close"]),
            }))
            .reverse();
        };
      }

      if (assetType === "commodity") {
        // Alpha Vantage also provides commodity ETFs/tickers (like GOLD, OIL)
        url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=YOUR_API_KEY`;
        transform = (raw: any) => {
          const series = raw["Time Series (Daily)"] || {};
          return Object.entries(series)
            .slice(0, 30)
            .map(([date, ohlc]: any) => ({
              date,
              open: parseFloat(ohlc["1. open"]),
              high: parseFloat(ohlc["2. high"]),
              low: parseFloat(ohlc["3. low"]),
              close: parseFloat(ohlc["4. close"]),
            }))
            .reverse();
        };
      }

      if (assetType === "bond") {
        // Example: U.S. 10Y Treasury via TradingEconomics
        url = `https://api.tradingeconomics.com/markets/bond/${symbol}?c=YOUR_API_KEY`;
        transform = (raw: any) => {
          const series = raw[0]?.historicalData || [];
          return series.slice(-30).map((d: any) => ({
            date: d.date,
            open: d.open,
            high: d.high,
            low: d.low,
            close: d.close,
          }));
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
      : BONDS;

  return (
    <div>
      {/* Dropdown to select asset type */}
      <div style={{ marginBottom: 16 }}>
        <label htmlFor="asset-type">Select Asset Type: </label>
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
      <div style={{ marginBottom: 16 }}>
        <label htmlFor="symbol-select">Select Symbol: </label>
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

      <CandlestickChart
        id="multi-asset-chart"
        data={data}
        width={1250}
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
    </div>
  );
};
