"use client";
import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import TradeTerminal from "@/components/dashboard/TradeTerminal";

const TradePage = () => {
  return (
    <DashboardLayout pageTitle="Trade Terminal">
      <div className="w-[95%] md:w-[85%] pt-16 pb-20 mx-auto font-ibm">
        <TradeTerminal />
      </div>
    </DashboardLayout>
  );
};

export default TradePage;

