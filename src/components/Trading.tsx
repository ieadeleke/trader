"use client";
import Image from "next/image";

import DollarImg from "@/assets/icons/dollar.svg";
import WhatIsImg from "@/assets/icons/whatis.svg";
import OverviewImg from "@/assets/icons/overview.svg";
import ComparisonImg from "@/assets/icons/comparison.svg";

import Markets from "@/assets/market.png";
import { useState } from "react";
import { TiTimes } from "react-icons/ti";
import { FaCheck } from "react-icons/fa6";

interface ComponentInterface {
  authControl: (state: boolean) => void;
}

export default function WhatIsTrading(props: ComponentInterface) {
  const [currentView, setCurrentView] = useState<number>(0);
  return (
    <section className="px-5 md:px-20 mt-28" id="services">
      <div className="md:mb-12">
        <div className="bg-[#34251F] border border-solid border-primary py-2 px-4 w-max mx-auto rounded-full mb-4">
          <h4 className="uppercase font-bold text-primary text-xs font-ibm">
            Learn More
          </h4>
        </div>
        <h3 className="text-3xl text-center md:mb-3 font-ubuntu font-bold leading-[1.4]">
          What Is Trading?
        </h3>
      </div>
      <div className="md:border border-[#484848] rounded-[10px]">
        <div className="hidden md:grid grid-cols-4">
          <div
            onClick={() => setCurrentView(0)}
            className={`${
              currentView === 0 ? "bg-transparent" : "bg-primary"
            } py-6 border-r-[2px] border-solid border-black rounded-tl-[10px] cursor-pointer`}
          >
            <div>
              <Image
                src={DollarImg}
                alt="how it works"
                quality={100}
                className="size-[30px] mx-auto mb-2"
              />
            </div>
            <h4
              className={`${
                currentView === 0 ? "text-primary" : "text-white"
              } text-center font-ubuntu font-medium`}
            >
              Financial Markets
            </h4>
          </div>
          <div
            onClick={() => setCurrentView(1)}
            className={`${
              currentView === 1 ? "bg-black" : "bg-primary"
            } py-6 border-r-[2px] border-solid border-black cursor-pointer`}
          >
            <div>
              <Image
                src={WhatIsImg}
                alt="how it works"
                quality={100}
                className="size-[30px] mx-auto mb-2"
              />
            </div>
            <h4
              className={`${
                currentView === 1 ? "text-primary" : "text-white"
              } text-center font-ubuntu font-medium`}
            >
              What is Forex
            </h4>
          </div>
          <div
            onClick={() => setCurrentView(2)}
            className={`${
              currentView === 2 ? "bg-black" : "bg-primary"
            } py-6 border-r-[2px] border-solid border-black cursor-pointer`}
          >
            <div>
              <Image
                src={OverviewImg}
                alt="how it works"
                quality={100}
                className="size-[30px] mx-auto mb-2"
              />
            </div>
            <h4
              className={`${
                currentView === 2 ? "text-primary" : "text-white"
              } text-center font-ubuntu font-medium`}
            >
              Tools Overview
            </h4>
          </div>
          <div
            onClick={() => setCurrentView(3)}
            className={`${
              currentView === 3 ? "bg-black" : "bg-primary"
            } py-6 rounded-tr-[10px] cursor-pointer`}
          >
            <div>
              <Image
                src={ComparisonImg}
                alt="how it works"
                quality={100}
                className="size-[30px] mx-auto mb-2"
              />
            </div>
            <h4
              className={`${
                currentView === 3 ? "text-primary" : "text-white"
              } text-center font-ubuntu font-medium`}
            >
              Platform Comparison
            </h4>
          </div>
        </div>
        {currentView === 0 && (
          <div className="md:px-20 flex flex-col-reverse md:grid grid-cols-2 gap-10 md:gap-24 pt-14 md:pb-10">
            <div className="pt-2">
              <h4 className="text-white font-bold font-ubuntu text-xl md:text-2xl mb-3 md:mb-2">
                Financial Markets
              </h4>
              <p className="text-white leading-loose md:leading-relaxed opacity-80 text-sm md:text-base mb-5 md:mb-6">
                Financial markets are the engine of the global economy. Every
                movement — from exchange rates to stock prices — creates chances
                to profit. But while traditional investing makes you wait,
                Moneday transforms these markets into a daily earning
                opportunity.
              </p>
              <p className="text-white leading-loose md:leading-relaxed opacity-80 text-sm md:text-base mb-6 md:mb-12">
                With Moneday, you don&apos;t just participate in financial
                markets — you earn from them every day, securely and
                automatically.
              </p>
              <div className="flex gap-5 items-center">
                <button
                  onClick={() => props.authControl(true)}
                  className="cursor-pointer rounded-lg bg-primary border-2 border-solid border-primary py-3 md:py-3 px-6 md:px-6 text-sm font-ubuntu text-white"
                >
                  Start Trading
                </button>
                <button className="hidden md:block rounded-lg bg-transparent border-2 border-solid border-primary py-3 px-6 text-sm font-ubuntu text-primary">
                  Learn More
                </button>
              </div>
            </div>
            <div>
              <Image
                src={Markets}
                alt="how it works"
                quality={100}
                className="w-[80%] md:w-full h-auto md:h-full max-w-[469px] mx-auto md:mb-2"
              />
            </div>
          </div>
        )}
        {currentView === 1 && (
          <div className="md:px-20 flex flex-col-reverse md:grid grid-cols-2 md:items-center gap-10 md:gap-24 pt-14 md:pb-10">
            <div className="pt-2">
              <h4 className="text-white font-bold font-ubuntu text-xl md:text-2xl mb-3 md:mb-2">
                What is Forex?
              </h4>
              <p className="text-white leading-loose md:leading-relaxed opacity-80 text-sm md:text-base mb-5 md:mb-6">
                Forex (Foreign Exchange) is the global marketplace where
                currencies are traded. It is the largest and most liquid
                financial market in the world, with over $6 trillion traded
                daily.
              </p>
              <p className="text-white leading-loose md:leading-relaxed opacity-80 text-sm md:text-base mb-5 md:mb-6">
                In forex, traders buy one currency while selling another, aiming
                to profit from changes in exchange rates. For example, trading
                the Euro against the US Dollar (EUR/USD) allows you to earn from
                shifts in their relative value.
              </p>
              <p className="text-white leading-loose md:leading-relaxed opacity-80 text-sm md:text-base mb-5 md:mb-6">
                Why Forex with Moneday?
              </p>
              <ul className="flex flex-col gap-4 mb-6 md:mb-12 ml-5">
                <li className="text-white leading-loose md:leading-relaxed opacity-80 text-sm md:text-base">
                  &bull; Daily opportunities – The forex market operates 24/5,
                  offering countless chances to profit.
                </li>
                <li className="text-white leading-loose md:leading-relaxed opacity-80 text-sm md:text-base">
                  &bull; Liquidity – Fast execution and easy entry/exit because
                  millions trade every second.
                </li>
                <li className="text-white leading-loose md:leading-relaxed opacity-80 text-sm md:text-base">
                  &bull; Accessibility – Start small and grow, with no barriers
                  to entry.
                </li>
                <li className="text-white leading-loose md:leading-relaxed opacity-80 text-sm md:text-base">
                  &bull; Daily earnings with Moneday – Unlike traditional
                  platforms, Moneday transforms forex trading into consistent
                  daily payouts.
                </li>
              </ul>
              <div className="flex gap-5 items-center">
                <button
                  onClick={() => props.authControl(true)}
                  className="cursor-pointer rounded-lg bg-primary border-2 border-solid border-primary py-3 md:py-3 px-6 md:px-6 text-sm font-ubuntu text-white"
                >
                  Start Trading
                </button>
                <button className="hidden md:block rounded-lg bg-transparent border-2 border-solid border-primary py-3 px-6 text-sm font-ubuntu text-primary">
                  Learn More
                </button>
              </div>
            </div>
            <div>
              <Image
                src={Markets}
                alt="how it works"
                quality={100}
                width={1000}
                height={1000}
                className="w-[80%] md:w-full h-auto md:h-auto max-w-[469px] mx-auto md:mb-2"
              />
            </div>
          </div>
        )}
        {currentView === 2 && (
          <div className="md:px-20 flex flex-col-reverse md:grid grid-cols-2 gap-10 md:gap-24 md:items-center pt-14 md:pb-10">
            <div className="pt-2">
              <h4 className="text-white font-bold font-ubuntu text-xl md:text-2xl mb-3 md:mb-2">
                ⚙️ Tools Overview – Moneday
              </h4>
              <p className="text-white leading-loose md:leading-relaxed opacity-80 text-sm md:text-base mb-5 md:mb-6">
                At Moneday, we equip our users with sophisticated trading tools
                designed to work for you — not against you. Our platform blends
                advanced technology with simplicity, so you can focus on earning
                daily without stress.
              </p>
              <div className="flex flex-col gap-5 mb-6 md:mb-12">
                <div>
                  <h5>&bull; Automated Trading Engine</h5>
                  <p className="text-sm leading-loose opacity-80">
                    Our smart algorithms scan forex and crypto markets in real
                    time, executing trades with precision — even while you
                    sleep.
                  </p>
                </div>
                <div>
                  <h5>&bull; Risk Management Tools</h5>
                  <p className="text-sm leading-loose opacity-80">
                    Built-in systems that monitor trades, minimize risks, and
                    protect your capital, ensuring your earnings are consistent.
                  </p>
                </div>
                <div>
                  <h5>&bull; Performance Dashboard</h5>
                  <p className="text-sm leading-loose opacity-80">
                    Track your profits, payouts, deposits, and withdrawals with
                    clear and transparent reporting.
                  </p>
                </div>
                <div>
                  <h5>&bull; Seamless Payments</h5>
                  <p className="text-sm leading-loose opacity-80">
                    Integrated deposit and withdrawal tools that let you move
                    funds instantly, keeping you in control of your money.
                  </p>
                </div>
                <div>
                  <h5>&bull; 24/7 Monitoring</h5>
                  <p className="text-sm leading-loose opacity-80">
                    Our automated tools never rest — markets are watched day and
                    night to capture opportunities as they happen
                  </p>
                </div>
              </div>
              <div className="flex gap-5 items-center">
                <button
                  onClick={() => props.authControl(true)}
                  className="cursor-pointer rounded-lg bg-primary border-2 border-solid border-primary py-3 md:py-3 px-6 md:px-6 text-sm font-ubuntu text-white"
                >
                  Start Trading
                </button>
                <button className="hidden md:block rounded-lg bg-transparent border-2 border-solid border-primary py-3 px-6 text-sm font-ubuntu text-primary">
                  Learn More
                </button>
              </div>
            </div>
            <div>
              <Image
                src={Markets}
                alt="how it works"
                quality={100}
                className="w-[80%] md:w-full h-auto md:h-auto max-w-[469px] mx-auto md:mb-2"
              />
            </div>
          </div>
        )}
        {currentView === 3 && (
          <div className="md:px-20 flex flex-col-reverse md:grid grid-cols-2 md:items-center gap-10 md:gap-24 pt-14 md:pb-10">
            <div className="pt-2">
              <h4 className="text-white font-bold font-ubuntu text-xl md:text-2xl mb-3 md:mb-2">
                Platform Comparison – Why Choose Moneday?
              </h4>
              <p className="text-white leading-loose md:leading-relaxed opacity-80 text-sm md:text-base mb-5 md:mb-6">
                Not all trading platforms are the same. Here&apos;s how Moneday
                compares to traditional investment options:
              </p>
              <div>
                <p className="text-white leading-loose md:leading-relaxed opacity-80 text-sm md:text-base mb-4 md:mb-3">
                  Traditional Trading Platforms:
                </p>
                <ul className="flex flex-col gap-4 mb-5 md:mb-6 ml-5">
                  <li className="text-white leading-loose flex gap-2 md:leading-relaxed opacity-80 text-sm md:text-base">
                    <div>
                      <div className="size-4 mt-1 bg-red-600 rounded-full flex items-center justify-center">
                        <TiTimes />
                      </div>
                    </div>
                    <span>
                      Profits are often delayed — weekly, monthly, or quarterly.
                    </span>
                  </li>
                  <li className="text-white leading-loose flex gap-2 md:leading-relaxed opacity-80 text-sm md:text-base">
                    <div>
                      <div className="size-4 mt-1 bg-red-600 rounded-full flex items-center justify-center">
                        <TiTimes />
                      </div>
                    </div>
                    <span>Complicated tools that confuse beginners.</span>
                  </li>
                  <li className="text-white leading-loose flex gap-2 md:leading-relaxed opacity-80 text-sm md:text-base">
                    <div>
                      <div className="size-4 mt-1 bg-red-600 rounded-full flex items-center justify-center">
                        <TiTimes />
                      </div>
                    </div>
                    <span>
                      Limited withdrawal options and long processing times.
                    </span>
                  </li>
                  <li className="text-white leading-loose flex gap-2 md:leading-relaxed opacity-80 text-sm md:text-base">
                    <div>
                      <div className="size-4 mt-1 bg-red-600 rounded-full flex items-center justify-center">
                        <TiTimes />
                      </div>
                    </div>
                    <span>
                      Risk management often left entirely to the trader.
                    </span>
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-white leading-loose md:leading-relaxed opacity-80 text-sm md:text-base mb-4 md:mb-3">
                  Moneday:
                </p>
                <ul className="flex flex-col gap-4 mb-5 md:mb-6 ml-5">
                  <li className="text-white leading-loose flex gap-2 md:leading-relaxed opacity-80 text-sm md:text-base">
                    <div>
                      <div className="size-4 mt-1 bg-green-600 rounded-full flex items-center justify-center">
                        <FaCheck className="text-[10px]" />
                      </div>
                    </div>
                    <span>
                      Daily Earnings – Profits are paid out every single day
                    </span>
                  </li>
                  <li className="text-white leading-loose flex gap-2 md:leading-relaxed opacity-80 text-sm md:text-base">
                    <div>
                      <div className="size-4 mt-1 bg-green-600 rounded-full flex items-center justify-center">
                        <FaCheck className="text-[10px]" />
                      </div>
                    </div>
                    <span>
                      Automated Trading Tools – Sophisticated algorithms work
                      for you 24/7.
                    </span>
                  </li>
                  <li className="text-white leading-loose flex gap-2 md:leading-relaxed opacity-80 text-sm md:text-base">
                    <div>
                      <div className="size-4 mt-1 bg-green-600 rounded-full flex items-center justify-center">
                        <FaCheck className="text-[10px]" />
                      </div>
                    </div>
                    <span>
                      Fast Deposits & Withdrawals – Instant access to your
                      money.
                    </span>
                  </li>
                  <li className="text-white leading-loose flex gap-2 md:leading-relaxed opacity-80 text-sm md:text-base">
                    <div>
                      <div className="size-4 mt-1 bg-green-600 rounded-full flex items-center justify-center">
                        <FaCheck className="text-[10px]" />
                      </div>
                    </div>
                    <span>
                      Smart Risk Control – Tools built-in to protect your
                      capital.
                    </span>
                  </li>
                  <li className="text-white leading-loose flex gap-2 md:leading-relaxed opacity-80 text-sm md:text-base">
                    <div>
                      <div className="size-4 mt-1 bg-green-600 rounded-full flex items-center justify-center">
                        <FaCheck className="text-[10px]" />
                      </div>
                    </div>
                    <span>
                      User-Friendly – Simple enough for beginners, powerful
                      enough for experts.
                    </span>
                  </li>
                </ul>
              </div>
              <p className="text-white leading-loose md:leading-relaxed opacity-80 text-sm md:text-base mb-6 md:mb-12">
                With Moneday, you don&apos;t just trade — you gain access to a
                smarter, faster, and more rewarding platform that turns every
                day into a payday.
              </p>
              <div className="flex gap-5 items-center">
                <button
                  onClick={() => props.authControl(true)}
                  className="cursor-pointer rounded-lg bg-primary border-2 border-solid border-primary py-3 md:py-3 px-6 md:px-6 text-sm font-ubuntu text-white"
                >
                  Start Trading
                </button>
                <button className="hidden md:block rounded-lg bg-transparent border-2 border-solid border-primary py-3 px-6 text-sm font-ubuntu text-primary">
                  Learn More
                </button>
              </div>
            </div>
            <div>
              <Image
                src={Markets}
                alt="how it works"
                quality={100}
                className="w-[80%] md:w-full h-auto md:h-auto max-w-[469px] mx-auto md:mb-2"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
