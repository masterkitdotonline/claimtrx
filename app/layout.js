
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MonetagPush from "@/components/MonetagPush";
import MonetagBanner from "@/components/MonetagBanner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://claimtrx.netlify.app/"),

  title: {
    default: "Claim TRX",
    template: "%s | Claim TRX",
  },

  other: {
    monetag: "5410d19d52e8c03e485aa7aad0b16fd1",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        
        


        <main className="flex-1">
          {children}
        </main>
        

      </body>
    </html>
  );
}
