import { serverAxios } from "@/lib/serverAxios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params?: Promise<{ id: any }> },
) {
  const searchParams = request.nextUrl.searchParams;

  const type = searchParams.get("type");

  if (type == "calcEatDeliveryPrice") {
    const res = await calcEatDeliveryPrice(request);

    return res;
  }

  if (type == "eatPlaceOrder") {
    const res = await eatPlaceOrder(request);

    return res;
  }

  if (type == "orderBikeDelivery") {
    const res = await orderBikeDelivery(request);

    return res;
  }

  if (type == "calcBikeDeliveryPrice") {
    const res = await calcBikeDeliveryPrice(request);

    return res;
  }

  if (type == "createAddress") {
    const res = await createAddress(request);

    return res;
  }

  if (type == "deleteAddress") {
    const res = await deleteAddress(request);

    return res;
  }

  if (type == "getTrip") {
    if (params) {
      const { id } = await params;

      const res = await getOrder(request, id);

      return res;
    }
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params?: Promise<{ id: any }> },
) {
  const searchParams = request.nextUrl.searchParams;

  const type = searchParams.get("type");

  if (type == "getOrderHistory") {
    const res = await getOrderHistory(request);

    return res;
  }

  if (type == "getTripHistory") {
    const res = await getTripHistory(request);

    return res;
  }

  if (type == "getFundingAccount") {
    const res = await getFundingAccount(request);

    return res;
  }

  if (type == "getUserAddresses") {
    const res = await getUserAddresses(request);

    return res;
  }

  if (type == "getOrder") {
    if (params) {
      const { id } = await params;

      const res = await getOrder(request, id);

      return res;
    }
  }

  if (type == "getEatHomepage") {
    const city = searchParams.get("city");
    const res = await getEatHomepage(request, city);

    return res;
  }

  if (type == "searchStores") {
    const city = searchParams.get("city");
    const query = searchParams.get("query");

    const res = await searchStores(request, city, query);

    return res;
  }
}

async function createAddress(request: NextRequest) {
  const api = serverAxios();
  try {
    const { latitude, longitude, address, city, state, name, mobile } =
      await request.json();

    const response = await api.post("user/create-address", {
      lat: latitude,
      lng: longitude,
      address: address,
      city,
      state,
      name,
      mobile,
    });

    if (response.data.status) {
      return NextResponse.json(response.data.data);
    } else {
      return NextResponse.json(null);
    }
  } catch (err: any) {
    return NextResponse.json(null);
  }
}

async function deleteAddress(request: NextRequest) {
  const api = serverAxios();
  try {
    const { aid } =
      await request.json();

    const response = await api.post("user/delete-address", {
      address_id: aid
    });

    if (response.data.status) {
      return NextResponse.json(response.data.data);
    } else {
      return NextResponse.json(null);
    }
  } catch (err: any) {
    return NextResponse.json(null);
  }
}


async function calcEatDeliveryPrice(request: NextRequest) {
  const api = serverAxios();
  try {
    const { distance, store_id } = await request.json();

    const response = await api.post("everyone/eat/calc-delivery-fee", {
      distance,
      store_id,
    });

    if (response.data.status) {
      return NextResponse.json(response.data.data);
    } else {
      return NextResponse.json(null);
    }
  } catch (err: any) {
    return NextResponse.json(null);
  }
}

async function eatPlaceOrder(request: NextRequest) {
  const api = serverAxios();

  try {
    const {
      store_id,
      orders,
      lat,
      lng,
      distance,
      address,
      subtotal,
      delivery_fee,
      service_fee,
      tip,
      store_note,
      rider_note,
      promo_code_details,
    } = await request.json();

    const response = await api.post("user/eat/place-order", {
      store_id,
      orders,
      lat,
      lng,
      distance,
      address,
      subtotal,
      delivery_fee,
      service_fee,
      tip,
      store_note,
      rider_note,
      promo_code_details,
    });

    if (response.data.status) {
      return NextResponse.json(response.data.data);
    } else {
      return NextResponse.json(null);
    }
  } catch (err: any) {
    return NextResponse.json(null);
  }
}

async function orderBikeDelivery(request: NextRequest) {
  const api = serverAxios();

  try {
    const {
      origin,
      destination,
      distance,
      amount,
      sender_name,
      sender_mobile,
      sender_email,
      recipent_name,
      recipent_mobile,
      recipent_email,
      package_category,
      package_size,
      description,
      instruction,
      promoCodeDetails,
      insurance,
      expressFee,
      deliveryMethod,
      image,
      datetime,
      city,
      state,
    } = await request.json();

    const response = await api.post("user/order/bike-delivery", {
      origin: {
        coordinate: {
          longitude: origin?.longitude,
          latitude: origin?.latitude,
        },
        main: null,
        secondary: null,
        address: origin?.address,
        city: origin?.city,
        state: origin?.state,
      },
      destination: {
        coordinate: {
          longitude: destination?.longitude,
          latitude: destination?.latitude,
        },
        main: null,
        secondary: null,
        address: destination?.address,
        city: destination?.city,
        state: destination?.state,
      },
      distance: distance,
      amount: amount,
      sender_name: sender_name,
      sender_mobile: sender_mobile,
      sender_email: sender_email,
      recipent_name: recipent_name,
      recipent_mobile: recipent_mobile,
      recipent_email: recipent_email,
      package_category: package_category,
      package_size: package_size,
      package_description: description,
      instruction: instruction,
      promo_code_details: promoCodeDetails,
      insurance: insurance,
      express: expressFee,
      delivery_method: deliveryMethod,
      image: image,
      datetime: datetime,
      city: city,
      state: state,
    });

    if (response.data.status) {
      return NextResponse.json(response.data.data);
    } else {
      return NextResponse.json(null);
    }
  } catch (err: any) {
    return NextResponse.json(null);
  }
}

async function calcBikeDeliveryPrice(request: NextRequest) {
  const api = serverAxios();

  try {
    const { distance, package_size, delivery_method, city } =
      await request.json();

    const response = await api.post("trip/calculate/bike-delivery", {
      distance,
      package_size,
      delivery_method,
      city,
    });

    if (response.data.status) {
      return NextResponse.json(response.data.data);
    } else {
      return NextResponse.json(null);
    }
  } catch (err: any) {
    return NextResponse.json(null);
  }
}

async function getOrderHistory(request: NextRequest) {
  const api = serverAxios();
  try {
    const response = await api.get("user/order/history");

    if (response.data.status) {
      return NextResponse.json(response.data.data);
    } else {
      return NextResponse.json([]);
    }
  } catch (err: any) {
    return NextResponse.json([]);
  }
}

async function getTripHistory(request: NextRequest) {
  const api = serverAxios();
  try {
    const response = await api.get("user/trip/history");

    if (response.data.status) {
      return NextResponse.json(response.data.data);
    } else {
      return NextResponse.json([]);
    }
  } catch (err: any) {
    return NextResponse.json([]);
  }
}

async function getOrder(request: NextRequest, id: any) {
  const api = serverAxios();
  try {
    const response = await api.get(`user/get-order/${id}`);

    if (response.data.status) {
      return NextResponse.json(response.data.data);
    } else {
      return NextResponse.json([]);
    }
  } catch (err: any) {
    return NextResponse.json([]);
  }
}

async function getFundingAccount(request: NextRequest) {
  const api = serverAxios();
  try {
    const response = await api.get("user/virtual_account");

    if (response.data.status) {
      return NextResponse.json(response.data.data);
    } else {
      return NextResponse.json(null);
    }
  } catch (err: any) {
    return NextResponse.json(null);
  }
}

async function getEatHomepage(request: NextRequest, city: any) {
  const api = serverAxios();
  try {
    const response = await api.get(`web/get-eat-homepage-list?city=${city}`);

    if (response.data.status) {
      return NextResponse.json(response.data.data);
    } else {
      return NextResponse.json(null);
    }
  } catch (err: any) {
    return NextResponse.json(null);
  }
}

async function getUserAddresses(request: NextRequest) {
  const api = serverAxios();
  try {
    const response = await api.get("user/get-all-address");

    if (response.data.status) {
      return NextResponse.json(response.data.data);
    } else {
      return NextResponse.json([]);
    }
  } catch (err: any) {
    return NextResponse.json([]);
  }
}

async function searchStores(request: NextRequest, city: any, query: any) {
  const api = serverAxios();
  try {
    const response = await api.get(`web/search-new/${query}?city=${city}`);

    if (response.data.status) {
      return NextResponse.json(response.data.data);
    } else {
      return NextResponse.json(null);
    }
  } catch (err: any) {
    return NextResponse.json(null);
  }
}

async function getTrip(request: NextRequest, id: any) {
  const api = serverAxios();
  try {
    const response = await api.post(`trip/${id}`);

    if (response.data.status) {
      return NextResponse.json(response.data.data);
    } else {
      return NextResponse.json(null);
    }
  } catch (err: any) {
    return NextResponse.json(null);
  }
}
