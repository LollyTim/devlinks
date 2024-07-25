"use client"
import HeaderComponent from "@/components/HeaderComponent";
// import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });


export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                {/* <HeaderComponent /> */}
                {children}
            </body>
        </html>
    );
}
