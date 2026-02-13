"use client";

import { useLocationContext } from "@/context/LocationContext";
import { useShrideModal } from "@/hooks/useShrideModal";
import { getPlaceViaPlaceID, searchPlaces } from "@/lib/requests";
import { useUserStore } from "@/store/user";
import { useDebounce } from "@reactuses/core";
import axios from "axios";

import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CgClose } from "react-icons/cg";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { IoCloseSharp, IoTrash, IoWarning } from "react-icons/io5";
import { LiaSpinnerSolid } from "react-icons/lia";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { TbLocation } from "react-icons/tb";

const SelectAddressModal: FC<{ fnSelect: any; title: any }> = ({
  fnSelect,
  title,
}) => {
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
  const [savedAddr, setSaveAddr] = useState<any[]>([]);

  const debouncedText = useDebounce(searchText, 500);

  useEffect(() => {
    getSavedAddr();
  }, []);

  useEffect(() => {
    if (!debouncedText) return;

    fnSearchPlaces(debouncedText);
  }, [debouncedText]);

  const fnSearchPlaces = async (text: any) => {
    setIsLoading(true);
    const res = await searchPlaces(text, latitude, longitude);
    setLocations(res);
    setIsLoading(false);
  };

  const clearSearch = () => {
    setSearchText("");
    setLocations([]);
    setIsLoading(false);
  };

  const getSavedAddr = async () => {
    const res = await axios.get(`/api/delivery?type=getUserAddresses`);

    if (!!res?.data) {
      setSaveAddr(res.data);
    }
  };

  const handleGetPlace = async (place: any) => {
    const res = await getPlaceViaPlaceID(place);

    if (!!res) {
      fnSelect(res);
      hideModal();
    }
  };

  const useCurrentAddress = () => {
    const newx = { ...locationAddress, latitude, longitude };
    fnSelect(newx);
    hideModal();
  };

  const handleSavedAddress = (addr: any) => {
    const newx = {
      state: addr?.state,
      city: addr?.city,
      address: addr?.address,
      latitude: addr?.lat,
      longitude: addr?.lng,
    };

    fnSelect(newx);
    hideModal();
  };

  const handleDeleteAddress = async (adr: any) => {
    toast(
      (t) => (
        <div>
          <div className="px-20 text-center text-lg">
            <strong>Delete Address</strong> <br /> Are you sure?
          </div>

          <div className="mt-10 flex items-center justify-center gap-6">
            <button
              className="text-sm font-semibold"
              onClick={() => {
                doDelete();
                toast.dismiss(t.id);
              }}
            >
              Yes
            </button>
            <button
              className="text-sm font-semibold"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        style: {
          border: "1px solid var(--primary-color)",
          padding: "16px",
          color: "#00000",
        },
        iconTheme: {
          primary: "#000000",
          secondary: "#eee",
        },
        position: "top-center",
      },
    );

    async function doDelete() {
      await axios.post("/api/delivery?type=deleteAddress", {
        aid: adr?.id,
      });

      toast.success("Address Deleted!");
      getSavedAddr();
    }
  };

  return (
    <div
      className="bg-white md:mt-[10%] w-[600px] h-auto md:w-[90%] shadow-lg border-1
        border-gray-200 rounded-lg"
    >
      <div className="w-full flex items-center justify-between gap-5 px-5 py-3 border-b-gray-300 border-b-[1px]">
        <p className="font-medium text-lg">{title}</p>
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
          <div
            className="w-full flex items-start gap-2 cursor-pointer"
            onClick={useCurrentAddress}
          >
            <TbLocation size={20} />
            <div className="-mt-1">
              <p className="text-base font-medium">Use your current location</p>
              <p className="">{locationAddress?.address}</p>
            </div>
          </div>
        </div>

        {savedAddr?.length > 0 && (
          <div className="mt-5">
            <p className="text-lg font-semibold mb-2">Saved Addresses</p>
            <div className="w-full space-y-6">
              {savedAddr?.map((l: any, i: any) => (
                <div
                  key={i}
                  className="w-full flex items-start gap-2 cursor-pointer"
                >
                  <div
                    className="flex-1 flex items-start gap-1"
                    onClick={() => handleSavedAddress(l)}
                  >
                    <TbLocation size={20} className="mt-1" />
                    <div className="">
                      {l?.label && (
                        <p className="text-base font-medium capitalize">
                          {l?.label}
                        </p>
                      )}
                      <p className="">{l?.address}</p>
                    </div>
                  </div>
                  <div className="" onClick={() => handleDeleteAddress(l)}>
                    <IoTrash size={20} className="text-red-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectAddressModal;
