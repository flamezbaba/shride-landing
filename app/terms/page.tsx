"use client";

import { useMediaQuery } from "@reactuses/core";
import { useEffect, useState } from "react";
import FooterHero from "@/components/FooterHero";

export default function Terms() {
  const isMobile = useMediaQuery(
    "(min-width: 0px) and (max-width: 850px)",
    true
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
      <section className="w-full px-[50px] md:px-[20px]">
        <header className="w-full flex justify-between items-start">
          {/* <h3 className="text-center uppercase font-bold text-2xl">
            Terms of Service
          </h3> */}
          <p className="text-[6em] leading-tight md:text-[2.5em] font-bold mt-20 md:mt-0">
            Terms &
            <br />{" "}
            <span className="text-[var(--primary-color)]">Conditions</span>{" "}
          </p>

          <img src="/img/terms.png" alt="" className="w-[40%] md:w-[120px] md:hidden" />
        </header>
        <article className="mt-10">
          <p>
            Welcome to Shride, the premier ride-hailing service committed to
            providing safe, reliable, and convenient transportation solutions.
            By using our platform, you agree to abide by the following terms and
            conditions. Please read these Terms carefully before using the
            Platform. If you do not agree to all of the Terms, you may not use
            the Platform.
          </p>

          <h2 className="mt-5 text-xl font-semibold">1. Definitions</h2>
          <ul>
            <li>
              <strong>Account:</strong> An account created by a user or Driver
              on the Platform.
            </li>
            <li>
              <strong>Driver:</strong> An individual who provides transportation
              services through the Platform.
            </li>
            <li>
              <strong>User:</strong> An individual who uses the Platform to
              request transportation services.
            </li>
            <li>
              <strong>Ride:</strong> A transportation service requested by a
              Rider and provided by a Driver through the Platform.
            </li>
            <li>
              <strong>Shride:</strong> The owner and operator of the Platform.
            </li>
          </ul>

          <h2 className="mt-5 text-xl font-semibold">2. Eligibility</h2>
          <p>To use the Platform, you must:</p>
          <ul>
            <li>Be at least 18 years old.</li>
            <li>Have a valid government-issued ID.</li>
            <li>Have a valid payment method linked to your account.</li>
            <li>Be able to enter into a binding contract.</li>
          </ul>

          <h2 className="mt-5 text-xl font-semibold">3. User Accounts</h2>
          <ul>
            <li>
              To create a Rider account, you will need to provide your name,
              phone number, email address, and payment information.
            </li>
            <li>
              You are responsible for maintaining the confidentiality of your
              account information, including your login credentials.
            </li>
            <li>
              You are responsible for all activity that occurs under your
              account.
            </li>
          </ul>

          <h2 className="mt-5 text-xl font-semibold">4. Rider Accounts</h2>
          <ul className="list-disc ml-10">
            <li>
              To create a rider account, you will need to provide additional
              information beyond what is required for a Rider account, such as
              vehicle information, driver's licence, and proof of insurance.
            </li>
            <li>
              Shride reserves the right to conduct background checks on riders.
            </li>
            <li>
              Riders are responsible for ensuring their vehicles meet all
              applicable safety and licensing requirements.
            </li>
            <li>
              Riders are responsible for maintaining their vehicle insurance and
              providing proof of insurance to Shride.
            </li>
          </ul>

          <h2 className="mt-5 text-xl font-semibold">5. Using the Platform</h2>
          <ul className="list-disc ml-10">
            <li>
              <strong>Users:</strong> You can use the Platform to request a Ride
              or delivery by specifying your pickup and drop-off locations. You
              will be shown the estimated fare for the Ride before you request
              it. Users can also add package insurance to their parcels. Shride
              insures packages up to 10,000 upon completing the necessary
              documentation and processes.
            </li>
            <li>
              <strong>Riders:</strong> You can use the Platform to accept or
              decline Ride requests. You will be able to see the User’s pickup
              and drop-off locations, as well as the estimated fare for the
              Ride, before you accept it.
            </li>
          </ul>

          <h2 className="mt-5 text-xl font-semibold">6. Fares and Payments</h2>
          <ul className="list-disc ml-10">
            <li>
              Fares are calculated based on factors such as distance, time, and
              demand.
            </li>
            <li>
              You can see the estimated fare for a Ride before you request it
              (users) or accept it (Drivers).
            </li>
            <li>
              Payment for Rides is made through the Platform using your linked
              payment method.
            </li>
            <li>
              Shride may add fees or surcharges to fares from time to time. We
              will notify you of any changes to the fare structure before they
              go into effect.
            </li>
            <li>
              Additional fee is an extra fee required to complete your ride or
              delivery, this is used to cover statutory expenses or parting fee.
              You will be debited if you have enough money in your wallet to
              cover for it. If not, you will receive a notification to fund your
              wallet to continue the trip.
            </li>
          </ul>

          <h2 className="mt-5 text-xl font-semibold">7. Cancellations</h2>
          <ul className="list-disc ml-10">
            <li>Both Riders and users can cancel Rides before they begin.</li>
            <li>
              There may be cancellation fees associated with cancelling a Ride,
              depending on how far in advance the cancellation occurs.
            </li>
            <li>
              You can see the cancellation policy before you request or accept a
              Ride.
            </li>
            <li>
              Both riders and users can end an ongoing trip. If a user cancels
              an ongoing trip after pickup, the total fee for the trip will be
              credited to the rider. If a rider cancels an ongoing trip, the
              total fee will be put on hold and investigated by Shride’s support
              team, and necessary actions will be taken to pay a percentage of
              the fee, depending on how far into the trip it was before
              cancellation.
            </li>
          </ul>

          <h2 className="mt-5 text-xl font-semibold">8. User/Rider Conduct</h2>
          <ul className="list-disc ml-10">
            <li>
              You agree to use the Platform in a respectful and lawful manner.
            </li>
            <li>
              You agree not to use the Platform for any illegal or unauthorised
              purpose.
            </li>
            <li>
              You agree not to harass, abuse, threaten, or intimidate any other
              user of the Platform.
            </li>
            <li>You agree not to damage or tamper with the Platform.</li>
            <li>
              Shride reserves the right to terminate your account for any
              violation of these Terms.
            </li>
          </ul>

          <h2 className="mt-5 text-xl font-semibold">9. User/Rider Content</h2>
          <ul className="list-disc ml-10">
            <li>
              You may be able to submit content to the Platform, such as
              reviews, ratings, and photos.
            </li>
            <li>You retain all ownership rights to the content you submit.</li>
            <li>
              By submitting content to the Platform, you grant Shride a
              non-exclusive, worldwide, royalty-free licence to use, reproduce,
              modify, publish, and distribute your content.
            </li>
            <li>
              You are responsible for the content you submit and agree to
              indemnify Shride for any claims arising from your content.
            </li>
          </ul>

          <h2 className="mt-5 text-xl font-semibold">10. Quality of Service</h2>
          <p>
            Shride strives to provide a safe, reliable, and positive experience
            for all users. We expect both Riders and Drivers to treat each other
            with respect and courtesy. We also expect Drivers to maintain a
            clean and well-maintained vehicle and to arrive on time for Rides.
            If you have any concerns about the quality of service you receive,
            please contact Shride.
          </p>

          <h2 className="mt-5 text-xl font-semibold">11. Prohibited Conduct</h2>
          <ul className="list-disc ml-10">
            <li>
              You agree not to use the Platform for any of the following
              purposes:
            </li>
            <li>To transport illegal goods or substances.</li>
            <li>To engage in any illegal activity.</li>
            <li>To harm or threaten to harm any person or property.</li>
            <li>To impersonate another person.</li>
            <li>To violate the privacy of another person.</li>
            <li>
              To distribute spam or other unsolicited commercial communications.
            </li>
            <li>To disrupt or interfere with the Platform.</li>
          </ul>

          <h2 className="mt-5 text-xl font-semibold">
            12. Our Materials and Licences to You
          </h2>
          <p>
            The Platform contains materials that are owned by or licensed to
            Shride, including trademarks, copyrights, and other intellectual
            property. Shride grants you a limited, non-exclusive,
            non-transferable licence to access and use the Platform for your
            personal, non-commercial use. You may not copy, modify, distribute,
            or create derivative works of the Platform materials without
            Shride's express written permission.
          </p>

          <h2 className="mt-5 text-xl font-semibold">
            13. Our Alcoholic Beverage Policy
          </h2>
          <p>
            Shride prohibits the transportation of open containers of alcohol in
            vehicles used for Rides. Riders are also prohibited from being
            intoxicated while using the Platform. Shride reserves the right to
            refuse service to any Rider or Driver who appears to be intoxicated.
          </p>

          <h2 className="mt-5 text-xl font-semibold">
            14. Limitation of Liability
          </h2>
          <p>
            Shride, its affiliates, directors, officers, employees, agents, and
            licensors shall not be liable for any direct, indirect, incidental,
            special, consequential, or exemplary damages, including but not
            limited to, damages for loss of profits, goodwill, use, data, or
            other intangible losses, resulting from:
          </p>
          <ul className="list-disc ml-10">
            <li>
              The use or inability to use the Shride platform or services.
            </li>
            <li>Any content or conduct of third parties on the platform.</li>
            <li>
              Any unauthorised access to or alteration of your transmissions or
              data.
            </li>
            <li>
              Any other matter relating to the Shride platform or services.
            </li>
          </ul>
          <p>
            In no event shall Shride's total liability to you for all damages,
            losses, or causes of action exceed the amount paid by you, if any,
            to Shride for accessing or using the platform or services during the
            twelve (12) months preceding the claim.
          </p>

          <h2 className="mt-5 text-xl font-semibold">
            15. Disclaimer of Warranty
          </h2>
          <p>
            The Shride platform and services are provided on an "as is" and "as
            available" basis, without warranties of any kind, either express or
            implied, including, but not limited to, warranties of
            merchantability, fitness for a particular purpose, non-infringement,
            or accuracy. Shride makes no warranty that:
          </p>
          <ul className="list-disc ml-10">
            <li>
              The platform or services will meet your requirements or
              expectations.
            </li>
            <li>
              The platform or services will be uninterrupted, timely, secure, or
              error-free.
            </li>
            <li>
              The results that may be obtained from the use of the platform or
              services will be accurate or reliable.
            </li>
            <li>
              The quality of any products, services, information, or other
              material purchased or obtained by you through the platform or
              services will meet your expectations.
            </li>
          </ul>
          <p>
            Any content downloaded or otherwise obtained through the use of the
            platform or services is accessed at your own discretion and risk,
            and you will be solely responsible for any damage to your computer
            system or loss of data that results from the download of any such
            content.
          </p>

          <h3 className="mt-5 text-xl font-semibold">
            Exclusions and Limitations:
          </h3>
          <p>
            Some jurisdictions do not allow the exclusion of certain warranties
            or the limitation or exclusion of liability for certain damages.
            Accordingly, some of the above limitations and disclaimers may not
            apply to you. To the extent that Shride cannot disclaim any implied
            warranty or limit its liabilities as set forth herein, the scope and
            duration of such warranty and the extent of Shride's liability shall
            be the minimum permitted under applicable law.
          </p>
          <p>
            By using the Shride platform or services, you acknowledge and agree
            that you have read, understood, and agree to be bound by the terms
            of this limitation of liability and disclaimer of warranty. If you
            do not agree to these terms, you should not use the Shride platform
            or services.
          </p>

          <h2 className="mt-5 text-xl font-semibold">
            Grey Market Transactions: A Violation of Shride's Terms of Service
          </h2>
          <p>
            At Shride, we strive to maintain a safe, reliable, and transparent
            ride-hailing service for both users and drivers. One of the critical
            violations of our terms of service is engaging in grey market
            transactions.
          </p>

          <h3 className="mt-5 text-xl font-semibold">
            What are Grey Market Transactions?
          </h3>
          <p>
            Grey market transactions refer to accepting payments or giving rides
            outside of the Shride app. This practice involves conducting ride
            transactions independently of the platform, thereby bypassing
            Shride’s established systems for payment processing, safety
            monitoring, and customer support.
          </p>

          <h3 className="mt-5 text-xl font-semibold">
            Why Are Grey Market Transactions Prohibited?
          </h3>
          <ol className="list-decimal ml-10">
            <li>
              <strong>Security and Safety:</strong> Shride's platform is
              designed to ensure the safety and security of both drivers and
              users. When transactions occur outside the app, this protective
              framework is compromised, increasing the risk of fraud, disputes,
              and unsafe conditions.
            </li>
            <li>
              <strong>Transparency:</strong> Our app provides a transparent
              system for calculating fares, applying surge pricing, and
              processing payments. Grey market transactions undermine this
              transparency, potentially leading to unfair pricing and
              dissatisfaction among users.
            </li>
            <li>
              <strong>Accountability:</strong> Shride holds drivers and users
              accountable through in-app tracking, ratings, and feedback
              systems. Off-app transactions bypass these accountability
              measures, making it difficult to resolve issues and maintain
              service quality.
            </li>
            <li>
              <strong>Insurance and Coverage:</strong> Rides booked through the
              Shride app are covered by our insurance policies, providing
              protection for both drivers and users. Grey market transactions
              are not covered, leaving both parties vulnerable in case of
              accidents or incidents.
            </li>
            <li>
              <strong>Compliance and Legal Obligations:</strong> Conducting
              transactions outside the app can lead to non-compliance with local
              regulations and tax laws, putting both Shride and its users at
              legal risk.
            </li>
          </ol>

          <h3 className="mt-5 text-xl font-semibold">
            Consequences of Grey Market Transactions:
          </h3>
          <ul className="list-decimal ml-10">
            <li>
              <strong>Immediate Termination:</strong> Engaging in grey market
              transactions will result in the immediate termination of the
              driver's account and access to the Shride platform.
            </li>
            <li>
              <strong>Forfeiture of Earnings:</strong> Drivers found
              participating in such activities may forfeit any pending earnings
              and bonuses.
            </li>
            <li>
              <strong>Legal Action:</strong> Shride reserves the right to pursue
              legal action against individuals involved in grey market
              transactions to protect our business and user community.
            </li>

            <li>
              <strong>Maintaining Integrity:</strong> To ensure the continued
              success and integrity of Shride, it is crucial that all ride
              transactions occur through the official app. This policy not only
              upholds our terms of service but also reinforces the trust and
              safety that our users expect from Shride.
            </li>
          </ul>
          <p className="mt-5">
            By adhering to these guidelines, drivers can contribute to a secure,
            transparent, and reliable ride-hailing experience for everyone.
          </p>
        </article>
      </section>

      <section className="">
        <FooterHero bgColor="#00a205" textColor="#fff" />
      </section>
    </div>
  );
}
