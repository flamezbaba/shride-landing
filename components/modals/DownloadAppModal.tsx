"use client";

import { useShrideModal } from "@/hooks/useShrideModal";
import { useUserStore } from "@/store/user";
import { useMediaQuery } from "@reactuses/core";
import axios from "axios";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { IoCloseSharp } from "react-icons/io5";
import { LuLoader2 } from "react-icons/lu";
import PlayStoreLink from "../PlayStoreLink";
import AppleStoreLink from "../AppleStoreLink";

const UpModal: FC<{}> = () => {
  const { hideModal } = useShrideModal();
  const { hasHydrated, user } = useUserStore();

  return (
    <div
      className="xbg md:mt-[10%] w-[500px] h-[300px] md:w-[90%] shadow-lg border-1
        border-gray-200 rounded-3xl overflow-hidden"
    >
      <div className="px-10 flex flex-col justify-center items-center">
        <p className="mt-10 text-4xl font-bold text-center">Use the mobile App</p>
        <div className="flex flex-col items-center justify-start gap-2 mt-12">
          <PlayStoreLink />
          <AppleStoreLink />
          {/* <ComingSoonLink /> */}
        </div>
      </div>
    </div>
  );
};

const DownloadAppModal: FC<{}> = () => {
  const { showModal, hideModal } = useShrideModal();
  const { hasHydrated, user } = useUserStore();
  const isMobile = useMediaQuery(
    "(min-width: 0px) and (max-width: 1000px)",
    true,
  );

  useEffect(() => {}, []);

  useEffect(() => {
    if (isMobile) {
      showModal(<UpModal />);
    } else {
      hideModal();
    }
    console.log("view is", isMobile);
  }, [isMobile]);

  return <></>;
};

export default DownloadAppModal;
