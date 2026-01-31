import EatHeader from "@/components/eats/EatHeader";
import ExploreCategories from "@/components/eats/ExploreCategories";
import Store from "@/components/eats/Store";
import StoreList from "@/components/eats/StoreList";
import TopAddress from "@/components/eats/TopAddress";
import FooterHero from "@/components/FooterHero";
import AddressModal from "@/components/modals/AddressModal";
import DownloadAppModal from "@/components/modals/DownloadAppModal";
import { useShrideModal } from "@/hooks/useShrideModal";
import { getEatHomepage, getReloadUser } from "@/lib/requests";
import { serverFetch } from "@/lib/serverFetch";
import { useMediaQuery } from "@reactuses/core";
import Image, { ImageLoaderProps } from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { BiCart, BiChevronDown, BiSearch, BiUser } from "react-icons/bi";
import { HiChevronDown, HiOutlineLocationMarker } from "react-icons/hi";
import { SiPinescript } from "react-icons/si";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function StoresPage() {

  const userData = await serverFetch(getReloadUser());
  const homeEats = await serverFetch(getEatHomepage());

  // if (!homeEats) {
  //   notFound();
  // }

  const categories = [
    { name: "shawarma", image: "/img/webeats/categories/shawarma.png" },
    { name: "bakery", image: "/img/webeats/categories/bakery.png" },
    { name: "tacos", image: "/img/webeats/categories/tacos.png" },
    { name: "smoothie", image: "/img/webeats/categories/smoothie.png" },
    { name: "pharmacy", image: "/img/webeats/categories/pharmacy.png" },
    { name: "grocery", image: "/img/webeats/categories/grocery.png" },
    { name: "pizza", image: "/img/webeats/categories/pizza.png" },
    { name: "rice", image: "/img/webeats/categories/rice.png" },
    { name: "burger", image: "/img/webeats/categories/burger.png" },
    { name: "local food", image: "/img/webeats/categories/localfood.png" },
    { name: "pasta", image: "/img/webeats/categories/pasta.png" },
    { name: "combos", image: "/img/webeats/categories/combos.png" },
  ];

  return (
    <div className="w-full mt-0 overflow-hidden">
      <DownloadAppModal />
      <div className="">
        <EatHeader userProps={userData} />
      </div>

      <section className="w-full px-[50px] md:px-[20px] mt-12">
        <ExploreCategories />
      </section>

      <section className="w-full px-[50px] md:px-[20px] py-[5px] mt-1">
        <div className="w-full flex md:flex-wrap justify-between items-center gap-10 mt-10">
          <div className="w-1/2 md:w-full h-[250px] rounded-2xl overflow-hidden relative">
            <Image
              // src="https://cloud.shrideapp.com/slides/8t2WV9dRZndO7mhkfYPmJM2K0ESALtCs7pNePHkR.png"
              src="/img/webeats/1.png"
              alt=""
              fill
              objectFit="cover"
              objectPosition="center"

              // blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOsa2yqBwAFCAICLICSyQAAAABJRU5ErkJggg=="
            />
            {/* <img
              src="https://cloud.shrideapp.com/slides/8t2WV9dRZndO7mhkfYPmJM2K0ESALtCs7pNePHkR.png"
              alt=""
              className="object-cover w-full h-full"
            /> */}
          </div>

          <div className="w-1/2 md:w-full h-[250px] rounded-2xl overflow-hidden">
            <img
              src="/img/webeats/2.png"
              alt=""
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </section>

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
          <p className="font-semibold text-2xl">Handpicked for you </p>
        </div>

        <div className="mt-3">
          <div className="w-full grid grid-cols-4 gap-5 mt-3 s-none">
            {homeEats?.trending_res?.map((r: any, i: any) => (
              <Store key={i} store={r} />
            ))}
          </div>
        </div>
      </section>

      <section className="">
        <FooterHero bgColor="#000" textColor="#fff" />
      </section>
    </div>
  );
}
