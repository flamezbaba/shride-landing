import { serverAxios } from "@/lib/serverAxios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const api = serverAxios();

  const type = searchParams.get("type");

  try {
    const response = await api.get(`utils/get-settings-value/${type}`);

    if (response.data.status) {
      return NextResponse.json(response.data.data);
    } else {
      return NextResponse.json(null);
    }
  } catch (err: any) {
    return NextResponse.json(null);
  }
}
