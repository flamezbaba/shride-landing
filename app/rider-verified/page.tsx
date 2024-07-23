"use client";

import { useMediaQuery } from "@reactuses/core";
import { useEffect, useState } from "react";
import PlayStoreLink from "@/components/PlayStoreLink";
import AppleStoreLink from "@/components/AppleStoreLink";
import FooterHero from "@/components/FooterHero";

export default function RiderVerified() {
  const isMobile = useMediaQuery(
    "(min-width: 0px) and (max-width: 850px)",
    false
  );
  const [animateValues, setAnimateValues] = useState<{
    heroRight: number;
    marginMove: number;
  }>({
    heroRight: 130,
    marginMove: 100,
  });

  useEffect(() => {
    if (isMobile) {
      setAnimateValues({ ...animateValues, heroRight: 90, marginMove: 100 });
    } else {
      setAnimateValues({ ...animateValues, heroRight: 140, marginMove: 500 });
    }
    console.log("view is", isMobile);
  }, [isMobile]);

  return (
    <div className="w-full min-h-screen md:mt-[-200px] md:px-[10px] flex justify-center items-center text-white">
      <div className="w-[600px] md:w-full px-10 md:px-3 py-20 md:py-15 bg-slate-700 rounded-[40px] flex flex-col justify-center items-center">
        <div className="flex md:gap-1 items-center">
          <img src="/img/verified.png" className="w-[100px] md:w-[30px]" alt="" />
          <div className="leading-none">
            <p className="font-bold text-[4rem] md:text-[2rem] leading-none">Verified</p>
            <p className="text-right font-light md:text-[14px] text-lg leading-none">rider with shride</p>
          </div>
        </div>

        <div className="mt-[50px] space-y-5">
          <div className="flex items-center gap-3 text-lg">
            <img src="/img/check.png" className="w-[25px] md:w-[18px]" alt="" />
            <span className="md:text-sm">Phone Number</span>
          </div>

          <div className="flex items-center gap-3 text-lg">
            <img src="/img/check.png" className="w-[25px] md:w-[18px]" alt="" />
            <span className="md:text-sm">Driver&apos;s License</span>
          </div>

          <div className="flex items-center gap-3 text-lg">
            <img src="/img/check.png" className="w-[25px] md:w-[18px]" alt="" />
            <span className="md:text-sm">Training</span>
          </div>

          <div className="flex items-center gap-3 text-lg">
            <img src="/img/check.png" className="w-[25px] md:w-[18px]" alt="" />
            <span className="md:text-sm">Vehicle</span>
          </div>

          <div className="flex items-center gap-3 text-lg">
            <img src="/img/check.png" className="w-[25px] md:w-[18px]" alt="" />
            <span className="md:text-sm">Email</span>
          </div>
        </div>
      </div>
    </div>
  );
}
