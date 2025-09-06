"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/context/ToastContext";
import Spinner from "@/components/ui/spin";
import { apiFetch } from "@/utils/api";
import { format } from "date-fns";
import { Controller, useForm } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const SignUpForm = () => {
  const { control, handleSubmit } = useForm();
  const router = useRouter();
  const { successToast, errorToast } = useToast();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    readyToEarn: "yes",
    phoneNumber: "",
    payoutMethod: "",
    dateOfBirth: "",
    occupation: "",
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: any) => {
    setLoading(true);
    try {
      const res = await apiFetch("/api/auth/register", {
        method: "POST",
        json: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Signup failed");
      successToast("Signup successful! Please sign in.");
      setFormData({
        firstName: "",
        lastName: "",
        emailAddress: "",
        readyToEarn: "yes",
        phoneNumber: "",
        payoutMethod: "",
        dateOfBirth: "",
        occupation: "",
      });
      router.push("/auth/signin");
    } catch (err: any) {
      errorToast(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-8 text-center">
          <h2 className="text-2xl mb-1 font-ibm font-semibold text-white">
            Create a free account
          </h2>
          <p className="text-base leading-relaxed text-white opacity-80">
            Create your free Moneday account and join thousands of traders
            earning right away.
          </p>
        </div>

        <div className="grid grid-cols-2 mb-4 gap-3">
          <Controller
            control={control}
            name="firstName"
            defaultValue=""
            render={() => (
              <Input
                placeholder="First Name"
                value={formData.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                className="py-7 text-white opacity-80 text-sm h-[3.7rem]"
              />
            )}
          />
          <Controller
            control={control}
            name="lastName"
            defaultValue=""
            render={() => (
              <Input
                placeholder="Last Name"
                value={formData.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                className="py-7 text-white opacity-80 text-sm h-[3.7rem]"
              />
            )}
          />
        </div>
        <Controller
          control={control}
          name="emailAddress"
          defaultValue=""
          render={() => (
            <Input
              type="email"
              placeholder="Email"
              value={formData.emailAddress}
              onChange={(e) => handleChange("emailAddress", e.target.value)}
              className="py-7 text-white opacity-80 text-sm h-[3.7rem] mb-4"
            />
          )}
        />

        <Label className="mb-4 font-ibm font-normal text-white opacity-80">
          Ready to start earning?
        </Label>
        <RadioGroup
          value={formData.readyToEarn}
          onValueChange={(value) => handleChange("readyToEarn", value)}
          className="flex gap-4 flex-wrap mb-4"
        >
          {["yes", "no", "i want to know more"].map((val) => (
            <div key={val} className="flex items-center space-x-2">
              <RadioGroupItem value={val} id={val} />
              <Label htmlFor={val} className="text-white text-sm opacity-80">
                {val}
              </Label>
            </div>
          ))}
        </RadioGroup>

        <Controller
          control={control}
          name="phoneNumber"
          defaultValue=""
          render={() => (
            <Input
              type="tel"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={(e) => handleChange("phoneNumber", e.target.value)}
              className="py-7 text-white opacity-80 text-sm h-[3.7rem] mb-4"
            />
          )}
        />

        <Select onValueChange={(value) => handleChange("payoutMethod", value)}>
          <SelectTrigger className="w-full h-[3.7rem] py-7 text-white opacity-80 text-sm mb-4">
            <SelectValue placeholder="Select payout method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
            <SelectItem value="crypto">Crypto</SelectItem>
            <SelectItem value="paypal">Paypal</SelectItem>
          </SelectContent>
        </Select>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                data-empty={!formData.dateOfBirth}
                className="data-[empty=true]:text-muted-foreground justify-start text-left font-normal text-white text-sm opacity-80 py-7"
              >
                <CalendarIcon />
                {formData.dateOfBirth
                  ? format(new Date(formData.dateOfBirth), "PPP")
                  : "Date of Birth"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={
                  formData.dateOfBirth
                    ? new Date(formData.dateOfBirth)
                    : undefined
                }
                onSelect={(date) =>
                  date && handleChange("dateOfBirth", date.toISOString())
                }
              />
            </PopoverContent>
          </Popover>

          <Input
            placeholder="Occupation"
            value={formData.occupation}
            onChange={(e) => handleChange("occupation", e.target.value)}
            className="py-7 text-white opacity-80 text-sm h-[3.7rem]"
          />
        </div>

        <Button
          type="submit"
          className="w-full py-7 text-sm bg-primary text-white mb-3"
          disabled={loading}
        >
          {loading ? <Spinner color="#fff" fontSize="20px" /> : "Click here to Signup"}
        </Button>
      </form>
    </div>
  );
};

export default SignUpForm;
