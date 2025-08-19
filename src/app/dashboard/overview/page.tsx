"use client";

import CryptoDashboard from "@/components/dashboard/CryptoDashboard";
import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Modal } from "antd";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

const Dashboard = () => {
  const [openApplicationModal, setOpenApplicationModal] =
    useState<boolean>(false);

  const { handleSubmit, control } = useForm({});

  const toggleApplicationModal = () => {
    setOpenApplicationModal(!openApplicationModal);
  };

  return (
    <>
      <DashboardLayout pageTitle="Dashboard">
        <>
          <div>
            <div className="w-[85%] pt-20 pb-20 mx-auto">
                <CryptoDashboard />
            </div>
          </div>
          <Modal
            onCancel={toggleApplicationModal}
            open={openApplicationModal}
            footer={null}
          >
            <div className="py-3">
              <div className="text-center mb-5">
                <h4 className="text-2xl text-center mb-2 font-bold">
                  Create New Job Listing
                </h4>
                <p className="text-sm leading-relaxed w-[70%] mx-auto">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. A,
                  architecto libero.
                </p>
              </div>
              <form action="">
                <div className="form-group mb-3">
                  <Label className="text-sm font-normal">Job Title</Label>
                  <Controller
                    name="jobTitle"
                    control={control}
                    render={({ field }) => (
                      <Input className="text-xs px-2 py-7" {...field} />
                    )}
                  />
                </div>
                <div className="form-group mb-3">
                  <Label className="text-sm font-normal">Company Name</Label>
                  <Controller
                    name="companyName"
                    control={control}
                    render={({ field }) => (
                      <Input className="text-xs px-2 py-7" {...field} />
                    )}
                  />
                </div>
                <div className="form-group mb-3">
                  <Label className="text-sm font-normal">Job Type</Label>
                  <Controller
                    name="jobType"
                    control={control}
                    render={({ field }) => (
                      <Select {...field}>
                        <SelectTrigger className="py-7">
                          <SelectValue placeholder="Select Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem
                            className="py-5 cursor-pointer"
                            value="light"
                          >
                            Remote
                          </SelectItem>
                          <SelectItem
                            className="py-5 cursor-pointer"
                            value="dark"
                          >
                            Hybrid
                          </SelectItem>
                          <SelectItem
                            className="py-5 cursor-pointer"
                            value="system"
                          >
                            Physical
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <div className="form-group mb-5">
                  <Label className="text-sm font-normal">Employment Type</Label>
                  <Controller
                    name="employmentType"
                    control={control}
                    render={({ field }) => (
                      <Select {...field}>
                        <SelectTrigger className="py-7">
                          <SelectValue placeholder="Select Employment Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem
                            className="py-5 cursor-pointer"
                            value="fulltime"
                          >
                            Full-time
                          </SelectItem>
                          <SelectItem
                            className="py-5 cursor-pointer"
                            value="parttime"
                          >
                            Part-time
                          </SelectItem>
                          <SelectItem
                            className="py-5 cursor-pointer"
                            value="contract"
                          >
                            Contract
                          </SelectItem>
                          <SelectItem
                            className="py-5 cursor-pointer"
                            value="internship"
                          >
                            Internship
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <Button className="py-7 w-full bg-main text-center text-sm rounded-lg text-white font-medium">
                  Create Job Application
                </Button>
              </form>
            </div>
          </Modal>
        </>
      </DashboardLayout>
    </>
  );
};

export default Dashboard;
