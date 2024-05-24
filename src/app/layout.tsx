import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/navbar/Navbar";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stealth Feedback",
  description: "Dive into the World of Anonymous Feedback",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning={true} lang="en">
      <body
        suppressHydrationWarning={true}
        className={cn("min-h-screen relative", inter.className)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <Navbar />
          {children}
          <Analytics />
          {/* Footer */}
          <footer className="text-center sm:text-base text-sm border-t border-muted p-4 md:p-6">
            © 2023 Stealth Feedback. All rights reserved.
          </footer>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
