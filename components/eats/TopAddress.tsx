"use client";

import { useShrideModal } from "@/hooks/useShrideModal";
import AddressModal from "../modals/AddressModal";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BiChevronDown } from "react-icons/bi";

export default function TopAddress() {
  const { showModal } = useShrideModal();

  const openModal = () => {
    showModal(<AddressModal />);
  };

  return (
    <div className="flex items-center relative" onClick={() => openModal()}>
      <div className="flex gap-1">
        <HiOutlineLocationMarker
          size={25}
          className="text-[var(--primary-color)]"
        />
        <div className="text-lg font-medium">Liberty Road, Ibadan</div>
        <BiChevronDown size={22} className="text-[var(--primary-color)]" />
      </div>

      <div className="bg-black w-[300px]  py-2 px-2 absolute rounded-md top-[calc(100%_+_6px)] -ml-5 flex items-center justify-center">
        <div
          className="absolute -top-2 left-10 -translate-x-1/2 
                  border-l-[8px] border-l-transparent 
                  border-r-[8px] border-r-transparent 
                  border-b-[8px] border-b-black"
        ></div>

        <p className="text-white text-lg font-medium">Set a delivery address</p>
      </div>
    </div>
  );
}
