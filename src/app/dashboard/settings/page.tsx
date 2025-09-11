"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import UserSettings from "@/components/dashboard/ProfileSettings";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import GeneralSettings from "@/components/dashboard/Settings/GeneralSettings";
import Security from "@/components/dashboard/Settings/Security";
import Verification from "@/components/dashboard/Settings/Verification";
import { useAuth } from "@/context/AuthContext";

const ProfileSettings = () => {
  let { user } = useAuth();
  return (
    <DashboardLayout pageTitle="Profile Settings">
      <>
        <div className="w-[85%] pt-20 pb-20 mx-auto">
          <div className="relative">
            <div className="h-[8rem] w-full rounded-t-xl bg-border"></div>
            <div className="absolute -bottom-24 left-16 flex gap-4 items-center">
              <div className="border-4 border-[#E9ECEF] bg-[#E9ECEF] rounded-full size-32 flex items-center justify-center">
                <h3 className="text-3xl text-black">
                  {user?.firstName.slice(0, 1).toUpperCase()}{" "}
                  {user?.lastName.slice(0, 1).toUpperCase()}
                </h3>
              </div>
              <div className="pt-7">
                <h4 className="text-xl mb-2">
                  {user?.firstName} {user?.lastName}
                </h4>
                <p className="text-sm opacity-60">{user?.email}</p>
              </div>
            </div>
          </div>
          <div className="mt-44 mb-10">
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6 h-[5rem] px-0 bg-transparent">
                <TabsTrigger className="h-[4rem]" value="general">
                  General
                </TabsTrigger>
                <TabsTrigger className="h-[4rem]" value="security">
                  Security
                </TabsTrigger>
                <TabsTrigger className="h-[4rem]" value="verification">
                  Verification
                </TabsTrigger>
              </TabsList>

              {/* General Settings */}
              <TabsContent value="general">
                <GeneralSettings />
              </TabsContent>

              {/* Security Settings */}
              <TabsContent value="security">
                <Security />
              </TabsContent>

              {/* Verification */}
              <TabsContent value="verification">
                <Verification />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </>
    </DashboardLayout>
  );
};

export default ProfileSettings;
