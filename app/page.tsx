"use client";

import { motion } from "framer-motion";
import { useMediaQuery } from "@reactuses/core";
import {
  IoIosArrowForward,
  IoIosCheckmarkCircle,
  IoIosCheckmarkCircleOutline,
} from "react-icons/io";
// import k2 from "@/public/img/home/2.png";
import hb from "@/public/img/home/3.png";
import hm from "@/public/img/home/m.png";
import ht from "@/public/img/home/t.png";
import r1 from "@/public/img/home/r1.png";
// import bg1 from "@/public/img/home/bg1.png";
import { useEffect, useState } from "react";
import PlayStoreLink from "@/components/PlayStoreLink";
import AppleStoreLink from "@/components/AppleStoreLink";
// import ComingSoonLink from "@/components/ComingSoonLink";
import Faqs from "@/components/Faqs";
import FooterHero from "@/components/FooterHero";
import HomeLottie from "@/components/HomeLottie";
import clsx from "clsx";
import HomeAutoScroll from "@/components/HomeAutoScroll";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import Header from "@/components/Header";

const SERVICES = [
  {
    title: "Rides.",
    subTitle:
      "Request a ride immediately or schedule a ride for a later time on bike or trike.",
    image: "/img/services/bike.png",
    link: "/ride",
    soon: false,
    bg: "#e1eee1",
    textColor: "#16882B",
  },
  {
    title: "Deliveries.",
    subTitle:
      "Send and receive bulky or pocket-sized packages faster, anywhere.",
    image: "/img/services/d.png",
    link: "/delivery",
    soon: false,
    bg: "#FF5001",
    textColor: "#ffffff",
  },
  {
    title: "Eats.",
    subTitle: "Food from your favorite restaurant delivered in 30 minutes.",
    image: "/img/services/e.png",
    link: "/trike",
    soon: false,
    bg: "#131313",
    textColor: "#ffffff",
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
      <Header />
      <section className="w-full flex md:flex-col mt-10 justify-between pl-[50px] md:pl-[20px]">
        <div className="w-[60%] md:w-full flex flex-col justify-center md:items-center">
          {/* <p className="text-[7em] leading-[1] md:text-[3em] md:text-center font-bold"> */}
          <p className="text-[9vw] leading-[1] md:text-[3em] md:text-center font-bold">
            Do more
            <br /> with{" "}
            <span className="text-[var(--primary-color)]">Shride</span>.
          </p>

          <div className="mt-5 space-y-2" id="downloadapp">
            <div className="flex gap-2 items-start font-medium">
              <IoIosCheckmarkCircle color="#008000" size={20} />
              <p className="text-lg font-medium -mt-1">
                Order a ride from the comfort of your home.
              </p>
            </div>
            <div className="flex gap-2 items-start font-medium">
              <IoIosCheckmarkCircle color="#008000" size={20} />
              <p className="text-lg font-medium -mt-1">
                {" "}
                Send and receive packages across your city.
              </p>
            </div>
            <div className="flex gap-2 items-start font-medium">
              <IoIosCheckmarkCircle color="#008000" size={20} />
              <p className="text-lg font-medium -mt-1">
                Food from your favorite restaurant delivered fast.
              </p>
            </div>
          </div>

          <div className="flex md:flex-col items-center justify-start gap-10 md:gap-2 mt-5">
            <PlayStoreLink />
            <AppleStoreLink />
            {/* <ComingSoonLink /> */}
          </div>
        </div>
        <div className="w-[40%] md:w-full relative">
          {/* <img src="/img/home/1.png" className="md:w-[80%]" alt="" />

          <motion.img
            src={k2.src}
            initial={{ opacity: 0, right: -200 }}
            animate={{ opacity: 1, right: animateValues.heroRight }}
            transition={{ duration: 3, type: "spring" }}
            className="w-[400px] md:w-[210px] absolute bottom-0"
          /> */}
          <HomeLottie />
        </div>
      </section>

      {/* <section className="py-[50px] px-[50px]">
        <header className="text-center text-5xl md:text-3xl font-bold">
          Our Services
        </header>
        <div className="w-full grid grid-cols-3 md:grid-cols-1 gap-10 md:gap-2">
          {SERVICES.map((i, index) => (
            <a
              href={i.link}
              key={index}
              style={{
                backgroundColor: i.bg,
              }}
              className="mt-10 h-[200px] md:h-auto md:pb-10 rounded-2xl overflow-hidden relative"
            >
              {i.soon && (
                <div className="w-full absolute right-[-30%] h-[30px] rotate-[30deg] bg-red-600 flex justify-center items-center">
                  <p className="text-white text-xs md:text-[0.60rem] ml-[calc(15%)] font-medium text-center">
                    Coming Soon
                  </p>
                </div>
              )}
              <div className="px-10 pt-10">
                <p
                  className={clsx(["text-left text-2xl md:text-xl font-bold"])}
                  style={{ color: i.textColor }}
                >
                  {i.title}
                </p>
              </div>
              <div className="flex justify-between gap-4 w-full">
                <p
                  className="text-left pl-10 mt-5 font-normal"
                  style={{ color: i.textColor }}
                  dangerouslySetInnerHTML={{ __html: i.subTitle }}
                ></p>
                <img src={i.image} className="w-[50%] md:w-[50%]" />
              </div>
            </a>
          ))}
        </div>
      </section> */}

      <section className="py-[50px] px-[50px] mt-14">
        <div className="w-full grid grid-cols-4 md:grid-cols-1 gap-10 md:gap-5">
          <div className="home-r1 h-[577px] md:h-[230px] bg-cover rounded-2xl px-5 py-5">
            <p className="text-white font-bold text-3xl">Rides</p>
            <p className="text-white font-normal mt-3">
              Request a ride immediately or schedule a ride for a later time.
            </p>
            <div className="mt-10">
              <a
                href="https://onelink.to/zyvcrz"
                className="inline-flex rounded-md font-medium bg-green-800 px-5 py-1 items-center justify-center text-white hover:scale-95 duration-30 float-right"
              >
                Get Started
              </a>
            </div>
          </div>

          <div className="home-r2 h-[577px] md:h-[230px] bg-cover rounded-2xl px-5 py-5">
            <p className="text-white font-bold text-3xl">Deliveries</p>
            <p className="text-white font-normal mt-3">
              Send items across cities quickly, easily and affordably.
            </p>
            <div className="mt-10">
              <a
                href="https://onelink.to/zyvcrz"
                className="inline-flex rounded-md font-medium bg-[#FF5100] px-5 py-1 items-center justify-center text-white hover:scale-95 duration-30 float-right"
              >
                Get Started
              </a>
            </div>
          </div>

          <div className="home-r3 h-[577px] md:h-[230px] bg-cover rounded-2xl px-5 py-5">
            <p className="text-white font-bold text-3xl">Eats</p>
            <p className="text-white font-normal mt-3">
              Order food from your favorite restaurant, get it in minutes.
            </p>
            <div className="mt-10">
              <a
                href="https://onelink.to/zyvcrz"
                className="inline-flex rounded-md font-medium bg-[#FFB744] px-5 py-1 items-center justify-center text-white hover:scale-95 duration-30 float-right"
              >
                Get Started
              </a>
            </div>
          </div>

          <div className="bg-[#240636] h-[577px] md:h-[230px] bg-cover rounded-2xl px-5 py-5">
            <p className="text-white font-bold text-3xl">Groceries</p>
            <p className="text-white font-normal mt-3">
              Order from your favorite supermarkers and vendors, get it in
              minutes.
            </p>
            <div className="mt-10">
              <button className="inline-flex rounded-md font-medium bg-green-700 px-5 py-1 items-center justify-center text-white hover:scale-95 duration-30 float-right">
                Coming Soon
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-[10px] px-[0px]">
        <HomeAutoScroll />
      </section>

      <section className="py-[50px] px-[50px]">
        <header className="text-center text-[4em] md:text-3xl font-semibold">
          Get Started
        </header>
        <div className="w-full grid grid-cols-3 md:grid-cols-1 gap-10 md:gap-15 mt-10">
          <div className="ring-4 ring-green-900 h-[659px] md:h-auto bg-cover rounded-3xl flex flex-col overflow-hidden">
            <div className="flex justify-end flex-1 items-end md:hidden">
              <img src="/img/home/xd.png" alt="" className="max-w-[50%]" />
            </div>
            <div className="px-5 pb-10 mt-3">
              <p className="text-black font-bold text-3xl">Become a rider</p>
              <p className="text-black font-normal mt-3">
                Ride when you want, make the money you need. You can choose to
                ride, deliver or both. part time or full time with your bike or
                trike.
              </p>
              <div className="mt-5">
                <a
                  href="https://play.google.com/store/apps/details?id=com.shride.riderapp"
                  className="inline-flex gap-2 rounded-md font-medium bg-green-800 px-5 py-2 items-center justify-center text-white hover:scale-95 duration-30 float-right"
                >
                  Get Started{" "}
                  <IoArrowForwardCircleOutline color="#fff" size={20} />
                </a>
              </div>
            </div>
          </div>

          <div className="ring-4 ring-[#FF5100] h-[659px] md:h-auto bg-cover rounded-3xl flex flex-col overflow-hidden">
            <div className="flex justify-end flex-1 items-end md:hidden">
              <img src="/img/home/t1.png" alt="" className="max-w-[50%]" />
            </div>
            <div className="px-5 pb-10 mt-3">
              <p className="text-black font-bold text-3xl">Try the App</p>
              <p className="text-black font-normal mt-3">
                Going somewhere? ordering food? sending items? it shouldn’t be
                stressful, we have solved the problem!
              </p>
              <div className="mt-5">
                <a
                  href="https://onelink.to/zyvcrz"
                  className="inline-flex gap-2 rounded-md font-medium bg-[#FF5100] px-5 py-2 items-center justify-center text-white hover:scale-95 duration-30 float-right"
                >
                  Download now{" "}
                  <IoArrowForwardCircleOutline color="#fff" size={20} />
                </a>
              </div>
            </div>
          </div>

          <div className="ring-4 ring-black h-[659px] md:h-auto bg-cover rounded-3xl flex flex-col overflow-hidden">
            <div className="flex justify-end flex-1 items-end md:hidden">
              <img src="/img/home/m1.png" alt="" className="max-w-[50%]" />
            </div>
            <div className="px-5 pb-10 mt-3">
              <p className="text-black font-bold text-3xl">Become a merchant</p>
              <p className="text-black font-normal mt-3">
                Who doesn’t support businesses? definitely not us. With Shride
                you will never miss an order. get ready to sell, earn and grow
                your business.
              </p>
              <div className="mt-5">
                <a
                  href="https://play.google.com/store/apps/details?id=com.shride.merchant.app"
                  className="inline-flex gap-2 rounded-md text-medium bg-black px-5 py-2 items-center justify-center text-white hover:scale-95 duration-30 float-right"
                >
                  Get Started{" "}
                  <IoArrowForwardCircleOutline color="#fff" size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-[50px] px-[50px]">
        <header className="text-left mb-5">
          <p className="text-[5em] leading-tight md:text-[2.5em] font-bold">
            Why choose
            <br /> <span className="text-[var(--primary-color)]">
              Shride?
            </span>{" "}
          </p>
        </header>
        <div className="flex justify-between items-center w-full gap-5">
          <div className="flex-1">
            <div className="w-full grid grid-cols-4 md:grid-cols-1 gap-10 px-4 md:gap-15 mt-3 mb-3 md:hidden">
              <div className="">
                <p className="font-bold text-2xl">Feature</p>
              </div>
              <div className="">
                <p className="font-bold text-2xl text-[#ff5001]">Shride</p>
              </div>
              <div className="">
                <p className="font-bold text-2xl text-[#005900]">Others</p>
              </div>
              <div className="">
                <p className="font-bold text-2xl text-[#CCD00D]">Others</p>
              </div>
            </div>

            <div className="w-full grid grid-cols-4 md:grid-cols-1 gap-10 md:gap-5 mt-0 py-3 px-4 bg-green-600/15 rounded-lg">
              <div className="">
                <p className="font-bold text-base">Fare shown upfront</p>
              </div>

              <div className="">
                <p className="font-medium text-base">
                  <span className="lg:hidden">Shride:</span> ✅ Always final
                  fare
                </p>
              </div>

              <div className="">
                <p className="font-medium text-base">
                  <span className="lg:hidden">Others:</span> ⚠️ Estimate only
                </p>
              </div>

              <div className="">
                <p className="font-medium text-base">
                  <span className="lg:hidden">Others:</span>⚠️ Driver can
                  counter
                </p>
              </div>
            </div>

            <div className="w-full grid grid-cols-4 md:grid-cols-1 gap-10 md:gap-5 mt-3 py-3 px-4 bg-green-600/15 rounded-lg">
              <div className="">
                <p className="font-bold text-base">Pricing model</p>
              </div>

              <div className="">
                <p className="font-medium text-base">
                  <span className="lg:hidden">Shride:</span> Base + distance
                  (only)
                </p>
              </div>

              <div className="">
                <p className="font-medium text-base">
                  <span className="lg:hidden">Others:</span> Base + distance +
                  time
                </p>
              </div>

              <div className="">
                <p className="font-medium text-base">
                  <span className="lg:hidden">Others:</span> Negotiated fare
                </p>
              </div>
            </div>

            <div className="w-full grid grid-cols-4 md:grid-cols-1 gap-10 md:gap-5 mt-3 py-3 px-4 bg-green-600/15 rounded-lg">
              <div className="">
                <p className="font-bold text-base">Surge Pricing</p>
              </div>

              <div className="">
                <p className="font-medium text-base">
                  <span className="lg:hidden">Shride:</span> ❌ Never
                </p>
              </div>

              <div className="">
                <p className="font-medium text-base">
                  <span className="lg:hidden">Others:</span> ✅ Sometimes
                </p>
              </div>

              <div className="">
                <p className="font-medium text-base">
                  <span className="lg:hidden">Others:</span> ✅ Sometimes
                </p>
              </div>
            </div>

            <div className="w-full grid grid-cols-4 md:grid-cols-1 gap-10 md:gap-5 mt-3 py-3 px-4 bg-green-600/15 rounded-lg">
              <div className="">
                <p className="font-bold text-base">Simplicity</p>
              </div>

              <div className="">
                <p className="font-medium text-base">
                  <span className="lg:hidden">Shride:</span> Rides + Delivery +
                  Eats
                </p>
              </div>

              <div className="">
                <p className="font-medium text-base">
                  <span className="lg:hidden">Others:</span> Food delivery only
                </p>
              </div>

              <div className="">
                <p className="font-medium text-base">
                  <span className="lg:hidden">Others:</span> Rides and delivery
                  only
                </p>
              </div>
            </div>

            <div className="w-full grid grid-cols-4 md:grid-cols-1 gap-10 md:gap-5 mt-3 py-3 px-4 bg-green-600/15 rounded-lg">
              <div className="">
                <p className="font-bold text-base">Price surprises</p>
              </div>

              <div className="">
                <p className="font-medium text-base">
                  <span className="lg:hidden">Shride:</span> ❌ Never
                </p>
              </div>

              <div className="">
                <p className="font-medium text-base">
                  <span className="lg:hidden">Others:</span> ✅ Sometimes
                </p>
              </div>

              <div className="">
                <p className="font-medium text-base">
                  <span className="lg:hidden">Others:</span> ✅ Possible
                </p>
              </div>
            </div>

            <div className="w-full grid grid-cols-4 md:grid-cols-1 gap-10 md:gap-5 mt-3 py-3 px-4 bg-green-600/15 rounded-lg">
              <div className="">
                <p className="font-bold text-base">Carbon footprint</p>
              </div>

              <div className="">
                <p className="font-medium text-base">
                  <span className="lg:hidden">Shride:</span> ✅ Low emission
                </p>
              </div>

              <div className="">
                <p className="font-medium text-base">
                  <span className="lg:hidden">Others:</span> ⚠️ Carbon emission
                </p>
              </div>

              <div className="">
                <p className="font-medium text-base">
                  <span className="lg:hidden">Others:</span> ⚠️ Carbon emission
                </p>
              </div>
            </div>
          </div>
          <div className="md:hidden">
              <img src="/img/home/phone.png" alt="" className="w-[250px]" />
          </div>
        </div>
      </section>

       <section className="w-full flex flex-col  px-[50px] md:px-[20px] py-[10px] md:py-[30px]">
        <header className="">
          <p className="text-[4em] text-center leading-tight md:text-[2.5em] md:text-left font-bold">
            What's <br />
            <span className="text-[var(--primary-color)]">Happening. </span>
          </p>
        </header>
        <div className="w-full mt-10 h-[900px] md:h-[1000px] flex flex-col s-none flex-wrap overflow-x-scroll overflow-y-hidden gap-10 md:gap-5">
          <div className="flex w-[440px] md:w-[90%] h-full flex-col justify-between rounded-3xl bg-[#f6dddd] px-5 pt-5 pb-10">
            <div className="">
              <p className="text-black text-2xl font-semibold">
                ShrideEat Launches.
              </p>
              <img src="/img/about/aug.png" className="mt-5" alt="" />
              <p className="mt-3 font-bold">
                It’s our turn to define food delivery
              </p>
              <p className="mt-2">
                At exactly 1 year, we launched a new feature. ShrideEats.
                ShrideEats is here to change the way you experience food
                delivery. Built for speed, convenience, and local flavor, it
                connects you to top restaurants with meals delivered fast,
                fresh, and affordably. Whether it’s amala, shawarma, or a
                chilled drink, we’ve got you. To kick things off, enjoy free
                delivery on all orders 9am-6pm on the 1st of august. With
                trusted partners and a 30-minute delivery promise, ShrideEats is
                your new go-to. Just open the Shride app, tap ShrideEats, and
                eat good.. the Shride way.
                <br />
                <br />
                Request ride. Send items. Order food.
                <br />
              </p>
            </div>
            <div className="mt-20">
              <p className="text-xs text-right">August Digest 2025</p>
            </div>
          </div>

          <div className="flex w-[440px] md:w-[90%] h-full flex-col justify-between rounded-3xl bg-[#f2ebf6] px-5 pt-5 pb-10">
            <div className="">
              <p className="text-black text-2xl font-semibold">
                Driver Kits & Safety Training
              </p>
              <img src="/img/about/jun.png" className="mt-5" alt="" />
              <p className="mt-3 font-bold">
                Safety begins with S but starts with You
              </p>
              <p className="mt-2">
                At Shride, safety isn’t a checkbox, it’s a core part of who we
                are. That’s why we’re proud to roll out our drivers Kits &
                Safety Training. Every driver now receives a standard Shride
                safety kit. A branded reflective vest and DOT-approved helmet.
                But gear alone isn’t enough. We also equip our riders with
                in-depth safety training before they hit the road. From safe
                riding techniques to customer etiquette, our online training
                ensures Shriders know how to move safely.
                <br />
                <br />
                When next you’re moving, you’re with a trained, responsible
                driver who values your safety as much as we do. So next time you
                spot a Shrider in uniform, know this: they’re not just ready to
                ride, they’re ready to protect and serve with style.
                <br />
              </p>
            </div>
            <div className="mt-20">
              <p className="text-xs text-right">June Digest 2025</p>
            </div>
          </div>

          <div className="flex w-[440px] md:w-[90%] h-full flex-col justify-between rounded-3xl bg-[#e5f3e7] px-5 pt-5 pb-10">
            <div className="">
              <p className="text-black text-2xl font-semibold">
                Introducing Faaji Friday.
              </p>
              <img src="/img/about/may.png" className="mt-5" alt="" />
              <p className="mt-3 font-bold">
                Faaji Friday: Your Weekend Just Got Better! 🎉
              </p>
              <p className="mt-2">
                Big news, Tribers! We’re excited to introduce Faaji Friday; ride
                anywhere in Ibadan from 12pm-5pm every friday. Shride’s special
                weekly treat designed to kick-start your weekend the right way.
                <br />
                <br />
                Every Friday, you get to pay only N200 off all Shride trips
                across the city. This isn't just a promo, it’s a weekly
                celebration. At Shride, we believe transport should be
                affordable and rewarding.
                <br />
                <br />
                The best part? You don’t need a code. The discount applies
                automatically every Friday, just open the app, book your ride,
                and enjoy the faaji.
                <br />
                Request ride. send item. Use Shride
              </p>
            </div>
            <div className="mt-20">
              <p className="text-xs text-right">May Digest 2025</p>
            </div>
          </div>

          <div className="flex w-[440px] md:w-[90%] h-full flex-col justify-between rounded-3xl bg-[#f8f0ec] px-5 pt-5 pb-10">
            <div className="">
              <p className="text-black text-2xl font-semibold">
                Refer and Earn.
              </p>
              <img src="/img/about/apr.png" className="mt-5" alt="" />
              <p className="mt-3 font-bold">
                Refer and Earn; 1m trip challange:
              </p>
              <p className="mt-2">
                Shride’s Refer & Earn just got serious! Drivers can now earn
                ₦10,000 for every new rider they refer and the new rider
                completes 10 trips. That means 100 referrals = ₦1 million in
                your pocket. It’s not just a side hustle, it’s a game changer.
                Ready to join the #1mTripChallenge? Share your referral code,
                grow your rider network, and watch your earnings take off.
                <br />
                <br />
                users aren’t left out either, invite your friends to try Shride
                and get 500 reward when they take their first trip or place
                their first order and another 500 on their second order. The
                more you refer, the more you earn, it’s that simple. Just share
                your referral code from the app and let the rewards roll in. Why
                keep a good thing to yourself when you can earn with it?
              </p>
            </div>
            <div className="mt-20">
              <p className="text-xs text-right">April Digest 2025</p>
            </div>
          </div>

          <div className="flex w-[440px] md:w-[90%] h-full flex-col justify-between rounded-3xl bg-[#F1FFFC] px-5 pt-5 pb-10">
            <div className="">
              <p className="text-black text-2xl font-semibold">
                Shride eyes Electric Future.
              </p>
              <img src="/img/about/b4.png" className="mt-5" alt="" />
              <p className="mt-3 font-bold">
                Shride’s CEO in Talks with Spiro:
              </p>
              <p className="mt-2">
                In a bid to revolutionize mobility in Nigeria from Ibadan,
                Shride’s CEO Hammed Peacemark has entered discussions with
                Spiro, a leading electric bike vendor in Africa, to explore a
                full transition to electric bikes for hailing. This potential
                partnership signals Shride’s commitment to sustainability and
                affordability in urban transportation.
                <br />
                <br />
                "Electric is the future," the CEO stated. "We want to lead that
                change in Africa and beyond." This move will reduce emissions,
                lower running costs, and offer riders a cleaner, more efficient
                way to move around the city.
                <br />
                Stay tuned—Shride will soon be riding into a greener tomorrow.
              </p>
            </div>
            <div className="mt-20">
              <p className="text-xs text-right">March Digest 2025</p>
            </div>
          </div>

          <div className="flex w-[440px] md:w-[90%] h-full flex-col justify-between rounded-3xl bg-[#F1F6FF] px-5 pt-5 pb-10">
            <div className="">
              <p className="text-black text-2xl font-semibold">
                Increased Drivers Pay.
              </p>
              <img src="/img/about/b3.png" className="mt-5" alt="" />
              <p className="mt-3 font-bold">
                Shride Riders, Bigger Earnings Ahead!
              </p>
              <p className="mt-2">
                At Shride, we believe our riders are the heartbeat of our
                service and it's only right they earn what they deserve and
                more! That’s why we’re excited to share some good news per rider
                earnings: rider earnings have increased!
                <br />
                <br />
                With improved ride demand, new location expansions, and better
                commission structures, Shride riders are now making more per
                trip. We're also introducing referral bonuses and weekly quest
                incentives to help riders grow their income even faster and
                independently.
                <br />
                <br />
                Whether you're riding full-time or part-time, this is the
                perfect time to be on the road with Shride.
                <br />
                <br />
                Drive more. Earn more. Live better.
              </p>
            </div>
            <div className="mt-20">
              <p className="text-xs text-right">February Digest 2025</p>
            </div>
          </div>

          <div className="flex w-[440px] md:w-[90%] h-full flex-col justify-between rounded-3xl bg-[#FAFFF1] px-5 pt-5 pb-10">
            <div className="">
              <p className="text-black text-2xl font-semibold">
                New Locations Unlocked!
              </p>
              <img src="/img/about/b2.png" className="mt-5" alt="" />
              <p className="mt-3 font-bold">Shride Expands Its Reach:</p>
              <p className="mt-2">
                More Locations, More Possibilities! We are excited to announce
                that Shride is growing! As part of our commitment to making
                fast, reliable, and affordable bike hailing accessible to more
                people, Shride has expanded and now serve these locations, Oki,
                Monatan, Ayegun, Omi Adio and environs. This means more
                communities can now enjoy the ease and convenience of booking a
                ride with just a few taps.
                <br />
                <br />
                Whether you're heading to work, running errands, or exploring
                new parts of town, Shride is right there with you. If we’ve just
                arrived in your area, hop on a Shride and feel the difference.
              </p>
            </div>
            <div className="mt-20">
              <p className="text-xs text-right">December Digest 2024</p>
            </div>
          </div>

          <div className="flex w-[440px] md:w-[90%] h-full flex-col justify-between rounded-3xl bg-[#FFF1FA] px-5 pt-5 pb-10">
            <div className="">
              <p className="text-black text-2xl font-semibold">
                KeKe For The Road!
              </p>
              <img src="/img/about/b1.png" className="mt-5" alt="" />
              <p className="mt-3 font-bold">Shride Launches Keke Rides!</p>
              <p className="mt-2">
                Shride Launches Keke Rides! Big news! Shride is now launching
                Keke (tricycle) rides to serve you even better.
                <br />
                <br />
                This new option brings more comfort, space, and affordability
                for short and mid-range trips and for the rainy season. Whether
                you're traveling with friends, carrying goods, or just want a
                breezy ride around town, Shride Keke has you covered. you can
                choose to ride alone or trike-pool with other shriders. We mean
                it when we say we are going to take you there!
                <br />
                <br />
                Just like our bike rides, Keke rides are easy to book, safe, and
                always reliable.
                <br />
                <br />
                Look out for the Shride Keke in your area—and get ready for a
                smoother way to move.
              </p>
            </div>
            <div className="mt-20">
              <p className="text-xs text-right">November Digest 2024</p>
            </div>
          </div>

          <div className="flex w-[440px] md:w-[90%] h-full flex-col justify-between rounded-3xl bg-[#FFE8DE] px-5 pt-5 pb-10">
            <div className="">
              <p className="text-[#FF5001] text-2xl font-semibold">
                New Milestone Achieved!
              </p>
              <img src="/img/about/a3.png" className="mt-5" alt="" />
              <p className="mt-3">
                A journey of 1,000 miles starts with a step, we started with 100
                trips! We just celebrated 100 successful trips, 600 onboarded
                users and 1,000 riders signup after two months of operations in
                the city of Ibadan.
              </p>
              <p className="mt-2">
                This is a great achievement for us at Shride, as the market is
                adopting technology to solve their everyday transportation
                problem.
                <br />
                In a recent interview, we at Shride are planning to fully
                dominate the Ibadan market at the end of 2025, and start
                expansion to neighboring cities like Ilorin, Abeokuta and Akure.
              </p>
            </div>
            <div className="mt-20">
              <p className="text-xs text-right">October Digest 2024</p>
            </div>
          </div>

          <div className="flex w-[440px] md:w-[90%] h-full flex-col justify-between rounded-3xl bg-[#C2E9C3] px-5 pt-5 pb-10">
            <div className="">
              <p className="text-[#00A205] text-2xl font-semibold">
                Community Activities.
              </p>
              <img src="/img/about/a2.png" className="mt-5" alt="" />
              <p className="mt-3">
                We were at the IbadanTechExpo. We support events and activities
                that engages the community. We gave free ride vouchers, bags,
                jotters etc to grace the event!
              </p>
              <p className="mt-2">
                5,000 social media impression, yes, we are proud of our small
                wins, and the beautiful city of Ibadan welcomed us.
              </p>
            </div>
            <div className="mt-20">
              <p className="text-xs text-right">September Digest 2024</p>
            </div>
          </div>

          <div className="flex w-[440px] md:w-[90%] h-full flex-col justify-between rounded-3xl bg-[#FCE7FC] px-5 pt-5 pb-10">
            <div className="">
              <p className="text-[#DE13E2] text-2xl font-semibold">
                Prelaunch Riders Onboarding.
              </p>
              <img src="/img/about/a1.png" className="mt-5" alt="" />
              <p className="mt-3">
                in this era of technology, transportation should not be a
                struggle. Everyday transportation with modern day approach is
                one thing we strongly believe at Shride.
              </p>
              <p className="mt-2">
                We took our enthusiasm to the streets to onboard bikers, and
                they were excited to be part of the moving train of modern day
                transportation.
              </p>
            </div>
            <div className="mt-20">
              <p className="text-xs text-right">August Prelaunch 2024</p>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <p className="">
            As the fastest growing business in Africa, we are super excited of
            the journey ahead of us, the cities yet to be served and the
            continents we are yet to cover, join us on this adventure as we
            journey through cities and continents making rides affordable,
            convenient and saving the planet by reducing carbon footprint to the
            minimum!. At Shride, we are achieving this one ride at a time.
            #1MillionRideChallenge.
          </p>
        </div>
      </section>

      <section className="mb-20">
        <FooterHero bgColor="#ff5001" textColor="#fff" />
      </section>

     
    </div>
  );
}
