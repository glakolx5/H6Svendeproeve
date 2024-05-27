import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SignIn } from "./components/auth/sign-in-button";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Inuit Iglo",
  description: "Rent houses or cabins",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SignIn></SignIn>
        {children}
      </body>
    </html>
  );
}
