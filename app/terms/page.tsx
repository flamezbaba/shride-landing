"use client";

import { useMediaQuery } from "@reactuses/core";
import { useEffect, useState } from "react";
import FooterHero from "@/components/FooterHero";
import Header from "@/components/Header";

export default function Terms() {
  const isMobile = useMediaQuery(
    "(min-width: 0px) and (max-width: 850px)",
    true,
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
    <div className="w-full lg:mt-10 overflow-hidden">
      <Header />
      <section className="w-full px-[50px] md:px-[20px]">
        <header className="w-full flex justify-between items-start">
          {/* <h3 className="text-center uppercase font-bold text-2xl">
            Terms of Service
          </h3> */}
          <p className="text-[6em] leading-tight md:text-[2.5em] font-bold mt-20 md:mt-0">
            Terms of Use
            {/* <br />{" "}
            <span className="text-[var(--primary-color)]">Conditions</span>{" "} */}
          </p>

          <img
            src="/img/terms.png"
            alt=""
            className="w-[20%] md:w-[120px] md:hidden"
          />
        </header>
        <article className="mt-10">
          <p>
            Welcome to Shride. These Terms of Use (“Terms”, “Agreement”) govern
            access to and use of the Shride mobile application, website, and
            related services (collectively, the “Platform”). By accessing or
            using Shride, you agree to be bound by this Agreement. If you do not
            agree, do not use the Platform.
          </p>

          <h2 className="mt-5 text-xl font-semibold">1. DEFINITIONS</h2>
          <ul>
            <li>
              “Shride,” “we,” “us,” or “our” refers to Shride Technologies and
              its affiliates.
            </li>
            <li>
              “User / Customer” refers to any individual who accesses or uses
              the Platform to request services.
            </li>
            <li>
              “Merchant” refers to restaurants, vendors, and businesses offering
              goods or services.
            </li>
            <li>
              “Partner” refers to fleet owners, logistics partners, or corporate
              collaborators.
            </li>
            <li>
              “Services” include ride-hailing, bike and trike transport, food
              delivery (Shride Eats), parcel delivery, and related offerings.
            </li>
          </ul>

          <h2 className="mt-5 text-xl font-semibold">
            2. PLATFORM ROLE & SCOPE
          </h2>
          <p>
            Shride is a technology platform that connects Users with independent
            Riders, Merchants, and Partners. Shride does not: own vehicles,
            employ Riders or Merchants, prepare food or goods, or guarantee
            availability or delivery time. All services are performed by
            independent third parties.
          </p>

          <h2 className="mt-5 text-xl font-semibold">
            3. ELIGIBILITY & ACCOUNTS
          </h2>
          <p className="">
            You must be at least 18 years old to use the Platform. You are
            responsible for maintaining accurate account information. You may
            not share accounts or impersonate others. Shride may suspend or
            terminate accounts for violations.
          </p>

          <h2 className="mt-5 text-xl font-semibold">4. SERVICES OFFERED</h2>
          <p className="">
            Shride provides access to rides and package delivery via bike and
            tricycle, food and restaurant delivery, grocery, parcel, and
            on-demand delivery. Availability varies by location and demand.
          </p>

          <h2 className="mt-5 text-xl font-semibold">
            5. PAYMENTS, WALLET & FUNDS
          </h2>
          <p className="">
            All payments are processed through the Shride Wallet. Funds added to
            the wallet are non-withdrawable and may only be used for Shride
            services. Wallet balances do not represent cash owed by Shride and
            cannot be redeemed, transferred, or withdrawn except where required
            by law.
          </p>

          <h2 className="mt-5 text-xl font-semibold">
            6. PRICING, FEES & CHARGES
          </h2>
          <p className="">
            Prices may include base fares, distance and time charges, service
            and platform fees, surge or peak pricing, and applicable taxes.
            Final pricing is displayed before confirmation.
          </p>

          <h2 className="mt-5 text-xl font-semibold">
            7. WAIT TIME, LATE FEES & NO-SHOWS
          </h2>
          <p className="">
            A limited free wait time may apply. After the free period, wait-time
            charges apply per minute. Excessive delay may result in cancellation
            and fees. Failure to appear may result in no-show charges.
          </p>

          <h2 className="mt-5 text-xl font-semibold">8. CANCELLATIONS</h2>
          <p className="">
            Users may cancel within permitted windows. If a user cancels a ride
            before the rider enroutes, the full fee will be returned to the
            user’s wallet. If the user cancels when the rider arrives or when
            the trip starts, the user will be charged in full. Late
            cancellations may incur fees. Users / Riders may cancel for safety,
            legality, or excessive delay. Food orders may not be cancellable
            once preparation begins or riders are on the way.
          </p>

          <h2 className="mt-5 text-xl font-semibold">9. REFUND POLICY</h2>
          <p className="">
            Ride refunds may be considered if a ride was charged but not
            completed, a technical billing error occurred, or the Rider failed
            to arrive. No refunds for completed trips, traffic delays, or
            user-requested route changes. Food & delivery refunds may be
            considered if orders were not delivered, items were missing, or
            merchants cancelled due to unavailability. No refunds for taste
            preference, change of mind, delays due to traffic, weather, peak
            demand, or user unavailability. All approved refunds are credited
            only to the Shride Wallet in 3-5 working days.
          </p>

          <h2 className="mt-5 text-xl font-semibold">10. USER OBLIGATIONS</h2>
          <p>
            Users agree to provide accurate pickup and delivery details, behave
            respectfully, comply with applicable laws, and not misuse or abuse
            the Platform. Users agree to have their phone handy because riders
            might call for further direction or provide delivery code.
          </p>

          <h2 className="mt-5 text-xl font-semibold">
            11. RIDER & COURIER TERMS
          </h2>
          <p className="">
            Riders are independent contractors, not employees or agents of
            Shride. Riders must hold valid licenses and permits, maintain
            roadworthy vehicles, comply with traffic laws, and provide safe and
            respectful service. Shride may deduct platform commissions, service
            fees, and penalties for policy violations from Rider earnings.
          </p>

          <h2 className="mt-5 text-xl font-semibold">12. MERCHANT TERMS</h2>
          <p>
            Merchants are responsible for product quality and accuracy, pricing
            and availability, packaging and preparation, and compliance with
            health and safety laws. Shride is not responsible for food quality
            or preparation. Shride is not responsible for food poisoning, badly
            prepared food, or accuracy of the menu, however, shride will adhere
            to strict cooking standards. Violations may result in immediate
            suspension or termination.
          </p>

          <h2 className="mt-5 text-xl font-semibold">13. SAFETY & CONDUCT</h2>
          <p>
            Prohibited conduct includes harassment or abuse, illegal activity,
            carrying prohibited items, and Platform manipulation. Violations may
            result in immediate suspension or termination.ƒ
          </p>

          <h2 className="mt-5 text-xl font-semibold">
            14. CONTENT & INTELLECTUAL PROPERTY
          </h2>
          <p>
            You may post reviews or feed back and keep ownership of your
            content, but you grant Shride a non-exclusive license to use it to
            operate and improve the Platform. You are responsible for ensuring
            your content is lawful and accurate. All Platform content, including
            designs, logos, text, and software, belongs to Shride or its
            licensors. You may not copy, modify, distribute, or reverse engineer
            any Platform materials without permission. Unauthorized use may lead
            to legal action.
          </p>

          <h2 className="mt-5 text-xl font-semibold">
            15. DISCLAIMERS
          </h2>
          <p>
            Services are provided “as is” and “as available.” Shride does not guarantee uninterrupted access, service availability, or delivery time.
          </p>

          <h2 className="mt-5 text-xl font-semibold">
            16. LIMITATION OF LIABILITY
          </h2>
          <p>
            To the maximum extent permitted by law, Shride is not liable for indirect, incidental, or consequential damages. Shride’s total liability shall not exceed fees paid for the specific service. Nothing limits liability where exclusion is prohibited by Nigerian law.
          </p>

          <h2 className="mt-5 text-xl font-semibold">
            17. INDEMNIFICATION
          </h2>
          <p>
            You agree to indemnify and hold harmless Shride from claims arising from your use of the Platform, violations of this Agreement, or third-party disputes.
          </p>

          <h2 className="mt-5 text-xl font-semibold">
            18. SUSPENSION & TERMINATION
          </h2>
          <p>
            Shride may suspend or terminate access at any time for policy violations, fraud, abuse, or legal/safety reasons. Outstanding balances will be resolved prior to final deactivation.
          </p>

          <h2 className="mt-5 text-xl font-semibold">
            19. DATA PROTECTION
          </h2>
          <p>
            Shride processes personal data in accordance with its Privacy Policy. Data is shared only as required for service delivery or legal compliance.
          </p>

          <h2 className="mt-5 text-xl font-semibold">
            20. GOVERNING LAW
          </h2>
          <p>
            This Agreement is governed by the laws of the Federal Republic of Nigeria, and disputes fall under Nigerian courts
          </p>

          <h2 className="mt-5 text-xl font-semibold">
            21. CHANGES TO TERMS
          </h2>
          <p>
            Shride may update these Terms at any time. Continued use of the Platform constitutes acceptance of updated Terms. For support or legal inquiries, contact Shride through the official app or website support channels.
          </p>

          
        </article>
      </section>

      <section className="">
        <FooterHero bgColor="#00a205" textColor="#fff" />
      </section>
    </div>
  );
}