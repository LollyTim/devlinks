"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/libs/helpers/initializeAppwrite";
import Button from "@/components/ButtonComponent";
import Input from "@/components/FormInput";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    try {
      await login(email, password);
      alert('Login successful!');
      router.push('/');
    } catch (error) {
      console.error(error);
      setError("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <div className="w-full flex flex-col justify-start mt-12 sm:mt-0 items-center sm:justify-center mx-auto h-screen bg-whiteClr sm:bg-[#FAFAFA] text-black">
      <div className="flex flex-col lg:justify-center sm:items-center items-start h-[573px] sm:w-[476px] md:w-[476px] lg:w-[476px] w-[360px] gap-[51px]">
        <div className="flex flex-col justify-center items-center bg-whiteClr rounded-xl w-full px-6 py-6">
          <div className="flex flex-col justify-start items-start bg-whiteClr gap-[24px] w-full">
            <div>
              <h1 className="text-secondaryClr-black font-instrumentSans font-semibold text-3xl leading-[48px]">Login</h1>
              <p className="text-[16px] font-normal text-secondaryClr-default">Add your details below to log into your account</p>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <form className="w-full gap-[24px] flex flex-col" onSubmit={handleSubmit}>
              <Input
                label="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. alex@email.com"
                errorMessage={!email ? "Please enter a valid email" : ""}
              />
              <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                errorMessage={!password ? "Please enter a password" : ""}
              />
              <div>
                <Button size="full-width">Login</Button>
              </div>
              <p className="text-[16px] font-normal text-secondaryClr-default text-center flex flex-col sm:flex-row justify-center items-center">
                Don’t have an account? <span className="text-primaryClr-300 font-normal text-[16px] leading-[24px]"><a href="/auth/signup">Create account</a></span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
