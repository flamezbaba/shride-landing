import { useUserStore } from "@/store/user";

export default function StoreTotalFloater({ storeID }: { storeID: any }) {
  const cart = useUserStore((state: any) => state.cart);

  const storePos = cart.find((s: any) => s?.store_id == storeID);
  const cartsFlat = storePos?.carts?.flat() || [];

  const subTotal = cartsFlat.reduce((acc: any, current: any) => {
    return current?.totalAmount + acc;
  }, 0);
  return (
    <>
    <div className="">
      <p className="">{subTotal}</p>
    </div>
      {subTotal > 0 ? (
        <div className="bg-black py-3 px-4 flex items-center justify-center gap-10 rounded-md">
          <p className="text-white text-sm">View Cart</p>
          <p className="text-white text-sm">
            ₦ {subTotal?.toLocaleString()}
          </p>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
