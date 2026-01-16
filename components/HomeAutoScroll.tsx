import { useEffect, useRef } from "react";
import "./scroll.css";

export default function HomeAutoScroll() {
  const slides = [
    {
      img: "/img/home/scroll/1.png",
      t: "Happy",
      m: "Tribe",
    },
    {
      img: "/img/home/scroll/2.png",
      t: "Quick",
      m: "Deliveries",
    },
    {
      img: "/img/home/scroll/3.png",
      t: "5 star",
      m: "Shriders",
    },
    {
      img: "/img/home/scroll/4.png",
      t: "100k+",
      m: "Tribers",
    },
    {
      img: "/img/home/scroll/5.png",
      t: "500+",
      m: "Restaurants",
    },
    {
      img: "/img/home/scroll/6.png",
      t: "Massive",
      m: "Discounts",
    },
    {
      img: "/img/home/scroll/7.png",
      t: "24/7",
      m: "Support",
    },
    {
      img: "/img/home/scroll/8.png",
      t: "Faaji",
      m: "Friday",
    },
    {
      img: "/img/home/scroll/9.png",
      t: "Delicious",
      m: "food",
    },
    {
      img: "/img/home/scroll/5.png",
      t: "10m+",
      m: "Rider payouts",
    },
  ];

  // const items = Array.from({ length: 10 }).map((_, i) => (
  const items = slides.map((r, i) => (
    <div
      className="rounded-xl w-auto px-5 overflow-hidden h-[70px] bg-gradient-to-bl from-purple-800 to-orange-600 flex gap-2 items-center justify-center"
      key={i}
    >
      <div className="">
        <img src={r?.img} className="w-[50px]" />
      </div>
      <div className="text-center">
        <p className="text-white font-semibold text-xl">{r?.t}</p>
        <p className="text-white font-semibold -mt-1">{r?.m}</p>
      </div>
    </div>
  ));

  return (
    <div className="scroll-wrapper">
      <div className="scroll-track gap-10">
        {items}
        {items}
      </div>
    </div>
  );
}
