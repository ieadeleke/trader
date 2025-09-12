'use client';

import EasySteps from "@/components/EasySteps";
import Flow from "@/components/Flow";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import MarketSpread from "@/components/MarketSpreads";
import NewEasySteps from "@/components/NewEasySteps";
import NewHeroSection from "@/components/NewHeroSection";
import Numbers from "@/components/Numbers";
import PoweredByAI from "@/components/PoweredByAI";
import Testimonials from "@/components/Testimonials";
import TradingPlatforms from "@/components/TradingPlatforms";
import DisplayLayout from "@/layout/Displaylayout";
import { useState } from "react";



export default function Home() {
  const [authControl, setAuthControl] = useState<boolean>(false);
  return (
    <div>
      <DisplayLayout authControl={authControl} authControlFunction={setAuthControl}>
        <NewHeroSection authControl={setAuthControl} />
        <Flow />
        <MarketSpread />
        <TradingPlatforms />
        <PoweredByAI />
        {/* <WhatIsTrading authControl={setAuthControl} /> */}
        <HowItWorks />
        <NewEasySteps />
        <Numbers authControl={setAuthControl} />
        <Testimonials />
      </DisplayLayout>
    </div>
  );
}
