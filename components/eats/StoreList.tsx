"use client";

import { useShrideModal } from "@/hooks/useShrideModal";
import AddressModal from "../modals/AddressModal";

export default function StoreList() {
  

  const {showModal} = useShrideModal();

  const openModal = (ok: any) => {
    console.log(ok);
    showModal(<AddressModal />);
  }
  // const response = await api.get('/stores');
  // const stores = response.data;

  // await new Promise((resolve) => setTimeout(resolve, 3000));
  return (
    <div className="w-full flex items-center gap-10">
      <div onClick={() => openModal("ok working")} className="w-[500px] h-[250px] ring-2 ring-gray-300 rounded-md px-2 py-2">
        <div className="h-[170px] w-full rounded-md overflow-hidden">
          <img
            src="https://cloud.shrideapp.com/store-logos/3M1PFA6sTioFRoppaAolUHMncrfP0DnYDYXtgHtZ.png"
            alt=""
            className="object-cover h-full w-full"
          />
        </div>

        <div className="w-full flex items-center justify-between mt-[15px]">
          <div className="">
            <p className="text-2xl font-medium">Chicken Republic</p>
          </div>

          <div className="">
            <p className="">4.7(12k)</p>
          </div>
        </div>
      </div>
    </div>
  );
}