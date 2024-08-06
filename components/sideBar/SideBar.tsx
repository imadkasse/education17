"use client";

import React, { ReactNode } from "react";
import { DashboardOutlined } from "@mui/icons-material";
import Link from "next/link";
import Image from "next/image";
import { useToggle } from "../context/ToggleContext";

type Data = {
  id: number;
  href: string;
  title: string;
  icon: ReactNode;
};

const dataNav: Data[] = [
  {
    id: 0,
    href: "/schoolinfo", // تم تصحيح الرابط من "/dashborad" إلى "/dashboard"
    title: "معلومات المؤسسة",
    icon: <DashboardOutlined className="text-[#333] dark:text-gray-400" />,
  },
  {
    id: 1,
    href: "/", // تم تصحيح الرابط من "/dashborad" إلى "/dashboard"
    title: "معلومات المؤسسة",
    icon: <DashboardOutlined className="text-[#333] dark:text-gray-400" />,
  },
];

const SideBar: React.FC = () => {
  const { toggle } = useToggle();

  return (
    <nav
      className={`bg-white dark:bg-gray-900 h-screen fixed top-0 left-0 py-6 font-[sans-serif] transition-all duration-300 ${
        toggle ? "w-[250px]" : "w-[50px]"
      } border-r-2 border-black/40 dark:border-gray-500`}
    >
      
      <div className="overflow-auto py-6 h-full mt-6">
        <ul className="space-y-1">
          {dataNav.map((link) => (
            <li key={link.id}>
              <Link
                href={link.href}
                className={`text-[#333] dark:text-white hover:text-[#077bff] dark:hover:text-[#3399ff] text-[15px] flex gap-2 items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-800 rounded px-2 py-3 transition-all`}
              >
                {link.icon}
                {toggle && <span className="text-xl">{link.title}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default SideBar;
