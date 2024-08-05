"use client";

import Image from "next/image";
import Login from "@/components/login/Login";

export default function Home() {
  return (
    <main className={`flex-1 transition-all duration-300 `}>
      <Login />
    </main>
  );
}
