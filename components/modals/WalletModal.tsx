"use client";

import { useShrideModal } from "@/hooks/useShrideModal";
import { useUserStore } from "@/store/user";
import axios from "axios";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { IoCloseSharp } from "react-icons/io5";
import { LuLoader2 } from "react-icons/lu";

const WalletModal: FC<{}> = () => {
  const { hideModal } = useShrideModal();
  const { hasHydrated, user } = useUserStore();

  const [account, setAccount] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    getRecord();
  }, []);

  const getRecord = async () => {
    setIsLoading(true);
    const res = await axios.get("/api/delivery?type=getFundingAccount");

    if (!!res?.data) {
      setAccount(res.data);
    }

    setIsLoading(false);
  };

  const backToStore = () => {
    hideModal();
    window.location.reload();
  };

  return (
    <>
      {isLoading ? (
        <div
          className="bg-white md:mt-[10%] w-[600px] h-[200px] md:w-[90%] shadow-lg border-1
                  border-gray-200 rounded-lg flex justify-center items-center"
        >
          <LuLoader2
            className="animate-spin text-[var(--primary-color)]"
            size={53}
          />
        </div>
      ) : (
        <div
          className="bg-white md:mt-[10%] w-[500px] h-auto md:w-[90%] shadow-lg border-1
        border-gray-200 rounded-2xl"
        >
          <div className="w-full flex items-center justify-between gap-5 px-5 py-3 border-b-gray-300 border-b-[1px]">
            <p className="font-medium text-xl">Wallet</p>
            <IoCloseSharp onClick={() => hideModal()} size={28} />
          </div>

          <div className="py-5 px-4 w-12/12">
            <div className="w-full bg-black/95 rounded-lg px-2 py-3">
              <div className="text-white">
                <p className="text-sm">Your Balance</p>
                <p className="text-3xl">
                  ₦ {user?.wallet_balance?.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="mt-10">
              <p className="text-xs">
                Transfer into this account to fund your wallet.
              </p>

              <div className="w-full bg-fuchsia-500 flex justify-between mt-1 items-center rounded-lg px-2 py-3">
                <div className="text-white">
                  <p className="text-sm leading-none">{account?.bank_name}</p>
                  <p className="text-lg font-semibold leading-relaxed">
                    {account?.account_number}
                  </p>
                  <p className="text-sm leading-none">{account?.account_name}</p>
                </div>

                <div className="bg-white/15 rounded-full px-4 py-2 cursor-pointer">
                  <p className="text-sm text-white font-medium">Copy</p>
                </div>
              </div>

              <p className="text-xs mt-1">
                Minimum wallet top up is 500 Naira.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WalletModal;
