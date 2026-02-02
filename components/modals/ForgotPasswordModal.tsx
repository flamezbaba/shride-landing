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
import SignupModal from "./SignupModal";
import LoginModal from "./LoginModal";

const ForgotPasswordModal: FC<{}> = ({}) => {
  const { hideModal, showModal } = useShrideModal();
  const { address, hasHydrated, setStoreUser } = useUserStore();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<any>("");
  const [password, setPassword] = useState<any>(null);
  const [code, setCode] = useState<any>("");
  const [user, setUser] = useState<any>(null);
  const [stage, setStage] = useState<"forgot" | "reset">("forgot");

  const handleSubmit = async () => {
    if (!email) {
      toast.error("Fill all fields");
      return;
    }

    setIsLoading(true);

    const res = await axios.post("/api/auth/forgot", {
      email,
    });

    if (!res.data) {
      toast.error("Invalid email or phone number");
      setIsLoading(false);
      return;
    }

    if (!!res.data?.error) {
      toast.error(res.data?.error);
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    setStage("reset");
    setUser(email);
  };

  const handleReset = async () => {
    if (!email || !code || !password) {
      toast.error("Fill all fields");
      return;
    }

    setIsLoading(true);

    const res = await axios.post("/api/auth/reset", {
      token: code,
      password: password,
      email: email,
    });

    if (!res.data) {
      toast.error("Invalid reset code");
      setIsLoading(false);
      return;
    }

    if (!!res.data?.error) {
      toast.error(res.data?.error);
      setIsLoading(false);
      return;
    }

    toast.success(`Password reset done.`);
    setIsLoading(false);
    showModal(<LoginModal />);
  };

  return (
    <div
      className="bg-white md:mt-[10%] w-[500px] h-auto md:w-[90%] shadow-lg border-1
        border-gray-200 rounded-2xl relative overflow-hidden"
    >
      <div className="w-full flex items-end justify-end gap-5 px-5 py-3">
        <IoCloseSharp onClick={() => hideModal()} size={28} />
      </div>

      {stage == "forgot" && (
        <>
          <div className="px-10 pb-12 mt-2 flex flex-col justify-center items-center">
            <p className="text-2xl text-black font-semibold">Forgot Password</p>
            <p className="text-sm text-gray-700 text-center">
              Don’t worry, we will walk you through a few steps to reset your
              password.
            </p>
          </div>

          <div className="pb-[170px] md:pb-[120px] px-20 md:px-8">
            <div className="">
              <div className="my-input mb-3">
                <div className="my-input-group">
                  <label className="">Email or Phone Number</label>
                  <input
                    type="text"
                    className=""
                    onChange={(e: any) => setEmail(e.target.value)}
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
                    "Submit"
                  )}
                </button>
                <p className="text-center mt-2 text-gray-600 font-medium">
                  Already have an account?{" "}
                  <span
                    onClick={() => showModal(<LoginModal />)}
                    className="text-[var(--primary-color)] cursor-pointer"
                  >
                    Login
                  </span>
                </p>
              </div>
            </div>
            <div className=""></div>
          </div>
        </>
      )}

      {stage == "reset" && (
        <>
          <div className="px-10 pb-12 mt-2 flex flex-col justify-center items-center">
            <p className="text-2xl text-black font-semibold">Reset Password</p>
            <p className="text-sm text-gray-700 text-center">
              Your password reset code has been sent to you via email, whatsapp
              and sms.
            </p>
          </div>

          <div className="pb-[170px] md:pb-[120px] px-20 md:px-8">
            <div className="">
              <div className="my-input mb-3">
                <div className="my-input-group">
                  <label className="">Reset Code</label>
                  <input
                    type="text"
                    className=""
                    onChange={(e: any) => setCode(e.target.value)}
                  />
                </div>
              </div>

               <div className="my-input mb-3">
                <div className="my-input-group">
                  <label className="">New Password</label>
                  <input
                    type="text"
                    className=""
                    onChange={(e: any) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="">
                <button
                  onClick={handleReset}
                  disabled={isLoading}
                  className="btn w-full"
                >
                  {isLoading ? (
                    <LiaSpinnerSolid className="animate-spin" size={23} />
                  ) : (
                    "Submit"
                  )}
                </button>
                <p className="text-center mt-2 text-gray-600 font-medium">
                  Already have an account?{" "}
                  <span
                    onClick={() => showModal(<LoginModal />)}
                    className="text-[var(--primary-color)] cursor-pointer"
                  >
                    Login
                  </span>
                </p>
              </div>
            </div>
            <div className=""></div>
          </div>
        </>
      )}

      <div className="bottom-0 absolute overflow-hidden">
        <img src="/img/webeats/fruits.png" alt="" className="" />
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
