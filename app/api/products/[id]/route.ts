import { getProduct } from "@/lib/requests";
import { serverAxios } from "@/lib/serverAxios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

//   return NextResponse.json(id);
  const api = serverAxios();
  try {
    const response = await api.get(getProduct(id));

    if (response.data.status) {
      return NextResponse.json(response.data.data);
    } else {
      return NextResponse.json(null);
    }
  } catch (err: any) {
    console.log(err.status);
    return NextResponse.json(null);
  }
}
