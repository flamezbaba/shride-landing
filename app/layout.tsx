import type { Metadata } from "next";
import "./globals.css";
import "../styles/main.scss";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageLoader from "@/components/PageLoader";
import { ShrideModalProvider } from "@/hooks/useShrideModal";
import { Toaster } from "react-hot-toast";
import { LocationProvider } from "@/context/LocationContext";

export const metadata: Metadata = {
  title: "Shride App - Your Ultimate 5 star mobility app.",
  keywords: "bike in ibadan, hail ride, ride app. mobility app",
  description:
    "Shride is the ultimate 5 star mobility app that offers quick passenger pickup and pocket-size. We are a team of dynamic entrepreneurs with a knack of success filling the gap in TransTech in Africa",
  openGraph: {
    images: [
      {
        url: "https://xhome.shrideapp.com/icon.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* <PageLoader /> */}
        <Toaster />
        <LocationProvider>
          <ShrideModalProvider>
            <div className="w-full bg-white min-h-screen overflow-hidden">
              {children}
              <Footer />
            </div>
          </ShrideModalProvider>
        </LocationProvider>
      </body>
    </html>
  );
}
