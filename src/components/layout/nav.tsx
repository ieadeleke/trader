"use client";

import LogoImg from "@/assets/logo.png";
import { Modal } from "antd";
import Image from "next/image";
import Link from "next/link";
import SignUpForm from "../auth/SignUp";
import { useEffect, useState } from "react";

interface NavInterface {
  authControl?: boolean;
  authControlFunction?: (state: boolean) => void;
}

const Navigation = (props: NavInterface) => {
  const [displaySignUpModal, setDisplaySignUpModal] = useState<boolean>(false);
  const toggleModalDisplay = () => {
    if(props.authControlFunction) props?.authControlFunction(!displaySignUpModal);
    setDisplaySignUpModal(!displaySignUpModal);
  };

  const displayAuthModalDisplay = () => setDisplaySignUpModal(true);
  const hideAuthModalDisplay = () => setDisplaySignUpModal(false);

  useEffect(() => {
    if (props.authControl) {
      displayAuthModalDisplay();
    } else {
      hideAuthModalDisplay();
    }
  }, [props.authControl]);

  return (
    <nav className="flex pt-7 pb-24 px-20 w-full justify-between items-center">
      <div className="">
        <Image
          src={LogoImg}
          alt="logo"
          quality={100}
          className="w-[130px] h-auto max-w-[630px] mx-auto"
        />
      </div>
      <div className="">
        <ul className="flex items-center gap-10 flow -bg bg-[#FFFFFF2D] py-4 px-12 rounded-lg">
          <li>
            <Link href="#home" className="text-sm text-white">
              Home
            </Link>
          </li>
          <li>
            <Link href="#aboutus" className="text-sm text-white">
              About Us
            </Link>
          </li>
          <li>
            <Link href="#services" className="text-sm text-white">
              Services
            </Link>
          </li>
          <li>
            <Link href="#howitworks" className="text-sm text-white">
              How It Works
            </Link>
          </li>
          <li>
            <Link href="#testimonials" className="text-sm text-white">
              Testimonials
            </Link>
          </li>
        </ul>
      </div>
      <div className="">
        <ul className="flex items-center gap-10">
          <li>
            <Link href="" className="text-sm text-white">
              Contact Us
            </Link>
          </li>
          <button
            className="bg-primary text-sm text-white py-3 px-6 rounded-lg cursor-pointer"
            onClick={toggleModalDisplay}
          >
            Open Account
          </button>
        </ul>
      </div>
      <Modal
        open={displaySignUpModal}
        onCancel={toggleModalDisplay}
        footer={null}
      >
        <SignUpForm />
      </Modal>
    </nav>
  );
};

export default Navigation;
