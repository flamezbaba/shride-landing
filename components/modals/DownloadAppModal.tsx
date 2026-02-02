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

const UpModal: FC<{ closable?: boolean }> = ({ closable }) => {
  const { hideModal } = useShrideModal();
  const { hasHydrated, user } = useUserStore();

  return (
    <div
      className="xbg md:mt-[10%] w-[500px] h-[400px] md:w-[90%] shadow-lg border-1
        border-gray-200 rounded-3xl overflow-hidden"
    >
      {!!closable && (
        <div className="w-full flex items-end justify-end gap-5 px-5 py-3">
          <IoCloseSharp onClick={() => hideModal()} size={28} />
        </div>
      )}
      <div className="px-10 flex flex-col justify-center items-center">
        <p className="mt-10 text-4xl font-bold text-center">
          It’s simpler using the app
        </p>
        <div className="flex flex-col items-center justify-start gap-2 mt-12">
          <PlayStoreLink />
          <AppleStoreLink />
          {/* <ComingSoonLink /> */}
        </div>
      </div>
    </div>
  );
};

const DownloadAppModal: FC<{ closable?: boolean }> = ({ closable = false }) => {
  const { showModal, hideModal } = useShrideModal();
  const isMobile = useMediaQuery(
    "(min-width: 0px) and (max-width: 1000px)",
    // false,
    closable,
  );

  useEffect(() => {}, []);

  useEffect(() => {
    if (isMobile) {
      showModal(<UpModal closable={true} />);
    } else {
      hideModal();
    }
  }, [isMobile]);

  return <></>;
};

export default DownloadAppModal;
