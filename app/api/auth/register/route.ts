import { serverAxios } from "@/lib/serverAxios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const api = serverAxios();
  try {
    const { firstname, email, mobile, password } = await request.json();

    const response = await api.post("register/user", {
      firstname: firstname,
      lastname: "",
      mobile: mobile,
      email: email,
      password: password,
      type: "user",
      device_name: "Web Browser",
    });

    if (response.data.status) {
      const cookieStore = cookies();
      cookieStore.set("usertoken", response.data.token, {
        httpOnly: true, // Prevents JS from reading the cookie (XSS protection)
        // secure: process.env.NODE_ENV === "production",
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30 * 6,
      });

      return NextResponse.json(response.data.data);
    } else {
      return NextResponse.json({ error: response.data.data });
    }
  } catch (err: any) {
    console.log(err.status);
    // return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    return NextResponse.json(null);
  }
}
