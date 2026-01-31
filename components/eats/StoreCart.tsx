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
  BiPlusCircle,
  BiSolidPlusCircle,
  BiTrash,
  BiWallet,
} from "react-icons/bi";
import { BsArrowRight, BsGlobe } from "react-icons/bs";
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

export default function StoreCart({
  storeId,
  storeData,
}: {
  storeId: any;
  storeData: any;
}) {
  const pathname = usePathname();
  const { showModal } = useShrideModal();
  const {
    cart,
    hasHydrated,
    clearStoreCart,
    user,
    setStoreCart,
    address: zusAddr,
  } = useUserStore();

  const [stage, setStage] = useState<"check" | "order">("check");
  const [tipOption, setTipOption] = useState<"custom" | "enter">("custom");
  const [tipAmount, setTipAmount] = useState<any>(0);
  const [orderLoading, setOrderLoading] = useState<boolean>(false);
  const [storeCart, setsStoreCart] = useState<any>(null);
  const [storeNote, setStoreNote] = useState<any>(null);
  const [riderNote, setRiderNote] = useState<any>(null);
  const [distance, setDistance] = useState<any>(0);
  const [deliveryFee, setDeliveryFee] = useState<any>(0);
  const [promoCode, setPromoCode] = useState<any>(null);
  const [promoCodeDetails, setPromoCodeDetails] = useState<any>(null);
  const [serviceFeeData, setServiceFeeData] = useState<any>(0);
  const [showNoteRider, setShowNoteRider] = useState<boolean>(false);
  const [showNoteStore, setShowNoteStore] = useState<boolean>(false);

  useEffect(() => {}, []);

  useEffect(() => {
    const storePos = cart?.find((s: any) => s?.store_id == storeId);
    // console.log("storePos", cart);
    setsStoreCart(storePos);

    getServiceFee();
  }, [cart]);

  useEffect(() => {
    findDistance();
  }, [storeCart, zusAddr]);

  useEffect(() => {
    if (distance) {
      getDeliveryFee(storeId, distance);
    }
  }, [distance]);

  const handleDeleteSlot = (index: any) => {
    if (storeCart?.carts.length > 0) {
      const n = storeCart?.carts.filter((p: any, i: any) => i != index);
      // setsStoreCart({ ...storeCart, carts: n });

      if (n.length == 1) {
        handleClearItems();
      } else {
        // update store cart
        let newCart = cart.map((ct: any, index: any) => {
          if (ct?.store_id == storeId) {
            ct.carts = n;
          }

          return ct;
        });

        setStoreCart(newCart);
      }
    }
  };

  const renderCartItems = (item: any, index: any) => {
    const p = item;
    const totalAmount =
      item?.reduce((acc: any, current: any) => {
        return current?.totalAmount + acc;
      }, 0) || 0;

    return (
      <div className="w-full px-4 flex items-start justify-between py-3 border-b-2 border-b-gray-300">
        <div className="flex-1 flex gap-3">
          <img
            src={p?.[0]?.image_url}
            alt=""
            className="w-[40px] h-[40px] rounded-md"
          />

          <div className="flex-1">
            {p?.map((i: any, iindex: any) => (
              <p
                key={iindex}
                className={clsx(
                  [iindex == 0 ? "font-semibold text-base" : ""],
                  `capitalize`,
                )}
              >
                {i?.name}{" "}
                <span className="lowercase text-xs">x{i?.quantity}</span>
              </p>
            ))}

            <div className="">
              <p className="">₦{totalAmount?.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="items-start">
          <div
            onClick={() => handleDeleteSlot(index)}
            className="w-[30px] h-[30px] bg-red-200 flex justify-center items-center rounded-full  cursor-pointer"
          >
            <BiTrash size={15} className="text-red-500" />
          </div>
        </div>
      </div>
    );
  };

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
              <p className="">Subtotal</p>
            </div>
            <div className="text-right">
              <p className="text-base">₦ {subTotal?.toLocaleString()}</p>
            </div>
          </div>

          <div className="grid grid-cols-2">
            <div className="text-left">
              <p className="">Delivery Fee</p>
            </div>
            <div className="text-right">
              <p className="text-base">₦ {deliveryFee?.toLocaleString()}</p>
            </div>
          </div>

          <div className="grid grid-cols-2">
            <div className="text-left">
              <p className="">Service Fee</p>
            </div>
            <div className="text-right">
              <p className="text-base">₦ {serviceFee?.toLocaleString()}</p>
            </div>
          </div>

          <div className="grid grid-cols-2">
            <div className="text-left">
              <p className="font-medium">Total</p>
            </div>
            <div className="text-right">
              <p className="text-base font-medium">
                ₦ {total?.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handleClearItems = () => {
    if (cart?.length > 0) {
      let newCart = cart.filter((ct: any) => ct?.store_id != storeId);
      console.log("handleClearItems", newCart);
      setStoreCart(newCart);
    }
  };

  const findDistance = async () => {
    const res = await findMapBoxRoute({
      originLat: storeData.lat,
      originLng: storeData.lng,
      destiLng: zusAddr.longitude,
      destiLat: zusAddr.latitude,
    });

    if (!!res) {
      setDistance(res?.distance);
    }
  };

  const getDeliveryFee = async (store_id: any, distance: any) => {
    const res = await axios.post("/api/delivery?type=calcEatDeliveryPrice", {
      store_id,
      distance,
    });

    if (!!res?.data) {
      setDeliveryFee(res?.data);
    }
  };

  const getServiceFee = async () => {
    const res = await axios.get("/api/settings?type=eat_service_percentage");

    if (!!res?.data) {
      setServiceFeeData(res?.data);
    }
  };

  const placeOrder = async () => {
    if (!distance) {
      toast.error("Select another address");
      return;
    }

    if (remaining > 0) {
      toast.error("Insufficient funds, topup your wallet");
      return;
    }

    setOrderLoading(true);

    const res = await axios.post("/api/delivery?type=eatPlaceOrder", {
      store_id: storeId,
      orders: storeCart.carts,
      delivery_fee: deliveryFee,
      service_fee: serviceFee,
      tip: tipAmount,
      subtotal: subTotal,
      address: zusAddr?.address,
      lat: zusAddr?.latitude,
      lng: zusAddr?.longitude,
      distance: distance,
      store_note: storeNote,
      rider_note: riderNote,
      promo_code_details: promoCodeDetails,
    });

    console.log("placeOrder", res);

    setOrderLoading(false);

    if (!res?.data) {
      toast.error("Order Failed, try again.");
    } else {
      // handleClearItems();
      toast.success("Order Successful.");
      showModal(<OrderDoneModal order={res.data} />);
    }
  };

  const renderAddress = () => {
    return (
      <div className="w-full flex flex-wrap gap-5 items-center justify-between cursor-pointer">
        <div className="flex-1 flex gap-2 items-start justify-start">
          <HiOutlineLocationMarker
            size={20}
            className="text-black"
          />
          <div className="">
            {/* <p className=""></p> */}
            <p className="">{zusAddr?.address}</p>
          </div>
        </div>
        <div className="">
          <span
            onClick={() => showModal(<AddressModal />)}
            className="bg-black text-xs text-white rounded-md px-3 py-1 inline-flex items-center cursor-pointer"
          >
            Change Address
          </span>
        </div>
      </div>
    );
  };

  if (!hasHydrated) return null;

  const loggedUser = getLoggedUser(user);

  const cartsFlat = storeCart?.carts?.flat() || [];

  const subTotal = cartsFlat?.reduce((acc: any, current: any) => {
    return current?.totalAmount + acc;
  }, 0);

  const serviceFeeCalc =
    parseFloat(serviceFeeData) > 0
      ? (parseFloat(serviceFeeData) / 100) * subTotal
      : 0;

  const serviceFee = Number(serviceFeeCalc?.toFixed(2));

  // const deliveryFeeCalc =
  //   parseFloat(deliveryFeeData) > 0
  //     ? parseFloat(deliveryFeeData) * distance
  //     : 0;

  // const deliveryFee = deliveryFeeCalc?.toFixed(2);

  const total =
    subTotal + Number(deliveryFee) + Number(serviceFee) + Number(tipAmount);

  const afterPromoTotal = !!promoCodeDetails?.discount
    ? total - Number(promoCodeDetails?.discount)
    : 0;

  const remaining = afterPromoTotal
    ? afterPromoTotal - Number(user?.wallet_balance)
    : Number(total) - Number(user?.wallet_balance);

  const isCheckOutPage = pathname.includes("checkout");

  return (
    <div className="w-full">
      {isCheckOutPage && (
        <div className="px-4">
          <p className="text-lg font-medium capitalize">
            {storeData?.store_name} - ({storeCart?.carts?.length || 0}{" "}
            {storeCart?.carts?.length
              ? pluralize("item", storeCart?.carts?.length)
              : ""}
            )
          </p>
        </div>
      )}

      <div className="mt-0">
        <div className="w-full pb-3 flex justify-between items-center border-b-[1px] border-b-gray-300 rounded-tr-lg">
          <div className="px-4 flex items-center gap-1">
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
            <p className="text-xl font-medium">Order Summary</p>
          </div>
          {isCheckOutPage && (
            <Link
              href={`/stores/${storeId}`}
              className="flex items-center gap-1 cursor-pointer"
            >
              <BiSolidPlusCircle
                size={18}
                className="text-[var(--primary-color)]"
              />
              <p className="text-[var(--primary-color)] font-medium">
                Add more items
              </p>
            </Link>
          )}
        </div>

        <div className="mt-5">
          {storeCart?.carts?.map((p: any, index: any) => (
            <div key={index}>{renderCartItems(p, index)}</div>
          ))}
        </div>

        <div className="w-full px-4 py-3 border-b-[1px] border-b-gray-300">
          {renderAddress()}
        </div>

        <div className="w-full px-4 py-2 border-b-[1px] border-b-gray-300">
          <div
            onClick={() => setShowNoteRider(!showNoteRider)}
            className="w-full flex items-center justify-between cursor-pointer gap-5"
          >
            <div className="flex-1 flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
              >
                <path
                  fill="#000"
                  d="M7 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zM7 13.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m-1-11a.5.5 0 0 1 1 0V3h2.5v-.5a.5.5 0 0 1 1 0V3H13v-.5a.5.5 0 0 1 1 0V3h.5A1.5 1.5 0 0 1 16 4.5v4.732c-.326.14-.632.342-.898.609L15 9.943V4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v12a.5.5 0 0 0 .5.5h3.72l-.163.653q-.044.176-.054.347H5.5A1.5 1.5 0 0 1 4 16.5v-12A1.5 1.5 0 0 1 5.5 3H6zm9.81 8.048l-4.83 4.83a2.2 2.2 0 0 0-.578 1.02l-.375 1.498a.89.89 0 0 0 1.079 1.078l1.498-.374a2.2 2.2 0 0 0 1.02-.578l4.83-4.83a1.87 1.87 0 0 0-2.645-2.644"
                />
              </svg>
              <div className="">
                <p className="">Note to rider</p>
                <p className=""></p>
              </div>
            </div>
            <BiChevronRight size={20} />
          </div>
          {showNoteRider && (
            <div className="mt-2">
              <textarea
                name=""
                value={riderNote}
                onChange={(e: any) => setRiderNote(e.target.value)}
                className="ring-[1px] ring-gray-300 w-full rounded-md resize-none p-3"
                rows={3}
              ></textarea>
            </div>
          )}
        </div>

        <div className="w-full px-4 py-2 border-b-[1px] border-b-gray-300">
          <div
            onClick={() => setShowNoteStore(!showNoteStore)}
            className="w-full flex items-center justify-between cursor-pointer gap-5"
          >
            <div className="flex-1 flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
              >
                <path
                  fill="#000"
                  d="M7 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zM7 13.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m-1-11a.5.5 0 0 1 1 0V3h2.5v-.5a.5.5 0 0 1 1 0V3H13v-.5a.5.5 0 0 1 1 0V3h.5A1.5 1.5 0 0 1 16 4.5v4.732c-.326.14-.632.342-.898.609L15 9.943V4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v12a.5.5 0 0 0 .5.5h3.72l-.163.653q-.044.176-.054.347H5.5A1.5 1.5 0 0 1 4 16.5v-12A1.5 1.5 0 0 1 5.5 3H6zm9.81 8.048l-4.83 4.83a2.2 2.2 0 0 0-.578 1.02l-.375 1.498a.89.89 0 0 0 1.079 1.078l1.498-.374a2.2 2.2 0 0 0 1.02-.578l4.83-4.83a1.87 1.87 0 0 0-2.645-2.644"
                />
              </svg>
              <div className="">
                <p className="">Note to store</p>
                <p className=""></p>
              </div>
            </div>
            <BiChevronRight size={20} />
          </div>
          {showNoteStore && (
            <div className="mt-2">
              <textarea
                name=""
                value={storeNote}
                onChange={(e: any) => setStoreNote(e.target.value)}
                className="ring-[1px] ring-gray-300 w-full rounded-md resize-none p-3"
                rows={3}
              ></textarea>
            </div>
          )}
        </div>

        <div className="w-full px-4 py-2">
          <div className="w-full flex items-center justify-between cursor-pointer gap-5">
            <div className="flex-1 flex items-center gap-1">
              <div className="">
                <p className="text-xs font-medium">Promo codes & rewards</p>
              </div>
            </div>
            <BiChevronRight size={20} />
          </div>
        </div>

        <div className="mt-5 px-4">{renderPaymentSummary()}</div>

        {!!loggedUser ? (
          <>
            <div className="w-full px-4 py-4 border-b-[1px] border-b-gray-300"></div>

            <div className="w-full px-4 pt-5">
              <p className="font-semibold text-lg">Payment Method</p>

              <div className="mt-3 space-y-5">
                <div className="w-full flex items-center justify-between cursor-pointer gap-5">
                  <div className="flex-1 flex items-start gap-2">
                    <BiWallet size={16} />
                    <div className="">
                      <p className="text-base font-medium leading-none">
                        Wallet
                      </p>
                      {remaining > 0 && (
                        <p className="text-xs leading-none text-red-500">
                          Top up ₦{remaining?.toLocaleString()} to use
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="">
                    <p className="">
                      ₦{user?.wallet_balance?.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="w-full flex items-center justify-between cursor-pointer gap-5">
                  <div className="flex-1 flex items-start gap-2">
                    <BsGlobe size={16} />
                    <div className="">
                      <p className="text-base font-medium leading-none">
                        Other payment methods
                      </p>
                      <p className="text-xs leading-none">
                        Opay, Card, ApplePay
                      </p>
                    </div>
                  </div>

                  <div className="">
                    <p className="text-xs">Coming Soon</p>
                  </div>
                </div>
              </div>

              <div className="w-full flex items-center justify-center mt-10">
                <button
                  disabled={orderLoading}
                  onClick={placeOrder}
                  className="bg-black text-base text-white rounded-md px-5 py-2 inline-flex items-center cursor-pointer"
                >
                  {orderLoading ? (
                    <LiaSpinnerSolid className="animate-spin" size={23} />
                  ) : (
                    "Place Order"
                  )}
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="w-full flex items-center justify-center mt-10">
              <button
                onClick={() => showModal(<LoginModal />)}
                className="bg-black text-base text-white rounded-md px-5 py-2 inline-flex items-center cursor-pointer"
              >
                Sign in to checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
