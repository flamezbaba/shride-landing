"use client";

import { useShrideModal } from "@/hooks/useShrideModal";
import Image from "next/image";

import { FC, useEffect, useState } from "react";
import {
  IoAddCircleOutline,
  IoCloseSharp,
  IoRemoveCircleOutline,
} from "react-icons/io5";

import pluralize from "pluralize";

import { LuLoader2 } from "react-icons/lu";
import StoreTotalFloater from "../eats/StoreTotalFloater";
import { useUserStore } from "@/store/user";
import toast from "react-hot-toast";
import axios from "axios";

const PickProductModal: FC<{ productData: any }> = ({ productData }) => {
  const { hideModal } = useShrideModal();

  const { cart, hasHydrated, setStoreCart, user } = useUserStore();

  const [modifiers, setModifiers] = useState<any[]>([]);
  const [added, setAdded] = useState<boolean>(false);
  const [apiProduct, setApiProduct] = useState<any>(null);
  const [product, setProduct] = useState<any>({
    id: null,
    name: null,
    image_url: null,
    quantity: 1,
    price: 0,
    price_category: 0,
    totalAmount: 0,
  });

  useEffect(() => {
    // console.log("productData", productData);
    getApiProduct(productData?.id);
  }, [productData]);

  if (!hasHydrated) return null;

  const getApiProduct = async (id: any) => {
    try {
      const res = await axios.get(`/api/products/${id}`);

      // console.log("getApiProduct", res.)

      if (!!res?.data) {
        setApiProduct(res.data);
        setAllFresh(res.data);
      } else {
        hideModal();
      }
    } catch (e) {
      toast.error("cant load the product.");
      hideModal();
    }
  };

  const getReqText = (item: any) => {
    if (item?.min_selection > 0) {
      return "required";
    } else {
      return "optional";
    }
  };

  const getOptionText = (item: any) => {
    let req = "optional";
    if (item?.min_selection > 0) {
      req = "required";
    }

    if (item?.min_selection >= 0 && item?.max_selection == 0) {
      return "Choose as many as you like";
    }

    if (item?.min_selection == item?.max_selection) {
      return "Choose only " + item?.max_selection;
    }

    if (item?.min_selection >= 0 && item?.max_selection > 0) {
      return "Choose up to " + item?.max_selection;
    }
  };

  function setAllFresh(productData: any) {
    if (productData?.id) {
      setProduct({
        id: productData.id,
        name: productData?.name,
        image_url: productData?.image_url,
        quantity: 1,
        price: productData?.price,
        price_category: productData?.price_category,
        totalAmount: productData?.price,
      });

      if (productData?.modifiers?.length > 0) {
        setModifiers(
          productData?.modifiers
            ?.filter((f: any) => f.items?.length > 0)
            ?.map((mp: any) => {
              mp?.items?.map((it: any) => {
                it.product.selected = false;
                it.product.quantity = 0;
                it.product.totalAmount = 0;

                return it;
              });

              return mp;
            }),
        );
      }
    }
  }

  const handleProductIncrease = () => {
    const qty = product.quantity + 1;
    const totalAmount = product.price * qty;
    setProduct({ ...product, quantity: qty, totalAmount: totalAmount });
    setAdded(false);
  };

  const handleProductDecrease = () => {
    if (product?.quantity > 1) {
      const qty = product.quantity - 1;
      const totalAmount = product.price * qty;

      setProduct({ ...product, quantity: qty, totalAmount: totalAmount });
      setAdded(false);
    }
  };

  const handleItemIncrease = (mindex: any, itemIndex: any) => {
    setModifiers((prev) =>
      prev.map((m, index) => {
        if (index != mindex) return m;

        return {
          ...m,
          items: m.items.map((it: any, i: any) => {
            if (i !== itemIndex) return it;

            const qty = it.product.quantity + 1;
            return {
              ...it,
              product: {
                ...it.product,
                quantity: qty,
                totalAmount: it.product.price * qty,
              },
            };
          }),
        };
      }),
    );

    setAdded(false);
  };

  const handleItemDecrease = (mindex: any, itemIndex: any) => {
    setModifiers((prev) =>
      prev.map((m, index) => {
        if (index != mindex) return m;

        return {
          ...m,
          items: m.items.map((it: any, i: any) => {
            if (i !== itemIndex) return it;

            let qty = it.product.quantity;
            let totalAmount = it.product.price;

            if (it.product.price > 0) {
              if (it.product.quantity > 1) {
                qty = it.product.quantity - 1;
                totalAmount = it.product.price * qty;
              } else {
              }
            }

            return {
              ...it,
              product: {
                ...it.product,
                quantity: qty,
                totalAmount: totalAmount,
              },
            };
          }),
        };
      }),
    );

    setAdded(false);
  };

  const handleToggleItem = (mindex: any, itemIndex: any) => {
    setModifiers((prev) =>
      prev.map((m, index) => {
        if (index !== mindex) return m;

        return {
          ...m,
          items: m.items.map((it: any, i: any) => {
            if (i !== itemIndex) return it;

            const selected = !it.product.selected;

            return {
              ...it,
              product: {
                ...it.product,
                selected,
                quantity: selected ? 1 : 0,
                totalAmount: selected ? it.product.price : 0,
              },
            };
          }),
        };
      }),
    );

    setAdded(false);
  };

  const addToCart = () => {
    // check all required is picked
    const tobecheked = modifiers?.filter((f) => f?.min_selection > 0);
    let allowed = true;
    if (tobecheked.length > 0) {
      tobecheked.forEach((ch: any) => {
        // all selected using modifier id id
        const allSelected =
          pickedItems?.filter((f) => f?.product_modifier_id == ch?.id) || [];
        if (allSelected?.length < ch?.min_selection) {
          allowed = false;
          toast.error(ch?.title + " is required");
          return;
        }

        if (allSelected?.length > ch?.max_selection && ch?.max_selection != 0) {
          allowed = false;
          toast.error(
            ch?.title +
              ": only maximum of " +
              ch?.max_selection +
              " is required",
          );
          return;
        }
      });
    }

    if (allowed) {
      // add to cart

      // get store
      const storePos = cart.find(
        (s: any) => s?.store_id == apiProduct?.store?.id,
      );

      // const pd = pickedItems?.flatMap((x) => x.product);
      const pd = pickedItems?.map((x) => {
        return {
          id: x?.product?.id,
          image_url: x?.product?.image_url,
          name: x?.product?.name,
          price: x?.product?.price,
          price_category: x?.product?.price_category,
          quantity: x?.product?.quantity,
          totalAmount: x?.product?.totalAmount,
        };
      });
      // console.log('pd', pd);
      // return;

      if (storePos) {
        const newCart = cart.map((ct: any, index: any) => {
          if (ct?.store_id == apiProduct?.store?.id) {
            ct.carts = [...ct.carts, [product, ...pd]];
          }

          return ct;
        });

        setStoreCart(newCart);
      } else {
        const entry = {
          store_id: apiProduct?.store?.id,
          store_name: apiProduct?.store?.name,
          logo: apiProduct?.store?.logo,
          carts: [[product, ...pd]],
        };

        const newCart = [...cart, entry];

        setStoreCart(newCart);
      }

      toast.success("Added to cart");

      setAdded(true);
      hideModal();
      // getApiProduct(productData?.id);
      // router.push({
      //   pathname: ROUTES.VIEW_STORE,
      //   params: { store_id: productData?.store?.id },
      // });
    }
  };

  const pickedModifiers =
    modifiers?.filter((m: any) =>
      m.items?.find((i: any) => i.product?.selected == true),
    ) || [];

  const pickedItemsFlat = pickedModifiers?.map((p) => p?.items)?.flat() || [];
  const pickedItems = pickedItemsFlat?.filter(
    (p) => p?.product?.quantity > 0 && p?.product?.selected == true,
  );

  const pickedTotalAmount =
    pickedItems?.reduce((acc: any, current: any) => {
      return current?.product?.totalAmount + acc;
    }, 0) || 0;

  const totalAmount = product?.totalAmount + pickedTotalAmount;

  return (
    <>
      {!apiProduct ? (
        <div
          className="bg-white md:mt-[10%] w-[600px] h-[300px] md:w-[90%] shadow-lg border-1
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
        border-gray-200 rounded-lg relative"
        >
          <div className="h-[130px] rounded-tr-lg rounded-tl-lg  w-full relative overflow-hidden">
            <Image
              src={product?.image_url}
              alt=""
              placeholder="blur"
              fill
              objectFit="cover"
              objectPosition="center"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOsa2yqBwAFCAICLICSyQAAAABJRU5ErkJggg=="
            />

            <div
              onClick={() => hideModal()}
              className="absolute top-3 right-3 h-[30px] w-[30px] bg-black rounded-full flex items-center justify-center cursor-pointer"
            >
              <IoCloseSharp size={18} className="text-white" />
            </div>
          </div>

          {/* add to cart */}
          <div className="absolute left-0 bottom-6 w-full flex items-center justify-center cursor-pointer">
            {added ? (
              <StoreTotalFloater storeID={apiProduct?.store?.id} />
            ) : (
              <div
                onClick={() => addToCart()}
                className="bg-black py-3 px-4 flex items-center justify-center gap-10 rounded-md"
              >
                <p className="text-white text-sm">Add to Cart</p>
                <p className="text-white text-sm">
                  ₦ {totalAmount?.toLocaleString()}
                </p>
              </div>
            )}
          </div>
          {/* add to cart */}

          <div className="w-full px-4 mt-3 border-b-4 border-b-gray-100 pb-4">
            <p className="font-medium text-xl md:text-base capitalize">{product?.name}</p>
            <p className="text-xs">{product?.description}</p>

            <div className="w-full flex items-center justify-between">
              <p className="text-lg">
                From ₦{product?.price?.toLocaleString()}
              </p>

              <div className="flex items-center gap-2">
                <IoRemoveCircleOutline
                  className="cursor-pointer"
                  size={25}
                  onClick={handleProductDecrease}
                />
                <p className="text-base font-medium">
                  {product?.quantity}{" "}
                  {product?.price_category
                    ? pluralize(product?.price_category, product?.quantity)
                    : ""}
                </p>
                <IoAddCircleOutline
                  className="cursor-pointer"
                  size={25}
                  onClick={handleProductIncrease}
                />
              </div>
            </div>
          </div>

          <div className="py-3 px-4 pb-20 w-full">
            {modifiers?.map((m: any, index: any) => (
              <div
                className="py-4 w-full border-b-4 border-b-gray-100 last:border-none"
                key={index}
              >
                <div className="w-full flex items-start justify-between">
                  <div className="">
                    <p className="capitalize font-medium text-base leading-tight">
                      {m?.title}
                    </p>
                    <p className="text-xs leading-none">{getOptionText(m)}</p>
                  </div>

                  {getReqText(m) == "required" ? (
                    <div className="ring-[1px] ring-red-400 px-4 py-1 rounded-md">
                      <p className="text-xs capitalize text-red-600 ">
                        {getReqText(m)}
                      </p>
                    </div>
                  ) : (
                    <div className="ring-[1px] ring-gray-400 px-4 py-1 rounded-md">
                      <p className="text-xs capitalize ">
                        {getReqText(m)}
                      </p>
                    </div>
                  )}
                </div>

                <div className="">
                  {m?.items?.map((mp: any, mpindex: any) => (
                    <div
                      className="w-full flex items-center gap-2 justify-between py-4"
                      key={mpindex}
                    >
                      {mp?.product?.selected == true ? (
                        <div
                          className="w-[13px] h-[13px] bg-gray-700 ring-2 ring-gray-700 rounded-full cursor-pointer"
                          onClick={() => handleToggleItem(index, mpindex)}
                        ></div>
                      ) : (
                        <div
                          className="w-[13px] h-[13px] ring-2 ring-gray-700 rounded-full cursor-pointer"
                          onClick={() => handleToggleItem(index, mpindex)}
                        ></div>
                      )}
                      <div
                        className="flex-1 cursor-pointer"
                        onClick={() => handleToggleItem(index, mpindex)}
                      >
                        <p className="capitalize">
                          {mp?.product?.name} {mp?.product?.selected}
                        </p>
                      </div>

                      <div className="">
                        {mp?.product?.selected == true ? (
                          <>
                            <div className="flex items-center gap-2">
                              <IoRemoveCircleOutline
                                className="cursor-pointer"
                                size={25}
                                onClick={() =>
                                  handleItemDecrease(index, mpindex)
                                }
                              />
                              <p className="text-base font-medium">
                                {mp?.product?.quantity}{" "}
                              </p>
                              <IoAddCircleOutline
                                className="cursor-pointer"
                                size={25}
                                onClick={() =>
                                  handleItemIncrease(index, mpindex)
                                }
                              />
                            </div>
                          </>
                        ) : (
                          <p className="">
                            {mp?.product?.price > 0
                              ? `₦ ${mp?.product?.price}`
                              : " "}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default PickProductModal;
