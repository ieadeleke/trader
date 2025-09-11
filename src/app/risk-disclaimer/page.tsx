import DisplayLayout from "@/layout/Displaylayout";

export default function RiskDisclaimer() {
  return (
    <DisplayLayout>
      <div>
        <section>
          <div className="bg-black h-[15rem] md:h-[10rem] w-full relative">
            <div className="absolute bottom-20 left-5 md:left-20">
              <h2 className="text-2xl md:text-4xl text-white">
                Risk Disclaimer
              </h2>
            </div>
          </div>
        </section>

        <section className="px-5 md:px-12 py-20 md:py-12 md:w-[60%] mx-auto">
          <h1 className="text-xl font-semibold mb-4">
            CFDROCKET: Risk, Compliance & Earning Transparency
          </h1>

          <p className="text-sm leading-loose mb-3">
            Welcome to CFDROCKET, a global platform designed to help users earn
            consistently with AI-powered automation and expert human oversight.
            While our advanced technology and financial analysts aim to optimize
            opportunities and reduce risks, all earnings involve uncertainty.
            Users should understand potential risks, regulatory considerations,
            and operational safeguards before participating.
          </p>

          <p className="text-sm leading-loose mb-3">
            Our mission is to create a borderless, digital-first earning
            environment where daily earnings are possible, supported by AI
            models, professional analyst intervention, and safety mechanisms
            such as stop-loss and stop-and-sell systems.
          </p>

          <hr className="my-6" />

          <h2 className="text-base font-semibold mb-3">
            1. Plain-English Summary of Risk
          </h2>
          <p className="text-sm leading-loose mb-3">
            Earning with CFDs, crypto assets, and leveraged products carries
            significant risk. Users may experience losses that exceed initial
            investments, and past results—live or backtested—do not guarantee
            future earnings.
          </p>
          <ul className="list-disc pl-5 text-sm leading-loose mb-3 space-y-2">
            <li>
              <strong>AI + Human Oversight:</strong> Our hybrid model reduces
              risk but cannot eliminate it entirely.
            </li>
            <li>
              <strong>Capital at Risk:</strong> All funds are subject to market
              volatility and leverage effects.
            </li>
            <li>
              <strong>Transparency:</strong> We provide performance metrics and
              risk data to help users make informed decisions.
            </li>
          </ul>

          <hr className="my-6" />

          <h2 className="text-base font-semibold mb-3">
            2. Comprehensive Risk Disclosures
          </h2>

          <h3 className="text-sm font-semibold mb-2">2.1 Market & Strategy Risks</h3>
          <ul className="list-disc pl-5 text-sm leading-loose mb-3 space-y-2">
            <li>Market Volatility: Asset prices can fluctuate rapidly.</li>
            <li>Leverage Risks: Losses and earnings are magnified.</li>
            <li>AI Model Limitations: Models may underperform in extreme markets.</li>
            <li>Black Swan Events: Unpredictable rare events can cause losses.</li>
            <li>
              Liquidity & Slippage: Orders may execute at less favorable prices.
            </li>
          </ul>

          <h3 className="text-sm font-semibold mb-2">
            2.2 Counterparty & Operational Risks
          </h3>
          <ul className="list-disc pl-5 text-sm leading-loose mb-3 space-y-2">
            <li>
              Platform/Partner Risk: Exchanges may face outages or solvency
              issues.
            </li>
            <li>Custody Risk: Wallet breaches or stablecoin failures.</li>
            <li>Technology & Latency: Downtime and connectivity issues.</li>
            <li>API & Access Security: Unauthorized access may cause loss.</li>
          </ul>

          <h3 className="text-sm font-semibold mb-2">
            2.3 Regulatory & Tax Risks
          </h3>
          <ul className="list-disc pl-5 text-sm leading-loose mb-3 space-y-2">
            <li>Changing Laws: Regulations evolve rapidly worldwide.</li>
            <li>
              Jurisdiction Restrictions: Products may not be available
              everywhere.
            </li>
            <li>
              Tax Responsibility: Users must report earnings and pay taxes.
            </li>
          </ul>

          <hr className="my-6" />

          <h2 className="text-base font-semibold mb-3">3. Human + AI Oversight</h2>
          <p className="text-sm leading-loose mb-3">
            CFDROCKET combines advanced AI algorithms with a team of rotating
            professional financial analysts who monitor market conditions 24/7.
          </p>
          <ul className="list-disc pl-5 text-sm leading-loose mb-3 space-y-2">
            <li>Expert Analyst Intervention when AI predictions are uncertain.</li>
            <li>Hybrid Risk Approach improves portfolio stability.</li>
            <li>Adaptive Monitoring prevents prolonged losses.</li>
          </ul>

          <hr className="my-6" />

          <h2 className="text-base font-semibold mb-3">
            4. Autro-Earning Safety Tools
          </h2>
          <ul className="list-disc pl-5 text-sm leading-loose mb-3 space-y-2">
            <li>Stop-Loss Orders close unfavorable positions.</li>
            <li>Take-Profit Orders lock in gains.</li>
            <li>
              Stop-and-Sell Mechanism protects daily earnings from steep drops.
            </li>
            <li>
              Adaptive AI Risk Controls adjust dynamically with volatility.
            </li>
          </ul>

          <hr className="my-6" />

          <h2 className="text-base font-semibold mb-3">
            5. Regulatory Status & Structure
          </h2>
          <ul className="list-disc pl-5 text-sm leading-loose mb-3 space-y-2">
            <li>Incorporated in a tax-neutral jurisdiction.</li>
            <li>Global Operations with no fixed HQ.</li>
            <li>Not licensed in every jurisdiction.</li>
            <li>
              Compliance Partnerships with regulated custodians/liquidity
              providers.
            </li>
            <li>User Eligibility depends on local laws.</li>
          </ul>

          <hr className="my-6" />

          <h2 className="text-base font-semibold mb-3">
            6. Performance Data & Transparency
          </h2>
          <h3 className="text-sm font-semibold mb-2">6.1 Published Metrics</h3>
          <ul className="list-disc pl-5 text-sm leading-loose mb-3 space-y-2">
            <li>Compound Annual Growth Rate (CAGR)</li>
            <li>Maximum drawdown</li>
            <li>Annualized volatility</li>
            <li>Sharpe & Sortino ratios</li>
            <li>Win/loss ratios</li>
            <li>Benchmark comparisons</li>
          </ul>

          <h3 className="text-sm font-semibold mb-2">6.2 Live vs Hypothetical</h3>
          <ul className="list-disc pl-5 text-sm leading-loose mb-3 space-y-2">
            <li>Live Performance: Actual results after fees and slippage.</li>
            <li>Backtesting: Illustrative only; may differ from live results.</li>
          </ul>

          <h3 className="text-sm font-semibold mb-2">6.3 Disclaimers</h3>
          <ul className="list-disc pl-5 text-sm leading-loose mb-3 space-y-2">
            <li>Past performance does not guarantee future results.</li>
            <li>Hypothetical returns may differ significantly.</li>
          </ul>

          <hr className="my-6" />

          <h2 className="text-base font-semibold mb-3">
            7. CFD-Specific Warnings
          </h2>
          <p className="text-sm leading-loose mb-3">
            CFDs are complex financial instruments with high risk. Many users
            lose capital quickly due to leverage. Users should fully understand
            the product and assess whether they can afford potential losses.
          </p>

          <hr className="my-6" />

          <h2 className="text-base font-semibold mb-3">8. Security & Continuity</h2>
          <ul className="list-disc pl-5 text-sm leading-loose mb-3 space-y-2">
            <li>Global Redundancy with no single point of failure.</li>
            <li>Encryption with multi-layer secure key storage.</li>
            <li>24/7 AI + human monitoring across time zones.</li>
            <li>
              Operational Continuity through global infrastructure, no offices.
            </li>
          </ul>

          <hr className="my-6" />

          <h2 className="text-base font-semibold mb-3">9. Final Legal Notice</h2>
          <p className="text-sm leading-loose mb-3">
            CFDROCKET is a global earning technology provider, incorporated in a
            tax-neutral jurisdiction and without a fixed headquarters. By
            combining AI automation, professional analyst oversight, and
            autro-earning risk management tools such as stop-loss and
            stop-and-sell, the platform creates a controlled, risk-aware
            environment for daily earnings.
          </p>
          <p className="text-sm leading-loose mb-3 font-semibold">
            Important: Services may not be available in all regions. Capital is
            at risk. Past performance is not a guarantee of future earnings.
          </p>
        </section>
      </div>
    </DisplayLayout>
  );
}
