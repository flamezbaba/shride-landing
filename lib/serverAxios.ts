import axios from "axios";
import { cookies } from "next/headers";
import { apiUrl, guestToken } from "./utils";

export function serverAxios() {
  const token = cookies().get("usertoken")?.value;
  const baseUrl = apiUrl;

  let userToken = guestToken;
  if (token) {
    userToken = token;
  }

  // console.log("serverAxios", userToken);

  return axios.create({
    baseURL: baseUrl,
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
}
