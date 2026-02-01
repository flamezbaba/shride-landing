"use client";

import { useShrideModal } from "@/hooks/useShrideModal";
import axios from "axios";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import pluralize from "pluralize";
import { FC, useEffect, useState } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { IoCloseSharp } from "react-icons/io5";
import { LuLoader2 } from "react-icons/lu";

const OrderHistoryModal: FC<{}> = () => {
  const { hideModal } = useShrideModal();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [orderHistory, setOrderHistory] = useState<any[]>([]);

  useEffect(() => {
    getHistory();
  }, []);

  const getHistory = async () => {
    setIsLoading(true);
    const res = await axios.get("/api/delivery?type=getOrderHistory");

    if (!!res?.data) {
      setOrderHistory(res.data);
    }

    setIsLoading(false);
  };

  const gotoLink = (item: any) => {
    router.push(`/order/${item.id}`);
    hideModal();
  };

  const getStatusColor = (status: any) => {
    let statusColor = "text-black";

    if (status == "delivered") {
      statusColor = "text-green-600";
    }

    if (status == "cancelled") {
      statusColor = "text-red-600";
    }

    return statusColor;
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
          className="bg-white md:mt-[10%] w-[600px] h-auto md:w-[90%] shadow-lg border-1
                border-gray-200 rounded-lg"
        >
          <div className="w-full flex items-center justify-between gap-5 px-5 py-3 border-b-gray-300 border-b-[1px]">
            <p className="font-medium text-xl">Order History</p>
            <IoCloseSharp onClick={() => hideModal()} size={28} />
          </div>

          {orderHistory.length <= 0 ? (
            <div className="w-full flex flex-col justify-center items-center px-5 py-10">
              <img
                src="/img/webeats/cups.png"
                alt=""
                className="mt-4 w-[100px]"
              />
              <p className="text-base mt-5">
                We are waiting for your first order!
              </p>
              <Link href="/stores" className="btn mt-3">
                Lets Explore
              </Link>
            </div>
          ) : (
            <div className="w-full mt-5 px-5 pb-5">
              {orderHistory?.map((item: any, index: any) => (
                <div
                  onClick={() => gotoLink(item)}
                  key={index}
                  className="w-full flex items-center gap-10 justify-between mb-10"
                >
                  <div className="flex-1 flex gap-2">
                    {item?.items?.[0]?.product?.image_url && (
                      <img
                        src={item?.items?.[0]?.product?.image_url}
                        alt=""
                        className="w-[70px] h-[70px] rounded-lg object-cover"
                      />
                    )}

                    <div className="">
                      <p className="text-base font-semibold capitalize">
                        {item?.store?.name}
                      </p>
                      <p className="">
                        {item?.created_at_obj?.withDayN} . {"  "}{" "}
                        {item?.items?.length || 0}{" "}
                        {pluralize("item", item?.items?.length || 0)}
                      </p>
                      <p className="text-sm">#{item?.uuid}</p>
                    </div>
                  </div>
                  <div className="">
                    <p
                      className={clsx(
                        `text-base font-semibold text-right capitalize ${getStatusColor(item.status)}`,
                      )}
                    >
                      {item?.status}
                    </p>
                    <p className="text-sm text-right">
                      ₦ {item?.user_money?.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default OrderHistoryModal;
