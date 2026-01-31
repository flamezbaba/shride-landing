import axios from "axios";

export const apiWrapper = {
  get: request("GET"),
  post: request("POST"),
  put: request("PUT"),
  delete: request("DELETE"),
};

const baseUrl = process.env?.NEXT_PUBLIC_API_URL;

// console.log("baseUrl", baseUrl);

function request(method: any) {
  return async (url: any, body?: any) => {
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: authHeader(),
    };

    try {
      let response: any = {};
      switch (method) {
        case "POST":
          response = await axios.post(`${baseUrl}/${url}`, body, {
            headers: headers,
          });
          break;
        default:
          response = await axios.get(`${baseUrl}/${url}`, {
            headers: headers,
          });
          break;
      }

      return response;
    } catch (err: any) {
      let edata = err?.response?.data?.data;
      if (edata == "Unauthenticated" || edata == "unauthenticated") {
        // logoutAndRedirect();
      }
      throw new Error(err?.message);
    }
  };
}

export async function formRequest(url: any, formData: any) {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: authHeader(),
  };

  try {
    const response = await axios.post(`${baseUrl}/${url}`, formData, {
      headers: headers,
    });

    return response;
  } catch (err: any) {
    throw new Error(err.message);
  }
}

function authHeader() {

    let userToken = "6804|o42GiZiyYQQSefPosRDRhpZQhNroXTXUMsNR8iSg4fc3d713";

  // const isLoggedIn = !!userToken;
  // if (isLoggedIn) {
  return `Bearer ${userToken}`;
  // } else {
  //   return "";
  // }
}

export const reloadUser = async () => {
  try {
    const response = await apiWrapper.get(`user/refresh`, {});
    if (response.data.status) {
      let ruser = response.data.data;
      // console.log("done reloadUser", ruser);

      return ruser;
    }
  } catch (err) {
    return null;
  }
};
