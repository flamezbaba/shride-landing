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
import OtpModal from "./OtpModal";

const SignupModal: FC<{}> = ({}) => {
  const { hideModal, showModal } = useShrideModal();
  const { address, hasHydrated, setStoreUser } = useUserStore();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOtp, setIsOtp] = useState<boolean>(false);
  const [email, setEmail] = useState<any>("");
  const [password, setPassword] = useState<any>("");
  const [firstname, setfirstname] = useState<any>("");
  const [mobile, setmobile] = useState<any>("");
  const [otp, setotp] = useState<any>("");

  const handleSubmit = async () => {
    if (!email || !password || !firstname || !mobile) {
      toast.error("Fill all fields");
      return;
    }

    if (mobile.length != 11) {
      toast.error("Invalid Phone Number");
      return;
    }

    setIsLoading(true);

    const res = await axios.post("/api/auth/register", {
      firstname,
      mobile,
      email,
      password,
    });

    if (!res.data) {
      toast.error("Registration Failed");
      setIsLoading(false);
      return;
    }

    // console.log("res", !!res.data?.error);
    // return;

    if (!!res.data?.error) {
      toast.error(res.data?.error);
      setIsLoading(false);
      return;
    }

    toast.success(`${res?.data?.fullname}, Welcome To Shride`);

    setStoreUser(res.data);
    setIsLoading(false);

    showModal(<OtpModal />);
  };

  return (
    <div
      className="bg-white md:mt-[10%] w-[500px] h-auto md:w-[90%] shadow-lg border-1
        border-gray-200 rounded-2xl relative overflow-hidden"
    >
      <div className="w-full flex items-end justify-end gap-5 px-5 py-3">
        <IoCloseSharp onClick={() => hideModal()} size={28} />
      </div>

      <div className="px-4 pb-12 mt-2 flex flex-col justify-center items-center">
        <p className="text-2xl text-black font-semibold">Create Account</p>
        <p className="text-sm text-gray-500">
          A little more information to setup your account. let’s get rolling.
        </p>
      </div>

      <div className="pb-[170px] md:pb-[120px] px-20 md:px-8">
        <div className="">
          <div className="my-input mb-3">
            <div className="my-input-group">
              <label className="">Full Name</label>
              <input
                type="text"
                className=""
                id="name"
                onChange={(e: any) => setfirstname(e.target.value)}
              />
            </div>
          </div>

          <div className="my-input mb-3">
            <div className="my-input-group">
              <label className="">Email</label>
              <input
                type="text"
                id="email"
                className=""
                onChange={(e: any) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="my-input mb-3">
            <div className="my-input-group">
              <label className="">Enter Phone Number</label>
              <input
                type="text"
                className=""
                onChange={(e: any) => setmobile(e.target.value)}
              />
            </div>
          </div>

          <div className="my-input mb-3">
            <div className="my-input-group">
              <label className="">Password</label>
              <input
                type="password"
                className=""
                onChange={(e: any) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="">
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="btn w-full"
            >
              {isLoading ? (
                <LiaSpinnerSolid className="animate-spin" size={23} />
              ) : (
                "Create Account"
              )}
            </button>
            <p className="text-center mt-2 text-gray-600 font-medium">
              Already have an account?{" "}
              <span
                onClick={() => showModal(<LoginModal />)}
                className="text-[var(--primary-color)] cursor-pointer"
              >
                sign in
              </span>
            </p>
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

export default SignupModal;
