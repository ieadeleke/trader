import Image from "next/image";

import ChartImg from "@/assets/chart.png";
import { MultiAssetCandleChart } from "./CandleStickData";

export default function TradingPlatforms() {
  return (
    <section id="markets" className="hidden md:block px-20 mt-28">
      <div className="mb-6">
        <div className="bg-[#34251F] border border-solid border-primary py-2 px-4 w-max mx-auto rounded-full mb-4">
          <h4 className="uppercase font-bold text-primary text-xs font-ibm">
            Assets
          </h4>
        </div>
        <h3 className="text-4xl text-center font-ubuntu font-bold leading-[1.4]">
          Markets You Earn From
        </h3>
      </div>
      <div>
        <div className="w-max mx-auto">
          <MultiAssetCandleChart />
        </div>
        {/* <Image
          src={ChartImg}
          alt="trading chart"
          quality={100}
          width={1000}
          height={1000}
          className="w-full h-full"
        /> */}
      </div>
    </section>
  );
}
