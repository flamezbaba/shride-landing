import { serverAxios } from "@/lib/serverAxios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const type = searchParams.get("type");
}

export async function GET(
  request: NextRequest,
  { params }: { params?: Promise<{ id: any }> },
) {
  const searchParams = request.nextUrl.searchParams;

  const type = searchParams.get("type");

  if (type == "getAllStoresPaginate") {
    const city = searchParams.get("city");
    const page = searchParams.get("page");

    const res = await getAllStoresPaginate(request, city, page);

    return res;
  }
}

async function getAllStoresPaginate(
  request: NextRequest,
  city: any,
  page: any,
) {
  const api = serverAxios();
  try {
    const response = await api.get(
      `web/get-all-stores-paginated?city=${city}&page=${page}`,
    );

    if (response.data.status) {
      return NextResponse.json(response.data);
    } else {
      return NextResponse.json(null);
    }
  } catch (err: any) {
    return NextResponse.json(null);
  }
}
