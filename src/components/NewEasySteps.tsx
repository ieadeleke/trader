import Image from "next/image";

// import FlowImg from "@/assets/man.png";
import FlowImg from "@/assets/howitworks.jpeg";

export default function NewEasySteps() {
  return (
    <section id="howitworks">
      <div className="flex flex-col md:grid grid-cols-2 items-center gap-10 md:gap-26 px-5 md:px-32 mt-28">
        <div>
          <Image
            src={FlowImg}
            alt="how it works"
            quality={100}
            className="w-full h-auto md:h-[550px] object-center object-cover mx-auto"
          />
        </div>
        <div>
          <div>
            <p className="md:pl-6 text-primary mb-4 md:mb-6 text-xs md:text-sm uppercase font-ubuntu font-medium">
              Easy Steps
            </p>
            <h2 className="text-2xl md:text-5xl mb-8 md:mb-10 font-bold text-primary font-ubuntu">
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
                    Sign Up & Fund Your Account
                  </h3>
                  <p className="text-sm md:text-base leading-loose md:leading-relaxed text-white max-w-[508px]">
                    Open an account digitally and deposit funds safely via our secure system.
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
                    Activate AI + Analyst Supervision
                  </h3>
                  <p className="text-sm md:text-base leading-loose md:leading-relaxed text-white max-w-[508px]">
                    Enable automated earning tools powered by AI, backed by human analyst oversight.
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
                    Watch Daily Earnings Grow
                  </h3>
                  <p className="text-sm md:text-base leading-loose md:leading-relaxed text-white max-w-[508px]">
                    Track your progress in real-time while our ecosystem manages risk and optimizes opportunities.
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
