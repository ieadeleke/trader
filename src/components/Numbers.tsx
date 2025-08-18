"use client";
import Image from "next/image";

import GlobeImg from "@/assets/globe.png";
import { useEffect } from "react";

interface ComponentInterface {
  authControl: (state: boolean) => void;
}

export default function Numbers(props: ComponentInterface) {
  useEffect(() => {
    const fetchData = async() => {
      const apiData = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,stellar&vs_currencies=usd&include_market_cap=true&include_24hr_change=true&aux=ath,atl,high24h,low24h,num_market_pairs,cmc_rank,date_added,max_supply,circulating_supply,total_supply,volume_7d,volume_30d,self_reported_circulating_supply,self_reported_market_cap')
      const data = await apiData.json();
      console.log(data);
    }
    // const fetchSecData = async() => {
    //   const apiData = await fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=BTC,ETH')
    //   const data = await apiData.json();
    //   console.log(data);
    // }
    // const fetchThirdData = async() => {
    //   const apiData = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT')
    //   const data = await apiData.json();
    //   console.log(data);
    // }
    const fetchFourthData = async() => {
      const apiData = await fetch('https://api.coinmarketcap.com/data-api/v3/cryptocurrency/listing?start=1&limit=100&sortBy=rank&sortType=desc&convert=USD,BTC,ETH&cryptoType=all&tagType=all&audited=false&aux=ath,atl,high24h,low24h,num_market_pairs,cmc_rank,date_added,max_supply,circulating_supply,total_supply,volume_7d,volume_30d,self_reported_circulating_supply,self_reported_market_cap')
      const data = await apiData.json();
      console.log(data);
    }
    // fetchData();
    // fetchSecData();
    // fetchThirdData();
    // fetchFourthData();
  }, []);
  return (
    <section className="px-5 md:px-32 mt-28">
      <div className="flex flex-col md:grid grid-cols-2 md:items-center gap-16 md:gap-36 px-5 md:px-20 flow-bg py-10 md:py-20 rounded-[10px] relative overflow-hidden">
        <div>
          <div className="bg-[#34251F] border border-solid border-primary py-2 px-4 w-max rounded-full mb-4">
            <h4 className="uppercase font-bold text-primary text-xs font-ibm">
              Experience
            </h4>
          </div>
          <h3 className="text-3xl md:text-4xl mb-3 font-ubuntu font-bold w-[95%] leading-[1.4]">
            Join Thousands Earning $50 million daily
          </h3>
          <p className="text-white font-ibm opacity-80 text-base md:text-lg leading-relaxed md:w-[90%] mb-7">
            We use cookies to understand how you use our website and to give you
            the best possible
          </p>
          <button
            onClick={() => props.authControl(true)}
            className="cursor-pointer bg-primary text-sm text-white rounded-lg font-ubuntu py-4 px-8 font-medium"
          >
            Create Account
          </button>
        </div>
        <div>
          <p className="text-sm text-white mb-6">Start Earning:</p>
          <div className="grid grid-cols-2 justify-between gap-10 md:gap-y-20">
            <div className="border-l-2 border-solid border-primary pl-2 md:pl-4 py-2">
              <h2 className="text-xl md:text-2xl font-medium text-white mb-2">
                2,000+
              </h2>
              <p className="text-sm md:text-base font-ibm text-white">dollars daily</p>
            </div>
            <div className="border-l-2 border-solid border-primary pl-2 md:pl-4 py-2">
              <h2 className="text-xl md:text-2xl font-medium text-white mb-2">
                10,000+
              </h2>
              <p className="text-sm md:text-base font-ibm text-white">dollars daily</p>
            </div>
            <div className="border-l-2 border-solid border-primary pl-2 md:pl-4 py-2">
              <h2 className="text-xl md:text-2xl font-medium text-white mb-2">
                25,000+
              </h2>
              <p className="text-sm md:text-base font-ibm text-white">dollars daily</p>
            </div>
            <div className="border-l-2 border-solid border-primary pl-2 md:pl-4 py-2">
              <h2 className="text-xl md:text-2xl font-medium text-white mb-2">
                50,000+
              </h2>
              <p className="text-sm md:text-base font-ibm text-white">dollars daily</p>
            </div>
          </div>
        </div>
        <div className="absolute right-0 bottom-0 opacity-80">
          <Image
            src={GlobeImg}
            alt="globe"
            quality={100}
            width={1000}
            height={1000}
            className="w-full h-full min-w-[562px]"
          />
        </div>
      </div>
    </section>
  );
}
