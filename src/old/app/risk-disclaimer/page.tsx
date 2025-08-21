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
            ForTrader Risk Disclaimer
          </h1>
          {/* <p className="text-sm leading-loose mb-3">
            Effective Date: August 15, 2025
          </p> */}

          <p className="text-sm leading-loose mb-3">
            Trading foreign currencies, cryptocurrencies, and other digital
            assets involves significant risk and may not be suitable for all
            investors. This Risk Disclaimer explains the potential risks
            associated with using the ForTrader platform. By accessing or using
            ForTrader, you acknowledge and accept these risks.
          </p>

          <hr className="my-6" />

          <h2 className="text-base font-semibold mb-3">1. Market Risk</h2>
          <p className="text-sm leading-loose mb-3">
            The value of currencies and digital assets can fluctuate
            dramatically in a short period of time. Market prices are affected
            by supply, demand, political events, regulatory changes, and global
            economic conditions. You may experience partial or total loss of
            your investment.
          </p>

          <hr className="my-6" />

          <h2 className="text-base font-semibold mb-3">2. Leverage Risk</h2>
          <p className="text-sm leading-loose mb-3">
            Trading with leverage can amplify both gains and losses. A small
            price movement may result in substantial losses that exceed your
            initial investment. You should only use leverage if you fully
            understand the risks involved.
          </p>

          <hr className="my-6" />

          <h2 className="text-base font-semibold mb-3">3. Liquidity Risk</h2>
          <p className="text-sm leading-loose mb-3">
            Certain currencies or digital assets may have limited liquidity,
            making it difficult to buy or sell at your desired price. Market
            conditions can prevent you from closing a trade when you want to.
          </p>

          <hr className="my-6" />

          <h2 className="text-base font-semibold mb-3">4. Regulatory Risk</h2>
          <p className="text-sm leading-loose mb-3">
            Forex and cryptocurrency markets are subject to varying regulations
            across jurisdictions. New laws, restrictions, or enforcement actions
            may negatively impact your ability to trade or access your funds.
          </p>

          <hr className="my-6" />

          <h2 className="text-base font-semibold mb-3">5. Technology Risk</h2>
          <ul className="list-disc pl-5 text-sm leading-loose mb-3 space-y-2">
            <li>Platform outages, hacks, or system failures may occur.</li>
            <li>
              Internet connectivity issues may prevent access to your account.
            </li>
            <li>
              ForTrader implements strict security measures, but no online
              system is immune to cyberattacks.
            </li>
          </ul>

          <hr className="my-6" />

          <h2 className="text-base font-semibold mb-3">6. No Financial Advice</h2>
          <p className="text-sm leading-loose mb-3">
            Information provided on ForTrader, including charts, prices, and
            news updates, is for informational purposes only. It should not be
            considered financial, investment, or legal advice. You are solely
            responsible for your trading decisions.
          </p>

          <hr className="my-6" />

          <h2 className="text-base font-semibold mb-3">7. Limitation of Liability</h2>
          <p className="text-sm leading-loose mb-3">
            ForTrader is not responsible for any direct, indirect, or
            consequential losses arising from your use of the Platform. You
            agree that your use of ForTrader is entirely at your own risk and
            that all trading decisions are made independently by you.
          </p>

          <hr className="my-6" />

          <h2 className="text-base font-semibold mb-3">8. User Responsibility</h2>
          <p className="text-sm leading-loose mb-3">
            Before trading, you should carefully consider your financial
            objectives, level of experience, and risk tolerance. Do not trade
            with funds you cannot afford to lose.
          </p>
        </section>
      </div>
    </DisplayLayout>
  );
}
