"use client";

import { useLocationContext } from "@/context/LocationContext";
// import { setCurrentChat, setReloadFlag, useUserStore } from "@/store/user";
import { useShrideModal } from "@/hooks/useShrideModal";
import { getPlaceViaPlaceID, searchPlaces } from "@/lib/requests";
import { useUserStore } from "@/store/user";
import { useDebounce } from "@reactuses/core";
// import { apiWrapper } from "@/utils/api";
// import moment from "moment";
import { FC, useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { IoCloseSharp, IoWarning } from "react-icons/io5";
import { LiaSpinnerSolid } from "react-icons/lia";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { TbLocation } from "react-icons/tb";
// import { toast } from "sonner";

const AddressModal: FC<{}> = ({}) => {
  const { hideModal } = useShrideModal();
  const { address, hasHydrated, setStoreAddress } = useUserStore();
  const {
    latitude,
    longitude,
    loading,
    error,
    requestLocation,
    address: locationAddress,
  } = useLocationContext();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<any>("");
  const [locations, setLocations] = useState<any[]>([]);

  const debouncedText = useDebounce(searchText, 500);

  useEffect(() => {
    if (!debouncedText) return;

    fnSearchPlaces(debouncedText);

    console.log("Search API call:", debouncedText);
  }, [debouncedText]);

  const fnSearchPlaces = async (text: any) => {
    setIsLoading(true);
    const res = await searchPlaces(text, latitude, longitude);
    setLocations(res);
    setIsLoading(false);

    console.log("fnSearchPlaces", res);
  };

  const clearSearch = () => {
    setSearchText("");
    setLocations([]);
    setIsLoading(false);
  };

  const handleGetPlace = async (place: any) => {
    const res = await getPlaceViaPlaceID(place);
    
    if (!!res) {
      setStoreAddress(res);
      hideModal();
    }
  };

  const useCurrentAddress = () => {
    const newx = { ...locationAddress, latitude, longitude };
    setStoreAddress(newx);
    hideModal();
  }

  return (
    <div
      className="bg-white md:mt-[10%] w-[600px] h-auto md:w-[90%] shadow-lg border-1
        border-gray-200 rounded-lg"
    >
      <div className="w-full flex items-center justify-between gap-5 px-5 py-3 border-b-gray-300 border-b-[1px]">
        <p className="font-medium text-lg">Delivery address</p>
        <IoCloseSharp onClick={() => hideModal()} size={28} />
      </div>

      <div className="px-4 pb-12 mt-2">
        <div className="">
          <div
            className="bg-gray-100 ring-2 ring-gray-200 flex gap-2 flex-1 items-center justify-between
            py-[3px] pl-3 h-full rounded-md mt-4"
          >
            <HiOutlineLocationMarker
              size={20}
              className="text-[var(--primary-color)]"
            />
            <div className="flex-1">
              <input
                placeholder="Enter a new address"
                value={searchText}
                type="text"
                onChange={(e: any) => setSearchText(e.target.value)}
                className="bg-transparent text-base w-full px-2 font-normal outline-none placeholder:text-gray-600"
              />
            </div>
            <div className="px-4 py-2 text-xs font-semibold flex h-full items-center justify-center cursor-pointer">
              {isLoading ? (
                <LiaSpinnerSolid className="animate-spin" size={23} />
              ) : (
                <CgClose onClick={clearSearch} className="" size={23} />
              )}
            </div>
          </div>

          {locations?.length > 0 && !!searchText && (
            <div className="w-full bg-white shadow-lg px-4 py-3 cursor-pointer">
              {locations?.map((l: any, i: any) => (
                <p
                  onClick={() => handleGetPlace(l)}
                  key={i}
                  className="text-sm font-medium py-3"
                >
                  {l?.text}
                </p>
              ))}
            </div>
          )}
        </div>

        <div className="mt-10">
          <div className="w-full flex items-start gap-2 cursor-pointer" onClick={useCurrentAddress}>
            <TbLocation size={20} />
            <div className="-mt-1">
              <p className="text-base font-medium">Use your current location</p>
              <p className="">{locationAddress?.address}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressModal;
