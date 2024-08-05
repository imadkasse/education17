"use client ";

import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Login = () => {
  const [username, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();
  const [darkMode, setDarkMode] = useState<boolean | null>(null);
  const handelMode = () => {
    setDarkMode(!darkMode);
  };
  useEffect(() => {
    if (darkMode) {
      localStorage.setItem("darkMode", "true");
      window.document.documentElement.classList.add("dark");
    } else if (darkMode === false) {
      localStorage.setItem("darkMode", "false");
      window.document.documentElement.classList.remove("dark");
    } else {
      setDarkMode(localStorage.getItem("darkMode") === "true");
    }
  }, [darkMode]);
  const handelLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios
        .post("/api/login", { username: username, password: password })
        .then(() => {
          console.log("good");
        });
      setUserName("");
      setPassword("");
      router.push("dashborad");
    } catch (error) {
      console.log("opps an error");
    }
  };
  return (
    <div className="h-[100vh] dark:bg-black">
      <button onClick={handelMode} className=" ">
        {darkMode === true ? (
          <LightModeOutlined className="text-[#333] dark:text-gray-200 hover:fill-[#077bff] dark:hover:fill-[#4c9aff] text-3xl" />
        ) : (
          <DarkModeOutlined className="text-[#333] dark:text-gray-200 hover:fill-[#077bff] dark:hover:fill-[#4c9aff] text-3xl" />
        )}
      </button>
      <form
        className="flex flex-col justify-center  max-w-sm mx-auto h-full"
        onSubmit={handelLogin}
      >
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Your username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="username"
            required
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Your password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
