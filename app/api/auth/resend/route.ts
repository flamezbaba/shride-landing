import { serverAxios } from "@/lib/serverAxios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const api = serverAxios();
  try {
    const { email, otp } = await request.json();

    const response = await api.post("send-user-otp", {
      email: email,
    });

    if (response.data.status) {
      return NextResponse.json(response.data.data);
    } else {
      return NextResponse.json({ error: response.data.data });
    }
  } catch (err: any) {
    return NextResponse.json(null);
  }
}
