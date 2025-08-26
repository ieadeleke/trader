"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";

const ProfileSettings = () => {
  const [formData, setFormData] = useState({
    name: "Ife Adeleke",
    email: "eadelekeife@gmail.com",
    password: "",
    profileImage: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "profileImage" && files) {
      setFormData((prev) => ({
        ...prev,
        profileImage: URL.createObjectURL(files[0]),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // TODO: Hook up to API
  };

  return (
    <DashboardLayout pageTitle="Profile Settings">
      <>
        <div className="w-[85%] pt-20 pb-20 mx-auto">
          <ProfileSettings />
        </div>
      </>
    </DashboardLayout>
  );
};

export default ProfileSettings;
