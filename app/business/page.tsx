"use client";

import { motion } from "framer-motion";
import { useMediaQuery } from "@reactuses/core";
import { useEffect, useState } from "react";
import PlayStoreLink from "@/components/PlayStoreLink";
import AppleStoreLink from "@/components/AppleStoreLink";

export default function Business() {
  const isMobile = useMediaQuery("(min-width: 0px) and (max-width: 850px)", true);
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
            Small <span className="text-[var(--primary-color)]">Business?</span>{" "}
            <br />
            We dey for{" "}<span className="text-[var(--primary-color)]"> you!</span>.
          </p>

          <div className="flex items-center justify-start gap-10 mt-5">
            <PlayStoreLink />
            <AppleStoreLink />
          </div>
        </div>
        <div className="w-1/2 md:w-full md:mt-[30px] relative">
          <img src="/img/business/1.png" className=" w-[70%] md:w-[80%]" alt="" />
        </div>
      </section>

      <section className="w-full flex md:flex-col justify-between place-items-center px-[50px] md:px-[20px] py-[130px] md:py-[90px]">
        <div className="w-1/2 md:w-full">
          <img src="/img/business/2.png" className=" w-[70%] md:w-[80%]" alt="" />
        </div>

        <div className="w-1/2 md:w-full">
          <p className="text-[4em] leading-tight md:text-[2.5em] md:text-left font-medium">
            Sending
            <br/>
            <span className="text-[var(--primary-color)]"> Packages?</span>
          </p>

          <div className="mt-5 space-y-2">
            <div className="flex gap-2 items-center font-medium">
              <p className="text-xl md:text-lg font-light leading-relaxed">
                Running a business could be stressful, logistics should not. At
                Shride, we pay attention to your business. Let us handle sending
                and receiving items for you. We offer a platform where you can
                track sales, receive orders, explore growth and plan ahead. At
                Shride, we got you covered!
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
