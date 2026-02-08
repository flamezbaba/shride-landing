"use client";

import { useShrideModal } from "@/hooks/useShrideModal";
import PickProductModal from "../modals/PickProductModal";
import Image from "next/image";

export default function Product({ product }: { product: any }) {
  const { showModal } = useShrideModal();

  const reorders = product.price?.toString().split("");
  const r = reorders?.[0] > 3 ? 2 : reorders?.[0];

  return (
    <div
      onClick={() => showModal(<PickProductModal productData={product} />)}
      className="min-h-[250px] ring-2 ring-gray-300 rounded-md px-2 py-2 cursor-pointer"
    >
      <div className="h-[160px] w-full rounded-md overflow-hidden relative">
        <Image
          src={product?.image_url}
          alt=""
          fill
          objectFit="cover"
          objectPosition="center"
          priority
        />
      </div>

      <div className="w-full flex md:flex-wrap gap-5 items-start justify-between mt-[15px]">
        <div className="">
          <p className="text-xl capitalize font-medium">{product?.name}</p>
          <p className="text-xs text-gray-600">{product?.description}</p>
          <p className="text-2xl font-medium mt-2">
            {" "}
            ₦{product?.price?.toLocaleString()}
          </p>
        </div>

        <div className="">
          <div className="">
            <p className="text-gray-600">{r}k+ reorders</p>
          </div>
        </div>
      </div>
    </div>
  );
}
