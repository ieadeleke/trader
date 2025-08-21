import DisplayLayout from "@/layout/Displaylayout";

export default function WithdrawalPolicy() {
  return (
    <DisplayLayout>
      <div>
        <section>
          <div className="bg-black h-[15rem] md:h-[10rem] w-full relative">
            <div className="absolute bottom-20 left-5 md:left-20">
              <h2 className="text-2xl md:text-4xl text-white">Withdrawal Policy</h2>
            </div>
          </div>
        </section>

        <section className="px-5 md:px-12 py-20 md:py-12 md:w-[60%] mx-auto">
          <h1 className="text-xl font-semibold mb-4">
            ForTrader Withdrawal Policy
          </h1>
          {/* <p className="text-sm leading-loose mb-3">
            Effective Date: August 15, 2025
          </p> */}

          <p className="text-sm leading-loose mb-3">
            This Withdrawal Policy outlines the terms and conditions under which
            clients may request and receive withdrawals from their ForTrader
            account. By using our services, you agree to the following
            provisions.
          </p>

          <hr className="my-6" />

          <h2 className="text-base font-semibold mb-3">1. General Conditions</h2>
          <ul className="list-disc pl-5 text-sm leading-loose mb-3 space-y-2">
            <li>
              Withdrawals are only processed to accounts in the client’s own
              name. Third-party withdrawals are not permitted.
            </li>
            <li>
              Withdrawals can only be made to the original funding source
              (bank account, credit card, e-wallet, or crypto wallet).
            </li>
            <li>
              ForTrader reserves the right to request additional verification
              before processing a withdrawal.
            </li>
          </ul>

          <hr className="my-6" />

          <h2 className="text-base font-semibold mb-3">2. Processing Time</h2>
          <p className="text-sm leading-loose mb-3">
            Withdrawal requests are generally processed within{" "}
            <strong>1–5 business days</strong>, depending on the payment method
            and completion of KYC verification. External banking delays may
            affect processing times.
          </p>

          <hr className="my-6" />

          <h2 className="text-base font-semibold mb-3">3. Fees</h2>
          <p className="text-sm leading-loose mb-3">
            ForTrader does not charge internal fees for withdrawals. However,
            clients are responsible for any external banking, currency exchange,
            or third-party transaction fees.
          </p>

          <hr className="my-6" />

          <h2 className="text-base font-semibold mb-3">4. Verification Requirements</h2>
          <p className="text-sm leading-loose mb-3">
            In accordance with our AML & KYC Policy, clients must provide
            identity verification documents (government ID, proof of address,
            and payment method proof) before a withdrawal can be approved.
          </p>

          <hr className="my-6" />

          <h2 className="text-base font-semibold mb-3">5. Restrictions</h2>
          <ul className="list-disc pl-5 text-sm leading-loose mb-3 space-y-2">
            <li>
              Withdrawals may be limited if the client has open trading
              positions or unsettled transactions.
            </li>
            <li>
              ForTrader reserves the right to suspend or delay withdrawals if
              suspicious or fraudulent activity is detected.
            </li>
            <li>
              Minimum and maximum withdrawal amounts may apply depending on the
              payment method.
            </li>
          </ul>

          <hr className="my-6" />

          <h2 className="text-base font-semibold mb-3">6. Currency Conversion</h2>
          <p className="text-sm leading-loose mb-3">
            If your withdrawal is requested in a different currency from your
            account balance, currency conversion will be applied at prevailing
            exchange rates. Conversion charges may apply.
          </p>

          <hr className="my-6" />

          <h2 className="text-base font-semibold mb-3">7. Contact Us</h2>
          <p className="text-sm leading-loose mb-3">
            For any withdrawal-related questions, please contact us at:{" "}
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
