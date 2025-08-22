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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SignUpForm = () => {
  const { control } = useForm();
  const [date, setDate] = useState<Date>();
  return (
    <div>
      <form action="">
        <div className="mb-8">
          <h2 className="text-2xl mb-1 font-ibm text-center font-semibold text-white">
            Create a free account
          </h2>
          <p className="text-base leading-relaxed text-center font-ibm text-white opacity-80">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
            aliquam, beatae dicta, maiores, expedita natus placeat
          </p>
        </div>
        <div className="grid grid-cols-2 mb-4 gap-3">
          <div className="form-group">
            <Label className="mb-1 font-ibm font-normal text-white opacity-80">
              First name
            </Label>
            <Controller
              control={control}
              defaultValue=""
              name="firstName"
              render={({ field }) => (
                <Input
                  type="text"
                  {...field}
                  className="py-7 text-white opacity-80 text-sm h-[3.7rem]"
                />
              )}
            />
          </div>
          <div className="form-group">
            <Label className="mb-1 font-ibm font-normal text-white opacity-80">
              Last name
            </Label>
            <Controller
              control={control}
              defaultValue=""
              name="lastName"
              render={({ field }) => (
                <Input
                  type="text"
                  {...field}
                  className="py-7 text-white opacity-80 text-sm h-[3.7rem]"
                />
              )}
            />
          </div>
        </div>
        <div className="form-group mb-4">
          <Label className="mb-1 font-ibm font-normal text-white opacity-80">
            Email address
          </Label>
          <Controller
            control={control}
            defaultValue=""
            name="emailAddress"
            render={({ field }) => (
              <Input
                type="email"
                {...field}
                className="py-7 text-white opacity-80 text-sm h-[3.7rem]"
              />
            )}
          />
        </div>
        <div className="form-group mb-4">
          <Label className="mb-4 font-ibm font-normal text-white opacity-80">
            Ready to start earning?
          </Label>
          <RadioGroup defaultValue="yes" className="flex gap-4 flex-wrap">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="yes" />
              <Label htmlFor="yes" className="text-white text-sm opacity-80">
                Yes
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="no" />
              <Label htmlFor="no" className="text-white text-sm opacity-80">
                No
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="i want to know more"
                id="i want to know more"
              />
              <Label
                htmlFor="i want to know more"
                className="text-white text-sm opacity-80"
              >
                I want to know more
              </Label>
            </div>
          </RadioGroup>
        </div>
        <div className="form-group mb-4">
          <Label className="mb-1 font-ibm font-normal text-white opacity-80">
            Phone number
          </Label>
          <Controller
            control={control}
            defaultValue=""
            name="phoneNumber"
            render={({ field }) => (
              <Input
                type="tel"
                {...field}
                className="py-7 text-white opacity-80 text-sm h-[3.7rem]"
              />
            )}
          />
        </div>
        <div className="form-group mb-4">
          <Label className="mb-4 font-ibm font-normal text-white opacity-80">
            How do you want to receive your money?
          </Label>
          <Select>
            <SelectTrigger className="w-full h-[3.7rem] py-7 text-white opacity-80 text-sm">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
              <SelectItem value="crypto">Crypto</SelectItem>
              <SelectItem value="paypal">Paypal</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="form-group flex-1 mb-8">
            <Label className="mb-1 font-ibm font-normal text-white opacity-80">
              Date of Birth
            </Label>
            <Controller
              control={control}
              defaultValue=""
              name="phoneNumber2"
              render={({ field }) => (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      data-empty={!date}
                      className="data-[empty=true]:text-muted-foreground justify-start text-left font-normal text-white text-sm opacity-80"
                    >
                      <CalendarIcon />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                    />
                  </PopoverContent>
                </Popover>
              )}
            />
          </div>
          <div className="form-group flex-1 mb-8">
            <Label className="mb-1 font-ibm font-normal text-white opacity-80">
              Occupation
            </Label>
            <Controller
              control={control}
              defaultValue=""
              name="occupation"
              render={({ field }) => (
                <Input
                  type="tel"
                  {...field}
                  className="py-7 text-white opacity-80 text-sm h-[3.7rem]"
                />
              )}
            />
          </div>
        </div>
        <Button className="w-full py-7 text-sm bg-primary text-white mb-3">
          Click here to Signup
        </Button>
      </form>
    </div>
  );
};

export default SignUpForm;
