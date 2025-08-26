"use client";

import CryptoDashboard from "@/components/dashboard/CryptoDashboard";
import LoansPageContent from "@/components/dashboard/LoanContent";
import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";

const LoansPage = () => {
  return (
    <>
      <DashboardLayout pageTitle="Profile Dashboard">
        <>
          <div>
            <div className="w-[85%] pt-16 pb-20 mx-auto font-ibm">
              <LoansPageContent />
            </div>
          </div>
        </>
      </DashboardLayout>
    </>
  );
};

export default LoansPage;
