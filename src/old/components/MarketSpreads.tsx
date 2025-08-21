/* eslint-disable react/jsx-key */

import { useEffect, useState } from "react";
import axios from "axios";

interface MarketData {
  id: string;
  symbol: string;
  name: string;
  image: { large: string };
  market_cap_rank: number;
  market_data: {
    current_price: { usd: number };
    high_24h: { usd: number };
    low_24h: { usd: number };
    market_cap: { usd: number };
    fully_diluted_valuation: { usd: number };
    total_volume: { usd: number };
    circulating_supply: number;
    max_supply: number;
    price_change_percentage_24h: number;
  };
}

export default function MarketStats() {
  const [data, setData] = useState<MarketData | null>(null);

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/bitcoin?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false"
      )
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (!data) return <p className="text-white">Loading...</p>;

  const price = data.market_data.current_price.usd;
  const high = data.market_data.high_24h.usd;
  const low = data.market_data.low_24h.usd;
  const percentage = data.market_data.price_change_percentage_24h;
  const isPositive = percentage >= 0;

  // Position of current price relative to high/low
  const position = ((price - low) / (high - low)) * 100;

  return (
    <div className="px-5 md:px-20 mt-24">
      <div className="mb-6">
        <div className="bg-[#34251F] border border-solid border-primary py-2 px-4 w-max mx-auto rounded-full mb-4">
          <h4 className="uppercase font-bold text-primary text-xs font-ibm">
            Trade Now
          </h4>
        </div>
        <h3 className="text-3xl md:text-4xl text-center font-ubuntu font-bold leading-[1.4]">
          Market Spreads and Swaps
        </h3>
      </div>
      <div className="bg-black w-full text-white p-6 rounded-xl mx-auto">
        {/* Top section */}
        <div className="flex flex-col md:grid grid-cols-2 mb-10 md:mb-24">
          <div className="mb-10 md:0">
            <h4 className="text-xl mb-10">Market Stats</h4>
            <div className="flex items-center gap-4">
              <img
                src={data.image.large}
                alt={data.name}
                className="w-12 h-12"
              />
              <div>
                <div className="flex items-center gap-4">
                  <h1 className="text-2xl font-bold">{data.name}</h1>
                  <p className="bg-blue-900 text-blue-300 px-2 py-0.5 rounded text-xs inline-block">
                    {data.symbol.toUpperCase()}
                  </p>
                </div>
                <p className="text-white">
                  Rank #{data.market_cap_rank} • On watchlists
                </p>
              </div>
            </div>
          </div>
          <div>
            {/* Price */}
            <div className="flex flex-col-reverse md:flex-row justify-between gap-5 md:gap-0 md:items-center">
              <div className="mt-4 text-4xl mb-8 font-bold">
                ${price.toLocaleString()}
                <span
                  className={`ml-2 text-base ${
                    isPositive ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {isPositive
                    ? `+${percentage.toFixed(2)}%`
                    : `${percentage.toFixed(2)}%`}
                </span>
              </div>
              <p className="text-sm opacity-30 hidded">Bitcoin Price (USD)</p>
            </div>

            {/* High / Low Bar */}
            <div className="mt-4">
              <p className="text-white opacity-30 text-sm mb-4">
                High / Low Price (24h)
              </p>
              <div className="relative mb-4 h-2 bg-gray-700 rounded mt-2">
                <div
                  className="absolute top-0 h-2 bg-blue-500 rounded"
                  style={{ width: `${position}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm text-white opacity-30 mt-1">
                <p>Low: ${low.toLocaleString()}</p>
                <p>High: ${high.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="flex flex-col md:grid grid-cols-4 gap-4 mt-6">
          <div className="bg-[#080808] p-4 px-6 rounded-xl">
            <p className="text-white mb-5 text-sm opacity-60">Market Cap</p>
            <p className="text-xl font-semibold">
              ${data.market_data.market_cap.usd.toLocaleString()}
            </p>
          </div>
          <div className="bg-[#080808] p-4 px-6 rounded-xl">
            <p className="text-white mb-5 text-sm opacity-60">Fully Diluted</p>
            <p className="text-xl font-semibold">
              ${data.market_data.fully_diluted_valuation.usd.toLocaleString()}
            </p>
          </div>
          <div className="bg-[#080808] p-4 px-6 rounded-xl">
            <p className="text-white mb-5 text-sm opacity-60">24h Volume</p>
            <p className="text-xl font-semibold">
              ${data.market_data.total_volume.usd.toLocaleString()}
            </p>
          </div>
          <div className="bg-[#080808] p-4 px-6 rounded-xl">
            <p className="text-white mb-5 text-sm opacity-60">
              Circulating Supply
            </p>
            <p className="text-xl font-semibold">
              {data.market_data.circulating_supply.toLocaleString()} BTC
            </p>
            {/* <p className="text-white opacity-60 text-xs">
              Max supply {data.market_data.max_supply?.toLocaleString() ?? "∞"}
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
}
