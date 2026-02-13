"use client";

import { useLocationContext } from "@/context/LocationContext";
import { useShrideModal } from "@/hooks/useShrideModal";
import { findMapBoxRoute, getSettingsValue } from "@/lib/requests";
import { useUserStore } from "@/store/user";
import clsx from "clsx";
import pluralize from "pluralize";
import { useEffect, useState } from "react";
import {
  BiChevronRight,
  BiInfoSquare,
  BiPhone,
  BiPlusCircle,
  BiSolidPlusCircle,
  BiStore,
  BiTrash,
  BiWallet,
} from "react-icons/bi";
import { BsArrowRight, BsGlobe, BsWhatsapp } from "react-icons/bs";
import { HiOutlineLocationMarker } from "react-icons/hi";
import LoginModal from "../modals/LoginModal";
import { getLoggedUser } from "@/lib/utils";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { LiaSpinnerSolid } from "react-icons/lia";
import OrderDoneModal from "../modals/OrderDoneModal";
import AddressModal from "../modals/AddressModal";
import { usePathname } from "next/navigation";
import { FaHelmetSafety } from "react-icons/fa6";
import { TbHelmet } from "react-icons/tb";

export default function ViewTrip({
  tripId,
  tripData,
}: {
  tripId: any;
  tripData: any;
}) {
  const pathname = usePathname();
  const { showModal } = useShrideModal();

  const [riderRate, setRiderRate] = useState<any>(0);
  const [foodRate, setFoodRate] = useState<any>(0);
  const [riderComment, setRiderComment] = useState<any>(null);
  const [foodComment, setFoodComment] = useState<any>(null);
  const [showFoodComment, setShowFoodComment] = useState<boolean>(false);
  const [showRiderComment, setShowRiderComment] = useState<boolean>(false);

  const renderPaymentSummary = () => {
    return (
      <div className="ring-2 ring-gray-300 rounded-lg py-2 px-2">
        {/* <p className="mb-1 text-center text-green-600 text-sm">
          50% Faaji Friday Promo applied
        </p> */}

        <p className="text-base font-semibold mb-1">Payment Summary</p>

        <div className="">
          <div className="grid grid-cols-2">
            <div className="text-left">
              <p className="">Delivery Fee</p>
            </div>
            <div className="text-right">
              <p className="text-base">
                ₦ {tripData?.user_money?.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderStatus = (status: any) => {
    let stage = 1;
    let currentLevel = 0;

    if (status == "search_rider") {
      stage = 2;
    }

    if (status == "rider_accepted" || status == "rider_arrived") {
      stage = 2;
    }

    if (status == "ontrip") {
      stage = 3;
    }

    if (status == "completed") {
      stage = 4;
    }

    currentLevel = stage < 4 ? stage : 0;

    return (
      <div className="grid grid-cols-4 gap-2 mt-5">
        <div className="">
          <div
            className={clsx(
              [
                stage >= 1 ? "bg-[var(--primary-color)]" : "bg-gray-300",
                currentLevel == 1 ? "animate-pulse duration-150" : "",
              ],
              `w-full h-[5px] `,
            )}
          ></div>
          <p className="font-medium text-base md:text-xs mt-1">Processing</p>
        </div>

        <div className="">
          <div
            className={clsx(
              [
                stage >= 2 ? "bg-[var(--primary-color)]" : "bg-gray-300",
                currentLevel == 2 ? "animate-pulse duration-150" : "",
              ],
              `w-full h-[5px] `,
            )}
          ></div>
          <p className="font-medium text-base md:text-xs mt-1">
            Enroute Pickup
          </p>
        </div>

        <div className="">
          <div
            className={clsx(
              [
                stage >= 3 ? "bg-[var(--primary-color)]" : "bg-gray-300",
                currentLevel == 3 ? "animate-pulse duration-150" : "",
              ],
              `w-full h-[5px] `,
            )}
          ></div>
          <p className="font-medium text-base md:text-xs mt-1">On the way</p>
        </div>

        <div className="">
          <div
            className={clsx(
              [
                stage >= 4 ? "bg-[var(--primary-color)]" : "bg-gray-300",
                currentLevel == 4 ? "animate-pulse duration-150" : "",
              ],
              `w-full h-[5px] `,
            )}
          ></div>
          <p className="font-medium text-base  md:text-xs mt-1">Delivered</p>
        </div>
      </div>
    );
  };

  const isCheckOutPage = pathname.includes("checkout");
  // const deliveryCode = tripData?.delivery_code?.toString()?.split("") || [];
  // const deliveryCode: any = [];

  return (
    <div className="w-full">
      <div className="mt-5 w-10/12 md:w-full">
        <div className="flex justify-center items-center w-full">
          <div
            onClick={() => window.location.reload()}
            className="my-4 bg-[var(--primary-color-3)] text-sm text-center rounded-md py-1 px-4 inline-flex items-center gap-2 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
            >
              <g className="info-outline">
                <g fill="#000" className="Vector">
                  <path
                    fillRule="evenodd"
                    d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10m-10 8a8 8 0 1 0 0-16a8 8 0 0 0 0 16"
                    clipRule="evenodd"
                  ></path>
                  <path
                    fillRule="evenodd"
                    d="M12 11a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0v-4a1 1 0 0 1 1-1"
                    clipRule="evenodd"
                  ></path>
                  <path d="M13 9a1 1 0 1 1-2 0a1 1 0 0 1 2 0"></path>
                </g>
              </g>
            </svg>

            <span>Tap to refresh to see updated information</span>
          </div>
        </div>
        {tripData?.status == "completed" ? (
          <div className="w-full flex justify-between items-center gap-5">
            <div className="">
              <p className="text-3xl font-bold text-green-600">
                Order Completed
              </p>

              <p className="">{tripData?.created_at_obj?.withDayTime}</p>
            </div>
            <p className="text-base">#{tripData?.uuid}</p>
          </div>
        ) : (
          <div className="w-full flex justify-between items-center gap-5">
            <div className="">
              <p className="text-3xl font-bold">Order Status</p>
              <p className="">{tripData?.created_at_obj?.withDayTime}</p>
            </div>
            <p className="text-base">#{tripData?.uuid}</p>
          </div>
        )}

        <div className="">{renderStatus(tripData.status)}</div>

        <div className="flex flex-col items-center justify-center mt-4">
          <div className="px-3 py-1 rounded-sm font-bold ring-2 ring-gray-300">
            <span className="text-center text-3xl tracking-widest">
              {tripData?.delivery_code}
            </span>
          </div>
          <p className="text-center text-[var(--primary-color)]">
            Pin is required at delivery
          </p>
        </div>

        {!!tripData?.rider?.fullname && tripData?.status != "completed" && (
          <div className="mt-5 w-full flex items-center justify-between pb-2 border-b-2 border-b-gray-300">
            <div className="flex items-center gap-4 mt-5">
              {/* <TbHelmet size={25} /> */}
              <img
                src={tripData?.rider?.avatar_url}
                alt=""
                className="w-[50px] h-[50px] rounded-full object-cover"
              />
              <div className="">
                <p className="text-2xl md:text-sm font-semibold capitalize">
                  {tripData?.rider?.fullname}
                </p>
                <p className="md:text-xs">
                  {tripData?.vehicle?.name} ({tripData?.vehicle?.plate_number})
                  - {tripData?.vehicle?.color}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <a
                href={`https://wa.me/+234${tripData?.rider?.mobile}`}
                className="inline-flex items-center justify-center p-3 bg-gray-200 rounded-full"
              >
                <BsWhatsapp className="text-green-600" size={20} />
              </a>

              <a
                href={`tel:${tripData?.rider?.mobile}`}
                className="inline-flex items-center justify-center p-3 bg-gray-200 rounded-full"
              >
                <BiPhone className="text-orange-600" size={20} />
              </a>
            </div>
          </div>
        )}

        <div className="mt-3 border-b-2 border-b-gray-300 pb-2">
          <p className="font-semibold text-lg">Pickup address</p>
          <p className="">{tripData?.origin?.address}</p>
        </div>

        <div className="mt-3 border-b-2 border-b-gray-300 pb-2">
          <p className="font-semibold text-lg">Drop-off address</p>
          <p className="">{tripData?.destination?.address}</p>
        </div>

        <div className="mt-5">
          {/* <div className="px-4 flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="#000"
                fillRule="evenodd"
                d="m16.394 2.021l.066.018c1.1.295 1.971.528 2.656.776c.701.253 1.273.542 1.744.983a4.75 4.75 0 0 1 1.378 2.389c.147.628.112 1.268-.02 2.001c-.127.718-.36 1.589-.655 2.688l-.536 1.999c-.294 1.099-.528 1.97-.775 2.656c-.254.7-.543 1.272-.984 1.743a4.75 4.75 0 0 1-2.302 1.358a4.75 4.75 0 0 1-1.106 1.567c-.471.441-1.043.73-1.744.984c-.685.248-1.556.481-2.655.776l-.067.018c-1.1.294-1.97.527-2.688.656c-.733.131-1.373.166-2.002.02a4.75 4.75 0 0 1-2.388-1.38c-.44-.47-.73-1.042-.984-1.743c-.247-.685-.48-1.556-.775-2.656l-.536-1.998c-.294-1.1-.528-1.97-.656-2.688c-.131-.733-.166-1.373-.02-2.002a4.75 4.75 0 0 1 1.38-2.388c.47-.44 1.042-.73 1.743-.984c.685-.247 1.556-.48 2.655-.775l.034-.01l.751-.2c.392-1.399.736-2.388 1.408-3.105a4.75 4.75 0 0 1 2.388-1.379c.629-.146 1.268-.111 2.002.02c.717.128 1.588.362 2.688.656M7.455 7.503c-1.093.293-1.876.505-2.478.722c-.61.22-.967.424-1.227.668a3.25 3.25 0 0 0-.944 1.634c-.08.348-.079.76.036 1.397c.115.647.332 1.457.637 2.597l.518 1.932c.305 1.14.523 1.95.746 2.567c.22.61.424.968.668 1.228a3.25 3.25 0 0 0 1.634.944c.347.08.76.078 1.397-.036c.647-.115 1.457-.332 2.597-.637c1.14-.306 1.95-.523 2.568-.747c.609-.22.967-.424 1.227-.667q.207-.195.376-.419a10 10 0 0 1-.554-.095c-.672-.134-1.48-.35-2.475-.617l-.058-.015c-1.099-.295-1.97-.528-2.655-.776c-.701-.253-1.273-.542-1.744-.983a4.75 4.75 0 0 1-1.379-2.389c-.146-.628-.111-1.268.02-2.001c.128-.718.362-1.589.656-2.688zm5.987-4.661c-.638-.115-1.05-.117-1.397-.036a3.25 3.25 0 0 0-1.634.944c-.436.465-.705 1.185-1.171 2.893l-.243.902l-.518 1.932c-.305 1.14-.522 1.95-.637 2.597c-.115.637-.117 1.05-.036 1.397a3.25 3.25 0 0 0 .944 1.634c.26.244.618.447 1.227.668c.618.223 1.428.44 2.568.746c1.025.275 1.785.478 2.403.6c.615.123 1.033.153 1.375.111q.112-.015.216-.038a3.25 3.25 0 0 0 1.634-.944c.244-.26.448-.618.668-1.227c.223-.618.44-1.428.746-2.568l.518-1.932c.305-1.14.522-1.95.637-2.597c.114-.637.117-1.05.036-1.397a3.25 3.25 0 0 0-.944-1.634c-.26-.244-.618-.447-1.227-.668c-.619-.223-1.428-.44-2.568-.746c-1.14-.305-1.95-.522-2.597-.637m-2.39 6.964a.75.75 0 0 1 .919-.53l4.83 1.294a.75.75 0 0 1-.389 1.448l-4.83-1.294a.75.75 0 0 1-.53-.918m-.777 2.898a.75.75 0 0 1 .92-.53l2.897.776a.75.75 0 0 1-.388 1.449l-2.898-.777a.75.75 0 0 1-.53-.918"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-lg font-medium">Package Details</p>
          </div> */}

          <div className="">
            <p className="text-base">
              <span className="">Delivery Method:</span>
              <span className="ml-1 capitalize">{tripData?.trip_method}</span>
            </p>

            <p className="text-sm">
              <span className="">Size:</span>
              <span className="ml-1 capitalize">
                {tripData?.delivery_details?.package_size}
              </span>
            </p>

            <p className="text-base">
              <span className="">Package:</span>
              <span className="ml-1 capitalize">
                {tripData?.delivery_details?.package_category}
              </span>
            </p>

            <p className="text-base">
              <span className="">Instruction:</span>
              <span className="ml-1 capitalize">{tripData?.trip_method}</span>
            </p>
          </div>

          <div className="mt-5">{renderPaymentSummary()}</div>
        </div>
      </div>
    </div>
  );
}
