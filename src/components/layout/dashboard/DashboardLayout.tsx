import React from "react";
import SideBar from "./SideNav";

import { BiLogOut } from "react-icons/bi";
import { IoNotifications } from "react-icons/io5";
import { FaRegCircleUser } from "react-icons/fa6";
import Link from "next/link";

import { IoNotificationsOutline } from "react-icons/io5";
import { VscSettingsGear } from "react-icons/vsc";
import { TbPlus } from "react-icons/tb";
import { useAuth } from "@/context/AuthContext";
// import useUser from "@/hooks/useUser";

interface DashboardInterface {
  pageTitle: string;
  children: React.ReactElement;
}

const DashboardLayout = (props: DashboardInterface) => {
    let { user } = useAuth();
  return (
    <div className="flex bg-[#FBFBFB] overflow-hidden h-screen main-dashboard-sect">
      <div className="w-[250px] float-left h-full bg- [#0A0A0A] border-r border-solid border-border [#272C34] [#8E91A6]">
        <SideBar />
      </div>
      <div className="flex-1 overflow-scroll relative">
        <div className="h-[4.5rem] flex text-black items-center justify-between border-b border-solid border-[#272C34] bg- white px-10">
          <h3 className="text-lg font-bold text-white">{props.pageTitle}</h3>
          <div>
            <ul className="flex items-center gap-5">
              <li>
                <Link
                  href=""
                  className="border border-solid border-[#eaecef] flex items-center justify-center rounded-full size-8"
                >
                  <IoNotificationsOutline className="text-base text-[#eaecef]" />
                </Link>
              </li>
              <li>
                <Link
                  href=""
                  className="border border-solid border-[#eaecef] flex items-center justify-center rounded-full size-8"
                >
                  <VscSettingsGear className="text-[14px] text-[#eaecef]" />
                </Link>
              </li>
              <li>
                <Link
                  href=""
                  className="border border-solid border-[#eaecef] flex items-center justify-center rounded-full size-8"
                >
                  <TbPlus className="text-base text-[#eaecef]" />
                </Link>
              </li>
              <li className="border-[#eaecef] border-solid border rounded-full py-2 px-2 flex items-center gap-2">
                <div className="size-8 bg-[#eaecef] flex justify-center items-center rounded-full">
                  <h4 className="text-black text-xs">
                    {user?.firstName.slice(0, 1).toUpperCase()}{" "}
                    {user?.lastName.slice(0, 1).toUpperCase()}
                  </h4>
                </div>
                <p className="text-sm text-[#eaecef]">
                  {user?.firstName} {user?.lastName}
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex main-content flex-col">{props.children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
