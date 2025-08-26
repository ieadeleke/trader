"use client";

import CryptoDashboard from "@/components/dashboard/CryptoDashboard";
import TradePageContent from "@/components/dashboard/MarketsData";
import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";

const TradesPage = () => {
  return (
    <>
      <DashboardLayout pageTitle="Profile Dashboard">
        <>
          <div>
            <div className="w-[85%] pt-16 pb-20 mx-auto font-ibm">
              <TradePageContent />
            </div>
          </div>
        </>
      </DashboardLayout>
    </>
  );
};

export default TradesPage;
