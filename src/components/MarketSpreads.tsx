import Image from "next/image";

import MarketSpreadImg from "@/assets/marketchart.png";

export default function MarketSpread() {
  return (
    <section className="hidden md:block px-20 mt-28">
      <div className="mb-6">
        <div className="bg-[#34251F] border border-solid border-primary py-2 px-4 w-max mx-auto rounded-full mb-4">
          <h4 className="uppercase font-bold text-primary text-xs font-ibm">
            Trade Now
          </h4>
        </div>
        <h3 className="text-4xl text-center font-ubuntu font-bold leading-[1.4]">
          Market Spreads and Swaps
        </h3>
      </div>
      <div>
        <Image
          src={MarketSpreadImg}
          alt="trading chart"
          quality={100}
          width={1000}
          height={1000}
          className="w-full h-full"
        />
      </div>
    </section>
  );
}
