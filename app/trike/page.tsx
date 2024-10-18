"use client";

import { motion } from "framer-motion";
import { useMediaQuery } from "@reactuses/core";
import { useEffect, useState } from "react";
import PlayStoreLink from "@/components/PlayStoreLink";
import AppleStoreLink from "@/components/AppleStoreLink";
import FooterHero from "@/components/FooterHero";

export default function Trike() {
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
    <div className="w-full lg:mt-10 overflow-hidden">
      <section className="w-full flex md:flex-col justify-between px-[50px] md:px-[20px]">
        <div className="w-1/2 md:w-full flex flex-col justify-center md:items-center">
          <div className="text-[4em] leading-tight md:text-[2.5em] font-bold block">
            <span className="text-black2 bg-[#6eff8f] px-2 py-1 rounded-lg">
              Keke
            </span>
            <span className="text-white bg-[#d90298] px-2 py-1 rounded-lg ml-2">
              For
            </span>
            <div className="h-3"></div>
            <span className="text-black2 bg-[#ffc0cb] px-2 py-1 rounded-lg">
              Delivery
            </span>
            <span className="text-black2 bg-[#baacff] px-2 py-1 rounded-lg ml-2">
              or
            </span>
            <div className="h-3"></div>
            <span className="text-white bg-[#ff5001] mt-3 px-2 py-1 rounded-lg">
              Commute
            </span>
          </div>
        </div>
        <div className="w-1/2 md:w-full md:mt-[30px] relative">
          <img
            src="/img/trike/1.png"
            className="w-[80%] md:w-[80%] float-right"
            alt=""
          />
        </div>
      </section>

      <section className="w-full flex md:flex-col justify-between place-items-center px-[50px] md:px-[20px] py-[130px] md:py-[90px]">
        <div className="w-1/2 md:w-full">
          <img src="/img/trike/2.png" className=" w-[70%] md:w-[80%]" alt="" />
        </div>

        <div className="w-1/2 md:w-full">
          <p className="text-[4em] leading-tight md:text-[2.5em] md:text-left font-bold">
            <span className="text-black2 bg-[#ffc0cb] px-2 py-1 rounded-lg">
              Delivery
            </span>
          </p>

          <div className="mt-5 space-y-2">
            <div className="flex gap-2 items-center font-medium">
              <p className="text-xl md:text-lg font-light leading-relaxed">
                Your package will always get to you. We have mastered the art of
                delivery, so trust us when we say we know a thing or two about
                successful delivery. When you want to send an item, our app
                generates a unique code for you that the recipient will give our
                rider for verification.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full flex md:flex-col justify-between px-[50px] md:px-[20px]">
        <div className="w-1/2 md:w-full flex flex-col justify-center md:items-center">
          <p className="text-[4em] leading-tight md:text-[2.5em] md:text-center font-bold">
            <span className="text-white bg-[#ff5001] mt-3 px-2 py-1 rounded-lg">
              Commute
            </span>
          </p>

          <div className="flex items-center justify-start gap-10 mt-5">
            <p className="text-xl md:text-lg font-light leading-relaxed">
              With Shride, you can choose to travel alone with our premium and
              well vetted drivers or you choose to hop on a trike with other
              shriders, whichever works for you works for us. If you choose to
              ride-share, all you have to do is walk to the nearest pickup point
              closest to you which will be shown on the map. At Shride, we are
              big on reducing carbon footprint while still making sure you get
              to your destination safely in style.
            </p>
          </div>
        </div>
        <div className="w-1/2 md:w-full md:mt-[30px] relative">
          <img
            src="/img/trike/3.png"
            className=" w-[70%] md:w-[80%] float-right"
            alt=""
          />
        </div>
      </section>

      <section className="">
        <FooterHero bgColor="#00a205" textColor="#fff" />
      </section>
    </div>
  );
}
