import Image from "next/image";

import FlowImg from "@/assets/flow.png";
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
            className="w-auto h-full mx-auto"
          />
        </div>
        <div>
          <h3 className="text-2xl md:text-3xl mb-3 md:mb-5 font-ubuntu font-bold">
            Our Mission
          </h3>
          <p className="text-sm md:text-base leading-loose opacity-80 mb-4 md:mb-3">
            At Moneday, we believe that financial freedom should not be delayed.
            Traditional trading platforms make you wait weeks or months to enjoy
            your earnings — but with us, every day is a payday.
          </p>
          <p className="text-sm md:text-base leading-loose opacity-80 mb-4 md:mb-5">
            We are a daily
            earning trading platform built for traders, entrepreneurs, and
            everyday people who want consistent, reliable income. By combining
            automated strategies, fast deposits and withdrawals, and bank-grade
            security, Moneday makes trading simple, transparent, and rewarding.
          </p>
          <p className="text-sm md:text-base leading-loose opacity-80 mb-5 md:mb-10">
            Our mission is simple: to help you trade smart, earn daily, and live
            freely. Whether you&apos;re new to trading or already experienced,
            Moneday gives you the tools, the trust, and the speed to make your
            money work for you — one day at a time.
          </p>
          <button className="bg-primary text-sm py-4 px-6 md:px-10 rounded-[8px]">
            Reach out to us
          </button>
        </div>
      </div>
      <div className="hidden md:block mt-28">
        <CryptoDashboard />
      </div>
    </section>
  );
}
