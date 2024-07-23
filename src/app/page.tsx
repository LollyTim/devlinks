"use client";

import HeaderComponent from "@/components/HeaderComponent";
import useAuth from "@/libs/hook/authUser";
import Image from "next/image";

export default function Home() {

  const isAuthenticated = useAuth();

  if (!isAuthenticated) {
    return null; // or a loading spinner
  }
  return (
    <main className="flex min-h-screen flex-col w-full ">
      <HeaderComponent />

    </main>
  );
}
