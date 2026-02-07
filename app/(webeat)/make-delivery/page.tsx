import EatHeader from "@/components/eats/EatHeader";
import ExploreCategories from "@/components/eats/ExploreCategories";
import ShrideDelivery from "@/components/eats/ShrideDelivery";
import Store from "@/components/eats/Store";
import StoreHomeSlides from "@/components/eats/StoreHomeSlides";
import StoreList from "@/components/eats/StoreList";
import TopAddress from "@/components/eats/TopAddress";
import TrendingStores from "@/components/eats/TrendingStores";
import FooterHero from "@/components/FooterHero";
import AddressModal from "@/components/modals/AddressModal";
import DownloadAppModal from "@/components/modals/DownloadAppModal";
import { useShrideModal } from "@/hooks/useShrideModal";
import { getEatHomepage, getReloadUser } from "@/lib/requests";
import { serverFetch } from "@/lib/serverFetch";
import { useMediaQuery } from "@reactuses/core";
import Image, { ImageLoaderProps } from "next/image";
import Link from "next/link";

export default async function MakeDeliveryPage() {
  const userData = await serverFetch(getReloadUser());

  // if (!homeEats) {
  //   notFound();
  // }

  return (
      <div className="w-full mt-0 overflow-hidden">
        <DownloadAppModal />
        <div className="">
          <EatHeader userProps={userData} />
        </div>

        <section className="w-full px-[50px] md:px-[20px] mt-12">
          <ShrideDelivery />
        </section>

        <section className="">
          <FooterHero bgColor="#000" textColor="#fff" />
        </section>
      </div>
  );
}
