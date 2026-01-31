import axios from "axios";
import { cookies } from "next/headers";
import { apiUrl } from "./utils";

export async function serverFetch(path: string) {
  try {
    const token = cookies().get("usertoken")?.value;
    const baseUrl = apiUrl;

    // let userToken = "6804|o42GiZiyYQQSefPosRDRhpZQhNroXTXUMsNR8iSg4fc3d713"; //dev
    let userToken = "7457|k0WikZFjA9UuFBVWX3WgSDaayoQszXg3r83tl3Mta072e919"; //prod

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
