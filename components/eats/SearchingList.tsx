"use client";

import { shortenWords } from "@/lib/utils";
import { useUserStore } from "@/store/user";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SearchingList({ query }: { query: string }) {
  const { address } = useUserStore();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchResults, setSearchResults] = useState<any>([]);

  useEffect(() => {
    if (!!address) {
      getRecord();
    }
  }, [query, address]);

  const getRecord = async () => {
    setIsLoading(true);
    const res = await axios.get(
      `/api/delivery?type=searchStores&city=${address?.city}&query=${query}`,
    );

    if (!!res?.data) {
      setSearchResults(res.data);
    } else {
      setSearchResults([]);
    }

    setIsLoading(false);
  };

  if (isLoading)
    return (
      // <div className="mt-10 w-full flex flex-col justify-center items-center">
      //   <img src="/img/webeats/search.png" alt="" className="w-[200px]" />
      //   <p className="text-center text-2xl mt-2">
      //     There are currently no matches for "{query}"{" "}
      //   </p>
      // </div>

      <div className="w-full px-20 flex items-center justify-center pt-[70px]">
        <p className="text-lg ">Searching for "{query}"...</p>
      </div>
    );

  const totalResults = searchResults?.products
    ? [...searchResults.products, ...searchResults?.stores]
    : [];

  return (
    <>
      {totalResults?.length > 0 ? (
        <div className="mt-14 grid grid-cols-3 md:grid-cols-1 gap-5">
          {searchResults?.stores?.map((s: any, index: any) => (
            <Link
              href={`/stores/${s.id}`}
              key={index}
              className="ring-2 ring-gray-300 px-2 py-2 rounded-lg cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <img
                  src={s?.logo_url}
                  alt=""
                  className="w-[50px] h-[50px] object-cover rounded-full"
                />

                <div className="">
                  <p className="text-lg font-medium capitalize leading-none">
                    {s?.store_name}
                  </p>
                </div>
              </div>

              <div className="w-full h-[70px] mt-5 flex flex-col flex-wrap gap-4 overflow-scroll s-none">
                {s?.products?.map((p: any, pi: any) => (
                  <div
                    key={pi}
                    className="rounded-lg h-[65px] w-[210px] bg-orange-100 p-2 flex items-start gap-3 justify-between"
                  >
                    <div className="flex flex-col justify-between">
                      <p className="text-base font-medium capitalize whitespace-nowrap">
                        {shortenWords(p?.name, 15)}
                      </p>
                      <p className="text-sm">₦{p?.price?.toLocaleString()}</p>
                    </div>
                    <img
                      src={p?.image_url}
                      alt=""
                      className="w-[50px] h-[50px] object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>

              <div className="w-full mt-1">
                <button className="btn w-full">View all items</button>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="mt-10 w-full flex flex-col justify-center items-center">
          <img src="/img/webeats/search.png" alt="" className="w-[200px]" />
          <p className="text-center text-2xl mt-2">
            There are currently no matches for "{query}" in {address?.city}
          </p>
        </div>
      )}
    </>
  );
}
