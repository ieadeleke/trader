"use client";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { Textarea } from "../ui/textarea";

import { FaArrowRight } from "react-icons/fa6";


const ContactForm = () => {
  const { control } = useForm();
  const [date, setDate] = useState<Date>();
  return (
    <div>
      <div className="flex flex-col md:grid grid-cols-2 gap-10 md:gap-28">
        <div className="flex flex-col">
          <h2 className="text-2xl md:text-4xl leading-[1.4] md:leading-[1.4] text-white font-ibm font-semibold mb-5">
            Reach out to us
          </h2>
          <div className="md:w-[85%]">
            <div className="mb-10 flex items-center justify-between w-full">
              <div>
                <h5 className="text-white text-sm opacity-70 mb-3 font-ibm">
                  My Email Address
                </h5>
                <h3 className="text-base md:text-xl text-white font-ibm">
                  help@moneday.com
                </h3>
              </div>
              <div>
                <FaArrowRight />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h5 className="text-white text-sm opacity-70 mb-3 font-ibm">
                  My Phone Number
                </h5>
                <h3 className="text-base md:text-xl text-white font-ibm">
                  <span className="text-sm">(+393)</span> 321 123 8237
                </h3>
              </div>
              <div>
                <h5 className="text-white text-sm opacity-70 mb-3 font-ibm">Location</h5>
                <h3 className="text-base md:text-xl text-white font-ibm">
                  Donestk, Ukraine
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div>
          <form action="">
            <div className="form-group mb-5">
              <Label className="text-sm mb-2 opacity-80 text-white">Name</Label>
              <Input className="outline-none text-sm py-8 rounded-[8px] input border-2 border-solid text-white opacity-80 border-[#2A2B2E]" />
            </div>
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="form-group">
                <Label className="text-sm mb-2 opacity-80 text-white">Email address</Label>
                <Input className="outline-none text-sm py-8 rounded-[8px] input border-2 border-solid text-white opacity-80 border-[#2A2B2E]" />
              </div>
              <div className="form-group">
                <Label className="text-sm mb-2 opacity-80 text-white">Phone number</Label>
                <Input className="outline-none text-sm py-8 rounded-[8px] input border-2 border-solid text-white opacity-80 border-[#2A2B2E]" />
              </div>
            </div>
            <div className="form-group mb-16">
              <Label className="text-sm opacity-80 mb-2 text-white">Message</Label>
              <Textarea className="outline-none text-sm rounded-lg input border-2 text-white opacity-80 border-solid border-[#2A2B2E] h-[10rem]" />
            </div>
            <Button className="bg-white h-[3.5rem] w-max block ml-auto text-sm px-10 text-black">
              Reach out to us
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
