import Image from "next/image";

import FlowImg from "@/assets/man.png";

export default function EasySteps() {
  return (
    <section id="howitworks">
      <div className="grid grid-cols-2 items-center gap-26 px-32 mt-28">
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
            <p className="pl-6 text-primary mb-6 text-sm uppercase font-ubuntu font-medium">
              Easy Steps
            </p>
            <h2 className="text-5xl mb-10 font-bold text-white font-ubuntu">
              How it Works
            </h2>
            <div className="mt-5 flex flex-col gap-10">
              <div className="gap-4 flex items-start">
                <div>
                  <div className="size-[36px] rounded-[10px] bg-white flex items-center justify-center">
                    <h4 className="text-base font-bold text-black">1</h4>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl mb-1 font-medium font-ubuntu">
                    Sign up, It&apos;s Free!
                  </h3>
                  <p className="text-base leading-loose md:leading-loose text-white max-w-[508px]">
                    Our team will set up your account and help you build job to
                    easy-to-use web dashboard.
                  </p>
                </div>
              </div>
              <div className="gap-4 flex items-start">
                <div>
                  <div className="size-[36px] rounded-[10px] bg-white flex items-center justify-center">
                    <h4 className="text-base font-bold text-black">2</h4>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl mb-1 font-medium font-ubuntu">
                    Find best Deals and Invest
                  </h3>
                  <p className="text-base leading-loose md:leading-loose text-white max-w-[508px]">
                    Create and Trade anywhere from 1-100% openings with just a
                    few clicks. customize your own.
                  </p>
                </div>
              </div>
              <div className="gap-4 flex items-start">
                <div>
                  <div className="size-[36px] rounded-[10px] bg-white flex items-center justify-center">
                    <h4 className="text-base font-bold text-black">3</h4>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl mb-1 font-medium font-ubuntu">
                    Get your profit back
                  </h3>
                  <p className="text-base leading-loose md:leading-loose text-white max-w-[508px]">
                    View market, reviews, and rosters before forex arrive on the
                    site, and post reviews and pay, effortlessly.
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
