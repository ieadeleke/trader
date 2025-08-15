import Image from "next/image";

import DollarImg from "@/assets/icons/dollar.svg";
import WhatIsImg from "@/assets/icons/whatis.svg";
import OverviewImg from "@/assets/icons/overview.svg";
import ComparisonImg from "@/assets/icons/comparison.svg";

import Markets from "@/assets/market.png";

interface ComponentInterface {
  authControl: (state: boolean) => void;
}

export default function WhatIsTrading(props: ComponentInterface) {
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
          <div className="py-6">
            <div>
              <Image
                src={DollarImg}
                alt="how it works"
                quality={100}
                className="size-[30px] mx-auto mb-2"
              />
            </div>
            <h4 className="text-primary text-center font-ubuntu font-medium">
              Financial Markets
            </h4>
          </div>
          <div className="bg-primary py-6 border-r-[2px] border-solid border-black">
            <div>
              <Image
                src={WhatIsImg}
                alt="how it works"
                quality={100}
                className="size-[30px] mx-auto mb-2"
              />
            </div>
            <h4 className="text-white text-center font-ubuntu font-medium">
              What is Forex
            </h4>
          </div>
          <div className="bg-primary py-6 border-r-[2px] border-solid border-black">
            <div>
              <Image
                src={OverviewImg}
                alt="how it works"
                quality={100}
                className="size-[30px] mx-auto mb-2"
              />
            </div>
            <h4 className="text-white text-center font-ubuntu font-medium">
              Tools Overview
            </h4>
          </div>
          <div className="bg-primary py-6 rounded-tr-[10px]">
            <div>
              <Image
                src={ComparisonImg}
                alt="how it works"
                quality={100}
                className="size-[30px] mx-auto mb-2"
              />
            </div>
            <h4 className="text-white text-center font-ubuntu font-medium">
              Platform Comparison
            </h4>
          </div>
        </div>
        <div className="md:px-20 flex flex-col-reverse md:grid grid-cols-2 gap-10 md:gap-24 pt-14 md:pb-10">
          <div className="pt-2">
            <h4 className="text-white font-bold font-ubuntu text-xl md:text-2xl mb-3 md:mb-4">
              Financial Markets
            </h4>
            <p className="text-white leading-loose md:leading-relaxed opacity-80 text-sm md:text-lg mb-5 md:mb-6">
              Not sure which is the right FOREX com platform for you? Check out
              our handy platform comparison table which will show you all the
              differences.
            </p>
            <p className="text-white leading-loose md:leading-relaxed opacity-80 text-sm md:text-lg mb-6 md:mb-12">
              Check out our handy platform comparison table which will show you
              all the differences
            </p>
            <div className="flex gap-5 items-center">
              <button onClick={() => props.authControl(true)} className="cursor-pointer rounded-lg bg-primary border-2 border-solid border-primary py-3 md:py-3 px-6 md:px-6 text-sm font-ubuntu text-white">
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
      </div>
    </section>
  );
}
