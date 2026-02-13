import type { Metadata } from "next";
import "./globals.css";
import "../styles/main.scss";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageLoader from "@/components/PageLoader";
import { ShrideModalProvider } from "@/hooks/useShrideModal";
import { Toaster } from "react-hot-toast";
import { LocationProvider } from "@/context/LocationContext";
import Script from "next/script";

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
      {/* <Script
        src={`https://embed.tawk.to/6981fb982807131c36765928/1jghrtju1`}
        strategy="afterInteractive"
      />
      <Script id="tawk" strategy="afterInteractive">
        {`
           var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
          (function(){
          var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
          s1.async=true;
          s1.src='https://embed.tawk.to/6981fb982807131c36765928/1jghrtju1';
          s1.charset='UTF-8';
          s1.setAttribute('crossorigin','*');
          s0.parentNode.insertBefore(s1,s0);
          })();
          `}
      </Script> */}

      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=G-K0NY0FWW3Y`}
        strategy="afterInteractive"
      />
      <Script id="ga" strategy="afterInteractive">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-K0NY0FWW3Y');
          `}
      </Script>
      <body>
        <Toaster />
        <div className="w-full bg-white min-h-screen overflow-hidden">
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
