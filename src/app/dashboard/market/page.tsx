"use client";

import CryptoDashboard from "@/components/dashboard/CryptoDashboard";
import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";

const MarketPage = () => {
  return (
    <>
      <DashboardLayout pageTitle="Profile Dashboard">
        <>
          <div>
            <div className="w-[85%] pt-16 pb-20 mx-auto font-ibm">
              <CryptoDashboard hideProfile={true} />
            </div>
          </div>
        </>
      </DashboardLayout>
    </>
  );
};

export default MarketPage;
