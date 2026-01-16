"use client";

import { motion } from "framer-motion";
import { useMediaQuery } from "@reactuses/core";
import { useEffect, useState } from "react";
import PlayStoreLink from "@/components/PlayStoreLink";
import AppleStoreLink from "@/components/AppleStoreLink";
import FooterHero from "@/components/FooterHero";
import Faqs from "@/components/Faqs";

export default function Delivery() {
  const isMobile = useMediaQuery(
    "(min-width: 0px) and (max-width: 850px)",
    true
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
    <div className="w-full lg:mt-20 overflow-hidden">
      <section className="w-full flex md:flex-col justify-between px-[50px] md:px-[20px]">
        <div className="w-1/2 md:w-full flex flex-col justify-center md:items-center">
          <p className="text-[5em] leading-tight md:text-[2.5em] md:text-center font-bold">
            <span className="text-[var(--primary-color)]">Frequently</span> Asked
            <br />
            <span className="text-[var(--primary-color)]">Questions.</span>
          </p>
        </div>
      </section>

      <section className="w-full px-[50px] md:px-[20px] py-[30px] md:py-[30px]">
        <Faqs />
      </section>

      <section className="">
        <FooterHero bgColor="#ff5001" textColor="#fff" />
      </section>
    </div>
  );
}
