import DisplayLayout from "@/layout/Displaylayout";

export default function AmlKycPolicy() {
  return (
    <DisplayLayout>
      <div>
        <section>
          <div className="bg-black h-[15rem] md:h-[10rem] w-full relative">
            <div className="absolute bottom-20 left-5 md:left-20">
              <h2 className="text-2xl md:text-4xl text-white">
                AML & KYC Policy
              </h2>
            </div>
          </div>
        </section>

        <section className="px-5 md:px-12 py-20 md:py-12 md:w-[60%] mx-auto">
          <h1 className="text-xl font-semibold mb-4">
            ForTrader AML & KYC Policy
          </h1>
          {/* <p className="text-sm leading-loose mb-3">
            Effective Date: August 15, 2025
          </p> */}

          <p className="text-sm leading-loose mb-3">
            This Anti-Money Laundering (AML) and Know Your Customer (KYC) Policy
            outlines the procedures and controls implemented by ForTrader to
            prevent money laundering, terrorist financing, fraud, and other
            illegal financial activities. Compliance with this policy is
            mandatory for all users of the Platform.
          </p>

          <hr className="my-6" />

          <h2 className="text-base font-semibold mb-3">
            1. Customer Identification (KYC)
          </h2>
          <p className="text-sm leading-loose mb-3">
            All customers must undergo identity verification before gaining
            access to trading or financial services. Verification includes:
          </p>
          <ul className="list-disc pl-5 text-sm leading-loose mb-3 space-y-2">
            <li>Full legal name, date of birth, and residential address.</li>
            <li>Government-issued identification (passport, ID card, driver’s license).</li>
            <li>Proof of address (utility bill, bank statement, or official document).</li>
          </ul>

          <hr className="my-6" />

          <h2 className="text-base font-semibold mb-3">
            2. Ongoing Monitoring
          </h2>
          <p className="text-sm leading-loose mb-3">
            ForTrader continuously monitors customer transactions to identify
            unusual or suspicious activity. This may include:
          </p>
          <ul className="list-disc pl-5 text-sm leading-loose mb-3 space-y-2">
            <li>Large or irregular transactions inconsistent with a user’s profile.</li>
            <li>Frequent deposits or withdrawals without clear purpose.</li>
            <li>Transactions involving high-risk jurisdictions.</li>
          </ul>

          <hr className="my-6" />

          <h2 className="text-base font-semibold mb-3">
            3. Reporting Obligations
          </h2>
          <p className="text-sm leading-loose mb-3">
            ForTrader complies with applicable AML regulations by reporting
            suspicious transactions to relevant financial intelligence units and
            regulatory authorities. Users may not be notified if a report is
            filed in connection with their account.
          </p>

          <hr className="my-6" />

          <h2 className="text-base font-semibold mb-3">
            4. Prohibited Activities
          </h2>
          <p className="text-sm leading-loose mb-3">
            Customers are strictly prohibited from using ForTrader for:
          </p>
          <ul className="list-disc pl-5 text-sm leading-loose mb-3 space-y-2">
            <li>Money laundering or terrorism financing.</li>
            <li>Fraudulent transactions or scams.</li>
            <li>Anonymous accounts or fake identities.</li>
            <li>Transactions intended to bypass regulatory requirements.</li>
          </ul>

          <hr className="my-6" />

          <h2 className="text-base font-semibold mb-3">
            5. Risk-Based Approach
          </h2>
          <p className="text-sm leading-loose mb-3">
            ForTrader applies a risk-based approach to customer due diligence.
            Higher-risk users may be required to provide additional information
            or undergo enhanced verification.
          </p>

          <hr className="my-6" />

          <h2 className="text-base font-semibold mb-3">
            6. Data Protection
          </h2>
          <p className="text-sm leading-loose mb-3">
            All personal information collected for AML and KYC purposes is
            securely stored and processed in accordance with our{" "}
            <a href="/privacy-policy" className="text-blue-600 underline">
              Privacy Policy
            </a>
            .
          </p>

          <hr className="my-6" />

          <h2 className="text-base font-semibold mb-3">
            7. Non-Compliance
          </h2>
          <p className="text-sm leading-loose mb-3">
            Failure to comply with AML and KYC requirements may result in
            account suspension, termination, or reporting to regulatory
            authorities.
          </p>

          <hr className="my-6" />

          <h2 className="text-base font-semibold mb-3">8. Contact Us</h2>
          <p className="text-sm leading-loose mb-3">
            If you have questions about this AML & KYC Policy, please contact
            us at:{" "}
            <a
              href="mailto:support@fortrader.com"
              className="text-blue-600 underline"
            >
              support@fortrader.com
            </a>
          </p>
        </section>
      </div>
    </DisplayLayout>
  );
}
