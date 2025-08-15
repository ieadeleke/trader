import Image from "next/image";
import Link from "next/link";

import LogoImg from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer>
      <div className="grid grid-cols-[1fr_1.2fr] gap-36 flex-wrap px-28 pt-28 pb-20">
        <div className="">
          <div>
            <Image
              src={LogoImg}
              alt="logo"
              quality={100}
              className="w-[150px] h-auto max-w-[630px] mb-4"
            />
            <p className="leading-loose text-base opacity-80">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam
              labore reprehenderit iure aliquid iste ratione, itaque provident
              minus error culpa. Alias possimus dolore mollitia modi nihil
              expedita quasi voluptatibus quae!
            </p>
          </div>
        </div>
        <div className="flex gap-28">
          <div>
            <h5 className="text-white font-ubuntu mb-4 font-semibold">
              About Us
            </h5>
            <ul className="flex flex-col gap-5">
              <li>
                <Link href="/" className="opacity-70">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#aboutus" className="opacity-70">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/#services" className="opacity-70">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/#testimonials" className="opacity-70">
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
                <Link href="/terms-of-use" className="opacity-70">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link href="/aml" className="opacity-70">
                  AML & KYC Policy
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="opacity-70">
                  Cookies Policy
                </Link>
              </li>
              <li>
                <Link href="/withdrawal-policy" className="opacity-70">
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
                <Link href="/legal-information" className="opacity-70">
                  Legal Information
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="opacity-70">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/regulations" className="opacity-70">
                  Regulations
                </Link>
              </li>
              <li>
                <Link href="/risk-disclaimer" className="opacity-70">
                  Risk Discliamer
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="py-3 px-28 pb-10">
        <div className="h-[1px] mb-8 bg-white opacity-20"></div>
        <p className="text-sm text-white opacity-80">
          Copyright &copy; 2007 &mdash; 2025{" "}
          <span className="text-primary"> ForTradar </span>
          All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
