import EatHeader from "@/components/eats/EatHeader";
import StoreCart from "@/components/eats/StoreCart";
import StoreList from "@/components/eats/StoreList";
import TopAddress from "@/components/eats/TopAddress";
import ViewOrder from "@/components/eats/ViewOrder";
import ViewStore from "@/components/eats/ViewStore";
import FooterHero from "@/components/FooterHero";
import AddressModal from "@/components/modals/AddressModal";
import { useShrideModal } from "@/hooks/useShrideModal";
import { reloadUser } from "@/lib/api";
import {
  getEatHomepage,
  getReloadUser,
  getSettingsValue,
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

export default async function OrderPage({ params }: Props) {
  const { id } = await params;
  const order = await serverFetch(`user/get-order/${id}`);
  const userData = await serverFetch(getReloadUser());
  const ads = await serverFetch(getSettingsValue("ads_popup_user"));

  console.log("ads", ads);

  if (!order) {
    notFound();
  }

  return (
    <div className="w-full mt-0 overflow-hidden">
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
        <div className="px-[50px] md:px-[20px] flex md:flex-col justify-between gap-4">
          <div className="flex-1">
            <ViewOrder orderData={order} orderId={id} />
          </div>

          <div className="w-1/3 md:w-full">
            {!!ads && <img
              src={ads}
              alt=""
              className=""
            />}
          </div>
        </div>
      </div>

      <section className="">
        <FooterHero bgColor="#000" textColor="#fff" />
      </section>
    </div>
  );
}
