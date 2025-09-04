"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DisplayLayout from "@/layout/Displaylayout";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import Spinner from "@/components/ui/spin";
import { Eye, EyeOff } from "lucide-react";
import { apiFetch } from "@/utils/api";

const SignInPage = () => {
  const router = useRouter();
  const { login } = useAuth();
  const { successToast, errorToast } = useToast();
  const { control, handleSubmit } = useForm();
  const [formData, setFormData] = useState({
    emailAddress: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (e: any) => {
    setLoading(true);
    try {
      const res = await apiFetch("/api/auth/login", {
        method: "POST",
        json: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Signup failed");
      login(data.data, data?.data?.token);
      router.push("/dashboard/overview");
      successToast("Signin successful!");
      setFormData({
        emailAddress: "",
        password: "",
      });
    } catch (err: any) {
      errorToast(err.message || "Signin failed");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div>
      <DisplayLayout>
        <div className="h-screen flex items-center justify-center">
          <div className="w-[35%] mx-auto bg-[#FFFFFF2D] rounded-lg px-4 py-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-8 text-center">
                <h2 className="text-2xl mb-1 font-ibm font-semibold text-white">
                  Signin to your account
                </h2>
                <p className="text-base leading-relaxed text-white opacity-80 w-[90%] mx-auto">
                  Create your free Moneday account and join thousands of traders
                  earning right away.
                </p>
              </div>

              <div>
                <label htmlFor="">Email address</label>
                <Controller
                  control={control}
                  name="emailAddress"
                  defaultValue=""
                  render={() => (
                    <Input
                      type="email"
                      placeholder="Email"
                      value={formData.emailAddress}
                      onChange={(e) =>
                        handleChange("emailAddress", e.target.value)
                      }
                      className="py-7 text-white opacity-80 text-sm h-[3.7rem] mb-4"
                    />
                  )}
                />
              </div>
              <div className="mb-6">
                <label htmlFor="">Password</label>
                <Controller
                  control={control}
                  name="password"
                  defaultValue=""
                  render={() => (
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) =>
                          handleChange("password", e.target.value)
                        }
                        className="py-7 text-white opacity-80 text-sm h-[3.7rem] pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((s) => !s)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  )}
                />
              </div>
              <Button
                type="submit"
                className="w-full py-7 text-sm bg-primary text-white mb-3"
                disabled={loading}
              >
                {loading ? <Spinner color="#fff" fontSize="20px" /> : "Click here to Signin"}
              </Button>
            </form>
          </div>
        </div>
      </DisplayLayout>
    </div>
  );
};

export default SignInPage;
