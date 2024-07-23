"use client";

import { useState } from "react";

const FAQ = [
  {
    question: "What is ShrideApp?",
    answer:
      "ShrideApp is the ultimate mobility app designed to satisfy all your transportation needs with unique efficiency. We offer quick passenger pickups and pocket-sized deliveries, all managed by our 5-star riders who ensure a comfortable and pleasant ride to your destination. Say goodbye to delays by scheduling your ride ahead of time, allowing you to enjoy a seamless, stress-free travel experience. Whether you're commuting to work or sending a parcel across town, Shride is here to provide reliable and top-quality service every step of the way.",
  },
  {
    question: "What do we do?",
    answer:
      "We are a leading peer-to-peer e-hailing app in Nigeria, revolutionising the ride-sharing experience by leveraging advanced technology. Our platform ensures a smooth and efficient process, effortlessly matching riders with users to provide a convenient, safe and reliable transportation solution.",
  },
  {
    question: "How do I request a ride?",
    answer:
      "To request a ride, open the app and ensure your location services are enabled. Your pickup location is automatically populated by the app, just, enter your destination.  Once confirmed, a nearby Shride rider will be notified of your request and will arrive shortly to pick you up. You can track the rider's location in real-time on the app's map feature. When the ride is complete you make a payment.",
  },
  {
    question: "How do I pay for my ride?",
    answer:
      "You can pay for your ride on the app using various methods such as debit cards or in-app wallets. Simply add your preferred payment method to your Shride wallet. You can also pay in cash after your ride is complete. These payment systems offer convenience and security for both riders and users.",
  },
  {
    question: "What happens if my rider cancels?",
    answer:
      "If your rider cancels the ride, the app automatically searches for another rider till you get matched. If cancellations become frequent or are made after a certain period, the app may penalise or restrict the rider's account to discourage cancellations and ensure a smoother experience for all users.",
  },
  {
    question: "How long will it take for my driver to arrive?",
    answer:
      "The app provides an estimated time of arrival (ETA) when you request a ride, based on real-time data, you can track your driver's location in real-time on the app's map feature to get an accurate arrival time. The estimated time for your Shride rider to arrive depends on various factors such as the distance between you and the driver, traffic and weather conditions, and the current demand for rides.",
  },
  {
    question: "Can I rate my driver after the ride?",
    answer:
      "Yes, after completing your ride on the Shride app, you can typically rate your rider and provide feedback on your experience. This helps maintain service quality and provides valuable insights for both Shride and future passengers. After the ride, you'll be prompted to rate your driver on a scale and optionally leave comments to further elaborate on your experience.",
  },
  {
    question: "Can I request a ride without using the app?",
    answer:
      "No. All ride requests go through the app, we are not responsible for damages and claims outside our app. However, in the instance of an emergency, you can call our customer support team and they can pair a rider with you after confirming your identity and details.",
  },
  {
    question: "Can I request a ride for someone else?",
    answer:
      "Yes, you can. Just replace the person’s details: name, phone number, pickup and drop-off points. You can also leave a note for the rider.",
  },
  {
    question: "What safety measures are in place for riders?",
    answer:
      "Driver screening program. Shride conducts comprehensive routine background checks and verifies the identities of its drivers to ensure they meet safety standards.) Ride tracking (Riders can track their rides in real-time via the app, allowing them to share their trip details with friends or family for added security.) Rating system (Shride has a rating system where users can rate their riders and provide feedback on their experience, helping maintain service quality. A rider might be deactivated if they fall below 3.5.)",
  },
];

export default function Faqs() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  return (
    <div className="bg-white border-4 border-black rounded-2xl p-8 flex flex-col h-[800px] md:h-auto overflow-hidden">
      <div className="grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-0 h-full">
        <div className="">
          <h3 className="text-4xl md:text-2xl font-bold mb-10 md:mb-2">FAQs.</h3>
          <div className="mt-4 max-h-[610px] overflow-y-auto pb-14 s-none">
            <div className="flex lg:grid lg:gap-4">
              {FAQ.map((f, index) => (
                <button
                  onClick={() => setCurrentIndex(index)}
                  key={index}
                  className={[
                    currentIndex == index
                      ? "bg-[var(--primary-color)] text-white"
                      : "border-[#131313] border-[2px] text-[#131313]",
                    "text-left font-bold py-5 px-5 leading-5 rounded-lg min-w-[250px] flex items-center mr-2",
                  ]
                    .toString()
                    .replace(",", " ")}
                >
                  <span
                    className="flex-1 text-sm lg:text-lg"
                    dangerouslySetInnerHTML={{ __html: f.question }}
                  ></span>
                  <div className="w-5 h-5 bg-white rounded-full"></div>
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="">
          <h3 className="text-4xl md:text-2xl font-bold mb-10 md:mb-2">Ans.</h3>
          <div className="mt-4 p-2 rounded-2xl bg-[var(--primary-color)]">
            <div className="pb-4 overflow-y-auto h-[600px] md:h-[300px] p-8 order-2 s-none">
              <div className="w-5 h-5 bg-[#fff] mb-5 rounded-full"></div>
              <p className="text-2xl md:text-xl leading-normal text-white">
                <p
                  dangerouslySetInnerHTML={{ __html: FAQ[currentIndex].answer }}
                ></p>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
