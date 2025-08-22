"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { Rate } from "antd";
import { ChevronLeft, ChevronRight } from "lucide-react";

import CathyImg from "@/assets/testimonials/cathy.png";
import SarahImg from "@/assets/testimonials/sarah.png";
import GraceImg from "@/assets/testimonials/grace.png";

import ChapelImg from "@/assets/testimonials/chapel.jpg";
import DavidImg from "@/assets/testimonials/david.jpg";
import CarlonImg from "@/assets/testimonials/carlon.jpg";

import Image from "next/image";


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
          What Our Earners are Saying
        </h3>
      </div>
      <div className="relative">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          breakpoints={responsiveness}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          loop={true}
        >
          <SwiperSlide>
            <div className="flow-bg rounded-[12px]">
              <div className="pt-6 md:pt-10 pb-3 pl-4 md:pl-8 py-4 md:pr-8">
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-0 justify-between mb-3">
                  <h4 className="text-sm text-primary uppercase font-medium">
                    10th April, 2025
                  </h4>
                  <div className="">
                    <Rate
                      allowHalf
                      defaultValue={5}
                      style={{ color: "#E4753D" }}
                    />
                  </div>
                </div>
                <p className="max-w-[380px] text-sm text-white opacity-80 leading-loose">
                  &ldquo;Moneday has completely changed the way I trade online.
                  Withdrawals are fast, reliable, and stress-free every
                  day.&rdquo;
                </p>
              </div>
              <div className="h-[.4px] w-full bg-white opacity-20"></div>
              <div className="px-4 md:px-8 pt-4 pb-6 flex gap-4 items-center">
                <div className="size-12 rounded-full bg-gray-500">
                  <Image
                    src={SarahImg}
                    alt="cathy" width={1000} height={1000} quality={100}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
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
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-0 justify-between mb-3">
                  <h4 className="text-sm text-primary uppercase font-medium">
                    5th June, 2024
                  </h4>
                  <div className="">
                    <Rate
                      allowHalf
                      defaultValue={5}
                      style={{ color: "#E4753D" }}
                    />
                  </div>
                </div>
                <p className="max-w-[380px] text-sm text-white opacity-80 leading-loose">
                  &ldquo;I finally get to enjoy my profits without long waiting
                  times. Trading feels simple, transparent, and rewarding with
                  them.&rdquo;
                </p>
              </div>
              <div className="h-[.4px] w-full bg-white opacity-20"></div>
              <div className="px-4 md:px-8 pt-4 pb-6 flex gap-4 items-center">
                <div className="size-12 rounded-full bg-gray-500">
                  <Image
                    src={GraceImg}
                    alt="cathy" width={1000} height={1000} quality={100}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white">
                    Grace Hamill
                  </h4>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="flow-bg rounded-[12px]">
              <div className="pt-6 md:pt-10 pb-3 pl-4 md:pl-8 py-4 md:pr-8">
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-0 justify-between mb-3">
                  <h4 className="text-sm text-primary uppercase font-medium">
                    23rd February, 2024
                  </h4>
                  <div className="">
                    <Rate
                      allowHalf
                      defaultValue={5}
                      style={{ color: "#E4753D" }}
                    />
                  </div>
                </div>
                <p className="max-w-[380px] text-sm text-white opacity-80 leading-loose">
                  &ldquo;The platform is easy to use and works smoothly on my
                  phone. Daily earnings give me confidence and steady financial
                  flow.&rdquo;
                </p>
              </div>
              <div className="h-[.4px] w-full bg-white opacity-20"></div>
              <div className="px-4 md:px-8 pt-4 pb-6 flex gap-4 items-center">
                <div className="size-12 rounded-full bg-gray-500">
                  <Image
                    src={CathyImg}
                    alt="cathy" width={1000} height={1000} quality={100}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white">
                    Cathy Purdy
                  </h4>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="flow-bg rounded-[12px]">
              <div className="pt-6 md:pt-10 pb-3 pl-4 md:pl-8 py-4 md:pr-8">
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-0 justify-between mb-3">
                  <h4 className="text-sm text-primary uppercase font-medium">
                    12th January, 2025
                  </h4>
                  <div className="">
                    <Rate
                      allowHalf
                      defaultValue={5}
                      style={{ color: "#E4753D" }}
                    />
                  </div>
                </div>
                <p className="max-w-[380px] text-sm text-white opacity-80 leading-loose">
                  &ldquo;Security and trust were my biggest concerns before
                  joining. Now I trade daily knowing my money is always
                  well-protected.&rdquo;
                </p>
              </div>
              <div className="h-[.4px] w-full bg-white opacity-20"></div>
              <div className="px-4 md:px-8 pt-4 pb-6 flex gap-4 items-center">
                <div className="size-12 rounded-full bg-gray-500">
                  <Image
                    src={ChapelImg}
                    alt="cathy" width={1000} height={1000} quality={100}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
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
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-0 justify-between mb-3">
                  <h4 className="text-sm text-primary uppercase font-medium">
                    5th June, 2024
                  </h4>
                  <div className="">
                    <Rate
                      allowHalf
                      defaultValue={5}
                      style={{ color: "#E4753D" }}
                    />
                  </div>
                </div>
                <p className="max-w-[380px] text-sm text-white opacity-80 leading-loose">
                  &ldquo;As an entrepreneur, consistent income makes all the
                  difference. Moneday delivers daily profits that keep my plans
                  moving fast.&rdquo;
                </p>
              </div>
              <div className="h-[.4px] w-full bg-white opacity-20"></div>
              <div className="px-4 md:px-8 pt-4 pb-6 flex gap-4 items-center">
                <div className="size-12 rounded-full bg-gray-500">
                  <Image
                    src={DavidImg}
                    alt="cathy" width={1000} height={1000} quality={100}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white">
                    Liam Mateo
                  </h4>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="flow-bg rounded-[12px]">
              <div className="pt-6 md:pt-10 pb-3 pl-4 md:pl-8 py-4 md:pr-8">
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-0 justify-between mb-3">
                  <h4 className="text-sm text-primary uppercase font-medium">
                    5th June, 2024
                  </h4>
                  <div className="">
                    <Rate
                      allowHalf
                      defaultValue={5}
                      style={{ color: "#E4753D" }}
                    />
                  </div>
                </div>
                <p className="max-w-[380px] text-sm text-white opacity-80 leading-loose">
                  &ldquo;I love how automation takes away the stress of market
                  timing. Trading smarter each day has brought me closer to
                  financial freedom.&rdquo;
                </p>
              </div>
              <div className="h-[.4px] w-full bg-white opacity-20"></div>
              <div className="px-4 md:px-8 pt-4 pb-6 flex gap-4 items-center">
                <div className="size-12 rounded-full bg-gray-500">
                  <Image
                    src={CarlonImg}
                    alt="cathy" width={1000} height={1000} quality={100}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white">David Kim</h4>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
        {/* Custom Navigation Arrows */}
        <div className="swiper-button-prev-custom absolute top-1/2 left-3 z-10 -translate-y-1/2 cursor-pointer">
          <div className="size-10 flex items-center justify-center rounded-full border bg-white border-white text-white hover:bg-white hover:text-black transition">
            <ChevronLeft size={20} className="text-black" />
          </div>
        </div>

        <div className="swiper-button-next-custom absolute top-1/2 right-3 z-10 -translate-y-1/2 cursor-pointer">
          <div className="size-10 flex items-center justify-center rounded-full border bg-white border-white text-white hover:bg-white hover:text-black transition">
            <ChevronRight size={20} className="text-black" />
          </div>
        </div>
      </div>
    </section>
  );
}
