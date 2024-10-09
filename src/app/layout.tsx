import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";
import { UserProvider } from "@/components/userProvider";
import { Toaster } from "@/components/ui/sonner"
import { TelegramProvider } from "@/components/TelegramProvider";
import Nav from "@/components/Nav";

const inter = Inter({ subsets: ["latin"] });



export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  // Also supported by less commonly used
  // interactiveWidget: 'resizes-visual',
}

export const metadata: Metadata = {
  title: "xsname"
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          <TelegramProvider>
            <LanguageProvider>
              <Nav />
              {children}
            </LanguageProvider>
          </TelegramProvider>
        </UserProvider>
      </body>
    </html>
  );
}
