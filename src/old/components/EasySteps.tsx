import Image from "next/image";

import FlowImg from "@/assets/man.png";

export default function EasySteps() {
  return (
    <section id="howitworks">
      <div className="flex flex-col md:grid grid-cols-2 items-center gap-10 md:gap-26 px-5 md:px-32 mt-28">
        <div>
          <Image
            src={FlowImg}
            alt="how it works"
            quality={100}
            className="w-full h-auto max-w-[630px] mx-auto"
          />
        </div>
        <div>
          <div>
            <p className="md:pl-6 text-primary mb-4 md:mb-6 text-xs md:text-sm uppercase font-ubuntu font-medium">
              Easy Steps
            </p>
            <h2 className="text-2xl md:text-5xl mb-8 md:mb-10 font-bold text-white font-ubuntu">
              How it Works
            </h2>
            <div className="mt-5 flex flex-col gap-10">
              <div className="gap-4 flex items-start">
                <div>
                  <div className="size-[26px] md:size-[36px] rounded-[4px] md:rounded-[10px] bg-white flex items-center justify-center">
                    <h4 className="text-sm md:text-base font-bold text-black">
                      1
                    </h4>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl mb-1 font-medium font-ubuntu">
                    Sign up and Deposit
                  </h3>
                  <p className="text-sm md:text-base leading-loose md:leading-relaxed text-white max-w-[508px]">
                    Create your free Moneday account, complete verification, and
                    fund your wallet with a secure deposit.
                  </p>
                </div>
              </div>
              <div className="gap-4 flex items-start">
                <div>
                  <div className="size-[26px] md:size-[36px] rounded-[4px] md:rounded-[10px] bg-white flex items-center justify-center">
                    <h4 className="text-sm md:text-base font-bold text-black">
                      2
                    </h4>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl mb-1 font-medium font-ubuntu">
                    Automated Trading Starts
                  </h3>
                  <p className="text-sm md:text-base leading-loose md:leading-relaxed text-white max-w-[508px]">
                    Our smart algorithms trade the forex and crypto markets on
                    your behalf — 24/7 — scanning for profitable opportunities.
                  </p>
                </div>
              </div>
              <div className="gap-4 flex items-start">
                <div>
                  <div className="size-[26px] md:size-[36px] rounded-[4px] md:rounded-[10px] bg-white flex items-center justify-center">
                    <h4 className="text-sm md:text-base font-bold text-black">
                      3
                    </h4>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl mb-1 font-medium font-ubuntu">
                    Earn Daily & Withdraw Anytime
                  </h3>
                  <p className="text-sm md:text-base leading-loose md:leading-relaxed text-white max-w-[508px]">
                    Profits are added to your account every single day. Withdraw
                    instantly or let your balance grow — the choice is yours.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
