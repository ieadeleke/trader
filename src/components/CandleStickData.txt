// CryptoCandleChart.tsx

import React, { useEffect, useState } from "react";
import CandlestickChart from "react-candlestick-chart";

interface Candle {
  date: number | string;
  open: number;
  high: number;
  low: number;
  close: number;
}

// Define which coins you'd like available
const COINS = ["bitcoin", "ethereum", "stellar"] as const;
type CoinKey = typeof COINS[number];

export const CryptoCandleChart: React.FC = () => {
  const [coin, setCoin] = useState<CoinKey>("bitcoin");
  const [data, setData] = useState<Candle[]>([]);

  useEffect(() => {
    (async () => {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coin}/ohlc?vs_currency=usd&days=30`
      );
      const raw: number[][] = await res.json();

      const step = Math.max(1, Math.floor(raw.length / 12));
      const sampled = raw
        .filter((_, i) => i % step === 0)
        .slice(0, 12);

      const formatted = sampled.map((item) => ({
        date: item[0],      // timestamp in ms
        open: item[1],
        high: item[2],
        low: item[3],
        close: item[4],
      }));

      setData(formatted);
    })();
  }, [coin]);

  return (
    <div>
      {/* Dropdown to switch coins */}
      <div style={{ marginBottom: 16 }}>
        <label htmlFor="coin-select">Select Coin: </label>
        <select
          id="coin-select"
          value={coin}
          onChange={(e) => setCoin(e.target.value as CoinKey)}
        >
          {COINS.map((c) => (
            <option key={c} value={c}>
              {c.charAt(0).toUpperCase() + c.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <CandlestickChart
        id="crypto-chart"
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
