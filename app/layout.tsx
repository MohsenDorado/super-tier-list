import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import Header from "@/components/header/Header";
import CustomFooter from "@/components/mobile/CustomFooter";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="">
      <body className={inter.className}>

      

        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          >
            <Header/>
            {/* <TestHeader/> */}
          {children}
        <CustomFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
