"use client";
import { useMediaQuery } from "@reactuses/core";

export default function ComingSoon() {
  const isMobile = useMediaQuery(
    "(min-width: 0px) and (max-width: 850px)",
    false
  );

  return (
    <div className="w-full flex md:flex-col md:mt-[-100px] pt-[50px] px-[50px] justify-between">
      <div className="md:w-full">
        <p className="text-[5rem] md:text-[2rem] md:text-center md:mt-[50px] font-bold">
          Go anywhere with Shride.
        </p>
        <p className="text-[3rem] md:text-[1rem] md:text-center md:mt-[30px]">
          Launching August 1!
        </p>
      </div>
      <div className="w-[60%] md:w-full  flex md:mt-[60px] justify-end">
          <img
            src="/img/ride/2.png"
            alt=""
            className="w-[90%] rounded-xl object-cover"
          />
      </div>
    </div>
  );
}
