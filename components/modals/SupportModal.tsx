"use client";

import { useShrideModal } from "@/hooks/useShrideModal";
import { useUserStore } from "@/store/user";
import axios from "axios";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { BiChevronRight, BiInfoCircle } from "react-icons/bi";
import { BsChat, BsMailbox, BsWhatsapp } from "react-icons/bs";
import { CgMail } from "react-icons/cg";
import { IoCloseSharp } from "react-icons/io5";
import { LuLoader2 } from "react-icons/lu";
import { RiPhoneLine } from "react-icons/ri";

const SupportModal: FC<{}> = () => {
  const { hideModal } = useShrideModal();
  const { hasHydrated, user } = useUserStore();

  const [account, setAccount] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <>
      <div
        className="bg-white md:mt-[10%] w-[500px] h-auto md:w-[90%] shadow-lg border-1
        border-gray-200 rounded-2xl"
      >
        <div className="w-full flex items-center justify-between gap-5 px-5 py-3 border-b-gray-300 border-b-[1px]">
          <p className="font-medium text-xl">How can we help?</p>
          <IoCloseSharp onClick={() => hideModal()} size={28} />
        </div>

        <div className="py-5 px-6 w-12/12 space-y-10">
          <a
            href="https://static.shrideapp.com/mail.php"
            target="_blank"
            className="w-full flex items-start justify-between cursor-pointer"
          >
            <div className="flex items-start gap-2">
              <CgMail size={25} />
              <div className="flex-1">
                <p className="font-semibold text-base leading-none">E-Mail</p>
                <p className="leading-none">Send us an email</p>
              </div>
            </div>
            <BiChevronRight size={30} />
          </a>

          <a
            href="https://static.shrideapp.com/links/whatsapp.php"
            target="_blank"
            className="w-full flex items-start justify-between cursor-pointer"
          >
            <div className="flex items-start gap-2">
              <BsWhatsapp size={25} />
              <div className="flex-1">
                <p className="font-semibold text-base leading-none">Whatsapp</p>
                <p className="leading-none">Send us a message</p>
              </div>
            </div>
            <BiChevronRight size={30} />
          </a>

          <a
            // href="https://static.shrideapp.com/callback.php"
            href="tel:+2348064223253"
            target="_blank"
            className="w-full flex items-start justify-between cursor-pointer"
          >
            <div className="flex items-start gap-2">
              <RiPhoneLine size={25} />
              <div className="flex-1">
                <p className="font-semibold text-base leading-none">
                  Phone Call
                </p>
                <p className="leading-none">Call us</p>
              </div>
            </div>
            <BiChevronRight size={30} />
          </a>

          <a
            href="https://tawk.to/chat/6981fb982807131c36765928/1jghrtju1"
            target="_blank"
            className="w-full flex items-start justify-between cursor-pointer"
          >
            <div className="flex items-start gap-2">
              <BsChat size={25} />
              <div className="flex-1">
                <p className="font-semibold text-base leading-none">
                  Live Chat
                </p>
                <p className="leading-none">Get in touch</p>
              </div>
            </div>
            <BiChevronRight size={30} />
          </a>
        </div>
      </div>
    </>
  );
};

export default SupportModal;
