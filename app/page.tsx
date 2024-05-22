"use client";

import { motion } from "framer-motion";
import { useMediaQuery } from "@reactuses/core";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import k2 from "@/public/img/home/2.png";
import hb from "@/public/img/home/3.png";
import hm from "@/public/img/home/m.png";
import ht from "@/public/img/home/t.png";
import bg1 from "@/public/img/home/bg1.png";
import { useEffect, useState } from "react";
import PlayStoreLink from "@/components/PlayStoreLink";
import AppleStoreLink from "@/components/AppleStoreLink";
import Faqs from "@/components/Faqs";

const SERVICES = [
  {
    title: "Rides",
    subTitle: "Request for rides<br /> get a rider immediately",
    image: "/img/services/bike.png",
    link: "#",
  },
  {
    title: "Deliveries",
    subTitle: "Send and Receive<br /> packages faster anywhere",
    image: "/img/services/d.png",
    link: "#",
  },
  {
    title: "Deliveries",
    subTitle: "Comfortable ride share<br /> made easy anytime always",
    image: "/img/services/t.png",
    link: "#",
  },
];

export default function Home() {
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
    <div className="w-full overflow-hidden">
      <section className="w-full flex md:flex-col justify-between pl-[50px] md:pl-[20px]">
        <div className="w-1/2 md:w-full flex flex-col justify-center md:items-center">
          <p className="text-[5em] leading-tight md:text-[3em] md:text-center font-bold">
            Go anywhere
            <br /> with{" "}
            <span className="text-[var(--primary-color)]">Shride</span>,
            <br /> Anytime.
          </p>

          <div className="mt-5 space-y-2">
            <div className="flex gap-2 items-center font-medium">
              <IoIosCheckmarkCircleOutline color="#01a206" size={15} />
              <p className="text-lg font-light">
                Order ride from the comfort of your home.
              </p>
            </div>
            <div className="flex gap-2 items-center font-medium">
              <IoIosCheckmarkCircleOutline color="#01a206" size={15} />
              <p className="text-lg font-light">
                {" "}
                Get picked up from your doorstep anytime.{" "}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-start gap-10 mt-5">
            <PlayStoreLink />
            <AppleStoreLink />
          </div>
        </div>
        <div className="w-1/2 md:w-full relative">
          <img src="/img/home/1.png" className="md:w-[80%]" alt="" />

          <motion.img
            src={k2.src}
            initial={{ opacity: 0, right: -200 }}
            animate={{ opacity: 1, right: animateValues.heroRight }}
            transition={{ duration: 3, type: "spring" }}
            className="w-[300px] md:w-[150px] absolute bottom-0"
          />
        </div>
      </section>

      <section className="py-[50px] px-[50px]">
        <header className="text-center text-5xl md:text-3xl font-medium">
          Our Services
        </header>
        <div className="w-full grid grid-cols-3 md:grid-cols-1 gap-10 md:gap-2">
          {SERVICES.map((i, index) => (
            <div
              key={index}
              className="mt-10 h-[200px] rounded-2xl bg-[#F5F4F7] overflow-hidden relative"
            >
              <div className="px-10 pt-10">
                <p className="text-left text-2xl md:text-xl font-medium">
                  {i.title}
                </p>
              </div>
              <div className="flex justify-between gap-4">
                <p
                  className="text-left pl-10 mt-5 font-light"
                  dangerouslySetInnerHTML={{ __html: i.subTitle }}
                ></p>
                <img src={i.image} width="100" alt="" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full flex md:flex-col justify-between place-items-center pl-[50px] md:px-[20px] py-[30px] md:py-[20px]">
        <div className="w-1/2 md:w-full md:translate-y-[340px]">
          <p className="text-[4em] leading-tight md:text-[2.5em] md:text-left font-medium">
            Become a rider
          </p>

          <div className="mt-5 space-y-2">
            <div className="flex gap-2 items-center font-medium">
              <p className="text-xl md:text-lg font-light leading-relaxed">
                Ride when you want, make the money you need.
                <br />
                Maximize your riding time by making deliveries or giving
                rides—or do both!
              </p>
            </div>
          </div>

          <div className="mt-8">
            <a
              href=""
              className="inline-flex rounded-full bg-[var(--primary-color)] px-5 py-3 text-white hover:scale-95 duration-300"
            >
              Get Started
            </a>
          </div>
        </div>
        <div className="w-1/2 md:w-full md:-translate-y-[230px]">
          <motion.img
            key="hb"
            src={hb.src}
            initial={{ opacity: 0, marginLeft: animateValues.marginMove }}
            whileInView={{ opacity: 1, marginLeft: 20 }}
            transition={{ duration: 2, type: "spring" }}
            className="w-[70%] md:w-[300px]"
          />
        </div>
      </section>

      <section className="w-full flex md:flex-col justify-between place-items-center pl-[50px] md:pl-[20px] py-[30px] md:py-[60px]">
        <div className="w-1/2 md:w-full ">
          <motion.img
            key="hm"
            src={hm.src}
            initial={{ opacity: 0, marginLeft: -animateValues.marginMove }}
            whileInView={{ opacity: 1, marginLeft: 20 }}
            transition={{ duration: 3, type: "spring" }}
            className="w-[70%] md:w-[300px]"
          />
        </div>
        <div className="w-1/2 md:w-full ">
          <p className="text-[4em] md:text-left leading-tight md:text-[2em] font-medium">
            Become a Merchant
          </p>

          <div className="mt-5 space-y-2">
            <div className="flex gap-2 items-center font-medium">
              <p className="text-xl font-light leading-relaxed">
                Who doesnt support a small business? definitely not us.
                <br />
                We exist because you do. <br />
                Shride offers a platform for you to grow your business.
              </p>
            </div>
          </div>

          <div className="mt-8">
            <a
              href=""
              className="inline-flex rounded-full bg-[var(--primary-color)] px-5 py-3 text-white hover:scale-95 duration-300"
            >
              Get Started
            </a>
          </div>
        </div>
      </section>

      <section className="w-full flex md:flex-col justify-between place-items-center pl-[50px] md:pl-[20px] py-[30px] md:py-[60px]">
        <div className="w-1/2 md:w-full md:translate-y-[300px]">
          <p className="text-[4em] md:text-left leading-tight md:text-[2em] font-medium">
            Try the App
          </p>

          <div className="mt-2 space-y-2">
            <div className="flex gap-2 items-center font-medium">
              <p className="text-xl font-light leading-relaxed">
                Getting around or sending items should be in a jiffy! and stress
                free.
                <br />
                With Shride, its quicker and easier.
              </p>
            </div>
          </div>

          <div className="mt-8">
            <a
              href=""
              className="inline-flex rounded-full bg-[var(--primary-color)] px-5 py-3 text-white hover:scale-95 duration-300"
            >
              Get Started
            </a>
          </div>
        </div>
        <div className="w-1/2 md:w-full relative md:-translate-y-[270px]">
          <motion.img
            key="ht"
            src={ht.src}
            initial={{ opacity: 0, marginLeft: animateValues.marginMove }}
            whileInView={{ opacity: 1, marginLeft: 20 }}
            transition={{ duration: 2, type: "spring" }}
            className="w-[70%] md:w-[300px]"
          />
        </div>
      </section>

      <section className="w-full px-[50px] md:px-[20px] py-[50px]">
        <Faqs />
      </section>
    </div>
  );
}
