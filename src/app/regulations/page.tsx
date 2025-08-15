import DisplayLayout from "@/layout/Displaylayout";

export default function Regulations() {
  return (
    <DisplayLayout>
      <div>
        <section>
          <div className="bg-black h-[15rem] md:h-[10rem] w-full relative">
            <div className="absolute bottom-20 left-5 md:left-20">
              <h2 className="text-2xl md:text-4xl text-white">
                Regulations
              </h2>
            </div>
          </div>
        </section>

        <section className="px-5 md:px-12 py-20 md:py-12 md:w-[60%] mx-auto">
          <h1 className="text-xl font-semibold mb-4">
            ForTrader Regulations & Compliance
          </h1>
          <p className="text-sm leading-loose mb-3">
            Effective Date: August 15, 2025
          </p>

          <p className="text-sm leading-loose mb-3">
            ForTrader is committed to operating transparently and in compliance
            with global financial standards. This Regulations page outlines the
            policies and regulatory frameworks that govern the use of our
            platform. By using ForTrader, you agree to abide by these rules and
            applicable laws in your jurisdiction.
          </p>

          <hr className="my-6" />

          <h2 className="text-base font-semibold mb-3">1. Licensing & Oversight</h2>
          <p className="text-sm leading-loose mb-3">
            ForTrader is operated by [Insert Registered Company Name], a legally
            registered entity in Ukraine. The company complies
            with financial service regulations applicable in its country of
            registration and any international frameworks relevant to digital
            asset trading.
          </p>

          <hr className="my-6" />

          <h2 className="text-base font-semibold mb-3">2. Anti-Money Laundering (AML)</h2>
          <ul className="list-disc pl-5 text-sm leading-loose mb-3 space-y-2">
            <li>
              ForTrader strictly adheres to AML regulations to prevent illicit
              financial activities.
            </li>
            <li>
              Users are required to complete Know Your Customer (KYC) procedures
              before accessing trading features.
            </li>
            <li>
              Suspicious activities are monitored and reported to relevant
              authorities when necessary.
            </li>
          </ul>

          <hr className="my-6" />

          <h2 className="text-base font-semibold mb-3">
            3. Know Your Customer (KYC)
          </h2>
          <ul className="list-disc pl-5 text-sm leading-loose mb-3 space-y-2">
            <li>
              Users must submit valid identification documents (passport, ID
              card, proof of address) during registration.
            </li>
            <li>
              ForTrader reserves the right to request additional documentation
              for verification at any time.
            </li>
            <li>
              Accounts with incomplete or unverifiable information may be
              suspended or terminated.
            </li>
          </ul>

          <hr className="my-6" />

          <h2 className="text-base font-semibold mb-3">
            4. Trading Regulations
          </h2>
          <ul className="list-disc pl-5 text-sm leading-loose mb-3 space-y-2">
            <li>
              Users must comply with financial trading laws in their country of
              residence before using ForTrader.
            </li>
            <li>
              Certain jurisdictions may restrict forex or cryptocurrency
              trading; users are responsible for ensuring local compliance.
            </li>
            <li>
              Market manipulation, wash trading, and other fraudulent
              activities are strictly prohibited.
            </li>
          </ul>

          <hr className="my-6" />

          <h2 className="text-base font-semibold mb-3">
            5. Data Protection & Privacy
          </h2>
          <p className="text-sm leading-loose mb-3">
            ForTrader complies with applicable data protection laws, including
            GDPR where relevant. Personal data is collected, processed, and
            stored securely in line with our{" "}
            <a href="/privacy-policy" className="text-blue-500 underline">
              Privacy Policy
            </a>
            .
          </p>

          <hr className="my-6" />

          <h2 className="text-base font-semibold mb-3">6. Risk Compliance</h2>
          <ul className="list-disc pl-5 text-sm leading-loose mb-3 space-y-2">
            <li>
              Trading forex and digital assets involves high risk. Users may
              lose all or part of their invested capital.
            </li>
            <li>
              ForTrader provides educational resources and risk warnings but
              does not guarantee profits.
            </li>
            <li>
              Users should only trade funds they can afford to lose.
            </li>
          </ul>

          <hr className="my-6" />

          <h2 className="text-base font-semibold mb-3">7. Governing Law</h2>
          <p className="text-sm leading-loose mb-3">
            These regulations are governed by the laws of Ukraine.
            Any disputes arising from use of the platform shall be resolved in
            the courts of Ukraine.
          </p>
        </section>
      </div>
    </DisplayLayout>
  );
}
