"use client";

import { useLocationContext } from "@/context/LocationContext";
import { useShrideModal } from "@/hooks/useShrideModal";
import { getPlaceViaPlaceID, searchPlaces } from "@/lib/requests";
import { useUserStore } from "@/store/user";

import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoCloseSharp, IoWarning } from "react-icons/io5";
import { LiaSpinnerSolid } from "react-icons/lia";
import axios from "axios";
import LoginModal from "./LoginModal";

const OtpModal: FC<{}> = ({}) => {
  const { hideModal, showModal } = useShrideModal();
  const { user } = useUserStore();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [otp, setotp] = useState<any>("");

  const handleOtp = async () => {
    if (!otp) {
      toast.error("Enter Code");
      return;
    }

    setIsLoading(true);

    const res = await axios.post("/api/auth/verify", {
      email: user?.email,
      code: otp,
    });

    if (!res.data) {
      toast.error("Verification Failed");
      setIsLoading(false);
      return;
    }

    if (!!res.data?.error) {
      toast.error(res.data?.error);
      setIsLoading(false);
      return;
    }

    toast.success(`Account Verified`);

    hideModal();
    setIsLoading(false);
    window.location.reload();
  };

  return (
    <div
      className="bg-white md:mt-[10%] w-[500px] h-auto md:w-[90%] shadow-lg border-1
        border-gray-200 rounded-2xl relative overflow-hidden"
    >
      <div className="w-full flex items-end justify-end gap-5 px-5 py-3">
        <IoCloseSharp onClick={() => hideModal()} size={28} />
      </div>

      <div className="px-4 pb-10 mt-2 flex flex-col justify-center items-center">
        <p className="text-2xl text-black font-semibold">Hello, {user?.firstname} verify your account.</p>
        <p className="text-center mt-2 text-gray-600 font-medium">
          Kindly enter the code sent via SMS, Whatsapp or Email
        </p>
      </div>

      <div className="pb-[170px] md:pb-[120px] px-20 md:px-8">
        <div className="">
          <div className="my-input mb-3">
            <div className="my-input-group">
              <label className="">Enter OTP</label>
              <input
                type="text"
                className=""
                id="code"
                onChange={(e: any) => setotp(e.target.value)}
              />
            </div>
          </div>

          <div className="">
            <button
              onClick={handleOtp}
              disabled={isLoading}
              className="btn w-full"
            >
              {isLoading ? (
                <LiaSpinnerSolid className="animate-spin" size={23} />
              ) : (
                "Verify"
              )}
            </button>
          </div>
        </div>
        <div className=""></div>
      </div>

      <div className="bottom-0 absolute overflow-hidden">
        <img src="/img/webeats/fruits.png" alt="" className="" />
      </div>
    </div>
  );
};

export default OtpModal;
