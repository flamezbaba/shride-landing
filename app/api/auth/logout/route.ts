import { serverAxios } from "@/lib/serverAxios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const api = serverAxios();
  try {
    const cookieStore = cookies();
    cookieStore.delete("usertoken");

    return NextResponse.json('done');
  } catch (err: any) {
    return NextResponse.json('failed');
  }
}
