"use client";
import FooterHero from "@/components/FooterHero";
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
      
      <section className="w-full flex md:flex-col justify-between items-center gap-10 pl-[50px] md:pl-[20px]">
        {isMobile && (
          <div className="w-1/2 md:w-full md:mt-[30px] relative flex justify-center items-center">
            <img src="/img/about/1.png" className="w-[70%] md:w-[80%]" alt="" />
          </div>
        )}
        <div className="w-1/2 md:w-full flex flex-col justify-center md:items-center">
          <p className="text-[4em] leading-tight md:text-[2.5em] md:text-center font-bold">
            Our <br />{" "}
            <span className="text-[var(--primary-color)]">Vision.</span>{" "}
          </p>

          <div className="flex gap-2 items-center font-medium">
            <p className="text-xl md:text-lg font-light leading-relaxed">
              To be the leading choice for urban mobility and delivery, offering
              a sustainable alternative in transportation that connects people
              efficiently, reduces environmental impact, and promotes a cleaner,
              greener future for city life. using today’s technology to solve
              hailing and delivery problems
            </p>
          </div>
        </div>
        {!isMobile && (
          <div className="w-1/2 md:w-full md:mt-[30px] relative flex justify-center items-center">
            <img src="/img/about/1.png" className="w-[70%] md:w-[80%]" alt="" />
          </div>
        )}
      </section>

      <section className="w-full flex md:flex-col justify-between place-items-center px-[50px] md:px-[20px] py-[10px] md:py-[30px]">
        <div className="w-1/2 md:w-full">
          <img src="/img/about/2.png" className=" w-[80%] md:w-[80%]" alt="" />
        </div>

        <div className="w-1/2 md:w-full">
          <p className="text-[4em] leading-tight md:text-[2.5em] md:text-left font-bold">
            Our <br />
            <span className="text-[var(--primary-color)]">Mission. </span>
          </p>

          <div className="mt-5 space-y-2">
            <div className="flex gap-2 items-center font-bold">
              <p className="text-xl md:text-lg font-light leading-relaxed">
                To provide an affordable, convenient, and eco-friendly
                bike-hailing and delivery service that transforms urban
                transportation by prioritizing accessibility, safety, and
                environmental sustainability for every user, rider, merchant and
                partner in our communities.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full flex md:flex-col justify-between place-items-center px-[50px] md:px-[20px] py-[50px] md:py-[30px]">
        <div className="w-1/2 md:w-full">
          <p className="text-[4em] leading-tight md:text-[2.5em] md:text-left font-bold">
            Our <br />
            <span className="text-[var(--primary-color)]">Goal. </span>
          </p>

          <div className="mt-5 space-y-2">
            <div className="flex gap-2 items-center font-bold">
              <p className="text-xl md:text-lg font-light leading-relaxed">
                Our goal is to make budget friendly transportation possible,
                while ensuring an eco-conscious approach through innovative
                technology and a commitment to reducing carbon emissions,
                ultimately enhancing the daily lives of our riders, users,
                partners, stakeholders and supporting the cities we serve.
              </p>
            </div>
          </div>
        </div>

        <div className="w-1/2 md:w-full flex justify-center items-center">
          <img src="/img/about/3.png" className=" w-[60%] md:w-[80%]" alt="" />
        </div>
      </section>

      <section className="w-full flex flex-col  px-[50px] md:px-[20px] py-[50px] md:py-[30px]">
        <header className="">
          <p className="text-[4em] text-center leading-tight md:text-[2.5em] md:text-left font-bold">
            What's <br />
            <span className="text-[var(--primary-color)]">Happening. </span>
          </p>
        </header>
        <div className="w-full mt-10 flex md:flex-wrap gap-10">
          <div className="flex flex-col justify-between rounded-3xl bg-[#FCE7FC] px-5 pt-5 pb-10">
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

          <div className="flex flex-col justify-between rounded-3xl bg-[#C2E9C3] px-5 pt-5 pb-10">
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

          <div className="flex flex-col justify-between rounded-3xl bg-[#FFE8DE] px-5 pt-5 pb-10">
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
      <section className="">
        <FooterHero bgColor="#000" textColor="#fff" />
      </section>
    </div>
  );
}
