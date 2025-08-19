"use client";
import Image from "next/image";

import FlowImg from "@/assets/flow.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function Testimonials() {
  const responsiveness = {
    0: {
      slidesPerView: 1.1,
      spaceBetween: 20,
    },
    640: {
      // tablets and up
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1024: {
      // desktop and up
      slidesPerView: 3,
      spaceBetween: 30,
    },
    1440: {
      // large screens
      slidesPerView: 3.4,
      spaceBetween: 40,
    },
  };
  return (
    <section className="mt-28" id="testimonials">
      <div className="mb-6 md:mb-12 px-5 md:px-0">
        <div className="bg-[#34251F] border border-solid border-primary py-2 px-4 w-max mx-auto rounded-full mb-4">
          <h4 className="uppercase font-bold text-primary text-xs font-ibm">
            Testimonials
          </h4>
        </div>
        <h3 className="text-3xl md:text-4xl text-center md:mb-3 font-ubuntu font-semibold md:font-bold leading-[1.4]">
          What Our Clients are Saying
        </h3>
      </div>
      <div>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          // spaceBetween={20}
          // navigation
          breakpoints={responsiveness}
          // pagination={{ clickable: true }}
          // scrollbar={{ draggable: true }}
          // onSlideChange={() => console.log("Slide changed")}
          // onSwiper={(swiper) => console.log(swiper)}
        >
          <SwiperSlide>
            <div className="flow-bg rounded-[12px]">
              <div className="pt-6 md:pt-10 pb-3 pl-4 md:pl-8 py-4 md:pr-8">
                <h4 className="text-sm text-primary uppercase font-medium mb-2">
                  18th April, 2025
                </h4>
                <p className="max-w-[380px] text-sm text-white opacity-80 leading-loose">
                  Moneday has completely changed the way I trade online.
                  Withdrawals are fast, reliable, and stress-free every day.
                </p>
              </div>
              <div className="h-[.4px] w-full bg-white opacity-20"></div>
              <div className="px-4 md:px-8 pt-4 pb-6 flex gap-4 items-center">
                <div className="size-12 rounded-full bg-gray-500"></div>
                <div>
                  <h4 className="text-sm font-medium text-white">
                    Sarah Johnson
                  </h4>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="flow-bg rounded-[12px]">
              <div className="pt-6 md:pt-10 pb-3 pl-4 md:pl-8 py-4 md:pr-8">
                <h4 className="text-sm text-primary uppercase font-medium mb-2">
                  7th November, 2024
                </h4>
                <p className="max-w-[380px] text-sm text-white opacity-80 leading-loose">
                  I finally get to enjoy my profits without long waiting times.
                  Trading feels simple, transparent, and rewarding with them.
                </p>
              </div>
              <div className="h-[.4px] w-full bg-white opacity-20"></div>
              <div className="px-4 md:px-8 pt-4 pb-6 flex gap-4 items-center">
                <div className="size-12 rounded-full bg-gray-500"></div>
                <div>
                  <h4 className="text-sm font-medium text-white">
                    Michael Adeyemi
                  </h4>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="flow-bg rounded-[12px]">
              <div className="pt-6 md:pt-10 pb-3 pl-4 md:pl-8 py-4 md:pr-8">
                <h4 className="text-sm text-primary uppercase font-medium mb-2">
                  23rd February, 2023
                </h4>
                <p className="max-w-[380px] text-sm text-white opacity-80 leading-loose">
                  The platform is easy to use and works smoothly on my phone.
                  Daily earnings give me confidence and steady financial flow.
                </p>
              </div>
              <div className="h-[.4px] w-full bg-white opacity-20"></div>
              <div className="px-4 md:px-8 pt-4 pb-6 flex gap-4 items-center">
                <div className="size-12 rounded-full bg-gray-500"></div>
                <div>
                  <h4 className="text-sm font-medium text-white">
                    Priya Patel
                  </h4>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="flow-bg rounded-[12px]">
              <div className="pt-6 md:pt-10 pb-3 pl-4 md:pl-8 py-4 md:pr-8">
                <h4 className="text-sm text-primary uppercase font-medium mb-2">
                  12th September, 2025
                </h4>
                <p className="max-w-[380px] text-sm text-white opacity-80 leading-loose">
                  Security and trust were my biggest concerns before joining.
                  Now I trade daily knowing my money is always well-protected.
                </p>
              </div>
              <div className="h-[.4px] w-full bg-white opacity-20"></div>
              <div className="px-4 md:px-8 pt-4 pb-6 flex gap-4 items-center">
                <div className="size-12 rounded-full bg-gray-500"></div>
                <div>
                  <h4 className="text-sm font-medium text-white">
                    Daniel Carter
                  </h4>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="flow-bg rounded-[12px]">
              <div className="pt-6 md:pt-10 pb-3 pl-4 md:pl-8 py-4 md:pr-8">
                <h4 className="text-sm text-primary uppercase font-medium mb-2">
                  5th June, 2024
                </h4>
                <p className="max-w-[380px] text-sm text-white opacity-80 leading-loose">
                  As an entrepreneur, consistent income makes all the
                  difference. Moneday delivers daily profits that keep my plans
                  moving fast.
                </p>
              </div>
              <div className="h-[.4px] w-full bg-white opacity-20"></div>
              <div className="px-4 md:px-8 pt-4 pb-6 flex gap-4 items-center">
                <div className="size-12 rounded-full bg-gray-500"></div>
                <div>
                  <h4 className="text-sm font-medium text-white">
                    Aisha Mohammed
                  </h4>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="flow-bg rounded-[12px]">
              <div className="pt-6 md:pt-10 pb-3 pl-4 md:pl-8 py-4 md:pr-8">
                <h4 className="text-sm text-primary uppercase font-medium mb-2">
                  30th January, 2023
                </h4>
                <p className="max-w-[380px] text-sm text-white opacity-80 leading-loose">
                  I love how automation takes away the stress of market timing.
                  Trading smarter each day has brought me closer to financial
                  freedom.
                </p>
              </div>
              <div className="h-[.4px] w-full bg-white opacity-20"></div>
              <div className="px-4 md:px-8 pt-4 pb-6 flex gap-4 items-center">
                <div className="size-12 rounded-full bg-gray-500"></div>
                <div>
                  <h4 className="text-sm font-medium text-white">David Kim</h4>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
}
