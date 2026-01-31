"use client";

import { useShrideModal } from "@/hooks/useShrideModal";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { BiInfoCircle } from "react-icons/bi";

const OrderDoneModal: FC<{ order: any }> = ({ order }) => {
  const { hideModal } = useShrideModal();

  const backToStore = () => {
    hideModal();
    window.location.reload();
  };

  const deliveryCode = order?.trip?.delivery_code.split("") || [];

  return (
    <div
      className="bg-white md:mt-[10%] w-[400px] h-auto md:w-[90%] shadow-lg border-1
        border-gray-200 rounded-3xl pb-12 px-10"
    >
      <div className="w-full flex flex-col justify-center items-center pt-10">
        <img src="/img/webeats/orderdone.png" alt="" className="w-[150px]" />

        <p className="text-lg font-semibold text-center mt-2">
          Order placed successfully
        </p>
        <p className="text-sm text-center">
          Get excited! your order has been placed and is on the way to the
          vendor.
        </p>

        <div className="flex gap-3 items-center justify-center mt-4">
          {deliveryCode.map((c: any, i: any) => (
            <span
              key={i}
              className="px-3 py-1 text-lg rounded-sm font-bold ring-2 ring-gray-300"
            >
              {c}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-1 mt-2">
          <BiInfoCircle className="text-[var(--primary-color)]" />
          <p className="text-[var(--primary-color)] text-xs">
            Pin required at delivery
          </p>
        </div>

        <button className="btn mt-14">Check my order status</button>

        <div
          onClick={backToStore}
          className="text-center font-medium text-sm text-[var(--primary-color)] mt-2 cursor-pointer"
        >
          Back to home
        </div>
      </div>
    </div>
  );
};

export default OrderDoneModal;
