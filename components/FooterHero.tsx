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
        className="w-full min-h-[351px] md:h-auto px-[100px] md:px-[50px] py-[40px] flex md:flex-col items-center justify-between bg-[var(--primary-color)] rounded-[60px] md:rounded-[30px] overflow-hidden"
      >
        <div className="flex flex-1 flex-col justify-between">
          <p style={{color: textColor}} className="font-bold text-[5em] md:text-5xl leading-[1]">
            It's simpler <br /> using the app.
          </p>
          <div className="flex md:flex-col gap-3 mt-5">
            <PlayStoreLink />
            <AppleStoreLink />
          </div>
        </div>
        <div className="w-[40%] md:hidden">
          <img src="/img/home/i.png" className="w-[50%] float-right" alt="" />
        </div>
      </div>
    </section>
  );
}
