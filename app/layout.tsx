import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MetroFlow OCC — Dynamic Metro Schedule Intelligence",
  description:
    "AI-powered Operations Control Center for Ahmedabad-Gandhinagar Metro. Detects city events and injects supplementary trains automatically.",
  manifest: "/manifest.json",
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "MetroFlow",
  },
  keywords: ["metro", "GMRC", "Ahmedabad", "transit", "OCC", "schedule"],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#7D9BB3",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-dvh bg-[#F0F2F5] text-gray-900 antialiased overflow-hidden">
        {children}
      </body>
    </html>
  );
}
