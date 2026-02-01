"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
import { BiMapPin, BiMenu, BiSearch } from "react-icons/bi";
import { IoCheckmarkCircle } from "react-icons/io5";
import Product from "./Product";
import Image from "next/image";
import { HiOutlineLocationMarker } from "react-icons/hi";
import StoreTotalFloater from "./StoreTotalFloater";
import StoreCart from "./StoreCart";
import { useUserStore } from "@/store/user";
import { usePathname } from "next/navigation";
import { BsStarFill } from "react-icons/bs";

export default function ViewStore({
  store,
  storeMenuAndProducts,
}: {
  store: any;
  storeMenuAndProducts: any[];
}) {
  const { cart, hasHydrated } = useUserStore();
  const pathname = usePathname();

  const [currentCategory, setCurrentCategory] = useState<any>(null);
  const [searchText, setSearchText] = useState<any>(null);
  const [storeCart, setsStoreCart] = useState<any>([]);

  useEffect(() => {
    const storePos = cart?.find((s: any) => s?.store_id == store.id);

    setsStoreCart(storePos);
  }, [cart]);

  useEffect(() => {
    // console.log('Dd', storeMenuAndProductsData);
    if (storeMenuAndProducts?.length > 0) {
      if (currentCategory == null) {
        setCurrentCategory(storeMenuAndProducts[0]);
      }
    }
  }, [storeMenuAndProducts]);

  if (!hasHydrated) return null;

  let productList: [] = currentCategory ? currentCategory?.products : [];

  let searchedProductList = searchText
    ? productList?.filter((f: any) =>
        f?.name.toLowerCase().includes(searchText?.toLowerCase()),
      ) || []
    : productList;

  return (
    <div className="w-full">
      <section className="w-full px-[50px] md:px-[20px] mt-5">
        <div className="w-full h-[350px] rounded-2xl overflow-hidden relative">
          {/* <img
              src={store?.cover_url}
              alt=""
              className="object-cover w-full h-full"
            /> */}
          <Image
            src={store?.cover_url}
            alt=""
            // placeholder="blur"
            fill
            objectFit="cover"
            objectPosition="center"
            // blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOsa2yqBwAFCAICLICSyQAAAABJRU5ErkJggg=="
          />
          <div className="absolute bottom-3 w-full flex items-center justify-between px-10">
            <div className="w-[160px] h-[160px] rounded-full overflow-hidden shadow-md">
              <img
                src={store?.logo_url}
                alt=""
                className="object-cover w-full h-full"
              />
            </div>

            {store?.open_close_statement?.color == "red" ? (
              <div className="inline-flex items-center gap-2 bg-red-200 rounded-md px-4 py-2">
                {/* <IoCheckmarkCircle className="text-red-700" size={22} /> */}
                <p className="text-xl text-red-700 font-semibold">
                  {store?.open_close_statement?.status}
                </p>
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 bg-green-200 rounded-md px-4 py-2">
                <IoCheckmarkCircle className="text-green-700" size={22} />
                <p className="text-xl text-green-700 font-semibold capitalize">
                  {store?.open_close_statement?.status}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="w-full flex justify-between items-start gap-4 mt-6">
          <div className="">
            <div className="text-5xl font-bold capitalize">
              {store?.store_name}
            </div>
            <div className="flex items-center gap-5">
              <div className="inline-flex items-center gap-1">
                <HiOutlineLocationMarker size={18} />
                <p className="text-lg capitalize mt-1">{store?.area}</p>
              </div>
              <div className="">
                {!!store?.rating?.rate && (
                  <div className="flex items-center gap-1">
                    <BsStarFill size={15} className="text-orange-400 -mt-1" />
                    <p className="text-base">{store?.rating?.rate}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <div className="bg-[var(--primary-color)] w-auto rounded-sm px-4 py-1 text-white text-xs font-medium">
              Delivery
            </div>

            <div className="ring-2 ring-gray-300 h-[30px] w-[300px] rounded-md flex items-center gap-2 px-3 mt-2">
              <BiSearch size={18} className="text-gray-400" />
              <input
                type="text"
                className="flex-1 h-full bg-transparent px-3 outline-none focus:outline-none text-sm"
                placeholder="Search Store"
                onChange={(e: any) => setSearchText(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full px-[50px] md:px-[20px] mt-5 flex gap-10 relative overflow-hidden">
        <div
          className={clsx([storeCart?.carts?.length > 0 ? "w-3/4" : "w-4/4"])}
        >
          <div className="w-full flex items-center">
            <div className="flex justify-center items-center">
              <BiMenu size={25} />
            </div>
            <div className="flex-1 flex items-start flex-wrap h-[30px] gap-0 overflow-scroll s-none">
              {storeMenuAndProducts?.map((item: any, index: any) => (
                <div
                  key={index}
                  onClick={() => setCurrentCategory(item)}
                  className="inline-flex flex-col items-center justify-center whitespace-nowrap px-4 py-2 cursor-pointer"
                >
                  <p
                    className={clsx(
                      [
                        item?.id == currentCategory?.id
                          ? "text-[var(--primary-color)] font-semibold"
                          : "text-gray-500 font-medium",
                      ],
                      `text-lg capitalize leading-none`,
                    )}
                  >
                    {item?.name}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div
            className={clsx(
              [
                storeCart?.carts?.length > 0
                  ? "grid grid-cols-3"
                  : "grid grid-cols-4",
              ],
              `gap-5 mt-5 pb-10`,
            )}
          >
            {searchedProductList?.map((p: any, i: any) => (
              <Product key={p.uuid} product={p} />
            ))}
          </div>
        </div>

        {storeCart?.carts?.length > 0 && (
          <div className="w-1/4 border-t-2 border-l-2 border-r-2 mt-[54px] rounded-tr-lg rounded-tl-lg">
            {/* <div className="w-full h-[300px] flex flex-col justify-center items-center">
              <img src="/img/webeats/pack.png" alt="" className="w-[90px]" />
              <p className="text-center mt-5">
                Your cart is empty.
                <br /> Add items to get started
              </p>
            </div> */}

            <div className="mt-3">
              <StoreCart storeId={store.id} storeData={store} />
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
