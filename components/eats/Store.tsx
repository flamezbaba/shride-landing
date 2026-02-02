"use client";

import { useShrideModal } from "@/hooks/useShrideModal";
import PickProductModal from "../modals/PickProductModal";
import { BsStarFill } from "react-icons/bs";
import { TbBike, TbTimeDuration10 } from "react-icons/tb";
import Link from "next/link";
import Image from "next/image";

export default function Store({ store }: { store: any }) {
  return (
    <Link
      href={`/stores/${store?.id}`} prefetch
      className="min-h-[250px] ring-2 ring-gray-300 rounded-md px-2 py-2 cursor-pointer overflow-hidden"
    >
      <div className="h-[160px] w-full rounded-md overflow-hidden relative">
        {/* <img
          src={store?.cover_url}
          alt=""
          className="object-cover h-full w-full"
        /> */}
          <Image
            src={store?.cover_url}
            alt={store?.store_name}
            fill
            objectFit="cover" 
            objectPosition="center"
            priority
          />
      </div>

      <div className="w-full flex items-center gap-5 justify-between mt-[15px]">
        <div className="">
          <p className="text-xl capitalize font-medium">{store?.store_name}</p>
        </div>

        <div className="">
          {!!store?.rating?.rate && (
            <div className="flex items-center gap-1">
              <BsStarFill size={15} className="text-orange-400" />
              <p className="">{store?.rating?.rate}</p>
            </div>
          )}
        </div>
      </div>

      <div className="w-full mt-[5px]">
        <div className="flex items-center gap-1 text-gray-600">
          <TbBike size={15} />
          <p className="text-sm capitalize font-medium">
            From ₦{store?.min_order_amount}
          </p>
        </div>

        <div className="text-gray-600">
          <p className="">{store?.store_front}</p>
        </div>
      </div>
    </Link>
  );
}
