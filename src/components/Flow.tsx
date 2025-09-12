import Image from "next/image";

// import FlowImg from "@/assets/flow.png";
import FlowImg from "@/assets/mission.jpeg";

import RowImg from "@/assets/row.png";
import CryptoDashboard from "./CryptoDashboard";

export default function Flow() {
  return (
    <section id="aboutus">
      <div className="flex flex-col md:grid grid-cols-2 items-cente gap-10 px-5 md:px-28 mt-20 md:mt-28">
        <div className="hidden md:block">
          <Image
            src={FlowImg}
            alt="how it works"
            quality={100}
            className="w-auto h-full mx-auto object-cover object-center"
          />
        </div>
        <div>
          <h3 className="text-2xl md:text-3xl text-primary mb-3 md:mb-5 font-ubuntu font-bold">
            Our Mission
          </h3>
          <p className="text-sm md:text-base leading-loose opacity-80 mb-4 md:mb-3">
            At CFD Rocket, we believe that financial freedom should not be
            delayed. Traditional trading platforms make you wait weeks or months
            to enjoy your earnings — but with us, every day is a payday.
          </p>
          <p className="text-sm md:text-base leading-loose opacity-80 mb-3 md:mb-3">
            Why CFDROCKET?
          </p>
          <ul className="flex-col gap-2">
            <li className="text-sm md:text-base leading-loose opacity-80">&bull;
              Daily Earnings Potential: Designed for users seeking consistent
              growth every day.
            </li>
            <li className="text-sm md:text-base leading-loose opacity-80">&bull;
              AI-Powered Automation: Intelligent systems analyze market trends
              and execute positions efficiently.
            </li>
            <li className="text-sm md:text-base leading-loose opacity-80">&bull;
              Human Oversight: Analysts step in during uncertain market
              conditions to reduce risks and optimize returns.
            </li>
            <li className="text-sm md:text-base leading-loose opacity-80">&bull;
              Autro-Earning Safety Tools: Stop-loss, take-profit, and
              stop-and-sell mechanisms protect your capital.
            </li>
            <li className="text-sm md:text-base leading-loose opacity-80">&bull;
              Global, Borderless Access: Operates from a tax-neutral
              jurisdiction with no fixed headquarters.
            </li>
          </ul>
          {/* <p className="text-sm md:text-base leading-loose opacity-80 mb-4 md:mb-5">
            We are a daily earning trading platform built for traders,
            entrepreneurs, and everyday people who want consistent, reliable
            income. By combining automated strategies, fast deposits and
            withdrawals, and bank-grade security, CFD Rocket makes trading
            simple, transparent, and rewarding.
          </p> */}
          <p className="text-sm md:text-base leading-loose opacity-80 mb-5 md:mb-10">
            Our mission is simple: to help you trade smart, earn daily, and live
            freely. Whether you&apos;re new to trading or already experienced,
            CFD Rocket gives you the tools, the trust, and the speed to make
            your money work for you — one day at a time.
          </p>
          {/* <button className="bg-primary text-sm py-4 px-6 md:px-10 rounded-[8px]">
            Reach out to us
          </button> */}
        </div>
      </div>
      <div className="hidden md:block mt-28">
        <CryptoDashboard />
      </div>
    </section>
  );
}
