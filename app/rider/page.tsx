"use client";

import { useMediaQuery } from "@reactuses/core";
import { useEffect, useState } from "react";
import PlayStoreLink from "@/components/PlayStoreLink";
import AppleStoreLink from "@/components/AppleStoreLink";
import FooterHero from "@/components/FooterHero";

export default function Business() {
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
    <div className="w-full lg:mt-10 overflow-hidden">
      <section className="w-full flex md:flex-col justify-between pl-[50px] md:pl-[20px]">
        <div className="w-1/2 md:w-full flex flex-col justify-center md:items-center">
          <p className="text-[4em] leading-tight md:text-[2.5em] md:text-center font-bold">
            Bye Bye to
            <br />
            finding
            <br />
            <span className="text-[var(--primary-color)]">Customers.</span>
          </p>

          <div className="flex items-center justify-start gap-10 mt-5">
            {/* <PlayStoreLink /> */}
            {/* <AppleStoreLink /> */}
            <a
              className="inline-flex gap-2 text-sm items-center rounded-full bg-[#131313] px-5 py-3 text-white hover:scale-95 duration-300"
              href="https://play.google.com/store/apps/details?id=com.shride.riderapp" target="_blank"
            >
              <img src="/img/google.png" className="w-[15px]" alt="" />
              Download Rider app
            </a>
          </div>
        </div>
        <div className="w-1/2 md:w-full md:mt-[30px] relative">
          <img src="/img/rider/1.png" className=" w-[70%] md:w-[80%]" alt="" />
        </div>
      </section>

      <section className="w-full flex md:flex-col justify-between place-items-center px-[50px] md:px-[20px] py-[130px] md:py-[90px]">
        <div className="w-1/2 md:w-full">
          <img src="/img/rider/2.png" className=" w-[80%] md:w-[80%]" alt="" />
        </div>

        <div className="w-1/2 md:w-full">
          <p className="text-[4em] leading-tight md:text-[2.5em] md:text-left font-bold">
            <span className="text-[var(--primary-color)]">Ride, </span>
            Deliver or do both!
          </p>

          <div className="mt-5 space-y-2">
            <div className="flex gap-2 items-center font-bold">
              <p className="text-xl md:text-lg font-light leading-relaxed">
                Say goodbye to riding around wasting expensive petrol to find
                passengers. Make money on your own terms as the boss, work on
                your own terms, cash out whenever you want. You can also set
                targets and meet your goals. With Shride, we guarantee you
                premium rides and fast earnings deposit. Sign up today, its
                quite easy!
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="">
        <FooterHero bgColor="#00a205" textColor="#fff" />
      </section>
    </div>
  );
}
