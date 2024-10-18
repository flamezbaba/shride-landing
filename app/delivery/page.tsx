"use client";

import { motion } from "framer-motion";
import { useMediaQuery } from "@reactuses/core";
import { useEffect, useState } from "react";
import PlayStoreLink from "@/components/PlayStoreLink";
import AppleStoreLink from "@/components/AppleStoreLink";
import FooterHero from "@/components/FooterHero";

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
    <div className="w-full lg:mt-10 overflow-hidden">
      <section className="w-full flex md:flex-col justify-between px-[50px] md:px-[20px]">
        <div className="w-1/2 md:w-full flex flex-col justify-center md:items-center">
          <p className="text-[5em] leading-tight md:text-[2.5em] md:text-center font-bold">
            <span className="text-[var(--primary-color)]">Snap</span> it to
            <br />
            <span className="text-[var(--primary-color)]">Weigh</span> it.
          </p>

          <div className="flex items-center justify-start gap-10 mt-5">
            <p className="text-xl md:text-lg font-light leading-relaxed">
              Say goodbye to the era of Length X Width. Welcome to the world of
              <span className="font-bold"> snap to weigh</span>. With our AI
              powered technology, all you have to do is point your camera at
              your package, take a picture of it and thats it! Welcome to the
              future.
            </p>
          </div>
        </div>
        <div className="w-1/2 md:w-full md:mt-[30px] relative">
          <img
            src="/img/delivery/1.png"
            className="w-[70%] md:w-[80%] float-right"
            alt=""
          />
        </div>
      </section>

      <section className="w-full flex md:flex-col justify-between place-items-center px-[50px] md:px-[20px] py-[130px] md:py-[90px]">
        <div className="w-1/2 md:w-full">
          <img
            src="/img/delivery/2.png"
            className=" w-[70%] md:w-[80%]"
            alt=""
          />
        </div>

        <div className="w-1/2 md:w-full">
          <p className="text-[4em] leading-tight md:text-[2.5em] md:text-left font-bold">
            <span className="text-[var(--primary-color)]">2FA</span> for you to
            secure your
            <br />
            <span className="text-[var(--primary-color)]"> Package.</span>
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
            Your <span className="text-[var(--primary-color)]">Packages</span>
            <br />
            are <span className="text-[var(--primary-color)]">Insured</span> up
            to 10,000 naira.
          </p>

          <div className="flex items-center justify-start gap-10 mt-5">
            <p className="text-xl md:text-lg font-light leading-relaxed">
              In an event of an accident, loss, damage or unforeseen occurrences
              all packages are insured up to ten thousand Naira! send and
              receive items with peace of mind, you are always protected.
            </p>
          </div>
        </div>
        <div className="w-1/2 md:w-full md:mt-[30px] relative">
          <img
            src="/img/delivery/3.png"
            className=" w-[70%] md:w-[80%] float-right"
            alt=""
          />
        </div>
      </section>

      <section className="w-full flex md:flex-col justify-between mt-15 px-[50px] md:px-[20px]">
        <div className="w-1/2 md:w-full flex flex-col justify-center md:items-center">
          <p className="text-[4em] leading-tight md:text-[2.5em] md:text-center font-bold">
          Small, medium or large <span className="text-[var(--primary-color)]">Items?</span> 
            
            <br />
            we've got you.
          </p>

         
        </div>
        <div className="w-1/2 md:w-full md:mt-[30px] relative">
          <img
            src="/img/delivery/4.png"
            className="w-[70%] md:w-[80%] float-right"
            alt=""
          />
        </div>
      </section>

      <section className="">
        <FooterHero bgColor="#ffff00" textColor="#fff" />
      </section>
    </div>
  );
}
