import DisplayLayout from "@/layout/Displaylayout";

export default function PrivacyPolicy() {
  return (
    <DisplayLayout>
      <div>
        <section>
          <div className="bg-black h-[15rem] md:h-[10rem] w-full relative">
            <div className="absolute bottom-20 left-5 md:left-20">
              <h2 className="text-2xl md:text-4xl text-white">
                Privacy Policy
              </h2>
            </div>
          </div>
        </section>

        <section className="px-5 md:px-12 py-20 md:py-12 md:w-[60%] mx-auto">
          <h1 className="text-xl font-semibold mb-4">
            Moneday Privacy Policy
          </h1>
          {/* <p className="text-sm leading-loose mb-3">
            Effective Date: August 15, 2025
          </p> */}

          <p className="text-sm leading-loose mb-3">
            At Moneday, we value your privacy and are committed to protecting
            your personal information. This Privacy Policy explains how we
            collect, use, store, and share your data when you access our
            platform, mobile application, or related services (collectively, the
            “Platform”).
          </p>

          <hr className="my-6" />

          <h2 className="text-base font-semibold mb-3">1. Information We Collect</h2>
          <ul className="list-disc pl-5 text-sm leading-loose mb-3 space-y-2">
            <li>
              <strong>Personal Information:</strong> Full name, email, phone
              number, date of birth, government-issued ID, proof of address.
            </li>
            <li>
              <strong>Financial Information:</strong> Bank account details,
              wallet addresses, and payment transaction history.
            </li>
            <li>
              <strong>Technical Data:</strong> IP address, browser type,
              operating system, device identifiers, and cookies.
            </li>
            <li>
              <strong>Usage Data:</strong> Login activity, trading history,
              preferences, and interactions with the Platform.
            </li>
          </ul>

          <hr className="my-6" />

          <h2 className="text-base font-semibold mb-3">2. How We Use Your Information</h2>
          <ul className="list-disc pl-5 text-sm leading-loose mb-3 space-y-2">
            <li>To verify your identity and comply with KYC/AML regulations.</li>
            <li>To process transactions and facilitate forex/crypto trading.</li>
            <li>To improve platform functionality, security, and user experience.</li>
            <li>To communicate important updates, promotions, or service alerts.</li>
            <li>To prevent fraud, money laundering, and unauthorized access.</li>
          </ul>

          <hr className="my-6" />

          <h2 className="text-base font-semibold mb-3">3. Sharing of Information</h2>
          <ul className="list-disc pl-5 text-sm leading-loose mb-3 space-y-2">
            <li>
              We do not sell your personal information to third parties.
            </li>
            <li>
              Data may be shared with trusted service providers (e.g., payment
              processors, identity verification partners) to deliver our
              services.
            </li>
            <li>
              We may disclose information when required by law, regulatory
              authorities, or to protect our legal rights.
            </li>
          </ul>

          <hr className="my-6" />

          <h2 className="text-base font-semibold mb-3">4. Cookies and Tracking</h2>
          <p className="text-sm leading-loose mb-3">
            Moneday uses cookies and similar tracking technologies to enhance
            user experience, analyze traffic, and customize content. You may
            adjust your browser settings to refuse cookies, but some features of
            the Platform may not function properly.
          </p>

          <hr className="my-6" />

          <h2 className="text-base font-semibold mb-3">5. Data Security</h2>
          <ul className="list-disc pl-5 text-sm leading-loose mb-3 space-y-2">
            <li>
              We use industry-standard encryption and security measures to
              protect your personal and financial data.
            </li>
            <li>
              Despite our efforts, no method of transmission or storage is 100%
              secure. Users are responsible for keeping their account credentials
              confidential.
            </li>
          </ul>

          <hr className="my-6" />

          <h2 className="text-base font-semibold mb-3">6. Data Retention</h2>
          <p className="text-sm leading-loose mb-3">
            We retain your information for as long as your account remains
            active, or as required by law for compliance, dispute resolution, or
            enforcement of agreements.
          </p>

          <hr className="my-6" />

          <h2 className="text-base font-semibold mb-3">7. Your Rights</h2>
          <ul className="list-disc pl-5 text-sm leading-loose mb-3 space-y-2">
            <li>Right to access and request a copy of your personal data.</li>
            <li>Right to correct inaccurate or incomplete information.</li>
            <li>
              Right to request deletion of your account and associated data,
              subject to legal obligations.
            </li>
            <li>
              Right to withdraw consent to marketing communications at any time.
            </li>
          </ul>

          <hr className="my-6" />

          <h2 className="text-base font-semibold mb-3">8. International Data Transfers</h2>
          <p className="text-sm leading-loose mb-3">
            As a global platform, Moneday may transfer and store your
            information in different countries. We ensure appropriate safeguards
            are in place to protect your data in compliance with applicable data
            protection laws.
          </p>

          <hr className="my-6" />

          <h2 className="text-base font-semibold mb-3">9. Changes to this Policy</h2>
          <p className="text-sm leading-loose mb-3">
            Moneday may update this Privacy Policy from time to time. Any
            changes will be effective immediately upon posting on our website,
            and continued use of our Platform constitutes acceptance of those
            changes.
          </p>

          <hr className="my-6" />

          <h2 className="text-base font-semibold mb-3">10. Contact Us</h2>
          <p className="text-sm leading-loose mb-3">
            If you have any questions about this Privacy Policy or how your data
            is handled, please contact us at:{" "}
            <span className="font-semibold">support@Moneday.com</span>.
          </p>
        </section>
      </div>
    </DisplayLayout>
  );
}
