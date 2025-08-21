'use client';

import EasySteps from "@/components/EasySteps";
import Flow from "@/components/Flow";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import MarketSpread from "@/components/MarketSpreads";
import Numbers from "@/components/Numbers";
import Testimonials from "@/components/Testimonials";
import WhatIsTrading from "@/components/Trading";
import TradingPlatforms from "@/components/TradingPlatforms";
import DisplayLayout from "@/layout/Displaylayout";
import { useState } from "react";

export default function Home() {
  const [authControl, setAuthControl] = useState<boolean>(false);
  return (
    <div>
      <DisplayLayout authControl={authControl} authControlFunction={setAuthControl}>
        <HeroSection authControl={setAuthControl} />
        <Flow />
        <MarketSpread />
        <TradingPlatforms />
        <WhatIsTrading authControl={setAuthControl} />
        <HowItWorks />
        <EasySteps />
        <Numbers authControl={setAuthControl} />
        <Testimonials />
      </DisplayLayout>
    </div>
  );
}
