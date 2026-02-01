import axios from "axios";
import { cookies } from "next/headers";
import { apiUrl, guestToken } from "./utils";

export async function serverFetch(path: string) {
  try {
    const token = cookies().get("usertoken")?.value;
    const baseUrl = apiUrl;

    let userToken = guestToken;

    if (token) {
      userToken = token;
    }

    // console.log("serverFetch", token);

    const res = await fetch(`${baseUrl}/${path}`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
      // cache: "no-store",
    });

    const data = await res.json();

    // if (!res.ok) throw new Error("Failed to fetch");

    if (!res.ok) {
      const e = { error: data?.data || null };
      return null;
    }

    // console.log("res", data);

    return data?.data;
  } catch (e: any) {
    return null;
  }
}
