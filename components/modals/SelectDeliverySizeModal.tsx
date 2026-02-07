"use client";

import { useShrideModal } from "@/hooks/useShrideModal";
import { IoCloseSharp } from "react-icons/io5";
import { FC, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import clsx from "clsx";

const SelectDeliverySizeModal: FC<{ type: any; fnonSelect: any; sz: any }> = ({
  type,
  fnonSelect, sz
}) => {
  const { hideModal, showModal } = useShrideModal();
  const [size, setSize] = useState<any>(sz);

  return (
    <div
      className="bg-white md:mt-[10%] w-[700px] h-auto md:w-[90%] shadow-lg border-1
        border-gray-200 rounded-2xl relative overflow-hidden"
    >
      <div className="w-full flex items-center justify-between gap-5 px-5 py-3 border-b-gray-300 border-b-[1px]">
        <p className="font-medium text-lg">Select Package Size</p>
        <IoCloseSharp onClick={() => hideModal()} size={28} />
      </div>

      <>
        <div className="px-10 pb-12 mt-2 flex flex-col justify-center items-center">
          {type == "bike" && (
            <div className="">
              {size == "small" && (
                <DotLottieReact
                  src="/lottie/small_bike.lottie"
                  loop
                  autoplay
                  height={250}
                  width={600}
                />
              )}

              {size == "medium" && (
                <DotLottieReact
                  src="/lottie/medium_bike.lottie"
                  loop
                  autoplay
                  height={250}
                  width={600}
                />
              )}

              {size == "large" && (
                <DotLottieReact
                  src="/lottie/large_bike.lottie"
                  loop
                  autoplay
                  height={250}
                  width={600}
                />
              )}
            </div>
          )}

          {type == "trike" && (
            <div className="">
              {size == "small" && (
                <DotLottieReact
                  src="/lottie/small_keke.lottie"
                  loop
                  autoplay
                  height={250}
                  width={600}
                />
              )}

              {size == "medium" && (
                <DotLottieReact
                  src="/lottie/medium_keke.lottie"
                  loop
                  autoplay
                  height={250}
                  width={600}
                />
              )}

              {size == "large" && (
                <DotLottieReact
                  src="/lottie/large_keke.lottie"
                  loop
                  autoplay
                  height={250}
                  width={600}
                />
              )}
            </div>
          )}

          <div className="w-full flex gap-5 mt-5 items-center justify-center">
            <button
              className={clsx([size == "small" ? "" : "opacity-30"], `btn`)}
              onClick={() => {
                setSize("small");
                fnonSelect("small");
              }}
            >
              Small
            </button>

            <button
              className={clsx([size == "medium" ? "" : "opacity-40"], `btn`)}
              onClick={() => {
                setSize("medium");
                fnonSelect("medium");
              }}
            >
              Medium
            </button>

            <button
              className={clsx([size == "large" ? "" : "opacity-40"], `btn`)}
              onClick={() => {
                setSize("large");
                fnonSelect("large");
              }}
            >
              Large
            </button>
          </div>
        </div>
      </>
    </div>
  );
};

export default SelectDeliverySizeModal;
