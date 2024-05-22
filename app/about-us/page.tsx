"use client";
import { useMediaQuery } from "@reactuses/core";

export default function Business() {
  const isMobile = useMediaQuery(
    "(min-width: 0px) and (max-width: 850px)",
    false
  );

  return (
    <div className="w-full lg:mt-10 overflow-hidden">
      <section className="w-full flex md:flex-col justify-between items-center gap-10 pl-[50px] md:pl-[20px]">
        {isMobile && (
          <div className="w-1/2 md:w-full md:mt-[30px] relative">
            <img
              src="/img/team.png"
              className="w-[70%] md:w-[80%]"
              alt=""
            />
          </div>
        )}
        <div className="w-1/2 md:w-full flex flex-col justify-center md:items-center">
          <p className="text-[4em] leading-tight md:text-[2.5em] md:text-center font-bold">
            Meet the <span className="text-[var(--primary-color)]">Team</span>{" "}
          </p>

          <div className="flex gap-2 items-center font-medium">
            <p className="text-xl md:text-lg font-light leading-relaxed">
              We are a team of young talented designers, engineers, directors
              and influencers confronting the old-fashioned Tech and Transport
              ecosystem in Africa. We are a team of dynamic entrepreneurs with a
              knack for success; filling the gap in transportation in Africa. We
              came about Shride when a team member wanted to go from point A to
              B and spent 45 minutes on the road, negotiating, hailing and
              describing their destination to the rider. It sparked an idea and
              we pulled a team together to design this beautiful piece of art;
              and we know you will love it!
            </p>
          </div>

  
        </div>
        {!isMobile && (
          <div className="w-1/2 md:w-full md:mt-[30px] relative">
            <img
              src="/img/team.png"
              className="w-[70%] md:w-[80%]"
              alt=""
            />
          </div>
        )}
      </section>
    </div>
  );
}
