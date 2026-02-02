"use client";

import { useShrideModal } from "@/hooks/useShrideModal";

import Link from "next/link";
import Image from "next/image";
import DownloadAppModal from "../modals/DownloadAppModal";

export default function StoreHomeSlides() {
  const { showModal } = useShrideModal();

  return (
    <div className="w-full flex md:flex-wrap justify-between items-center gap-10 md:gap-5 mt-10 md:mt-1">
      <div className="w-1/2 md:w-full h-[250px] md:h-[100px] rounded-2xl overflow-hidden relative">
        {/* <Image
          src="/img/webeats/1.png"
          alt=""
          fill
          objectFit="cover"
          objectPosition="center"
        /> */}

        <img
          src="/img/webeats/1.png"
          alt=""
          className="object-cover md:object-contain w-full h-full"
        />
      </div>

      <div
        onClick={() => showModal(<DownloadAppModal closable={true} />)}
        className="w-1/2 md:w-full h-[250px] md:h-[100px] rounded-2xl overflow-hidden cursor-pointer"
      >
        <img
          src="/img/webeats/2.png"
          alt=""
          className="object-cover md:object-contain w-full h-full"
        />
      </div>
    </div>
  );
}
