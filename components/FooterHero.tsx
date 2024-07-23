"use client";

import PlayStoreLink from "@/components/PlayStoreLink";
import AppleStoreLink from "@/components/AppleStoreLink";
import ComingSoonLink from "@/components/ComingSoonLink";
import bg1 from "@/public/img/home/bg1.png";

export default function FooterHero({ bgColor, textColor }: any) {
  return (
    <section className="w-full flex md:flex-col justify-center items-center px-[50px] md:px-[20px] pt-[30px]">
      <div
        style={{
          backgroundImage: `url(${bg1.src})`,
          backgroundPosition: "left",
          backgroundSize: "55%",
          backgroundRepeat: "no-repeat",
          backgroundColor: bgColor,
        }}
        className="w-full h-[300px] md:h-auto px-[30px] flex md:flex-col justify-between bg-[var(--primary-color)] rounded-[30px] overflow-hidden"
      >
        <div className="flex flex-1 flex-col justify-between py-[30px]">
          <p style={{color: textColor}} className="font-bold text-5xl md:text-2xl leading-[1.5]">
            its simpler <br /> using the app
          </p>
          <div className="flex gap-3 mt-5">
            <PlayStoreLink />
            <AppleStoreLink />
          </div>
        </div>
        <div className="w-[50%] md:hidden">
          <img src="/img/home/i.png" className="w-[90%] float-right" alt="" />
        </div>
      </div>
    </section>
  );
}
