import type { Metadata } from "next";
import { Inter } from "next/font/google"
import "./globals.css";
import { cn } from "@/lib/utils";
import { QueryProviders } from "@/components/query-provider";
import { NuqsAdapter } from 'nuqs/adapters/next/app'

const inter = Inter({ subsets: ["latin"] })
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
    <html lang="en" className="hydrated">
      <body
        className={cn(inter.className, "antialiased min-h-screen")}
      >
        <QueryProviders>
          <NuqsAdapter>
          {children}
          </NuqsAdapter>
        </QueryProviders>
      </body>
    </html>
  );
}
