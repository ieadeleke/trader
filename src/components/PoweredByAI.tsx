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

const ReadMore = ({
  text,
  maxLength = 250,
}: {
  text: string;
  maxLength?: number;
}) => {
  const [expanded, setExpanded] = useState(false);

  if (text.length <= maxLength)
    return (
      <p className="text-sm text-white opacity-80 leading-loose">{text}</p>
    );

  return (
    <p className="text-sm text-white opacity-80 leading-loose">
      {expanded ? text : text.substring(0, maxLength) + "... "}
      <button
        onClick={() => setExpanded(!expanded)}
        className="text-primary font-medium ml-1"
      >
        {expanded ? "Read Less" : "Read More"}
      </button>
    </p>
  );
};

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
            Powered By AI
          </h4>
        </div>
        <h3 className="text-3xl md:text-4xl text-center font-ubuntu text-primary font-bold leading-[1.4]">
          Powered by AI: CFDRocket Earning Solutions
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
                <h4 className="text-base md:text-xl text-primary font-medium mb-2">
                  Hybrid Model: AI Precision + Human Expertise
                </h4>
                <ReadMore
                  text={`CFDROCKET operates on a dual system that unites automation with human intelligence.
• AI Precision: Advanced algorithms scan global markets in real time to identify profitable opportunities.
• Human Expertise: Financial analysts oversee market conditions, intervening when AI predictions fall short.
• Balanced Strategy: This combination reduces exposure to unpredictable events while maintaining steady earning potential.`}
                />
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="flow-bg rounded-[12px]">
              <div className="pt-6 md:pt-10 pb-3 pl-4 md:pl-8 py-4 md:pr-8">
                <h4 className="text-base md:text-xl text-primary font-medium mb-2">
                  24/7 Monitoring & Risk Protection
                </h4>
                <ReadMore
                  text={`CFDROCKET provides uninterrupted oversight to safeguard earnings.
• Continuous Supervision: Automated systems and human analysts monitor market movements day and night.
• Built-In Safety Tools: Stop-Loss, Take-Profit, and Stop & Sell mechanisms automatically secure profits and limit losses.
• Proactive Risk Response: Sudden volatility or market shocks are identified early to protect user capital.`}
                />
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="flow-bg rounded-[12px]">
              <div className="pt-6 md:pt-10 pb-3 pl-4 md:pl-8 py-4 md:pr-8">
                <h4 className="text-base md:text-xl text-primary font-medium mb-2">
                  Global Access Without Borders
                </h4>
                <ReadMore
                  text={`CFDROCKET is designed to be global, inclusive, and borderless.
• Tax-Neutral Incorporation: Operates from a jurisdiction that supports worldwide financial participation without heavy taxation.
• Worldwide Availability: Open to users across continents, subject only to local regulations.
• Borderless Operations: No reliance on a single physical headquarters, enabling fluid access for a global user base.`}
                />
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="flow-bg rounded-[12px]">
              <div className="pt-6 md:pt-10 pb-3 pl-4 md:pl-8 py-4 md:pr-8">
                <h4 className="text-base md:text-xl text-primary font-medium mb-2">
                  Transparent Metrics & Performance Reporting
                </h4>
                <ReadMore
                  text={`CFDROCKET builds trust through complete transparency.
• Real-Time Metrics: Live data on growth, volatility, and earnings are accessible at all times.
• Detailed Reporting: CAGR, drawdowns, Sharpe ratios, win/loss percentages, and benchmark comparisons against BTC and S&P 500 are available.
• Clarity in Risk: Disclaimers highlight that past performance does not guarantee future results, ensuring users have a realistic outlook.`}
                />
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
