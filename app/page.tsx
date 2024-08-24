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
import ComingSoonLink from "@/components/ComingSoonLink";
import Faqs from "@/components/Faqs";
import FooterHero from "@/components/FooterHero";

const SERVICES = [
  {
    title: "Rides.",
    subTitle: "Request for rides,<br /> get a rider immediately.",
    image: "/img/services/bike.png",
    link: "#",
    soon: false,
    bg: "#e1eee1",
  },
  {
    title: "Deliveries.",
    subTitle: "Send and Receive<br /> packages faster anywhere.",
    image: "/img/services/d.png",
    link: "#",
    soon: false,
    bg: "#fbe1e1",
  },
  {
    title: "Trike.",
    subTitle: "Comfortable ride share<br /> made easy anytime.",
    image: "/img/services/t.png",
    link: "#",
    soon: true,
    bg: "#e1e1fb",
  },
  {
    title: "Business.",
    subTitle: "Grow, get feedback<br /> and manage your business.",
    image: "/img/services/b.png",
    link: "#",
    soon: true,
    bg: "#fbfbe1",
  },
  {
    title: "Groceries.",
    subTitle: "All the essentials at<br /> your fingertips anytime.",
    image: "/img/services/g.png",
    link: "#",
    soon: true,
    bg: "#ebfbec",
  },
  {
    title: "Eats.",
    subTitle: "Food from your favorite<br /> restaurant delivered fast.",
    image: "/img/services/e.png",
    link: "#",
    soon: true,
    bg: "#fbe9e1",
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
    heroRight: 30,
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
          <p className="text-[5em] leading-[1.1] md:text-[3em] md:text-center font-medium">
            Go anywhere
            <br /> with{" "}
            <span className="text-[var(--primary-color)]">Shride</span>,
            <br /> Anytime.
          </p>

          <div className="mt-5 space-y-2" id="downloadapp">
            <div className="flex gap-2 items-center font-medium">
              <IoIosCheckmarkCircleOutline color="#01a206" size={15} />
              <p className="text-lg font-light">
                Order a ride from the comfort of your home.
              </p>
            </div>
            <div className="flex gap-2 items-center font-medium">
              <IoIosCheckmarkCircleOutline color="#01a206" size={15} />
              <p className="text-lg font-light">
                {" "}
                Get picked up from your doorstep anytime.{" "}
              </p>
            </div>
            <div className="flex gap-2 items-center font-medium">
              <IoIosCheckmarkCircleOutline color="#01a206" size={15} />
              <p className="text-lg font-light">Add a stop to your ride.</p>
            </div>
          </div>

          <div className="flex items-center justify-start gap-10 mt-5">
            <PlayStoreLink />
            <AppleStoreLink />
            {/* <ComingSoonLink /> */}
          </div>
        </div>
        <div className="w-1/2 md:w-full relative">
          <img src="/img/home/1.png" className="md:w-[80%]" alt="" />

          <motion.img
            src={k2.src}
            initial={{ opacity: 0, right: -200 }}
            animate={{ opacity: 1, right: animateValues.heroRight }}
            transition={{ duration: 3, type: "spring" }}
            className="w-[400px] md:w-[210px] absolute bottom-0"
          />
        </div>
      </section>

      <section className="py-[50px] px-[50px]">
        <header className="text-center text-5xl md:text-3xl font-bold">
          Our Services
        </header>
        <div className="w-full grid grid-cols-3 md:grid-cols-1 gap-10 md:gap-2">
          {SERVICES.map((i, index) => (
            <div
              key={index}
              style={{
                backgroundColor: i.bg,
              }}
              className="mt-10 h-[200px] rounded-2xl overflow-hidden relative"
            >
              {i.soon && (
                <div className="w-full absolute right-[-30%] h-[30px] rotate-[30deg] bg-red-600 flex justify-center items-center">
                  <p className="text-white text-xs md:text-[0.60rem] ml-[calc(15%)] font-medium text-center">
                    Coming Soon
                  </p>
                </div>
              )}
              <div className="px-10 pt-10">
                <p className="text-left text-2xl md:text-xl font-bold">
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
          <p className="text-[4em] leading-tight md:text-[2.5em] md:text-left font-bold">
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

          <div className="mt-16">
            <a
              target="_blank"
              href="https://play.google.com/store/apps/details?id=com.shride.riderapp"
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
          <p className="text-[4em] md:text-left leading-tight md:text-[2em] font-bold">
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
              href="/ride"
              className="inline-flex rounded-full bg-[var(--primary-color)] px-5 py-3 text-white hover:scale-95 duration-300"
            >
              Get Started
            </a>
          </div>
        </div>
      </section>

      <section className="w-full flex md:flex-col justify-between place-items-center pl-[50px] md:pl-[20px] py-[30px] md:py-[60px]">
        <div className="w-1/2 md:w-full md:translate-y-[300px]">
          <p className="text-[4em] md:text-left leading-tight md:text-[2em] font-bold">
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

          <div className="mt-5">
            <a
              href="#downloadapp"
              className="inline-flex rounded-full bg-[var(--primary-color)] px-5 py-3 text-white hover:scale-95 duration-300"
            >
              Get Started
            </a>
            {/* <ComingSoonLink /> */}
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

      <section className="mb-20">
        <FooterHero bgColor="#ff5001" textColor="#fff" />
      </section>
    </div>
  );
}
