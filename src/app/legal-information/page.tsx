import DisplayLayout from "@/layout/Displaylayout";

export default function TermsAndConditions() {
  return (
    <DisplayLayout>
      <div>
        <section>
          <div className="bg-black h-[15rem] md:h-[10rem] w-full relative">
            <div className="absolute bottom-20 left-5 md:left-20">
              <h2 className="text-2xl md:text-4xl text-white">
                Legal Information
              </h2>
            </div>
          </div>
        </section>

        <section className="px-5 md:px-12 py-20 md:py-12 md:w-[60%] mx-auto">
          <h1 className="text-xl font-semibold mb-4">
            ForTrader Terms and Conditions
          </h1>
          <p className="text-sm leading-loose mb-3">
            Effective Date: August 15, 2025
          </p>

          <p className="text-sm leading-loose mb-3">
            Welcome to ForTrader. These Terms and Conditions (“Terms”) govern
            your access to and use of the ForTrader website, mobile application,
            and related services (collectively, the “Platform”). By creating an
            account or using our services, you agree to comply with these Terms.
            Please read them carefully.
          </p>

          <hr className="my-6" />

          <h2 className="text-base font-semibold mb-3">
            1. Company Information
          </h2>
          <p className="text-sm leading-loose mb-3">
            ForTrader is an online forex and digital asset exchange platform
            that allows users to trade foreign currencies, cryptocurrencies, and
            related financial products. ForTrader operates globally but may
            restrict services in jurisdictions where such activities are
            prohibited by law.
          </p>

          <hr className="my-6" />

          <h2 className="text-base font-semibold mb-3">
            2. Account Registration & Eligibility
          </h2>
          <ul className="list-disc pl-5 text-sm leading-loose mb-3 space-y-2">
            <li>Users must be at least 18 years old to create an account.</li>
            <li>
              Users must provide accurate and complete information during
              registration and verify their identity in compliance with KYC/AML
              regulations.
            </li>
            <li>
              ForTrader reserves the right to suspend or terminate accounts that
              provide false information or engage in prohibited activities.
            </li>
          </ul>

          <hr className="my-6" />

          <h2 className="text-base font-semibold mb-3">
            3. Trading & Transactions
          </h2>
          <ul className="list-disc pl-5 text-sm leading-loose mb-3 space-y-2">
            <li>
              Trading on ForTrader involves significant risks, including market
              volatility and potential loss of capital. Users trade at their own
              risk.
            </li>
            <li>
              Prices of assets are determined by market conditions and may
              change rapidly without notice.
            </li>
            <li>
              All completed transactions are final and cannot be reversed once
              executed.
            </li>
          </ul>

          <hr className="my-6" />

          <h2 className="text-base font-semibold mb-3">4. Fees and Payments</h2>
          <ul className="list-disc pl-5 text-sm leading-loose mb-3 space-y-2">
            <li>
              ForTrader charges transaction fees, withdrawal fees, and other
              applicable service fees as stated on our official website.
            </li>
            <li>Fees may be updated from time to time without prior notice.</li>
            <li>
              Users are responsible for all applicable taxes related to their
              transactions.
            </li>
          </ul>

          <hr className="my-6" />

          <h2 className="text-base font-semibold mb-3">
            5. Prohibited Activities
          </h2>
          <ul className="list-disc pl-5 text-sm leading-loose mb-3 space-y-2">
            <li>Money laundering, fraud, or terrorist financing.</li>
            <li>
              Use of bots, automated systems, or market manipulation techniques.
            </li>
            <li>
              Attempting to hack, disrupt, or gain unauthorized access to the
              Platform.
            </li>
          </ul>

          <hr className="my-6" />

          <h2 className="text-base font-semibold mb-3">
            6. Risks and Disclaimers
          </h2>
          <ul className="list-disc pl-5 text-sm leading-loose mb-3 space-y-2">
            <li>
              Trading forex and cryptocurrencies carries a high level of risk
              and may not be suitable for all investors.
            </li>
            <li>
              ForTrader does not guarantee profits or the future value of any
              asset traded on the Platform.
            </li>
            <li>
              Users are solely responsible for their investment decisions.
            </li>
          </ul>

          <hr className="my-6" />

          <h2 className="text-base font-semibold mb-3">
            7. Limitation of Liability
          </h2>
          <ul className="list-disc pl-5 text-sm leading-loose mb-3 space-y-2">
            <li>
              ForTrader is not liable for indirect, incidental, or consequential
              damages arising from use of the Platform.
            </li>
            <li>
              Our liability is limited to the amount of fees paid by the user
              for the services in question.
            </li>
            <li>
              We are not responsible for losses due to technical issues, market
              fluctuations, or third-party actions.
            </li>
          </ul>

          <hr className="my-6" />

          <h2 className="text-base font-semibold mb-3">
            8. Compliance & Regulations
          </h2>
          <ul className="list-disc pl-5 text-sm leading-loose mb-3 space-y-2">
            <li>
              Users must comply with all applicable laws, including anti-money
              laundering (AML) and counter-terrorist financing (CTF)
              regulations.
            </li>
            <li>
              ForTrader may report suspicious activities to regulatory
              authorities without prior notice to the user.
            </li>
          </ul>

          <hr className="my-6" />

          <h2 className="text-base font-semibold mb-3">9. Governing Law</h2>
          <p className="text-sm leading-loose mb-3">
            These Terms are governed by and construed under the laws of Ukraine.
            Any disputes arising shall be resolved exclusively in the courts of
            Ukraine.
          </p>
        </section>
      </div>
    </DisplayLayout>
  );
}
