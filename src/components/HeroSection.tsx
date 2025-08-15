import Image from "next/image";

import HeroImg from "@/assets/hero.png";
import RowImg from "@/assets/row.png";

import Companies from "@/assets/companies.png";

interface ComponentInterface {
  authControl: (state: boolean) => void;
}

export default function HeroSection(props: ComponentInterface) {
  return (
    <main>
      <section className="px-20" id="home">
        <div className="mb-6">
          <div className="bg-[#34251F] border border-solid border-primary py-2 px-4 w-max mx-auto rounded-full mb-3">
            <h4 className="uppercase font-bold text-primary text-sm font-ibm">
              Trade Now
            </h4>
          </div>
          <h3 className="text-6xl text-center font-ubuntu font-bold leading-[1.4] mb-2">
            The Ultimate Forex Trading
          </h3>
          <div className="bg-[#34251F] border border-solid border-primary py-1 px-8 w-max mx-auto rounded- mb-4 relative">
            <div className="size-[14px] bg-white absolute -top-[6px] -left-[6px] border border-solid border-primary"></div>
            <div className="size-[14px] bg-white absolute -top-[6px] -right-[6px] border border-solid border-primary"></div>
            <div className="size-[14px] bg-white absolute -bottom-[6px] -left-[6px] border border-solid border-primary"></div>
            <div className="size-[14px] bg-white absolute -bottom-[6px] -right-[6px] border border-solid border-primary"></div>
            <h4 className="text-5xl text-center font-ubuntu font-bold leading-[1.4] text-primary">
              Adventure
            </h4>
          </div>
          <p className="text-white leading-loose text-lg text-center mb-6 block">
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
      <div className="px-44 mt-28">
        <Image
          src={Companies}
          alt="list of companies"
          quality={100}
          width={1000}
          height={1000}
          className="w-full h-full"
        />
      </div>
    </main>
  );
}
