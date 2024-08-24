"use client";
import { useMediaQuery } from "@reactuses/core";
import { IoIosMenu, IoIosClose } from "react-icons/io";
import PlayStoreLink from "./PlayStoreLink";
import AppleStoreLink from "./AppleStoreLink";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const variants = {
  open: { x: 0 },
  closed: { x: "-100%" },
};

const disableScroll = () => {
  document.body.style.cssText = ";overflow: hidden;height:100%; width: 100%;";
};

const enableScroll = () => {
  document.body.style.cssText = "";
};

export default function Header() {
  const isMobile = useMediaQuery("(min-width: 0px) and (max-width: 850px)", true);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    if (menuOpen) {
      disableScroll();
    } else {
      enableScroll();
    }
  }, [menuOpen]);

  return (
    <div className="w-full px-[50px] md:px-[20px] py-[10px] bg-white flex justify-between items-center md:mb-10">
      <a href="/" className="">
        <img src="/img/shride-logo-black.png" width="100" alt="" />
      </a>
      {isMobile && (
        <div className="">
          <IoIosMenu onClick={() => setMenuOpen(true)} size={30} />
        </div>
      )}

      {/* {isMobile && menuOpen && ( */}
      {isMobile && (
        <motion.div
          initial={false}
          animate={menuOpen ? "open" : "closed"}
          variants={variants}
          transition={{ duration: 0.5 }}
          className="w-full h-[100dvh] fixed top-0 left-0 z-50 bg-white"
        >
          <div className="w-full px-[20px] py-[10px] flex justify-between items-center mb-10">
            <div className="">
              <img src="/img/shride-logo-black.png" width="80" alt="" />
            </div>

            <div className="">
              <IoIosClose onClick={() => setMenuOpen(false)} size={30} />
            </div>
          </div>

          <div className="overflow-scroll h-[calc(100%_-_210px)] w-full px-[20px] pb-[50px] flex flex-col gap-6 text-[#131313] font-medium">
            <a href="/">Home</a>
            <a href="/ride">Ride</a>
            <a href="/rider">Become a Rider</a>
            <a href="/business">Business</a>
            <a href="/about-us">About Us</a>
          </div>

          <div className="flex items-start justify-start px-[20px] gap-5 mt-10 absolute bottom-5">
            <PlayStoreLink />
            <AppleStoreLink />
          </div>
        </motion.div>
      )}

      {!isMobile && (
        <div className="flex gap-10 text-black">
          <a href="/">Home</a>
          <a href="/ride">Ride</a>
          <a href="/rider">Become a Rider</a>
          <a href="/business">Business</a>
          <a href="/about-us">About Us</a>
        </div>
      )}
    </div>
  );
}
