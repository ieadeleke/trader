import Image from "next/image";
import Link from "next/link";

import LogoImg from "@/assets/logo-new.png";

const Footer = () => {
  return (
    <footer>
      <div className="flex flex-col md:grid grid-cols-[1fr_1.2fr] gap-10 md:gap-36 flex-wrap px-5 md:px-28 pt-28 pb-10 md:pb-20">
        <div className="">
          <div>
            <Image
              src={LogoImg}
              alt="logo"
              quality={100}
              className="w-[120px] md:w-[150px] h-auto max-w-[630px] mb-4"
            />
            <p className="leading-loose text-sm md:text-base opacity-80">
              Moneday is a trading platform built for daily earnings. Automated
              strategies, fast withdrawals, and strong security make trading
              simple, transparent, and rewarding for everyone.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:flex gap-2 gap-y-12 md:gap-y-28 md:gap-28">
          <div>
            <h5 className="text-white font-ubuntu mb-4 font-semibold">
              About Us
            </h5>
            <ul className="flex flex-col gap-5">
              <li>
                <Link href="/" className="text-sm md:text-base opacity-70">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/#aboutus"
                  className="text-sm md:text-base opacity-70"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/#services"
                  className="text-sm md:text-base opacity-70"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/#testimonials"
                  className="text-sm md:text-base opacity-70"
                >
                  Testimonials
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="text-white font-ubuntu mb-4 font-semibold">
              Company
            </h5>
            <ul className="flex flex-col gap-5">
              <li>
                <Link
                  href="/terms-of-use"
                  className="text-sm md:text-base opacity-70"
                >
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link href="/aml" className="text-sm md:text-base opacity-70">
                  AML & KYC Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/cookie-policy"
                  className="text-sm md:text-base opacity-70"
                >
                  Cookies Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/withdrawal-policy"
                  className="text-sm md:text-base opacity-70"
                >
                  Withdrawal Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="text-white font-ubuntu mb-4 font-semibold">
              Support
            </h5>
            <ul className="flex flex-col gap-5">
              <li>
                <Link
                  href="/legal-information"
                  className="text-sm md:text-base opacity-70"
                >
                  Legal Information
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-sm md:text-base opacity-70"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/regulations"
                  className="text-sm md:text-base opacity-70"
                >
                  Regulations
                </Link>
              </li>
              <li>
                <Link
                  href="/risk-disclaimer"
                  className="text-sm md:text-base opacity-70"
                >
                  Risk Discliamer
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="py-3 px-5 md:px-28 pb-10">
        <div className="h-[1px] mb-10 md:mb-8 bg-white opacity-20"></div>
        <p className="text-sm text-white opacity-80">
          Copyright &copy; 2023 &mdash; 2025{" "}
          <span className="text-primary"> Moneday </span>
          All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
