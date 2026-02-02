import { serverAxios } from "@/lib/serverAxios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
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
