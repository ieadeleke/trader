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
                  Lorem ipsum dolor sit amet consectetur adipiscing elit.
                  Curaitur in euismod odio gravida gravida. Discovery of the
                  text&apos;s origin is attributed
                </p>
              </div>
              <div className="h-[.4px] w-full bg-white opacity-20"></div>
              <div className="px-4 md:px-8 pt-4 pb-6 flex gap-4 items-center">
                <div className="size-12 rounded-full bg-gray-500"></div>
                <div>
                  <h4 className="text-sm font-medium text-white">
                    Cathy Blaze
                  </h4>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="flow-bg rounded-[12px]">
              <div className="pt-6 md:pt-10 pb-3 pl-4 md:pl-8 py-4 md:pr-8">
                <h4 className="text-sm text-primary uppercase font-medium mb-2">
                  18th April, 2025
                </h4>
                <p className="max-w-[380px] text-sm text-white opacity-80 leading-loose">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit.
                  Curaitur in euismod odio gravida gravida. Discovery of the
                  text&apos;s origin is attributed
                </p>
              </div>
              <div className="h-[.4px] w-full bg-white opacity-20"></div>
              <div className="px-4 md:px-8 pt-4 pb-6 flex gap-4 items-center">
                <div className="size-12 rounded-full bg-gray-500"></div>
                <div>
                  <h4 className="text-sm font-medium text-white">
                    Cathy Blaze
                  </h4>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="flow-bg rounded-[12px]">
              <div className="pt-6 md:pt-10 pb-3 pl-4 md:pl-8 py-4 md:pr-8">
                <h4 className="text-sm text-primary uppercase font-medium mb-2">
                  18th April, 2025
                </h4>
                <p className="max-w-[380px] text-sm text-white opacity-80 leading-loose">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit.
                  Curaitur in euismod odio gravida gravida. Discovery of the
                  text&apos;s origin is attributed
                </p>
              </div>
              <div className="h-[.4px] w-full bg-white opacity-20"></div>
              <div className="px-4 md:px-8 pt-4 pb-6 flex gap-4 items-center">
                <div className="size-12 rounded-full bg-gray-500"></div>
                <div>
                  <h4 className="text-sm font-medium text-white">
                    Cathy Blaze
                  </h4>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flow-bg rounded-[12px]">
              <div className="pt-6 md:pt-10 pb-3 pl-4 md:pl-8 py-4 md:pr-8">
                <h4 className="text-sm text-primary uppercase font-medium mb-2">
                  18th April, 2025
                </h4>
                <p className="max-w-[380px] text-sm text-white opacity-80 leading-loose">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit.
                  Curaitur in euismod odio gravida gravida. Discovery of the
                  text&apos;s origin is attributed
                </p>
              </div>
              <div className="h-[.4px] w-full bg-white opacity-20"></div>
              <div className="px-4 md:px-8 pt-4 pb-6 flex gap-4 items-center">
                <div className="size-12 rounded-full bg-gray-500"></div>
                <div>
                  <h4 className="text-sm font-medium text-white">
                    Cathy Blaze
                  </h4>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flow-bg rounded-[12px]">
              <div className="pt-6 md:pt-10 pb-3 pl-4 md:pl-8 py-4 md:pr-8">
                <h4 className="text-sm text-primary uppercase font-medium mb-2">
                  18th April, 2025
                </h4>
                <p className="max-w-[380px] text-sm text-white opacity-80 leading-loose">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit.
                  Curaitur in euismod odio gravida gravida. Discovery of the
                  text&apos;s origin is attributed
                </p>
              </div>
              <div className="h-[.4px] w-full bg-white opacity-20"></div>
              <div className="px-4 md:px-8 pt-4 pb-6 flex gap-4 items-center">
                <div className="size-12 rounded-full bg-gray-500"></div>
                <div>
                  <h4 className="text-sm font-medium text-white">
                    Cathy Blaze
                  </h4>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flow-bg rounded-[12px]">
              <div className="pt-6 md:pt-10 pb-3 pl-4 md:pl-8 py-4 md:pr-8">
                <h4 className="text-sm text-primary uppercase font-medium mb-2">
                  18th April, 2025
                </h4>
                <p className="max-w-[380px] text-sm text-white opacity-80 leading-loose">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit.
                  Curaitur in euismod odio gravida gravida. Discovery of the
                  text&apos;s origin is attributed
                </p>
              </div>
              <div className="h-[.4px] w-full bg-white opacity-20"></div>
              <div className="px-4 md:px-8 pt-4 pb-6 flex gap-4 items-center">
                <div className="size-12 rounded-full bg-gray-500"></div>
                <div>
                  <h4 className="text-sm font-medium text-white">
                    Cathy Blaze
                  </h4>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
}
