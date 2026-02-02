import EatHeader from "@/components/eats/EatHeader";
import StoreList from "@/components/eats/StoreList";
import TopAddress from "@/components/eats/TopAddress";
import ViewStore from "@/components/eats/ViewStore";
import FooterHero from "@/components/FooterHero";
import AddressModal from "@/components/modals/AddressModal";
import DownloadAppModal from "@/components/modals/DownloadAppModal";
import { useShrideModal } from "@/hooks/useShrideModal";
import { reloadUser } from "@/lib/api";
import {
  getEatHomepage,
  getReloadUser,
  getStore,
  getStoreMenuAndProducts,
} from "@/lib/requests";
import { serverFetch } from "@/lib/serverFetch";
import { useMediaQuery } from "@reactuses/core";
import { Metadata } from "next";
import Image, { ImageLoaderProps } from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import {
  BiCart,
  BiCheckbox,
  BiCheckCircle,
  BiChevronDown,
  BiSearch,
  BiUser,
} from "react-icons/bi";
import { BsArrowLeft } from "react-icons/bs";
import { HiChevronDown, HiOutlineLocationMarker } from "react-icons/hi";
import { IoCheckmarkCircle } from "react-icons/io5";
import { SiPinescript } from "react-icons/si";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).id;

  const store = await serverFetch(getStore(id));

  return {
    title: `${store?.store_name} | ShrideApp`,
    description: `Shop at ${store?.store_name}. ${store?.description}`,
    openGraph: {
      title: store?.store_name,
      description: store?.store_front,
      images: [store?.logo_url],
    },
    twitter: {
      card: "summary_large_image",
      title: store?.store_name,
      description: store?.store_front,
      images: [store?.logo_url],
    },
  };
}

export default async function ViewStorePage({ params }: Props) {
  const { id } = await params;
  const store = await serverFetch(getStore(id));
  const storeMenuAndProducts = await serverFetch(getStoreMenuAndProducts(id));
  const userData = await serverFetch(getReloadUser());

  // console.log(userData);

  if (!store) {
    notFound();
  }

  return (
    <div className="w-full mt-0 overflow-hidden">
      {/* <DownloadAppModal /> */}
      <div className="">
        <EatHeader userProps={userData} />
      </div>

      <div className="w-full">
        <div className="px-[50px] md:px-[20px]">
          <Link href="/stores" className="inline-flex items-center gap-2">
            <BsArrowLeft size={17} />
            <span className="text-base">All Stores</span>
          </Link>
        </div>
        <ViewStore store={store} storeMenuAndProducts={storeMenuAndProducts} />
      </div>

      <section className="">
        <FooterHero bgColor="#000" textColor="#fff" />
      </section>
    </div>
  );
}
