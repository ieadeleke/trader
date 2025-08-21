/* eslint-disable react/jsx-key */

import { useEffect, useState } from "react";
import axios from "axios";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const ReadMore = ({
  text,
  maxLength = 380,
}: {
  text: string;
  maxLength?: number;
}) => {
  const [expanded, setExpanded] = useState(false);

  if (text.length <= maxLength) return <p>{text}</p>;

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
      slidesPerView: 3,
      spaceBetween: 30,
    },
    1440: {
      // large screens
      slidesPerView: 3,
      spaceBetween: 20,
    },
  };
  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/bitcoin?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false"
      )
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  // if (!data) return <p className="text-white">Loading...</p>;

  // const price = data.market_data.current_price.usd;
  // const high = data.market_data.high_24h.usd;
  // const low = data.market_data.low_24h.usd;
  // const percentage = data.market_data.price_change_percentage_24h;
  // const isPositive = percentage >= 0;

  // // Position of current price relative to high/low
  // const position = ((price - low) / (high - low)) * 100;

  return (
    <div className="px-5 md:px-20 mt-24" id="services">
      <div className="mb-6">
        <div className="bg-[#34251F] border border-solid border-primary py-2 px-4 w-max mx-auto rounded-full mb-4">
          <h4 className="uppercase font-bold text-primary text-xs font-ibm">
            Our Services
          </h4>
        </div>
        <h3 className="text-3xl md:text-4xl text-center font-ubuntu font-bold leading-[1.4]">
          Grow with Moneday
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
                  Financial Planning
                </h4>
                <ReadMore
                  text={`At Moneday, financial planning is more than just a budgeting exercise — it's a strategic roadmap for wealth creation, risk management, and long-term financial security. Our AI-powered platform combines deep data analytics with personalized financial goal-setting to help clients design actionable plans tailored to their income, lifestyle, and aspirations. Whether you're planning for retirement, education, a major purchase, or early financial freedom, Moneday helps you forecast future needs and align your investment and saving strategies accordingly. Our approach covers income tracking, expense management, debt reduction, emergency fund allocation, insurance needs, and tax-efficient strategies — all customized in real time based on your evolving financial profile. What sets Moneday apart is the integration of AI with human oversight, ensuring that every financial plan is not only optimized for market realities but also aligned with your personal vision of success.`}
                />
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="flow-bg rounded-[12px]">
              <div className="pt-6 md:pt-10 pb-3 pl-4 md:pl-8 py-4 md:pr-8">
                <h4 className="text-base md:text-xl text-primary font-medium mb-2">
                  Portfolio Management
                </h4>
                <ReadMore
                  text={`Moneday offers intelligent, dynamic portfolio management that adapts to market movements and personal preferences. Whether you're a conservative investor focusing on capital preservation or an aggressive trader seeking high returns, our AI-driven system constructs and manages portfolios that balance risk, diversification, and performance. Our platform supports a wide range of asset classes — including stocks, ETFs, bonds, commodities, forex, crypto, and CFDs — allowing clients to build highly diversified portfolios. Moneday's AI continuously monitors asset performance, market shifts, and macroeconomic trends to make adjustments in real time, aiming to maximize returns while minimizing downside risk. Clients can choose between fully automated portfolio strategies, co-managed models, or even hands-on control with AI-backed guidance. Transparency, liquidity, and performance tracking are central to our portfolio service, and every client has access to a live dashboard for real-time updates, risk analytics, and performance reports. This is portfolio management for the modern investor — intelligent, flexible, and aligned with daily earning goals.`}
                />
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="flow-bg rounded-[12px]">
              <div className="pt-6 md:pt-10 pb-3 pl-4 md:pl-8 py-4 md:pr-8">
                <h4 className="text-base md:text-xl text-primary font-medium mb-2">
                  Investment Advisory
                </h4>
                <ReadMore
                  text={`Moneday's Investment Advisory service combines the power of machine learning with the insight of experienced financial experts to deliver tailored investment guidance. Rather than offering generic advice, we analyze your unique financial goals, risk tolerance, time horizon, and market preferences to recommend the most suitable investment strategies. Our AI engine evaluates thousands of assets across global markets, identifying opportunities based on technical indicators, fundamental analysis, sentiment tracking, and historical performance. Whether you're looking to grow wealth steadily, capitalize on short-term trading opportunities, or hedge against inflation, our system can recommend diversified approaches across both traditional and alternative investments. What makes Moneday's advisory service stand out is its ability to adapt. As markets evolve or your financial situation changes, the platform updates your investment strategy in real time. You also have access to expert consultants who can provide additional context, answer questions, and help refine your approach. From beginner investors to seasoned professionals, Moneday delivers clear, actionable investment advice grounded in data, driven by AI, and overseen by trusted professionals.`}
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
