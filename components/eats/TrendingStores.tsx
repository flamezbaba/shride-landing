"use client";

import { useShrideModal } from "@/hooks/useShrideModal";
import AddressModal from "../modals/AddressModal";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BiChevronDown } from "react-icons/bi";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Store from "./Store";
import Image from "next/image";
import { useLocationContext } from "@/context/LocationContext";
import { useUserStore } from "@/store/user";

export default function TrendingStores() {
  const { showModal } = useShrideModal();
  const { address } = useUserStore();

  const [homeEats, setHomeEats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!!address?.city) {
      getRecord();
    }
  }, [address]);

  const getRecord = async () => {
    setIsLoading(true);
    const res = await axios.get(
      `/api/delivery?type=getEatHomepage&city=${address?.city}`,
    );

    if (!!res?.data) {
      setHomeEats(res.data);
    }

    setIsLoading(false);
  };

  const openModal = () => {
    showModal(<AddressModal />);
  };

  return (
    <div className="">
      <section className="w-full px-[50px] md:px-[20px] py-[10px] mt-14">
        <div className="">
          <p className="font-semibold text-2xl">Trending Restaurants </p>
        </div>

        <div className="mt-3">
          <div className="w-full flex gap-5 overflow-scroll mt-3 s-none">
            {homeEats?.trending_res?.map((r: any, i: any) => (
              <Link
                href={`/stores/${r.id}`}
                key={i}
                className="inline-flex flex-col items-center justify-center px-4 py-2"
              >
                <div className="w-[150px] h-[150px] overflow-hidden rounded-full shadow-lg bg-white relative">
                  <Image
                    src={r?.logo_url}
                    alt={r?.store_name}
                    placeholder="blur"
                    fill
                    objectFit="cover"
                    objectPosition="center"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOsa2yqBwAFCAICLICSyQAAAABJRU5ErkJggg=="
                  />
                </div>
                <div className="mt-2 text-center">
                  <p className="text-lg font-semibold capitalize">
                    {r?.store_name}
                  </p>
                  {/* <p className="text-green-700 text-lg font-semibold">
                    (2750+)
                  </p> */}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full px-[50px] md:px-[20px] py-[10px] mt-14">
        <div className="">
          <p className="font-semibold text-2xl">Handpicked for you 😊! </p>
        </div>

        <div className="mt-3">
          <div className="w-full grid grid-cols-4 gap-5 mt-3 s-none">
            {homeEats?.hand_picked?.map((r: any, i: any) => (
              <Store key={i} store={r} />
            ))}
          </div>
        </div>
      </section>

      <section className="w-full px-[50px] md:px-[20px] py-[10px] mt-14">
        <div className="">
          <p className="font-semibold text-2xl">Promo & deals </p>
        </div>

        <div className="mt-3">
          <div className="w-full grid grid-cols-4 gap-5 mt-3 s-none">
            {homeEats?.fav_res?.map((r: any, i: any) => (
              <Store key={i} store={r} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
