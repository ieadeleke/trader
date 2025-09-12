import Image from "next/image";

import HeroImg from "@/assets/main.png";
import CoinImg from "@/assets/coin.png";
import RowImg from "@/assets/row.png";

import Companies from "@/assets/companies.png";
import Coinbase from "@/assets/companies/coinbas.png";
import Binance from "@/assets/companies/binance.svg";
import Crypto from "@/assets/companies/crypto.svg";
import Etherscan from "@/assets/companies/etherscan.svg";
import Ledger from "@/assets/companies/ledger.png";
import Metamask from "@/assets/companies/metamask.png";
import USDT from "@/assets/companies/usdt.png";
import Zapper from "@/assets/companies/zapper.png";
import Zerion from "@/assets/companies/zerion.png";

import ScrollVelocity from "./animations/ScrollVelocity";
import { useEffect, useState } from "react";
import { Table } from "antd";
import Link from "next/link";

interface ComponentInterface {
  authControl: (state: boolean) => void;
}

interface ChartInterface {
  usd_market_cap: any;
  usd: any;
  usd_24h_change: any;
}

export default function NewHeroSection(props: ComponentInterface) {
  const [chartData, setChartData] = useState<ChartInterface[]>([]);
  const [dataSource, setDataSource] = useState<any[]>([]);

  useEffect(() => {
    const fetchCoins = async () => {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=7&page=1&sparkline=false&price_change_percentage=24h,7d"
      );
      const data = await res.json();

      const formatted = data.map((coin: any, index: number) => ({
        key: index,
        rank: coin.market_cap_rank,
        name: coin.name,
        symbol: coin.symbol,
        image: coin.image,
        price: `$${coin.current_price.toLocaleString()}`,
        marketCap: `$${(coin.market_cap / 1e9).toFixed(2)}B`,
        change24h: coin.price_change_percentage_24h,
        change7d: coin.price_change_percentage_7d_in_currency,
        volume: `$${(coin.total_volume / 1e9).toFixed(2)}B`,
      }));

      setDataSource(formatted);
    };

    fetchCoins();
  }, []);

  const columns = [
    { title: "Rank", dataIndex: "rank", key: "rank" },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: any) => (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Image
            quality={100}
            width={1000}
            height={1000}
            src={record.image}
            alt={record.name}
            style={{ width: 24, height: 24 }}
          />
          <span>
            {record.name} ({record.symbol.toUpperCase()})
          </span>
        </div>
      ),
    },
    { title: "Price", dataIndex: "price", key: "price" },
    { title: "Market Cap", dataIndex: "marketCap", key: "marketCap" },
    {
      title: "24h %",
      dataIndex: "change24h",
      key: "change24h",
      render: (value: number) => (
        <span style={{ color: value >= 0 ? "green" : "red" }}>
          {value >= 0 ? `+${value.toFixed(2)}%` : `${value.toFixed(2)}%`}
        </span>
      ),
    },
    {
      title: "7d %",
      dataIndex: "change7d",
      key: "change7d",
      render: (value: number) => (
        <span style={{ color: value >= 0 ? "green" : "red" }}>
          {value >= 0 ? `+${value.toFixed(2)}%` : `${value.toFixed(2)}%`}
        </span>
      ),
    },
    { title: "24h Volume", dataIndex: "volume", key: "volume" },
  ];

  return (
    <main>
      <section
        className="new-hero-section relative px-5 md:px-20 pt-32 md:pt-44"
        id="home"
      >
        <div className="mb-6 pb-14">
          <h3 className="text-4xl md:text-6xl text- font-ubuntu font-bold text-white leading-[1.4] md:leading-[1.2] mb-3 md:w-[55%]">
            Turn Every Market Move Into Daily Earnings with CFDROCKET
          </h3>
          <p className="text-white opacity-80 leading-loose text-base md:text-lg text-center md:text-left mb-4 block md:w-[45%]">
            Powered by advanced AI, safeguarded by expert financial analysts,
            and designed with built-in risk controls — CFDROCKET gives you the
            edge to earn consistently, even in unpredictable markets.
          </p>
          <button
              onClick={() => {
                props.authControl(true);
              }}
              className="rounded-lg w-full md:w-[14rem] text-white text-sm py-4 mb-10 px-8 bg-primary border border-solid border-primary cursor-pointer"
            >
              Create Account
            </button>
          <div className="md:w-max mx-auto">
            <ul className="flex flex-col gap-5">
              <li className="text-white text-sm text-center opacity-80">
                ✅ Earn daily from global financial markets without needing
                trading experience.
              </li>
              <li className="text-white text-sm text-center opacity-80">
                ✅ AI + Human Forecasting: Smarter decisions where automation
                alone can&apos;t.
              </li>
              <li className="text-white text-sm text-center opacity-80">
                ✅ 24/7 Oversight: Your capital is watched around the clock.
              </li>
              <li className="text-white text-sm text-center opacity-80">
                ✅ Tax-neutral global entity — borderless earnings, no limits.
              </li>
              <li className="text-white text-sm text-center opacity-80">
                ✅ Autotrade safety tools (Stop-Loss / Take-Profit / Stop &
                Sell) keep profits secured
              </li>
            </ul>
          </div>
          {/* <p className="text-white opacity-60 leading-loose text-sm md:text-sm text-center mb-4 block md:w-[65%] mx-auto">
            Moneday Automated Trader enables you to turn insights into income by
            trading on political, economic, and climate event predictions.
            Leverage powerful AI to participate in forecast markets and execute
            high-frequency CFD trades across global financial instruments — all
            fully automated. Benefit from intelligent trading strategies,
            real-time execution, and around-the-clock support. Earn up to 2.83%
            daily, with profits automatically credited to your account or
            reinvested for exponential growth. Enjoy fast, flexible withdrawals
            through credit/debit cards, bank transfers, and leading digital
            wallets — giving you full control over your capital at any time
          </p> */}
          {/* <div className="flex items-center z-40 relative justify-center gap-3 mb-10">
            <button
              onClick={() => {
                props.authControl(true);
              }}
              className="rounded-lg w-full md:w-[20rem] text-white text-sm py-4 px-8 bg-primary border border-solid border-primary cursor-pointer"
            >
              Create Account
            </button>
            <Link
              href="/auth/signin"
              className="rounded-lg w-full md:w-[20rem] text-white text-sm py-4 px-8 bg-transparent border border-solid border-primary cursor-pointer text-center"
            >
              Sign In
            </Link>
          </div> */}
        </div>
        {/* <div className="z-40 relative">
          <Image
            src={HeroImg}
            alt="trading and ai"
            quality={100}
            width={1000}
            height={1000}
            className="w-full h-[20rem] object-center object-cover md:h-[35rem] rounded-lg"
          />
        </div> */}
        <div className="absolute bottom-0 left-0 w-full z-20">
          <Image
            src={CoinImg}
            alt="trading chart"
            quality={100}
            width={1000}
            height={1000}
            className="w-[160px] h-auto"
          />
        </div>
      </section>
      <div className="hidde md:block px-0 md:px-20 mt-20 md:mt-28">
        <div className="bg-[#EDEDED] white [#090A07] pt-5 pb-6 md:rounded-lg">
          <h5 className="text-base text-center text-black mb-6">
            Trusted by industry giants:
          </h5>
          <ScrollVelocity
            texts={[
              <div className="flex gap-16 items-center">
                <Image
                  src={Coinbase}
                  alt="coinbase"
                  quality={100}
                  width={1000}
                  height={1000}
                  className="w-[auto] h-[4rem]"
                />
                <Image
                  src={Binance}
                  alt="binance"
                  quality={100}
                  width={1000}
                  height={1000}
                  className="w-[auto] h-[1.8rem]"
                />
                <Image
                  src={Metamask}
                  alt="metatask"
                  quality={100}
                  width={1000}
                  height={1000}
                  className="w-[auto] h-[1.8rem]"
                />
                <Image
                  src={Crypto}
                  alt="Crypto"
                  quality={100}
                  width={1000}
                  height={1000}
                  className="w-[auto] h-[2rem]"
                />
                <Image
                  src={Etherscan}
                  alt="Etherscan"
                  quality={100}
                  width={1000}
                  height={1000}
                  className="w-[auto] h-[2rem]"
                />
                <Image
                  src={Ledger}
                  alt="Ledger"
                  quality={100}
                  width={1000}
                  height={1000}
                  className="w-[auto] h-[2rem]"
                />
                <div className="h-[4rem] overflow-hidden flex items-center justify-center">
                  <Image
                    src={USDT}
                    alt="USDT"
                    quality={100}
                    width={1000}
                    height={1000}
                    className="w-full h-[6rem]"
                  />
                </div>
                <Image
                  src={Zapper}
                  alt="Zapper"
                  quality={100}
                  width={1000}
                  height={1000}
                  className="w-[auto] h-[2rem]"
                />
                <Image
                  src={Zerion}
                  alt="Zerion"
                  quality={100}
                  width={1000}
                  height={1000}
                  className="w-[auto] h-[4rem]"
                />
              </div>,
            ]}
            velocity={80}
            numCopies={30}
            className="px-5 text-sm uppercase"
          />
        </div>
        {/* <Image
          src={Companies}
          alt="list of companies"
          quality={100}
          width={1000}
          height={1000}
          className="w-full h-full"
        /> */}
      </div>
    </main>
  );
}
