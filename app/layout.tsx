import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MetroFlow — Offline Metro Super App",
  description: "Offline-first predictive transit copilot for Ahmedabad-Gandhinagar Metro",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "MetroFlow"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#7D9BB3"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#F0F2F5] text-gray-900 antialiased selection:bg-[#7D9BB3] selection:text-white">
        {children}
      </body>
    </html>
  );
}
