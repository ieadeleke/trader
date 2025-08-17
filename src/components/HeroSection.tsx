import Image from "next/image";

import HeroImg from "@/assets/hero.png";
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

interface ComponentInterface {
  authControl: (state: boolean) => void;
}

export default function HeroSection(props: ComponentInterface) {
  return (
    <main>
      <section className="px-5 md:px-20 pt-32 md:pt-44" id="home">
        <div className="mb-6">
          <div className="bg-[#34251F] border border-solid border-primary py-2 px-4 w-max mx-auto rounded-full mb-3">
            <h4 className="uppercase font-bold text-primary text-xs md:text-sm font-ibm">
              Trade Now
            </h4>
          </div>
          <h3 className="text-4xl md:text-6xl text-center font-ubuntu font-bold leading-[1.4] mb-2">
            The Ultimate Forex Trading
          </h3>
          <div className="bg-[#34251F] border border-solid border-primary py-1 px-8 w-max mx-auto rounded- mb-4 relative">
            <div className="size-[14px] bg-white absolute -top-[6px] -left-[6px] border border-solid border-primary"></div>
            <div className="size-[14px] bg-white absolute -top-[6px] -right-[6px] border border-solid border-primary"></div>
            <div className="size-[14px] bg-white absolute -bottom-[6px] -left-[6px] border border-solid border-primary"></div>
            <div className="size-[14px] bg-white absolute -bottom-[6px] -right-[6px] border border-solid border-primary"></div>
            <h4 className="text-3xl md:text-5xl text-center font-ubuntu font-bold leading-[1.4] text-primary">
              Adventure
            </h4>
          </div>
          <p className="text-white leading-loose text-base md:text-lg text-center mb-6 block">
            We&apos;re well-capitalized and with enough liquidity to navigate
            through bad times.
          </p>
          <div className="flex items-center justify-center gap-3 mb-10">
            <button
              onClick={() => props.authControl(true)}
              className="rounded-lg text-white text-sm py-3 px-8 bg-primary border border-solid border-primary cursor-pointer"
            >
              Create Account
            </button>
            <button className="rounded-lg text-white text-sm py-3 px-10 bg-transparent border border-solid border-white">
              View Market
            </button>
          </div>
        </div>
        <div>
          <Image
            src={HeroImg}
            alt="trading chart"
            quality={100}
            width={1000}
            height={1000}
            className="w-full h-full"
          />
        </div>
      </section>
      <div className="hidde md:block px-0 md:px-20 mt-20 md:mt-28">
        <div className="bg-[#EDEDED] white [#090A07] pt-5 pb-6 md:rounded-lg">
          <h5 className="text-base text-center text-black mb-6">Trusted by industry giants:</h5>
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
