import "./globals.css";
import Link from "next/link";
import AuthStatus from "@/components/AuthStatus";
import type { ReactNode } from "react";

export const metadata = {
  title: "Wealth Dashboard",
  description: "Personal finance dashboard with charts and auth",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <header className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Wealth Dashboard</h1>
              <nav className="mb-1">
                <Link href="/overview">Overview</Link>
                <Link href="/transactions">Transactions</Link>
                <Link href="/alerts">Alerts</Link>
                <Link href="/analytics">Analytics</Link>
              </nav>
            </div>
            <AuthStatus />
          </header>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
