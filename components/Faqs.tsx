"use client";

import { useState } from "react";

const FAQ = [
  {
    question: "What is Shride?",
    answer:
      "Shride is the ultimate mobility app that offers quick passenger pickup and pocket-size delivery with 5 star drivers for a comfortable ride to your destination.<br/> <br/>  Avoid delay by scheduling your ride ahead.",
  },
  {
    question: "What is do you do?",
    answer:
      "Shride second is the ultimate mobility app that offers quick passenger pickup and pocket-size delivery with 5 star drivers for a comfortable ride to your destination.<br/> <br/>  Avoid delay by scheduling your ride ahead.",
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
