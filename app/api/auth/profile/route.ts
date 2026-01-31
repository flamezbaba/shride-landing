import { serverAxios } from "@/lib/serverAxios";
import { NextResponse } from "next/server";

export async function GET() {
  const api = serverAxios();
  try {
    const res = await api.get("/user/refresh");
    return NextResponse.json(res.data);
  } catch (err: any) {
    console.log(err);
    return NextResponse.json(null);
  }
}
