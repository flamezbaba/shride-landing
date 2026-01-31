import axios from "axios";
import { cookies } from "next/headers";
import { apiUrl } from "./utils";

export function serverAxios() {
  const token = cookies().get("usertoken")?.value;
  const baseUrl = apiUrl;

  // console.log("token server axios", token);

  // let userToken = "6804|o42GiZiyYQQSefPosRDRhpZQhNroXTXUMsNR8iSg4fc3d713"; //dev
  let userToken = "7457|k0WikZFjA9UuFBVWX3WgSDaayoQszXg3r83tl3Mta072e919"; //prod
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
