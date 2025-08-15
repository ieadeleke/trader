import DisplayLayout from "@/layout/Displaylayout";

export default function TermsOfUse() {
  return (
    <DisplayLayout>
      <div>
        <section>
          <div className="bg-black h-[15rem] md:h-[10rem] w-full relative">
            <div className="absolute bottom-20 left-5 md:left-20">
              <h2 className="text-2xl md:text-4xl text-white">Terms of Use</h2>
            </div>
          </div>
        </section>

        <section className="px-5 md:px-12 py-20 md:py-12 md:w-[60%] mx-auto">
          <h1 className="text-xl font-semibold mb-4">
            ForTrader Terms of Use
          </h1>
          <p className="text-sm leading-loose mb-3">
            Effective Date: August 15, 2025
          </p>

          <p className="text-sm leading-loose mb-3">
            These Terms of Use ("Terms") govern your access to and use of the
            ForTrader platform ("Platform"). By using ForTrader, you agree to be
            bound by these Terms. If you do not agree, please discontinue use of
            the Platform.
          </p>

          <hr className="my-6" />

          <h2 className="text-base font-semibold mb-3">1. Eligibility</h2>
          <p className="text-sm leading-loose mb-3">
            You must be at least 18 years old (or the legal age of majority in
            your jurisdiction) to use ForTrader. By accessing the Platform, you
            confirm that you meet this requirement.
          </p>

          <hr className="my-6" />

          <h2 className="text-base font-semibold mb-3">2. Account Registration</h2>
          <ul className="list-disc pl-5 text-sm leading-loose mb-3 space-y-2">
            <li>You must provide accurate and complete information.</li>
            <li>You are responsible for maintaining the security of your account and password.</li>
            <li>You must notify ForTrader immediately of any unauthorized access.</li>
          </ul>

          <hr className="my-6" />

          <h2 className="text-base font-semibold mb-3">3. Acceptable Use</h2>
          <p className="text-sm leading-loose mb-3">
            You agree not to use ForTrader for any unlawful purpose, including
            but not limited to:
          </p>
          <ul className="list-disc pl-5 text-sm leading-loose mb-3 space-y-2">
            <li>Money laundering or fraudulent activities.</li>
            <li>Unauthorized access, hacking, or disruption of the Platform.</li>
            <li>Violating applicable financial or securities regulations.</li>
          </ul>

          <hr className="my-6" />

          <h2 className="text-base font-semibold mb-3">4. Risk Acknowledgment</h2>
          <p className="text-sm leading-loose mb-3">
            Trading forex, cryptocurrencies, and digital assets carries
            significant risk. You acknowledge that you may lose part or all of
            your funds and that ForTrader is not liable for such losses. Please
            read our{" "}
            <a href="/risk-disclaimer" className="text-blue-600 underline">
              Risk Disclaimer
            </a>{" "}
            for details.
          </p>

          <hr className="my-6" />

          <h2 className="text-base font-semibold mb-3">5. Intellectual Property</h2>
          <p className="text-sm leading-loose mb-3">
            All content, trademarks, logos, software, and intellectual property
            on the Platform are owned by ForTrader or its licensors. You may not
            copy, distribute, modify, or exploit them without prior written
            consent.
          </p>

          <hr className="my-6" />

          <h2 className="text-base font-semibold mb-3">6. Third-Party Services</h2>
          <p className="text-sm leading-loose mb-3">
            ForTrader may integrate with third-party tools or services. We are
            not responsible for the actions, policies, or performance of such
            third parties.
          </p>

          <hr className="my-6" />

          <h2 className="text-base font-semibold mb-3">7. Limitation of Liability</h2>
          <p className="text-sm leading-loose mb-3">
            To the fullest extent permitted by law, ForTrader is not liable for
            any damages, losses, or expenses arising from your use of the
            Platform, including but not limited to lost profits, trading losses,
            or system failures.
          </p>

          <hr className="my-6" />

          <h2 className="text-base font-semibold mb-3">8. Termination</h2>
          <p className="text-sm leading-loose mb-3">
            ForTrader reserves the right to suspend or terminate your account at
            any time, without notice, if you violate these Terms or applicable
            laws.
          </p>

          <hr className="my-6" />

          <h2 className="text-base font-semibold mb-3">9. Amendments</h2>
          <p className="text-sm leading-loose mb-3">
            ForTrader may update these Terms at any time. Continued use of the
            Platform after changes are published constitutes acceptance of the
            revised Terms.
          </p>

          <hr className="my-6" />

          <h2 className="text-base font-semibold mb-3">10. Governing Law</h2>
          <p className="text-sm leading-loose mb-3">
            These Terms are governed by the laws of your country of residence,
            unless otherwise required by applicable regulations.
          </p>

          <hr className="my-6" />

          <h2 className="text-base font-semibold mb-3">11. Contact Us</h2>
          <p className="text-sm leading-loose mb-3">
            If you have any questions about these Terms, please contact us at:{" "}
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
