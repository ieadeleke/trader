"use client";

import LogoImg from "@/assets/logo.png";
import LogoNewImg from "@/assets/logo-new.jpeg";
import { Drawer, Modal } from "antd";
import Image from "next/image";
import Link from "next/link";
import SignUpForm from "../auth/SignUp";
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import ContactForm from "../auth/ContactForm";

interface NavInterface {
  authControl?: boolean;
  contactControl?: boolean;
  authControlFunction?: (state: boolean) => void;
  contactControlFunction?: (state: boolean) => void;
}

const Navigation = (props: NavInterface) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [displaySignUpModal, setDisplaySignUpModal] = useState<boolean>(false);
  const toggleModalDisplay = () => {
    if (props.authControlFunction)
      props?.authControlFunction(!displaySignUpModal);
    setDisplaySignUpModal(!displaySignUpModal);
  };

  const toggleDrawer = () => setOpenMenu(!openMenu);

  const displayAuthModalDisplay = () => setDisplaySignUpModal(true);
  const hideAuthModalDisplay = () => setDisplaySignUpModal(false);

  // contact us form
  const [openContactUsMenu, setOpenContactUsMenu] = useState(false);
  const [displayContactUsModal, setDisplayContactUsModal] =
    useState<boolean>(false);
  const toggleContactModalDisplay = () => {
    if (props.contactControlFunction)
      props?.contactControlFunction(!displayContactUsModal);
    setDisplayContactUsModal(!displayContactUsModal);
  };

  const toggleContactDrawer = () => setDisplayContactUsModal(!displayContactUsModal);

  const displayContactModalDisplay = () => setDisplayContactUsModal(true);
  const hideContactModalDisplay = () => setDisplayContactUsModal(false);

  useEffect(() => {
    if (props.authControl) {
      displayAuthModalDisplay();
    } else {
      hideAuthModalDisplay();
    }
  }, [props.authControl]);

  useEffect(() => {
    if (props.contactControl) {
      displayContactModalDisplay();
    } else {
      hideContactModalDisplay();
    }
  }, [props.contactControl]);

  return (
    <nav className="flex py-6 md:py-7 px-5 md:px-20 w-full justify-between items-center fixed z-50 top-0 bg-[#0A0A0A] md:bg-transparent">
      <div className="">
        <Link href="/">
          <Image
            src={LogoNewImg}
            alt="logo"
            quality={100}
            className="w-[120px] md:w-[150px] h-auto max-w-[630px] mx-auto rounded-lg"
          />
        </Link>
      </div>
      <div className="hidden md:block">
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
          {/* <li>
            <Link href="#testimonials" className="text-sm text-white">
              Testimonials
            </Link>
          </li> */}
        </ul>
      </div>
      <div className="hidden md:block">
        <ul className="flex items-center gap-10">
          <li>
            <button
              onClick={toggleContactModalDisplay}
              className="bg-transparent text-sm text-white cursor-pointer"
            >
              Contact Us
            </button>
          </li>
          <button
            className="bg-primary text-sm text-white py-3 px-6 rounded-lg cursor-pointer"
            onClick={toggleModalDisplay}
          >
            Open Account
          </button>
        </ul>
      </div>
      <div className="block md:hidden">
        <HiOutlineMenuAlt3
          className="text-3xl text-white"
          onClick={toggleDrawer}
        />
      </div>
      <Modal
        open={displaySignUpModal}
        onCancel={toggleModalDisplay}
        footer={null}
      >
        <SignUpForm />
      </Modal>
      <Modal
        open={displayContactUsModal}
        onCancel={toggleContactDrawer}
        footer={null}
        className="contactModal"
      >
        <ContactForm />
      </Modal>
      <Drawer open={openMenu} onClose={toggleDrawer} footer={null}>
        <div className="flex flex-col relative h-full">
          <div className="px-5 pt-4 pb-10 flex w-full items-center justify-between absolute">
            <div className="">
              <Image
                src={LogoImg}
                alt="Logo"
                width={100}
                height={50}
                className="h-7 md:h-14 w-[auto] object-contain"
              />
            </div>
            <div onClick={toggleDrawer}>
              <FaTimes className="text-2xl text-[#ff0000]" />
            </div>
          </div>
          <ul className="h-full flex justify-center text-center flex-col gap-6">
            <li className="pb-4 text-black">
              <Link
                href="/"
                className="text-white text-2xl font-medium p-4 w-full"
                onClick={toggleDrawer}
              >
                Home
              </Link>
            </li>
            <li className="pb-4 text-black">
              <Link
                href="/#aboutus"
                className="text-white text-2xl font-medium p-4 w-full"
                onClick={toggleDrawer}
              >
                About Us
              </Link>
            </li>
            <li className="pb-4 text-black">
              <Link
                href="/#services"
                className="text-white text-2xl font-medium p-4 w-full"
                onClick={toggleDrawer}
              >
                Services
              </Link>
            </li>
            <li className="pb-4 text-black">
              <Link
                href="/#howitworks"
                className="text-white text-2xl font-medium p-4 w-full"
                onClick={toggleDrawer}
              >
                How It Works
              </Link>
            </li>
            <li className="pb-4 text-black">
              <Link
                href="/#testimonials"
                className="text-white text-2xl font-medium p-4 w-full"
                onClick={toggleDrawer}
              >
                Testimonials
              </Link>
            </li>
          </ul>
        </div>
      </Drawer>
    </nav>
  );
};

export default Navigation;
