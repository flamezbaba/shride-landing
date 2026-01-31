"use client";
import Header from "@/components/Header";
import { useMediaQuery } from "@reactuses/core";

export default function Business() {
  const isMobile = useMediaQuery(
    "(min-width: 0px) and (max-width: 850px)",
    false
  );

  return (
    <div className="w-full lg:mt-10 overflow-hidden">
      <Header />
      <section className="w-full flex md:flex-col justify-between items-center gap-10 pl-[50px] md:pl-[20px]">
        {isMobile && (
          <div className="w-1/2 md:w-full md:mt-[30px] relative flex justify-center">
            <img src="/img/team.png" className="w-[70%] md:w-[80%]" alt="" />
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
              ecosystem in Africa.
              <br />
              We are a team of dynamic entrepreneurs with a knack for success;
              filling the gap in transportation in Africa.
              <br />
              We came about Shride when a team member wanted to go from point A
              to B and spent 45 minutes on the road, negotiating, hailing and
              describing their destination to the rider.
              <br />
              It sparked an idea and we pulled a team together to design this
              beautiful piece of art; and we know you will love it!
            </p>
          </div>
        </div>
        {!isMobile && (
          <div className="w-1/2 md:w-full md:mt-[30px] relative">
            <img src="/img/team.png" className="w-[70%] md:w-[80%]" alt="" />
          </div>
        )}
      </section>

      <section className="w-full flex md:flex-col justify-between items-center gap-10 pl-[50px] md:pl-[20px] mt-20">
        <div className="w-1/2 md:w-full md:mt-[30px]">
          <p className="text-[3em] text-center leading-tight mb-[-120px] md:mb-[-90px] md:text-[2.5em] font-bold">
            <span className="text-[var(--primary-color)]">#</span>Team Shride
          </p>
          <div className="flex justify-center">
            <img src="/img/pana.png" className="w-[70%] md:w-[80%]" alt="" />
          </div>
        </div>

        <div className="w-1/2 md:w-full px-10 md:px-5 flex flex-col justify-center md:items-center">
          <div className="flex gap-2 items-center font-medium">
            <p className="text-xl md:text-lg font-light leading-relaxed">
              We&apos;ve been perfecting our services for over 7 years. So trust us,
              we know a thing or two about reliable and efficient
              transportation.
              <br />
              Every ride you book with Shride is driven by professional and
              courteous riders who prioritize user safety and comfort.
              <br />
              <br />
              But our passion for excellence doesn&apos;t stop there, our state of
              the art ride service ensures that your trips goes smoothly and
              rider arrives quickly.
              <br />
              We also ensure your packages arrive promptly and securely, no
              matter the destination. 
              <br/>
              We hope you get the picture. We&apos;re
              enthusiasts about making you happy with the best service on the
              road and beyond!
              <br />
              #TeamShride!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
