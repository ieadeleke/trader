"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "../..//ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/context/ToastContext";
import Spinner from "@/components/ui/spin";
import { apiFetch } from "@/utils/api";

const GeneralSettings = () => {
  const { user, updateProfile } = useAuth();
  const { successToast, errorToast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    occupation: user?.occupation || "",
    dateOfBirth: user?.dateOfBirth || "",
  });
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (
      formData.firstName &&
      formData.lastName &&
      formData.email &&
      formData.phoneNumber
    ) {
      try {
        const res = await apiFetch("/api/auth/update", {
          method: "POST",
          auth: true,
          json: formData,
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Signup failed");
        console.log("done successfully");
        successToast("Profile updated successfully");
        updateProfile({ ...formData });
      } catch (err: any) {
        errorToast(err.message);
      } finally {
        setLoading(false);
      }
    } else {
      errorToast("Please fill all fields");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="">
            <Label className="text-sm mb-1" htmlFor="firstName">
              First Name
            </Label>
            <Input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label className="text-sm mb-1" htmlFor="lastName">
              Last Name
            </Label>
            <Input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label className="text-sm mb-1" htmlFor="email">
              Email Address
            </Label>
            <Input
              disabled
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label className="text-sm mb-1" htmlFor="phoneNumber">
              Phone Number
            </Label>
            <Input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label className="text-sm mb-1" htmlFor="dateOfBirth">
              Email Address
            </Label>
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
                    : "Pick a date"}
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
                    date &&
                    setFormData({
                      ...formData,
                      dateOfBirth: date.toISOString(),
                    })
                  }
                />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <Label className="text-sm mb-1" htmlFor="occupation">
              Occupation
            </Label>
            <Input
              type="tel"
              id="occupation"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
            />
          </div>
        </div>
        <Button className="w-[40%] mx-auto h-max block py-5 text-sm bg-primary text-white mb-3">
          {loading ? <Spinner color="#fff" fontSize="20px" /> : "Update Profile"}
        </Button>
      </form>
    </div>
  );
};

export default GeneralSettings;
