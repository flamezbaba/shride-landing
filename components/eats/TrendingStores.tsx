"use client";

import { useShrideModal } from "@/hooks/useShrideModal";
import AddressModal from "../modals/AddressModal";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BiChevronDown, BiStore } from "react-icons/bi";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Store from "./Store";
import Image from "next/image";
import { useLocationContext } from "@/context/LocationContext";
import { useUserStore } from "@/store/user";
import { StoreTransition } from "./Transistions";
import { LiaSpinnerSolid } from "react-icons/lia";

export default function TrendingStores() {
  const { showModal } = useShrideModal();
  const { address } = useUserStore();

  const [homeEats, setHomeEats] = useState<any>(null);
  const [paginatedStore, setPaginatedStore] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState<any>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [storeLoading, setStoreLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!!address?.city) {
      getRecord();
      getPaginatedStores();
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

  const uniqueById = (arr: any) => {
    // return [...new Map(arr.map((item) => [item.id, item])).values()];

    // return Object.values(
    //   arr.reduce((acc: any, item: any) => {
    //     acc[item.id] = item;
    //     return acc;
    //   }, {}),
    // );

    const seen = new Set();
    return arr.filter((item: any) => {
      if (seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    });
  };

  const getPaginatedStores = async () => {
    if (!hasMore) return;

    setStoreLoading(true);
    const resx = await axios.get(
      `/api/stores/?type=getAllStoresPaginate&city=${address?.city}&page=${page}`,
    );

    if (!!resx?.data?.data) {
      setPage(resx.data?.data?.next_page);
      setHasMore(resx.data?.data?.has_more);
      // setPaginatedStore(resx.data.data.data);
      const ps = [...paginatedStore, ...resx.data.data.data];

      setPaginatedStore(uniqueById(ps));
    }

    setStoreLoading(false);
  };

  return (
    <div className="">
      {!!homeEats?.trending_res ? (
        <div className="">
          <section className="w-full px-[50px] md:px-[20px] py-[10px] mt-14">
            <div className="">
              <p className="font-semibold text-2xl">
                Restaurants Trending Today{" "}
              </p>
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
              <div className="w-full grid grid-cols-4 md:grid-cols-1 gap-5 mt-3 s-none">
                {/* {homeEats?.hand_picked?.splice(0, 4)?.map((r: any, i: any) => ( */}
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
              <div className="w-full grid grid-cols-4 md:grid-cols-1 gap-5 mt-3 s-none">
                {/* {homeEats?.fav_res?.splice(0, 4)?.map((r: any, i: any) => ( */}
                {homeEats?.fav_res?.map((r: any, i: any) => (
                  <Store key={i} store={r} />
                ))}
              </div>
            </div>
          </section>
        </div>
      ) : (
        <>
          {!isLoading ? (
            <div className="w-full flex flex-col justify-center items-center px-10 py-10 mt-10">
              <BiStore size={40} />
              <p className="text-lg">No stores found here!</p>
              <p className="mt-1 text-base">Please try another location</p>
            </div>
          ) : (
            <div className="">
              <section className="w-full px-[50px] md:px-[20px] py-[10px] mt-14">
                <div className="">
                  <p className="font-semibold text-2xl">
                    Restaurants Trending Today{" "}
                  </p>
                </div>

                <div className="mt-3">
                  <div className="w-full flex gap-5 overflow-scroll mt-3 s-none">
                    {[...Array(10)]?.map((r: any, i: any) => (
                      <div key={i} className="inline-flex flex-col items-center justify-center px-4 py-2">
                        <div className="w-[150px] h-[150px] overflow-hidden rounded-full shadow-lg bg-gray-200 relative animate-pulse"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section className="w-full px-[50px] md:px-[20px] py-[10px] mt-14">
                <div className="">
                  <p className="font-semibold text-2xl">
                    Handpicked for you 😊!{" "}
                  </p>
                </div>

                <div className="mt-3">
                  <div className="w-full grid grid-cols-4 md:grid-cols-1 gap-5 mt-3 s-none">
                    {[...Array(4)]?.map((_: any, i: any) => (
                      <StoreTransition key={i} />
                    ))}
                  </div>
                </div>
              </section>

              <section className="w-full px-[50px] md:px-[20px] py-[10px] mt-14">
                <div className="">
                  <p className="font-semibold text-2xl">Promo & deals </p>
                </div>

                <div className="mt-3">
                  <div className="w-full grid grid-cols-4 md:grid-cols-1 gap-5 mt-3 s-none">
                    {[...Array(4)]?.map((_: any, i: any) => (
                      <StoreTransition key={i} />
                    ))}
                  </div>
                </div>
              </section>
            </div>
          )}
        </>
      )}

      {paginatedStore?.length > 0 && (
        <div className="w-full px-[50px] md:px-[20px] py-[10px] mt-14">
          <p className="font-semibold text-2xl">All Restaurants</p>

          <div className="w-full grid grid-cols-4 md:grid-cols-1 gap-5 mt-3 s-none">
            {paginatedStore?.map((rx: any, i: any) => (
              <Store key={i} store={rx} />
            ))}
          </div>

          <div className="mt-5 flex justify-center items-center">
            {hasMore && (
              <button className="btn" onClick={() => getPaginatedStores()}>
                {storeLoading ? (
                  <LiaSpinnerSolid className="animate-spin" size={23} />
                ) : (
                  "View more"
                )}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
