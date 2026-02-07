"use client";

import { useShrideModal } from "@/hooks/useShrideModal";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaDotCircle, FaRegDotCircle } from "react-icons/fa";
import WalletModal from "../modals/WalletModal";
import { BiPlusCircle, BiSolidPlusCircle, BiWallet } from "react-icons/bi";
import { useUserStore } from "@/store/user";
import { LiaSpinnerSolid } from "react-icons/lia";
import { getLoggedUser } from "@/lib/utils";
import { findMapBoxRoute } from "@/lib/requests";
import LoginModal from "../modals/LoginModal";
import SelectAddressModal from "../modals/SelectAddressModal";
import clsx from "clsx";
import SelectDeliverySizeModal from "../modals/SelectDeliverySizeModal";
import { HiLightningBolt } from "react-icons/hi";
import toast from "react-hot-toast";
import DeliveryDoneModal from "../modals/DeliveryDoneModal";

const CATEGORIES: any = [
  "gadget",
  "cloth",
  "jewelry",
  "book",
  "document",
  "rather not say",
  "others",
];

export default function ShrideDelivery() {
  const {
    cart,
    hasHydrated,
    clearStoreCart,
    user,
    setStoreCart,
    address: zusAddr,
  } = useUserStore();
  const { hideModal, showModal } = useShrideModal();

  const [deliveryMethod, setDeliveryMethod] = useState<"bike" | "trike">(
    "bike",
  );
  const [origin, setOrigin] = useState<any>(null);
  const [destination, setDestination] = useState<any>(null);
  const [pMobile, setpMobile] = useState<any>("");
  const [pName, setpName] = useState<any>("");
  const [pEmail, setpEmail] = useState<any>(null);
  const [orderLoading, setOrderLoading] = useState<boolean>(false);

  const [dMobile, setdMobile] = useState<any>("");
  const [dName, setdName] = useState<any>("");
  const [dEmail, setdEmail] = useState<any>(null);

  const [pkDesc, setpkDesc] = useState<any>(null);
  const [pkCategory, setpkCategory] = useState<any>("others");
  const [pkSize, setpkSize] = useState<any>("small");
  const [pkInstruction, setpkInstruction] = useState<any>(null);

  const [promoCode, setPromoCode] = useState<any>(null);
  const [promoCodeDetails, setPromoCodeDetails] = useState<any>(null);
  const [insuranceFee, setInsuranceFee] = useState<number>(0);

  const [wantExpress, setWantExpress] = useState<boolean>(false);
  const [wantSchedule, setWantSchedule] = useState<boolean>(false);
  const [bill, setBill] = useState<any>(null);
  const [distance, setDistance] = useState<any>(null);
  const [expressPercentage, setExpressPercentage] = useState<any>(0);
  const [saveLoading, setsaveLoading] = useState<boolean>(false);

  useEffect(() => {
    getExpressPercentage();
  }, []);

  useEffect(() => {
    getDeliveryFee();
  }, [pkSize, deliveryMethod]);

  useEffect(() => {
    // console.log("origin", origin);
    // console.log("destination", destination);
    if (!!origin?.address && !!destination?.address) {
      findDistance(origin, destination);
    }
  }, [origin, destination]);

  useEffect(() => {
    console.log("distance", distance);
    if (distance) {
      getDeliveryFee();
    }
  }, [distance]);

  const getExpressPercentage = async () => {
    const res = await axios.get("/api/settings?type=delivery_express_fee");

    if (!!res?.data) {
      setExpressPercentage(res?.data);
    }
  };

  const findDistance = async (org: any, des: any) => {
    const res = await findMapBoxRoute({
      originLat: org.latitude,
      originLng: org.longitude,
      destiLng: des.longitude,
      destiLat: des.latitude,
    });

    if (!!res) {
      setDistance(res?.distance);
    }
  };

  const handleInsurance = (_fee: any) => {
    if (_fee > 0) {
      setInsuranceFee(0);
    } else {
      const fee = ((10 / 100) * bill).toFixed(2);
      setInsuranceFee(parseFloat(fee));
    }
  };

  const handleDetails = (type: "p" | "d") => {
    if (type == "p") {
      setpName(loggedUser?.fullname || "");
      setpMobile(loggedUser?.mobile || "");
    }

    if (type == "d") {
      setdName(loggedUser?.fullname || "");
      setdMobile(loggedUser?.mobile || "");
    }
  };

  const getDeliveryFee = async () => {
    if (!!distance && !!pkSize && !!origin?.city && !!deliveryMethod) {
      const res = await axios.post("/api/delivery?type=calcBikeDeliveryPrice", {
        distance,
        package_size: pkSize,
        city: origin?.city,
        delivery_method: deliveryMethod,
      });

      console.log("getDeliveryFee", res.data);

      if (!!res?.data) {
        setBill(res?.data);
      }
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

    if (!pkSize) {
      toast.error("Select package size");
      return;
    }

    if (!pName || !pMobile || !dName || !dMobile) {
      toast.error("fill in sender and receiver information");
      return;
    }

    setOrderLoading(true);

    const res = await axios.post("/api/delivery?type=orderBikeDelivery", {
      origin: origin,
      destination: destination,
      distance: distance,
      amount: bill,
      sender_name: pName,
      sender_mobile: pMobile,
      sender_email: pEmail,
      recipent_name: dName,
      recipent_mobile: dMobile,
      recipent_email: dEmail,
      package_category: pkCategory,
      package_size: pkSize,
      description: pkDesc,
      instruction: pkInstruction,
      promoCodeDetails: promoCodeDetails,
      insurance: insuranceFee,
      expressFee: expressFee,
      deliveryMethod: deliveryMethod,
      image: "",
      // datetime: wantSchedule ? dateTime : null,
      datetime: null,
      city: destination?.city || "ibadan",
      state: destination?.state || "oyo",
    });

    console.log("placeOrder", res.data);

    setOrderLoading(false);

    if (!res?.data) {
      toast.error("Order Failed, try again.");
    } else {
      toast.success("Order Successful.");
      showModal(<DeliveryDoneModal trip={res.data} />);
    }
  };

  const saveAddress = async (adr: any) => {
    toast(
      (t) => (
        <div>
          <div className="px-20 text-center text-lg">
            <strong>Save Address</strong> <br /> Are you sure?
          </div>

          <div className="mt-10 flex items-center justify-center gap-6">
            <button
              className="text-sm font-semibold"
              onClick={() => {
                doSave();
                toast.dismiss(t.id);
              }}
            >
              Yes
            </button>
            <button
              className="text-sm font-semibold"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        style: {
          border: "1px solid var(--primary-color)",
          padding: "16px",
          color: "#00000",
        },
        iconTheme: {
          primary: "#000000",
          secondary: "#eee",
        },
        position: "top-center",
      },
    );

    async function doSave() {
      setsaveLoading(true);
      const res = await axios.post("/api/delivery?type=createAddress", {
        latitude: adr?.latitude,
        longitude: adr?.longitude,
        address: adr?.address,
        city: adr?.city,
        state: adr?.state,
        name: loggedUser?.fullname,
        mobile: loggedUser?.mobile,
      });

      toast.success("Address Saved!");
      setsaveLoading(false);
    }
  };

  const loggedUser = getLoggedUser(user);

  const subtotal = promoCodeDetails?.discount
    ? promoCodeDetails?.old_amount
    : bill;

  const expressFee = wantExpress ? (expressPercentage / 100) * subtotal : 0;

  const total = promoCodeDetails?.amount
    ? promoCodeDetails?.amount + insuranceFee + expressFee
    : bill + insuranceFee + expressFee;

  const remaining = total
    ? total - Number(user?.wallet_balance)
    : Number(total) - Number(user?.wallet_balance);
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-7/12 md:w-full">
        <div className="">
          <p className="text-3xl font-medium text-center">
            Send or receive an item
          </p>
          <p className="text-gray-500 text-center">
            A little more information to complete this delivery. <br />
            It won’t take long, we promise!
          </p>
        </div>

        <div className="mt-10 w-12/12">
          <div className="">
            <div className="my-input mb-4">
              <div className="my-input-group">
                <label className="imp">Pickup address</label>
                <div className="like-input">
                  <div
                    className="flex-1 min-h-[20px]"
                    onClick={() =>
                      showModal(
                        <SelectAddressModal
                          fnSelect={(e: any) => setOrigin(e)}
                          title="Pickup Address"
                        />,
                      )
                    }
                  >
                    {origin?.address}
                  </div>

                  {!!loggedUser && !!origin?.address && !saveLoading && (
                    <button
                      onClick={() => saveAddress(origin)}
                      className="text-xs font-medium inline-flex items-center gap-1"
                    >
                      <BiSolidPlusCircle size={17} className="text-green-500" />{" "}
                      <span className="md:hidden">save address</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="my-input mb-4">
              <div className="my-input-group">
                <label className="imp">Drop-off address</label>
                <div className="like-input">
                  <div
                    className="flex-1 min-h-[20px]"
                    onClick={() =>
                      showModal(
                        <SelectAddressModal
                          fnSelect={(e: any) => setDestination(e)}
                          title="Drop-off Address"
                        />,
                      )
                    }
                  >
                    {destination?.address}
                  </div>

                  {!!loggedUser && !!destination?.address && !saveLoading && (
                    <button
                      onClick={() => saveAddress(destination)}
                      className="text-xs font-medium inline-flex items-center gap-1"
                    >
                      <BiSolidPlusCircle size={17} className="text-green-500" />{" "}
                      <span className="md:hidden">save address</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-7">
            <div className="flex justify-between items-center">
              <p className="text-lg font-medium">Sender's Information</p>

              <div className="">
                <span
                  onClick={() => handleDetails("p")}
                  className="px-3 py-1 bg-[var(--primary-color-3)] text-[var(--primary-color)] rounded-full text-xs cursor-pointer select-none"
                >
                  use my details
                </span>
              </div>
            </div>

            <div className="flex justify-between gap-5 mt-2">
              <div className="my-input mb-3">
                <div className="my-input-group">
                  <label className="imp">Name</label>
                  <input
                    type="text"
                    className=""
                    value={pName}
                    onChange={(e: any) => setpName(e.target.value)}
                  />
                </div>
              </div>

              <div className="my-input mb-3">
                <div className="my-input-group">
                  <label className="imp">Phone Number</label>
                  <input
                    type="text"
                    className=""
                    value={pMobile}
                    onChange={(e: any) => setpMobile(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <div className="flex justify-between items-center">
              <p className="text-lg font-medium">Receiver's Information</p>

              <div className="">
                <span
                  onClick={() => handleDetails("d")}
                  className="px-3 py-1 bg-[var(--primary-color-3)] text-[var(--primary-color)] rounded-full text-xs cursor-pointer select-none"
                >
                  use my details
                </span>
              </div>
            </div>

            <div className="flex justify-between gap-5 mt-2">
              <div className="my-input mb-3">
                <div className="my-input-group">
                  <label className="imp">Name</label>
                  <input
                    type="text"
                    className=""
                    value={dName}
                    onChange={(e: any) => setdName(e.target.value)}
                  />
                </div>
              </div>

              <div className="my-input mb-3">
                <div className="my-input-group">
                  <label className="imp">Phone Number</label>
                  <input
                    type="text"
                    className=""
                    value={dMobile}
                    onChange={(e: any) => setdMobile(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <div className="flex justify-between items-center">
              <p className="text-lg font-medium">Package Details</p>
            </div>

            <div className="flex justify-between md:flex-col gap-5 md:gap-0 mt-2">
              <div className="my-input mb-3">
                <div className="my-input-group">
                  <label className="imp">Size</label>
                  {/* <select
                  className=""
                  onChange={(e: any) => setpkSize(e.target.value)}
                >
                  <option value="small">Bike Small</option>
                  <option value="medium">Bike Medium</option>
                  <option value="large">Bike Large</option>
                </select> */}
                  <div
                    className="like-input"
                    onClick={() =>
                      showModal(
                        <SelectDeliverySizeModal
                          type={deliveryMethod}
                          fnonSelect={setpkSize}
                          sz={pkSize}
                        />,
                      )
                    }
                  >
                    {deliveryMethod} {pkSize}
                  </div>
                </div>
                <p
                  onClick={() =>
                    setDeliveryMethod((p) => (p == "bike" ? "trike" : "bike"))
                  }
                  className="text-right mt-2 text-[var(--primary-color)] cursor-pointer select-none"
                >
                  Doesn't fit? switch to{" "}
                  <span>{deliveryMethod == "bike" ? "Trike" : "Bike"}</span>
                </p>
              </div>

              <div className="my-input mb-3">
                <div className="my-input-group">
                  <label className="">Instruction for driver</label>
                  <input
                    type="text"
                    className=""
                    onChange={(e: any) => setpkInstruction(e.target.value)}
                  />
                </div>

                <div className="md:mt-3">
                  <div className="flex w-full items-center justify-between gap-5">
                    <div className="flex items-center gap-2">
                      <p className="">I want Shride express</p>
                      <div className="w-[15px] h-[15px] bg-[var(--primary-color)] rounded-full inline-flex items-center justify-center">
                        <HiLightningBolt className="text-white" size={10} />
                      </div>
                    </div>

                    <div className="mt-2">
                      <label className="relative inline-flex cursor-pointer items-center">
                        {/* Hidden Checkbox */}
                        <input
                          type="checkbox"
                          checked={wantExpress}
                          onChange={() => setWantExpress(!wantExpress)}
                          className="peer sr-only"
                        />

                        {/* The Track (Background) */}
                        <div
                          className="h-6 w-10 rounded-full bg-gray-300 transition-colors duration-300 
           peer-checked:bg-[var(--primary-color)] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-orange-300"
                        ></div>

                        {/* The Knob (White Circle) */}
                        <div
                          className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-all duration-300 
           peer-checked:translate-x-4"
                        ></div>
                      </label>
                    </div>
                  </div>

                  <div className="px-4 py-3 text-xs rounded-lg bg-[var(--primary-color-3)] mt-1">
                    A fee will be charged for express delivery.
                    <br /> delivery in about 2 hours.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <div className="flex justify-between items-center">
              <p className="text-lg font-medium">Package Content</p>
            </div>

            <div className="flex items-center gap-5 md:gap-2 flex-wrap mt-3">
              {CATEGORIES.map((c: any, index: any) => (
                <div
                  onClick={() => setpkCategory(c)}
                  key={index}
                  className={clsx(
                    [
                      pkCategory == c
                        ? "bg-[var(--primary-color-3)]"
                        : "bg-gray-100",
                    ],
                    `px-4 py-1 rounded-full text-sm cursor-pointer`,
                  )}
                >
                  {c}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-7">
            <div className="w-full flex justify-between cursor-pointer items-center gap-10 ring-[1px] ring-gray-300 px-4 py-2 rounded-lg">
              <div className="">
                <p className="text-lg font-medium">Get package insurance</p>
                <p className="">
                  Use our insurance plan to protect your packages against any
                  incident. All items are insured up to 10,000 Naira.
                </p>
              </div>
              <div className="">
                {insuranceFee <= 0 ? (
                  <div
                    onClick={handleInsurance}
                    className="w-[15px] h-[15px] ring-2 rounded-full ring-black"
                  ></div>
                ) : (
                  <FaDotCircle
                    size={20}
                    onClick={() => setInsuranceFee(0)}
                    className="text-[var(--primary-color)]"
                  />
                )}
                {/* <FaRegDotCircle size={20} className="text-[var(--primary-color)]" /> */}
              </div>
            </div>
          </div>

          <div className="mt-5 px-4 py-3 bg-[var(--primary-color-3)] rounded-lg flex justify-between items-center gap-5">
            <p className="text-lg font-semibold text-[var(--primary-color)]">
              Delivery Fee
            </p>
            <p className="text-lg font-semibold text-[var(--primary-color)]">
              ₦{total?.toLocaleString()}
            </p>
          </div>

          <div className="mt-1">
            {!!loggedUser ? (
              <>
                <div className="w-full px-4 py-4 border-b-[1px] border-b-gray-300"></div>

                <div className="w-full px-4 pt-5">
                  <p className="font-semibold text-lg">Payment Method</p>

                  <div className="mt-3 space-y-7">
                    <div className="w-full flex items-center justify-between cursor-pointer gap-5">
                      <div
                        className="flex-1 flex items-start gap-2"
                        onClick={() => showModal(<WalletModal />)}
                      >
                        <BiWallet size={16} />
                        <div className="">
                          <p className="text-base font-medium leading-none">
                            Wallet
                          </p>
                          {remaining > 0 && (
                            <p className="text-xs mt-1 leading-none text-red-500">
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
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20px"
                          height="20px"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="#797676"
                            d="M16.5 12c0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2c0 .37-.03.73-.08 1.08c.69.1 1.33.32 1.92.64c.1-.56.16-1.13.16-1.72c0-5.5-4.5-10-10-10C6.47 2 2 6.5 2 12s4.5 10 10 10c.59 0 1.16-.06 1.72-.16A5.9 5.9 0 0 1 13 19c0-.29.03-.57.07-.85c-.32.63-.67 1.24-1.07 1.81c-.83-1.2-1.5-2.53-1.91-3.96h3.72a5.95 5.95 0 0 1 2.59-2.4c.06-.53.1-1.06.1-1.6M12 4.03c.83 1.2 1.5 2.54 1.91 3.97h-3.82c.41-1.43 1.08-2.77 1.91-3.97M4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2s.06 1.34.14 2zm.82 2H8c.35 1.25.8 2.45 1.4 3.56A8 8 0 0 1 5.08 16M8 8H5.08A7.92 7.92 0 0 1 9.4 4.44C8.8 5.55 8.35 6.75 8 8m6.34 6H9.66c-.1-.66-.16-1.32-.16-2s.06-1.35.16-2h4.68c.09.65.16 1.32.16 2s-.07 1.34-.16 2m.25-9.56c1.84.63 3.37 1.9 4.33 3.56h-2.95a15.7 15.7 0 0 0-1.38-3.56M23 18v2h-3v3h-2v-3h-3v-2h3v-3h2v3z"
                          ></path>
                        </svg>
                        <div className="">
                          <p className="text-base font-medium leading-none">
                            Other payment methods
                          </p>
                          <p className="text-xs leading-none mt-1">
                            Opay . Card . ApplePay
                          </p>
                        </div>
                      </div>

                      <div className="">
                        <p className="text-xs text-red-400">Coming Soon</p>
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
                    Sign in to place order
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
