import DisplayLayout from "@/layout/Displaylayout";

export default function CookiePolicy() {
  return (
    <DisplayLayout>
      <div>
        <section>
          <div className="bg-black h-[15rem] md:h-[10rem] w-full relative">
            <div className="absolute bottom-20 left-5 md:left-20">
              <h2 className="text-2xl md:text-4xl text-white">Cookie Policy</h2>
            </div>
          </div>
        </section>

        <section className="px-5 md:px-12 py-20 md:py-12 md:w-[60%] mx-auto">
          <h1 className="text-xl font-semibold mb-4">
            ForTrader Cookie Policy
          </h1>
          <p className="text-sm leading-loose mb-3">
            Effective Date: August 15, 2025
          </p>

          <p className="text-sm leading-loose mb-3">
            This Cookie Policy explains how ForTrader uses cookies and similar
            technologies on our platform ("Platform"). By using ForTrader, you
            consent to the use of cookies in accordance with this policy.
          </p>

          <hr className="my-6" />

          <h2 className="text-base font-semibold mb-3">1. What Are Cookies?</h2>
          <p className="text-sm leading-loose mb-3">
            Cookies are small text files stored on your device when you visit a
            website. They help us improve user experience, remember preferences,
            and analyze Platform performance.
          </p>

          <hr className="my-6" />

          <h2 className="text-base font-semibold mb-3">2. Types of Cookies We Use</h2>
          <ul className="list-disc pl-5 text-sm leading-loose mb-3 space-y-2">
            <li>
              <strong>Essential Cookies:</strong> Required for the Platform to
              function properly (e.g., security, account login).
            </li>
            <li>
              <strong>Performance Cookies:</strong> Help us understand how users
              interact with the Platform.
            </li>
            <li>
              <strong>Functional Cookies:</strong> Remember your preferences and
              settings for a personalized experience.
            </li>
            <li>
              <strong>Advertising Cookies:</strong> Used to deliver relevant
              ads and measure their effectiveness.
            </li>
          </ul>

          <hr className="my-6" />

          <h2 className="text-base font-semibold mb-3">3. Third-Party Cookies</h2>
          <p className="text-sm leading-loose mb-3">
            Some cookies are placed by third-party services such as analytics
            providers and advertising partners. ForTrader is not responsible for
            the practices of these third parties.
          </p>

          <hr className="my-6" />

          <h2 className="text-base font-semibold mb-3">4. Managing Cookies</h2>
          <p className="text-sm leading-loose mb-3">
            You can control or disable cookies through your browser settings.
            Please note that disabling cookies may affect the functionality and
            performance of the Platform.
          </p>

          <hr className="my-6" />

          <h2 className="text-base font-semibold mb-3">5. Updates to This Policy</h2>
          <p className="text-sm leading-loose mb-3">
            ForTrader may update this Cookie Policy from time to time. Updates
            will be posted on this page with a revised effective date.
          </p>

          <hr className="my-6" />

          <h2 className="text-base font-semibold mb-3">6. Contact Us</h2>
          <p className="text-sm leading-loose mb-3">
            If you have any questions about this Cookie Policy, please contact
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
