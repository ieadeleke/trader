import Image from "next/image";

import FlowImg from "@/assets/flow.png";
import RowImg from "@/assets/row.png";

export default function Flow() {
  return (
    <section id="aboutus">
      <div className="flex flex-col md:grid grid-cols-2 items-cente gap-10 px-5 md:px-28 mt-28">
        <div className="hidden md:block">
          <Image
            src={FlowImg}
            alt="how it works"
            quality={100}
            className="w-auto h-full mx-auto"
          />
        </div>
        <div>
          <h3 className="text-2xl md:text-3xl mb-3 md:mb-5 font-ubuntu font-bold">Who We Are</h3>
          <p className="text-sm md:text-base leading-loose opacity-80 mb-4 md:mb-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
            quaerat magnam vitae, iste facere consequatur nam enim ex rem, odit
            natus, mollitia error porro sed assumenda? Ullam consequatur numquam
            esse! Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Architecto quaerat magnam vitae, iste facere consequatur nam enim ex
            rem, odit natus, mollitia error porro sed assumenda?
          </p>
          <p className="text-sm md:text-base leading-loose opacity-80 mb-5 md:mb-10">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
            quaerat magnam vitae, iste facere consequatur nam enim ex rem, odit
            natus, mollitia error porro sed assumenda? Ullam consequatur numquam
            esse!
          </p>
          <button className="bg-primary text-sm py-4 px-6 md:px-10 rounded-[8px]">
            Reach out to us
          </button>
          {/* <div className="flow-bg pt-6 pb-10 px-8 mb-7 rounded-[10px] gap-4 flex items-start">
            <div>
              <div className="size-[36px] rounded-[10px] flow-bg flex items-center justify-center">
                <h4 className="text-sm md:text-base font-bold">1</h4>
              </div>
            </div>
            <div>
              <h3 className="text-xl mb-2 font-medium font-ubuntu">
                Sign up, It&apos;s Free!
              </h3>
              <p className="text-lg leading-relaxed text-white opacity-80 max-w-[508px]">
                Our team will set up your account and help you build job to
                easy-to-use web dashboard.
              </p>
            </div>
          </div>
          <div className="flow-bg pt-6 pb-10 px-8 mb-7 rounded-[10px] gap-4 flex items-start">
            <div>
              <div className="size-[36px] rounded-[10px] flow-bg flex items-center justify-center">
                <h4 className="text-sm md:text-base font-bold">2</h4>
              </div>
            </div>
            <div>
              <h3 className="text-xl mb-2 font-medium font-ubuntu">
                Find best Deals and Invest
              </h3>
              <p className="text-lg leading-relaxed text-white opacity-80 max-w-[508px]">
                Create and Trade anywhere from 1-100% openings with just a few
                clicks. customize your own.
              </p>
            </div>
          </div>
          <div className="flow-bg pt-6 pb-10 px-8 rounded-[10px] gap-4 flex items-start">
            <div>
              <div className="size-[36px] rounded-[10px] flow-bg flex items-center justify-center">
                <h4 className="text-sm md:text-base font-bold">3</h4>
              </div>
            </div>
            <div>
              <h3 className="text-xl mb-2 font-medium font-ubuntu">
                Get your profit back
              </h3>
              <p className="text-lg leading-relaxed text-white opacity-80 max-w-[508px]">
                View market, reviews, and rosters before forex arrive on the
                site, and post reviews and pay, effortlessly.
              </p>
            </div>
          </div> */}
        </div>
      </div>
      <div className="hidden md:block mt-28">
        <Image
          src={RowImg}
          alt="All products"
          quality={100}
          width={1000}
          height={1000}
          className="w-full h-full"
        />
      </div>
    </section>
  );
}
