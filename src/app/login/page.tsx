"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";
import AuthFormWrapper from "@/components/auth/AuthWrapper";
import { toast } from "sonner";
import Cookies from "js-cookie";

interface FormData {
  email: string;
  password: string;
}

const api = axios.create({
  baseURL: "https://pharmmar-backend.onrender.com",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export default function LoginPage() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [csrfToken, setCsrfToken] = useState("");
  const router = useRouter();

  useEffect(() => {
    const getCsrfToken = async () => {
      try {
        await api.get("/auth/csrf-token");
        const token = Cookies.get("XSRF-TOKEN");
        console.log(token);
        if (token) {
          setCsrfToken(token);
        } else {
          throw new Error("CSRF token cookie missing");
        }
      } catch (err) {
        console.error("CSRF Error:", err);
        toast.error("Security initialization failed. Please refresh.");
      }
    };
    getCsrfToken();
  }, []);

  const validateForm = () => {
    if (!formData.email.includes("@")) {
      setError("Please enter a valid email");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // if (!csrfToken) {
    //   setError("Security token missing. Please refresh the page.");
    //   setIsLoading(false);
    //   return;
    // }

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
        console.log(csrfToken)
      const { data } = await api.post("/auth/login", formData, {
        headers: { "X-XSRF-Token": csrfToken },
      });

      if (!data?.success) {
        throw new Error(data?.message || "Login failed");
      }

      toast.success("Login successful!");
      router.push("/dashboard");
    } catch (error: any) {
      let errorMessage = "Login failed. Please try again.";

      if (error.code === "ECONNABORTED") {
        errorMessage = "Request timeout. Check your connection.";
      } else if (error.response) {
        if (error.response.status === 400)
          errorMessage = error.response.data?.message || "Invalid request";
        else if (error.response.status === 401)
          errorMessage = error.response.data?.message || "Invalid credentials";
        else if (error.response.status === 403)
          errorMessage = "Session expired. Please refresh.";
        else if (error.response.status === 429)
          errorMessage = "Too many attempts. Try again later.";
        else if (error.response.status === 500)
          errorMessage = "Server error. Contact support if this continues.";
      } else if (error.message?.includes("Network Error")) {
        errorMessage = "Cannot connect to server. Check your network.";
      }

      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthFormWrapper>
      <div className="space-y-[54px]">
        <div className="space-y-[12px]">
          <h1 className="font-[600] text-[24px]">Login to PharmMar</h1>
          <p className="font-[400] text-[14px] text-[#546881]">
            Enter your email and password to access your PharmMar account.
          </p>
          <p className="font-[500] text-[14px] text-[#546881]">
            Don't have an account?{" "}
            <Link
              href="/createAccount/firststep"
              className="text-[#1BAAC7] hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>

        {error && (
          <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="font-normal text-sm text-[#151A20]"
            >
              Email Address
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="example@mail.com"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isLoading}
              className="bg-white focus:bg-white"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="font-normal text-sm text-[#151A20]"
            >
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={isLoading}
                className="pr-10 bg-white focus:bg-white"
              />
              <button
                type="button"
                className={`absolute right-3 top-1/2 -translate-y-1/2 ${
                  isLoading
                    ? "text-gray-400"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => !isLoading && setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOffIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <div className="text-left">
            <Link
              href="/forgot-password"
              className="text-[#1BAAC7] text-sm hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <Button
            type="submit"
            className="w-24 h-12 rounded-[40px] mt-8 bg-[#1D242D] hover:bg-[#1D242D]/90 max-md:w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                Login
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-2"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </>
            )}
          </Button>
        </form>
      </div>
    </AuthFormWrapper>
  );
}
