import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/lib/ToastContext";
import { ToastRenderer } from "@/components/ui/ToastRenderer";
import { GlobalToastHandler } from "@/components/ui/GlobalToastHandler";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "InterviewVault",
  description: "Smart Interview Preparation Workspace, Prepare for interviews efficiently with InterviewVault. Capture experiences, track progress, and organize questions in one powerful tool designed for serious candidates.",
  // icons:{
  //   icon: "/favicon.png",
  // }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ToastProvider>
          {children}
          <ToastRenderer />
          <GlobalToastHandler />
        </ToastProvider>
      </body>
    </html>
  );
}
