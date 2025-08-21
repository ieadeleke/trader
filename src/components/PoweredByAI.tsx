/* eslint-disable react/jsx-key */

import { useEffect, useState } from "react";
import axios from "axios";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

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

export default function PoweredByAI() {
  const responsiveness = {
    0: {
      slidesPerView: 1.1,
      spaceBetween: 20,
    },
    640: {
      // tablets and up
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1024: {
      // desktop and up
      slidesPerView: 4,
      spaceBetween: 30,
    },
    1440: {
      // large screens
      slidesPerView: 4,
      spaceBetween: 20,
    },
  };

  // if (!data) return <p className="text-white">Loading...</p>;

  // const price = data.market_data.current_price.usd;
  // const high = data.market_data.high_24h.usd;
  // const low = data.market_data.low_24h.usd;
  // const percentage = data.market_data.price_change_percentage_24h;
  // const isPositive = percentage >= 0;

  // // Position of current price relative to high/low
  // const position = ((price - low) / (high - low)) * 100;

  return (
    <div className="px-5 md:px-20 mt-24">
      <div className="mb-6">
        <div className="bg-[#34251F] border border-solid border-primary py-2 px-4 w-max mx-auto rounded-full mb-4">
          <h4 className="uppercase font-bold text-primary text-xs font-ibm">
            Trade Now
          </h4>
        </div>
        <h3 className="text-3xl md:text-4xl text-center font-ubuntu font-bold leading-[1.4]">
          Powered by AI: Moneday Trading Solutions
        </h3>
      </div>
      <div>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          breakpoints={responsiveness}
        >
          <SwiperSlide>
            <div className="flow-bg rounded-[12px]">
              <div className="pt-6 md:pt-10 pb-3 pl-4 md:pl-8 py-4 md:pr-8">
                <h4 className="text-base md:text-xl text-primary uppercas font-medium mb-2">
                  AI-Driven Trading Signals Across All Financial Markets
                </h4>
                <p className="text-sm text-white opacity-80 leading-loose">
                  At the heart of Moneday lies an advanced AI engine designed to
                  analyze and generate daily trading signals across the full
                  spectrum of global financial instruments. Whether clients are
                  trading stocks, forex, cryptocurrencies, commodities, or more
                  specialized markets like ETFs and bonds, the AI continuously
                  scans price movements, technical patterns, economic
                  indicators, and global sentiment to deliver high-probability
                  trade opportunities. These insights aren&apos;t limited to a
                  handful of popular assets — they extend across all tradable
                  markets, including CFDs and less volatile instruments,
                  ensuring that every client, regardless of their preferred
                  asset class, receives actionable, data-backed signals each
                  day.
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flow-bg rounded-[12px]">
              <div className="pt-6 md:pt-10 pb-3 pl-4 md:pl-8 py-4 md:pr-8">
                <h4 className="text-base md:text-xl text-primary uppercas font-medium mb-2">
                  Automated & Semi-Automated Trading Execution
                </h4>
                <p className="text-sm text-white opacity-80 leading-loose">
                  To simplify and streamline the trading experience, Moneday
                  offers automated and semi-automated execution tools compatible
                  with most major trading platforms and brokers. Clients can
                  allow the AI to execute trades on their behalf or use signals
                  manually while retaining full control. This automation covers
                  all asset types — from equities and ETFs to commodities,
                  bonds, and even niche derivatives — giving traders the power
                  to operate across diversified portfolios without needing to
                  monitor the markets 24/7. With dynamic capital allocation and
                  real-time risk management baked in, the system intelligently
                  adjusts trade exposure to suit market conditions and
                  individual risk preferences.
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flow-bg rounded-[12px]">
              <div className="pt-6 md:pt-10 pb-3 pl-4 md:pl-8 py-4 md:pr-8">
                <h4 className="text-base md:text-xl text-primary uppercas font-medium mb-2">
                  Smart Earnings Tracker & Performance Analytics
                </h4>
                <p className="text-sm text-white opacity-80 leading-loose">
                  Daily earnings aren&apos;t just a goal — they&apos;re a
                  measurable reality with Moneday. Every client has access to a
                  personalized earnings dashboard that provides a clear picture
                  of profits, trade history, risk exposure, and growth trends
                  across all instruments they engage with. Whether trading
                  volatile assets like crypto or more stable investments like
                  government bonds or ETFs, clients can track performance in
                  real time. The platform&apos;s AI goes a step further by
                  offering predictive insights and optimization suggestions,
                  helping traders make smarter decisions and scale their
                  earnings consistently.
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flow-bg rounded-[12px]">
              <div className="pt-6 md:pt-10 pb-3 pl-4 md:pl-8 py-4 md:pr-8">
                <h4 className="text-base md:text-xl text-primary uppercas font-medium mb-2">
                  Education, Community & Trader Support Hub
                </h4>
                <p className="text-sm text-white opacity-80 leading-loose">
                  Understanding that success comes from both smart technology
                  and informed users, Moneday offers a rich support ecosystem.
                  Clients gain access to a vibrant community of global traders,
                  daily market recaps powered by AI, and educational resources
                  covering every financial instrument available on the platform.
                  Whether someone is new to ETF trading, exploring bond
                  strategies, or optimizing a multi-asset portfolio,
                  there&apos;s always guidance available. Live sessions,
                  tutorials, and strategic insights are tailored not just for
                  learning — but for growing daily earnings with confidence and
                  clarity.
                </p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      {/* <div className="bg-black w-full text-white p-6 rounded-xl mx-auto">
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
          </div>
        </div>
      </div> */}
    </div>
  );
}
