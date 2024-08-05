"use client";

import {
  ArrowBackIosNewOutlined,
  ArrowForwardIosOutlined,
  DarkModeOutlined,
  LightModeOutlined,
  NotificationsNoneOutlined,
  Person2Outlined,
} from "@mui/icons-material";
import { useToggle } from "../context/ToggleContext";
import { useEffect, useState } from "react";

const NavBar: React.FC = () => {
  const { toggle, setToggle } = useToggle();
  const [darkMode, setDarkMode] = useState<boolean | null>(null);

  const handleMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    if (darkMode) {
      localStorage.setItem("darkMode", "true");
      document.documentElement.classList.add("dark");
    } else if (darkMode === false) {
      localStorage.setItem("darkMode", "false");
      document.documentElement.classList.remove("dark");
    } else {
      setDarkMode(localStorage.getItem("darkMode") === "true");
    }
  }, [darkMode]);

  return (
    <header className="flex shadow-sm bg-white dark:bg-gray-900 text-black dark:text-white font-[sans-serif] min-h-[70px]">
      <div
        className={`flex-1 transition-all duration-300 ${
          toggle ? "ml-[250px]" : "ml-[50px]"
        }`}
      >
        <div className="flex items-center justify-between px-1 py-3">
          <button
            id="toggleOpen"
            onClick={() => setToggle((prev) => !prev)}
            className="text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition duration-300 text-3xl"
          >
            {toggle ? <ArrowBackIosNewOutlined /> : <ArrowForwardIosOutlined />}
          </button>

          <div className="flex items-center space-x-8">
            <button onClick={handleMode}>
              {darkMode ? (
                <LightModeOutlined className="text-[#333] dark:text-gray-200 hover:fill-[#077bff] dark:hover:fill-[#4c9aff] text-3xl" />
              ) : (
                <DarkModeOutlined className="text-[#333] dark:text-gray-200 hover:fill-[#077bff] dark:hover:fill-[#4c9aff] text-3xl" />
              )}
            </button>
            <button>
              <NotificationsNoneOutlined className="text-[#333] dark:text-gray-200 hover:fill-[#077bff] dark:hover:fill-[#4c9aff] text-3xl" />
            </button>
            <button>
              <Person2Outlined className="text-[#333] dark:text-gray-200 hover:fill-[#077bff] dark:hover:fill-[#4c9aff] text-3xl" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
