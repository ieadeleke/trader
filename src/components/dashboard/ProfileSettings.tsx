"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const UserSettings = (e: React.ChangeEvent<HTMLInputElement>) => {
  const [formData, setFormData] = useState({
    name: "Ife Adeleke",
    email: "eadelekeife@gmail.com",
    password: "",
    profileImage: "",
    notifications: {
      emailUpdates: true,
      smsAlerts: false,
    },
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
    <div className="w-[85%] pt-20 pb-20 mx-auto">
      <Card className="shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            Profile Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>

            {/* General Settings */}
            <TabsContent value="general">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden">
                    {formData.profileImage ? (
                      <img
                        src={formData.profileImage}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-500 text-sm">
                        No Image
                      </div>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="profileImage">Change Profile Picture</Label>
                    <Input
                      type="file"
                      id="profileImage"
                      name="profileImage"
                      accept="image/*"
                      onChange={handleChange}
                      className="mt-2"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-2"
                  />
                </div>

                <Button type="submit" className="w-full">
                  Save Changes
                </Button>
              </form>
            </TabsContent>

            {/* Security Settings */}
            <TabsContent value="security">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="password">New Password</Label>
                  <Input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
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
                    placeholder="********"
                    className="mt-2"
                  />
                </div>

                <Button type="submit" className="w-full">
                  Update Password
                </Button>
              </form>
            </TabsContent>

            {/* Notifications Settings */}
            <TabsContent value="notifications">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="emailUpdates"
                    name="emailUpdates"
                    checked={formData.notifications.emailUpdates}
                    onChange={handleChange}
                    className="h-4 w-4"
                  />
                  <Label htmlFor="emailUpdates">Email Updates</Label>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="smsAlerts"
                    name="smsAlerts"
                    checked={formData.notifications.smsAlerts}
                    onChange={handleChange}
                    className="h-4 w-4"
                  />
                  <Label htmlFor="smsAlerts">SMS Alerts</Label>
                </div>

                <Button type="submit" className="w-full">
                  Save Preferences
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserSettings;
