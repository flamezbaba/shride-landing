import EatHeader from "@/components/eats/EatHeader";
import ExploreCategories from "@/components/eats/ExploreCategories";
import SearchingList from "@/components/eats/SearchingList";
import SearchInput from "@/components/eats/SearchInput";
import FooterHero from "@/components/FooterHero";
import AddressModal from "@/components/modals/AddressModal";
import DownloadAppModal from "@/components/modals/DownloadAppModal";
import { useShrideModal } from "@/hooks/useShrideModal";
import { getEatHomepage } from "@/lib/requests";
import { serverFetch } from "@/lib/serverFetch";
import { shortenWords } from "@/lib/utils";
import { useMediaQuery } from "@reactuses/core";
import Image, { ImageLoaderProps } from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { BsArrowLeft } from "react-icons/bs";


type Props = {
  searchParams: Promise<{ q?: string }>;
};

async function SearchList({ query }: { query: string }) {
  const searchResults = await serverFetch(`web/search-new/${query}`);


  if (!searchResults)
    return (
      <div className="mt-10 w-full flex flex-col justify-center items-center">
        <img src="/img/webeats/search.png" alt="" className="w-[200px]" />
        <p className="text-center text-2xl mt-2">
          There are currently no matches for "{query}"{" "}
        </p>
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
            There are currently no matches for "{query}"{" "}
          </p>
        </div>
      )}
    </>
  );
}

export default async function SearchPage({ searchParams }: Props) {
  const query = (await searchParams).q || "";

  return (
    <div className="w-full mt-0 overflow-hidden">
      {/* <DownloadAppModal /> */}
      <div className="">
        <EatHeader />
      </div>

      <div className="px-[50px] md:px-[20px]">
          <Link href="/stores" className="inline-flex items-center gap-2">
            <BsArrowLeft size={17} />
            <span className="text-lg">All Stores</span>
          </Link>
        </div>

      <section className="w-full px-[50px] md:px-[20px] mt-12 mb-20">
        <div className="">
          <p className="font-semibold text-6xl md:text-3xl text-center">
            Search Stores
          </p>
        </div>

        <div className="w-full flex justify-center items-center mt-10 md:mt-3">
          <SearchInput />
        </div>

        <section className="w-full px-[50px] md:px-[20px] mt-12">
          <ExploreCategories />
        </section>

        <div className="">
          {/* <Suspense
            key={query}
            fallback={
              <div className="w-full px-20 flex items-center justify-center pt-[70px]">
                <p className="text-lg ">Searching for "{query}"...</p>
              </div>
            }
          >
            <SearchList query={query} />
          </Suspense> */}

          <SearchingList query={query} />
        </div>

        {/* <div className="mt-14 grid grid-cols-4 md:grid-cols-1 gap-5">
          {[...Array(12)].map((_, i) => (
            <div className="ring-2 ring-gray-300 px-2 py-2 rounded-lg">
              <div className="flex items-center gap-2">
                <img
                  src="https://cloud.shrideapp.com/store-logos/L0HeH3m74Q1lqXM7LtZcsGMjCpBfr8mh3DeMeoon.jpg"
                  alt=""
                  className="w-[50px] h-[50px] object-cover rounded-full"
                />

                <div className="">
                  <p className="text-xl font-medium capitalize">Store Name</p>
                </div>
              </div>

              <div className="w-full h-[70px] mt-5 flex flex-col flex-wrap gap-4 overflow-scroll s-none">
                {[...Array(12)].map((_, i) => (
                  <div className="rounded-lg h-[65px] w-[210px] bg-orange-100 p-2 flex items-start gap-3 justify-between">
                    <div className="flex flex-col justify-between">
                      <p className="text-base font-medium capitalize">
                        Product Name
                      </p>
                      <p className="text-sm ">Price</p>
                    </div>
                    <img
                      src="https://cloud.shrideapp.com/store-logos/L0HeH3m74Q1lqXM7LtZcsGMjCpBfr8mh3DeMeoon.jpg"
                      alt=""
                      className="w-[50px] h-[50px] object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>

              <div className="w-full mt-1">
                <button className="btn w-full">View all items</button>
              </div>
            </div>
          ))}
        </div> */}
      </section>

      <section className="">
        <FooterHero bgColor="#000" textColor="#fff" />
      </section>
    </div>
  );
}
