import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import AuthProvider from "./AuthProvider";
import { CartHydration } from "@/components/CartHydration";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ThemedToaster } from "@/components/theme/ThemedToaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Swift Cart",
  description: "A Ecommerce service Providing platform",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          // Runs before first paint so a saved dark preference never flashes light.
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("swiftcart-theme");var d=t==="dark"||((t===null||t==="system")&&window.matchMedia("(prefers-color-scheme: dark)").matches);var r=document.documentElement;r.classList.toggle("dark",d);r.style.colorScheme=d?"dark":"light";}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col ">
        <ThemeProvider>
          <AuthProvider>
            <Navbar />
            <div className="w-full max-w-7xl mx-auto px-4">
              <CartHydration />
              {children}
              <ThemedToaster />
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
