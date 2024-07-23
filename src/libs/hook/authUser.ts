// lib/hooks/useAuth.ts
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { account } from "../helpers/initializeAppwrite";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await account.get();
        setIsAuthenticated(true);
      } catch (error) {
        router.push("/auth/login");
      }
    };

    checkAuth();
  }, [router]);

  return isAuthenticated;
};

export default useAuth;
