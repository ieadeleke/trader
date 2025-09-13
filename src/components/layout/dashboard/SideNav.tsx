"use client";
import Link from "next/link";

import { BiLogOut } from "react-icons/bi";
import { MdOutlineSupport } from "react-icons/md";
import { TbSmartHome } from "react-icons/tb";
import { TiDocumentText } from "react-icons/ti";
import { HiRectangleGroup } from "react-icons/hi2";
import { IoMdContacts } from "react-icons/io";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { apiFetch } from "@/utils/api";

const SideBar = () => {
  const pathName = usePathname();
  const [hasUnread, setHasUnread] = useState(false);

  useEffect(() => {
    let timer: any;

    const checkUnread = async () => {
      try {
        const res = await apiFetch(`/api/chat?limit=1&_=${Date.now()}` as any, {
          method: "GET",
          auth: true,
          // @ts-ignore
          cache: "no-store",
          headers: { "Cache-Control": "no-cache" },
        });
        const payload = await res.json();
        const last = payload?.data?.items?.[0];
        if (!last) return setHasUnread(false);
        const lastReadAt = Number(localStorage.getItem("chatLastReadAt") || 0);
        const lastTs = new Date(last.createdAt).getTime();
        // Unread if last admin message is newer than last read
        setHasUnread(last.sender === "admin" && lastTs > lastReadAt);
      } catch (_) {}
    };

    checkUnread();
    timer = setInterval(checkUnread, 4000);

    const onStorage = (e: StorageEvent) => {
      if (e.key === "chatLastReadAt") checkUnread();
    };
    window.addEventListener("storage", onStorage);

    return () => {
      timer && clearInterval(timer);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  return (
    <div className="relative h-full">
      <div className="px-5 pt-5">
        <div className="px-5 bg-[#FBFBFB] rounded-lg h-[6rem]"></div>
      </div>
      <ul className="flex flex-col gap-10 mt-10">
        <li>
          <Link
            className={`flex gap-3 items-center text-sm ${
              pathName === "/dashboard/home"
                ? "border-l-4 px-4 border-main border-solid text-main"
                : "text-white px-5"
            }`}
            href="/dashboard/overview"
          >
            <TbSmartHome className="text-xl text" /> Home
          </Link>
        </li>
        <li>
          <Link
            className={`flex gap-3 items-center text-sm ${
              pathName === "/dashboard/transactions"
                ? "border-l-4 px-4 text-main border-main border-solid"
                : "text-white px-5"
            }`}
            href="/dashboard/transactions"
          >
            <TiDocumentText className="text-xl text" /> Transactions
          </Link>
        </li>
        <li>
          <Link
            className={`flex gap-3 items-center text-sm ${
              pathName === "/dashboard/resume"
                ? "border-l-4 px-4 text-main border-main border-solid"
                : "text-white px-5"
            }`}
            href="/dashboard/market"
          >
            <TiDocumentText className="text-xl text" /> Markets
          </Link>
        </li>
        <li>
          <Link
            className={`flex gap-3 items-center text-sm ${
              pathName === "/dashboard/applications"
                ? "border-l-4 px-4 text-main border-main border-solid"
                : "text-white px-5"
            }`}
            href="/dashboard/overview/trade"
          >
            <HiRectangleGroup className="text-xl text" /> Trade
          </Link>
        </li>
        <li>
          <Link
            className={`flex gap-3 items-center text-sm ${
              pathName === "/dashboard/contacts"
                ? "border-l-4 px-4 text-main border-main border-solid"
                : "text-white px-5"
            }`}
            href="/dashboard/loans"
          >
            <IoMdContacts className="text-xl text" /> Loan
          </Link>
        </li>
        <li>
          <Link
            className={`flex gap-3 items-center text-sm ${
              pathName === "/dashboard/cover-letters"
                ? "border-l-4 px-4 text-main border-main border-solid"
                : "text-white px-5"
            }`}
            href="/dashboard/settings"
          >
            <IoMdContacts className="text-xl text" /> Profile Settings
          </Link>
        </li>
      </ul>
      <div className="absolute bottom-10 border-t-2 border-solid border-border w-full left-0">
        <ul className="flex flex-col px-5 pt-10 gap-10">
          <li>
            <Link
              href="/dashboard/support"
              className={`relative flex gap-3 items-center text-sm ${
                pathName === "/dashboard/support"
                  ? "border-l-4 px-4 text-main border-main border-solid"
                  : "text-white px-5"
              }`}
            >
              <MdOutlineSupport className="text-xl text" />
              <span>Support</span>
              {hasUnread && (
                <span className="ml-2 inline-block w-2.5 h-2.5 rounded-full bg-red-500" />
              )}
            </Link>
          </li>
          <li>
            <Link
              href=""
              className="flex gap-3 items-center text-white text-sm"
            >
              <BiLogOut className="text-xl text" /> Log Out
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
