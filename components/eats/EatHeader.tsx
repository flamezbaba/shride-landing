"use client";

import { useShrideModal } from "@/hooks/useShrideModal";
import AddressModal from "../modals/AddressModal";
import { HiOutlineLocationMarker } from "react-icons/hi";
import {
  BiCart,
  BiChevronDown,
  BiChevronRight,
  BiHeadphone,
  BiSearch,
  BiUser,
  BiWallet,
} from "react-icons/bi";
import TopAddress from "./TopAddress";
import { reloadUser } from "@/lib/api";
import { getEatHomepage, getStore } from "@/lib/requests";
import { useUserStore } from "@/store/user";
import { getAddressLabel, getLoggedUser, shortenWords } from "@/lib/utils";
import { useEffect, useState } from "react";
import { FaSignOutAlt, FaWallet } from "react-icons/fa";
import { IoWalletOutline } from "react-icons/io5";
import Link from "next/link";
import axios from "axios";
import LoginModal from "../modals/LoginModal";
import OrderHistoryModal from "../modals/OrderHistoryModal";
import { usePathname, useRouter } from "next/navigation";
import { useDebounce } from "@reactuses/core";
import WalletModal from "../modals/WalletModal";
import OtpModal from "../modals/OtpModal";

function TopUser({ user }: { user: any }) {
  const { showModal } = useShrideModal();
  const [showDropDown, setShowDropDown] = useState<boolean>(false);

  const handleLogOut = async () => {
    const res = await axios.post("/api/auth/logout");
    console.log("handleLogOut", res);

    if (res.data) {
    }

    window.location.reload();
  };

  const handleOrderHistory = () => {
    showModal(<OrderHistoryModal />);
    setShowDropDown(false);
  };

  const toggleDropDown = () => {
    if (!!loggedUser) {
      setShowDropDown(!showDropDown);
    } else {
      showModal(<LoginModal />);
    }
  };

  const loggedUser = getLoggedUser(user);

  return (
    <>
      <div
        onClick={() => toggleDropDown()}
        className="w-[50px] h-[50px] bg-[var(--primary-color)] rounded-full flex items-center justify-center cursor-pointer"
      >
        <BiUser className="text-white" size={26} />
      </div>

      {showDropDown && (
        <div className="top-[calc(100%_+_4px)] right-0 z-20 absolute w-[300px] rounded-md md:w-[330px] bg-white shadow-lg">
          {!!loggedUser ? (
            <>
              <div className="w-full flex items-center gap-5 px-4 border-b-2 border-b-[var(--primary-color)] py-2">
                <div className="">
                  <img
                    className="w-[40px] h-[40px] rounded-full"
                    alt=""
                    src={user?.avatar_url}
                  />
                </div>
                <div className="flex-1">
                  <p className="text-lg md:text-sm capitalize">
                    {user?.fullname}
                  </p>
                  <p className="">{user?.uuid}</p>
                </div>
              </div>
              <div className="w-full px-4 py-4 space-y-6 cursor-pointer">
                <div
                  className="w-full flex items-center"
                  onClick={() => showModal(<WalletModal />)}
                >
                  <div className="flex-1 flex items-center gap-3">
                    <IoWalletOutline size={17} />
                    <p className="text-base">Wallet</p>
                  </div>
                  <BiChevronRight size={22} />
                </div>

                <div
                  onClick={handleOrderHistory}
                  className="w-full flex items-center cursor-pointer"
                >
                  <div className="flex-1 flex items-center gap-3">
                    {/* <IoWalletOutline size={17} /> */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#000"
                        fillRule="evenodd"
                        d="M5.079 5.069c3.795-3.79 9.965-3.75 13.783.069c3.82 3.82 3.86 9.993.064 13.788s-9.968 3.756-13.788-.064a9.81 9.81 0 0 1-2.798-8.28a.75.75 0 1 1 1.487.203a8.31 8.31 0 0 0 2.371 7.017c3.245 3.244 8.468 3.263 11.668.064c3.199-3.2 3.18-8.423-.064-11.668c-3.243-3.242-8.463-3.263-11.663-.068l.748.003a.75.75 0 1 1-.007 1.5l-2.546-.012a.75.75 0 0 1-.746-.747L3.575 4.33a.75.75 0 1 1 1.5-.008zm6.92 2.18a.75.75 0 0 1 .75.75v3.69l2.281 2.28a.75.75 0 1 1-1.06 1.061l-2.72-2.72V8a.75.75 0 0 1 .75-.75"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="text-base">Order History</p>
                  </div>
                  <BiChevronRight size={22} />
                </div>

                <div className="w-full flex items-center">
                  <div className="flex-1 flex items-center gap-3">
                    <BiHeadphone size={17} />
                    <p className="text-base">Support</p>
                  </div>
                  <BiChevronRight size={22} />
                </div>

                <div
                  className="w-full flex items-center cursor-pointer"
                  onClick={handleLogOut}
                >
                  <div className="flex-1 flex items-center gap-3">
                    <FaSignOutAlt size={17} />
                    <p className="text-base">Log Out</p>
                  </div>
                  <BiChevronRight size={22} />
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      )}
    </>
  );
}

function TopCart({ user }: { user: any }) {
  const { cart, setStoreCart } = useUserStore();
  const [showDropDown, setShowDropDown] = useState<boolean>(false);

  return (
    <>
      <div
        onClick={() => setShowDropDown(!showDropDown)}
        className="w-[50px] h-[50px] bg-[var(--primary-color)] rounded-full flex items-center justify-center cursor-pointer relative"
      >
        {/* <BiCart className="text-white" size={26} /> */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30px"
          height="30px"
          viewBox="0 0 24 24"
        >
          <path
            fill="#fff"
            d="M10 13.25a.75.75 0 0 1 .75.75v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 1 .75-.75m4.75.75a.75.75 0 0 0-1.5 0v2a.75.75 0 0 0 1.5 0z"
          ></path>
          <path
            fill="#fff"
            fillRule="evenodd"
            d="M9.65 3.375a.75.75 0 0 0-1.3-.75l-2 3.464a1 1 0 0 0-.069.161H6a2.75 2.75 0 0 0-1.739 4.88l.667 4.585l.447 2.093a3.05 3.05 0 0 0 2.561 2.384c2.697.375 5.432.375 8.128 0a3.05 3.05 0 0 0 2.561-2.384l.447-2.093l.667-4.584A2.75 2.75 0 0 0 18 6.25h-.281a1 1 0 0 0-.07-.162l-2-3.464a.75.75 0 1 0-1.298.75l1.66 2.875H7.99zm8.484 8.372L18 11.75H6q-.068 0-.133-.003l.538 3.703l.437 2.045a1.55 1.55 0 0 0 1.301 1.211c2.559.356 5.155.356 7.714 0a1.55 1.55 0 0 0 1.301-1.21l.437-2.046zM4.75 9c0-.69.56-1.25 1.25-1.25h12a1.25 1.25 0 1 1 0 2.5H6c-.69 0-1.25-.56-1.25-1.25"
            clipRule="evenodd"
          ></path>
        </svg>

        {cart?.length > 0 && (
          <div className="w-6 h-6 text-[10px] p-1 bg-black -top-1 absolute -right-2 rounded-full flex items-center justify-center text-white">
            {cart.length}
          </div>
        )}
      </div>

      {showDropDown && (
        <div className="top-[calc(100%_+_4px)] md:-right-10 lg:right-0 z-20 absolute w-[300px] rounded-md md:w-[330px] bg-white ring-[1px] ring-gray-200 shadow-lg">
          {cart?.length > 0 ? (
            <div className="w-full px-4 py-4 space-y-5">
              {cart.map((c: any, i: any) => (
                <Link
                  href={`/stores/${c?.store_id}`}
                  key={i}
                  className="w-full flex items-center"
                >
                  <div className="flex-1 flex items-center gap-3">
                    <img
                      src={c?.logo}
                      alt=""
                      className="w-10 h-10 object-cover rounded-full shadow-md"
                    />
                    <p className="text-base capitalize">{c?.store_name}</p>
                  </div>
                  <BiChevronRight size={22} />
                </Link>
              ))}

              <div
                className="mt-5 cursor-pointer"
                onClick={() => {
                  setStoreCart([]);
                  setShowDropDown(false);
                }}
              >
                <p className="text-center font-semibold">Clear cart</p>
              </div>
            </div>
          ) : (
            <div className="w-full h-[130px] px-4 py-4 flex flex-col text-center items-center justify-center">
              <p className="text-lg font-medium">
                There are no items in your cart
              </p>
              {/* <p className="text-lg font-medium">There are no items in your cart</p> */}

              <Link href="/stores" className="btn mt-4">
                Start Shopping
              </Link>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default function EatHeader({ userProps }: { userProps?: any }) {
  const { showModal } = useShrideModal();
  const pathname = usePathname();
  const { address, hasHydrated, setStoreUser, user } = useUserStore();

  const { replace } = useRouter();

  const [searchText, setSearchText] = useState<any>("");
  const debouncedText = useDebounce(searchText, 500);

  useEffect(() => {
    if (!debouncedText) return;

    handleSearch(debouncedText);
  }, [debouncedText]);

  const handleSearch = (term: string) => {
    replace(`/search?q=${term.toString()}`);
  };

  useEffect(() => {
    updateUserZus(userProps);

    if (userProps?.is_otp_verified == 0) {
      showOtp();
    }
  }, []);

  const showOtp = () => {
    console.log("userProps", userProps.is_otp_verified);
    setTimeout(() => {
      showModal(<OtpModal />);
    }, 1000);
  };

  const updateUserZus = (userData?: any) => {
    // if (!hasHydrated) return null;

    if (!!userData) {
      setStoreUser(userData);
    } else {
      // setStoreUser(null);
    }
  };

  const openModal = () => {
    showModal(<AddressModal />);
  };

  if (!hasHydrated) return null;

  const shortAddress = !!address?.address
    ? shortenWords(getAddressLabel(address?.address), 15)
    : "";

  const isSearchPage = pathname.includes("search");

  return (
    <header className="w-full px-[50px] md:px-[20px] py-[10px] mt-5 bg-white flex md:flex-col md:gap-5 justify-between items-center mb-10">
      <div className="md:w-full flex md:flex-col items-center gap-10 md:gap-3">
        <div className="md:w-full flex gap-5 items-center justify-between">
          <a href="/" className="">
            <img src="/img/shride-logo-black.png" width="100" alt="" />
          </a>

          <div className="flex items-center gap-4 lg:hidden">
            <div className="relative">
              <TopCart user={user} />
            </div>

            <div className="relative">
              <TopUser user={user} />
            </div>
          </div>
        </div>

        <div className="md:w-full md:mt-5">
          <div className="flex items-center md:justify-center gap-5 relative cursor-pointer">
            <div onClick={() => openModal()} className="flex gap-1">
              <HiOutlineLocationMarker
                size={25}
                className="text-[var(--primary-color)]"
              />
              <div className="text-lg font-medium">{shortAddress}</div>
              <BiChevronDown
                size={22}
                className="text-[var(--primary-color)]"
              />
            </div>

            {!address && (
              <div
                onClick={() => openModal()}
                className="bg-black w-[300px] py-2 px-2 absolute rounded-md top-[calc(100%_+_6px)] -ml-5 flex items-center justify-center"
              >
                <div
                  className="absolute -top-2 left-10 -translate-x-1/2 
                  border-l-[8px] border-l-transparent 
                  border-r-[8px] border-r-transparent 
                  border-b-[8px] border-b-black"
                ></div>

                <p className="text-white text-lg font-medium">
                  Set a delivery address
                </p>
              </div>
            )}

            {!!user && (
              <>
                {user?.uuid != "GUEST" && (
                  <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => showModal(<WalletModal />)}
                  >
                    <FaWallet className="text-gray-600" size={20} />
                    <p className="text-base">
                      Wallet (₦{user?.wallet_balance?.toLocaleString()})
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1"></div>

      <div className="flex md:flex-col items-center gap-10 md:gap-3">
        {/* <div className="ring-2 ring-[var(--primary-color-2)] h-[40px] w-[300px] rounded-md flex items-center gap-2 px-3"> */}
        {!isSearchPage && (
          <div className="ring-2 ring-gray-300 h-[40px] w-[300px] rounded-md flex items-center gap-2 px-3">
            <BiSearch size={22} />
            <input
              type="text"
              className="flex-1 h-full bg-transparent px-3 outline-none focus:outline-none placeholder:text-black"
              placeholder="what are you craving ?"
              onChange={(e: any) => setSearchText(e.target.value)}
            />
          </div>
        )}
        <div className="flex items-center gap-4 md:hidden">
          <div className="relative">
            <TopCart user={user} />
          </div>

          <div className="relative">
            <TopUser user={user} />
          </div>
        </div>
      </div>
    </header>
  );
}
