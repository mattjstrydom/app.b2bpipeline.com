import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "B2B Pipeline — the pipeline for your partners",
  description:
    "Track partner deals, referrals, and commissions in one simple B2B pipeline. The affordable alternative to enterprise PRM.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
