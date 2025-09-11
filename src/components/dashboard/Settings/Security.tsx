"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/context/ToastContext";
import Spinner from "@/components/ui/spin";
import { apiFetch } from "@/utils/api";

const Security = () => {
  const { successToast, errorToast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.oldPassword || !formData.newPassword || !formData.confirmPassword) {
      errorToast("Please fill all fields");
      return;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      errorToast("New password and confirmation do not match");
      return;
    }
    try {
      setLoading(true);
      const res = await apiFetch("/api/auth/change-password", {
        method: "POST",
        auth: true,
        json: {
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Password change failed");
      successToast("Password updated successfully");
      setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err: any) {
      errorToast(err.message || "Password change failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div>
            <Label htmlFor="oldPassword">Old Password</Label>
            <Input
              type="password"
              id="oldPassword"
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
              placeholder="********"
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              type="password"
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="********"
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="********"
              className="mt-2"
            />
          </div>
        </div>
        <Button className="w-[40%] mx-auto h-max block py-5 text-sm bg-primary text-white mb-3" disabled={loading}>
          {loading ? <Spinner color="#fff" fontSize="20px" /> : "Update Password"}
        </Button>
      </form>
    </div>
  );
};

export default Security;
