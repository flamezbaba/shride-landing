"use client";

import { useMediaQuery } from "@reactuses/core";
import { useEffect, useState } from "react";
import PlayStoreLink from "@/components/PlayStoreLink";
import AppleStoreLink from "@/components/AppleStoreLink";


export default function Ride() {
  const isMobile = useMediaQuery("(min-width: 0px) and (max-width: 850px)", false);
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
    <div className="w-full lg:mt-10 overflow-hidden">
      <section className="w-full flex md:flex-col justify-between pl-[50px] md:pl-[20px]">
        <div className="w-1/2 md:w-full flex flex-col justify-center md:items-center">
          <p className="text-[4em] leading-tight md:text-[2.5em] md:text-center font-bold">
            Experience the difference with <br />
            <span className="text-[var(--primary-color)]">Shride</span>.
          </p>

          <div className="flex items-center justify-start gap-10 mt-5">
            <PlayStoreLink />
            <AppleStoreLink />
          </div>
        </div>
        <div className="w-1/2 md:w-full md:mt-[30px] relative">
          <img src="/img/ride/1.png" className=" w-[70%] md:w-[80%]" alt="" />
        </div>
      </section>

      <section className="w-full flex md:flex-col justify-between place-items-center px-[50px] md:px-[20px] py-[130px] md:py-[90px]">
        <div className="w-1/2 md:w-full">
          <img src="/img/ride/2.png" className=" w-[70%] md:w-[80%]" alt="" />
        </div>

        <div className="w-1/2 md:w-full">
          <p className="text-[4em] leading-tight md:text-[2.5em] md:text-left font-medium">
            Your ride is just few taps away.
          </p>

          <div className="mt-5 space-y-2">
            <div className="flex gap-2 items-center font-medium">
              <p className="text-xl md:text-lg font-light leading-relaxed">
                Getting a ride should be sharp sharp! With Shride, we match you
                with premium and well-vetted riders quickly; and get you to your
                destination as fast as possible. You can order a ride through
                the app and also add a stop during your trip, you can even
                schedule a ride ahead. Our payment system is user-friendly and
                quick. Everything happens like magic!
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
