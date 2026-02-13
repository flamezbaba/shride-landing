"use client";

import { useShrideModal } from "@/hooks/useShrideModal";
import { shortenWords } from "@/lib/utils";
import axios from "axios";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import pluralize from "pluralize";
import { FC, useEffect, useState } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { IoCloseSharp } from "react-icons/io5";
import { LiaMotorcycleSolid } from "react-icons/lia";
import { LuLoader2 } from "react-icons/lu";

const DeliveryHistoryModal: FC<{}> = () => {
  const { hideModal } = useShrideModal();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [orderHistory, setOrderHistory] = useState<any[]>([]);

  useEffect(() => {
    getHistory();
  }, []);

  const getHistory = async () => {
    setIsLoading(true);
    const res = await axios.get("/api/delivery?type=getTripHistory");

    if (!!res?.data) {
      setOrderHistory(res.data);
    }

    setIsLoading(false);
  };

  const gotoLink = (item: any) => {
    router.push(`/trip/${item.id}`);
    hideModal();
  };

  const getStatusColor = (status: any) => {
    let statusColor = "text-black";

    if (status == "completed") {
      statusColor = "text-green-600";
    }

    if (status == "cancelled") {
      statusColor = "text-red-600";
    }

    return statusColor;
  };

  const renderTrip = (item: any) => {
     let main = item?.destination?.main;
      if (item?.destination?.address) {
        // main = shortenWords(item?.destination?.address, 30);
        main = item?.destination?.address;
      } else {
        if (main?.includes('+')) {
          main = item?.destination?.secondary;
        }
      }

      const location =
        item.trip_type == 'delivery'
          ? 'Delivery to ' + main
          : item.trip_type == 'eat'
          ? 'Food delivery to ' + main
          : 'Trip to ' + main;

      const amount = item?.status == 'cancelled' ? null : item?.user_money;
      let status = '';

      if (item.trip_type == 'eat') {
        if (item?.status == 'search_rider') {
          status = 'Processing';
        }

        if (
          item?.status == 'rider_accepted' ||
          item?.status == 'rider_arrived'
        ) {
          status = 'Processing';
        }

        if (item?.status == 'ontrip') {
          status = 'on the way';
        }

        if (item?.status == 'cancelled') {
          status = 'cancelled';
        }

        if (item?.status == 'completed') {
          status = 'Delivered';
        }
      }

      if (item.trip_type == 'delivery') {
        if (item?.status == 'search_rider') {
          status = 'Processing';
        }

        if (
          item?.status == 'rider_accepted' ||
          item?.status == 'rider_arrived'
        ) {
          status = 'Processing';
        }

        if (item?.status == 'ontrip') {
          status = 'En-route';
        }

        if (item?.status == 'cancelled') {
          status = 'cancelled';
        }

        if (item?.status == 'completed') {
          status = 'Delivered';
        }
      }

      if (item.trip_type == 'ride') {
        if (item.trip_channel == 'schedule') {
          status = 'Scheduled Ride';
        } else {
          status = item?.status?.replaceAll('_', ' ');
        }
      }

    return (
      <div
        onClick={() => gotoLink(item)}
        className="w-full flex items-start gap-10 justify-between mb-10 cursor-pointer"
      >
        <div className="flex-1 flex gap-2">
          {item?.trip_method == 'bike' && (
            <img
              src='/img/webeats/bike.png'
              alt=""
              className="w-[50px] h-[50px] md:w-[40px] md:h-[40px] rounded-lg object-contain"
            />
          )}

          {item?.trip_method == 'trike' && (
            <img
              src='/img/webeats/trike.png'
              alt=""
              className="w-[50px] h-[50px] md:w-[40px] md:h-[40px] rounded-lg object-contain"
            />
          )}

          <div className="">
            <p className="text-base md:text-sm font-semibold capitalize">
             {item?.trip_method} {location}
            </p>
            <p className=" md:text-sm">{item?.created_at_obj?.withDayN} . #{item?.uuid}</p>
          </div>
        </div>
        <div className="">
          <p
            className={clsx(
              `text-base  md:text-sm font-semibold text-right capitalize ${getStatusColor(status)}`,
            )}
          >
            {status}
          </p>
          <p className="text-sm text-right">
            ₦ {item?.user_money?.toLocaleString()}
          </p>
        </div>
      </div>
    );
  };

  const dorderHistory = orderHistory?.filter((f: any) => f?.trip_type == 'delivery') || [];

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
            <p className="font-medium text-xl">Delivery History</p>
            <IoCloseSharp onClick={() => hideModal()} size={28} />
          </div>

          {dorderHistory?.length <= 0 ? (
            <div className="w-full flex flex-col justify-center items-center px-5 py-10">
              <img
                src="/img/webeats/cups.png"
                alt=""
                className="mt-4 w-[100px]"
              />
              <p className="text-base mt-5">
                We are waiting for your first order!
              </p>
              <Link href="/make-delivery" className="btn mt-3">
                Lets Explore
              </Link>
            </div>
          ) : (
            <div className="w-full mt-5 px-5 pb-5">
              {dorderHistory?.map((item: any, index: any) => (
               <div className="" key={index}>
                {renderTrip(item)}
               </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default DeliveryHistoryModal;
