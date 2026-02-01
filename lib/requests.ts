import axios from "axios";
import { googleApiKey, mapBoxToken, sessionToken } from "./utils";

// const mapBoxToken = process.env?.NEXT_PUBLIC_MP_BOX_TOKEN;
// const googleApiKey = process.env?.NEXT_PUBLIC_GOOGLE_API_KEY;
// const sessionToken = process.env?.NEXT_PUBLIC_SESSION_TOKEN;



class My200Error extends Error {
  constructor(message: any) {
    super(message);
  }
}

function handleError(e: any) {
  console.log(e.message);

  return null;
  // if (e.response?.status === 401) {
  //   throw e;
  // }

  // if (e instanceof My200Error) {
  //   throw e.message;
  // }

  // throw "Failed request.ts";
}

function handleApiFalse(data: any) {
  // throw new My200Error(data);

  return null;
}

// export const login = async (data: { email: string; password: string }) => {
//   try {
//     const response = await apiWrapper.post("login", {
//       email: data.email,
//       password: data.password,
//       type: "user",
//       device_name: "Web Browser",
//     });

//     if (response.data.status) {
//       // useAuthStore.setState({
//       //   user: response.data.data,
//       //   token: response.data.token,
//       // });

//       return response.data;
//     } else {
//       handleApiFalse(response.data.data);
//     }
//   } catch (e: any) {
//     handleError(e);
//   }
// };

export const getEatHomepage = () => {
  return "web/get-eat-homepage-list";
  // try {
  //   const response = await apiWrapper.get(`web/get-eat-homepage-list`);

  //   if (response.data.status) {
  //     return response?.data?.data;
  //   } else {
  //     return null;
  //   }
  // } catch (e: any) {
  //   handleError(e);
  // }
};

export const getStore = (id: any) => {
  return `everyone/get-store/${id}`;
  // try {
  //   const response = await apiWrapper.get(`everyone/get-store/${id}`);

  //   if (response.data.status) {
  //     return response.data.data;
  //   } else {
  //     return null;
  //   }
  // } catch (e: any) {
  //   handleError(e);
  // }
};

export const getReloadUser = () => {
  return "user/refresh";
};
export const getStoreMenuAndProducts = (id: any) => {
  return `everyone/get-store-menu-and-products/${id}`;
  // try {
  //   const response = await apiWrapper.get(
  //     `everyone/get-store-menu-and-products/${id}`,
  //   );

  //   if (response.data.status) {
  //     return response.data.data;
  //   } else {
  //     return [];
  //   }
  // } catch (e: any) {
  //   handleError(e);
  // }
};

export const getProduct = (id: any) => {
  return `everyone/get-product/${id}`;

  // try {
  //   const response = await apiWrapper.get(`everyone/get-product/${id}`);

  //   if (response.data.status) {
  //     return response.data.data;
  //   } else {
  //     return null;
  //   }
  // } catch (e: any) {
  //   handleError(e);
  // }
};

export const getSettingsValue = (type: any) => {
  return `utils/get-settings-value/${type}`;

  // try {
  //   const response = await apiWrapper.get(`utils/get-settings-value/${type}`);

  //   if (response.data.status) {
  //     return response.data.data;
  //   } else {
  //     return null;
  //   }
  // } catch (e: any) {
  //   handleError(e);
  // }
};

export const getFaaji = () => {
  return `utils/get/faaji`;

  // try {
  //   const response = await apiWrapper.get(`utils/get/faaji`);

  //   if (response.data.status) {
  //     return response.data.data;
  //   } else {
  //     return null;
  //   }
  // } catch (e: any) {
  //   handleError(e);
  // }
};

export async function findMapBoxRoute({
  originLng,
  originLat,
  destiLng,
  destiLat,
  stopLng,
  stopLat,
}: {
  originLng?: any;
  originLat?: any;
  destiLng?: any;
  destiLat?: any;
  stopLng?: any;
  stopLat?: any;
}) {
  let coords = `${originLng},${originLat};${destiLng},${destiLat}`;
  if (stopLng && stopLat) {
    coords = `${originLng},${originLat};${destiLng},${destiLat};${stopLng},${stopLat}`;
  }
  const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${coords}?geometries=geojson&access_token=${mapBoxToken}`;
  const res = await axios.get(url);

  // console.log("findMapBoxRoute", res.data);

  if (res?.data) {
    const json = res.data;

    if (json?.routes && json?.routes.length) {
      const routeData = json.routes[0];
      const dst = (routeData.distance / 1000).toFixed(2);

      const r = {
        routes: routeData?.geometry,
        distance: Number(dst),
        duration: Math.ceil(routeData.duration / 60),
      };

      return r;
    }
  }

  return null;
}

export const getPlaces = async (lat: any, lng: any) => {
  try {
    // console.log("getting place started");
    const res = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?&latlng=${lat},${lng}&key=${googleApiKey}`,
    );

    if (res.data?.results[0]) {
      // console.log('getting place reached');
      const full = res.data?.results[0];

      const tk = extraStateCityAddrFromGoogleComponent(full);

      // console.log("getting place ended", tk);

      return tk;
    }
  } catch (e) {
    return null;
  }
};

export const extraStateCityAddrFromGoogleComponent = (full: any) => {
  // console.log("extraStateCityAddrFromGoogleComponent", full);

  try {
    let state = "";
    let city = "";

    var stateArr = full.address_components?.filter((i: any) =>
      i.types?.includes("administrative_area_level_1"),
    );

    if (stateArr?.length > 0) {
      state = stateArr[0]?.long_name || stateArr[0]?.longText;
    }

    var cityArr = full.address_components?.filter((i: any) =>
      i.types?.includes("locality"),
    );
    if (cityArr?.length > 0) {
      city = cityArr[0]?.long_name || cityArr[0]?.longText;
    }

    const tk = {
      state: state,
      city: city,
      address: full.formatted_address,
    };

    return tk;
  } catch (e) {
    // console.log("Err", e);
    return null;
  }
};

export async function searchPlaces(searchText: string, lat: any, lng: any) {
  const response = await axios.post(
    "https://places.googleapis.com/v1/places:autocomplete",
    {
      input: searchText,
      sessionToken: sessionToken,
      regionCode: "NG",
      locationBias: {
        circle: {
          center: {
            latitude: lat,
            longitude: lng,
          },
          radius: 5000,
        },
      },
    },
    {
      headers: {
        "X-Goog-Api-Key": googleApiKey,
      },
    },
  );

  if (response?.data?.suggestions) {
    const suggs = response?.data?.suggestions;

    const rs = suggs.map((r: any) => {
      const p = r?.placePrediction;
      return {
        place: p?.place,
        placeId: p?.placeId,
        text: p?.text?.text,
      };
    });

    return rs;
  }

  return [];
}

export async function getPlaceViaPlaceID(place: any) {
  const response = await axios.get(
    `https://places.googleapis.com/v1/places/${place?.placeId}?key=${googleApiKey}&sessionToken=${sessionToken}&fields=addressComponents,id,displayName,location`,
  );

  // console.log("getPlace", response?.data);

  if (response?.data?.location) {
    const c = response?.data?.location;

    const full = {
      address_components: response?.data?.addressComponents,
      formatted_address: place?.text,
    };
    const p = extraStateCityAddrFromGoogleComponent(full);

    return {
      state: p?.state,
      city: p?.city,
      address: p?.address,
      latitude: c?.latitude,
      longitude: c?.longitude,
    };
  }

  return null;
}


async function getNigerianLocation(lat: any, lon: any) {
    // Zoom 10 is the "sweet spot" for City/State level in Nigeria
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`;

    try {
        const response = await fetch(url, {
            headers: { 'User-Agent': 'YourAppName/1.0' }
        });
        const data = await response.json();
        const addr = data.address;

        // 1. Get the State (Reliable in OSM for Nigeria)
        const state = addr.state || addr.region;

        // 2. Get the City/Local Govt (The "Locality" equivalent)
        // In Nigeria, 'city' might be empty, so check 'town' or 'county' (LGA)
        const city = addr.city || addr.town || addr.village || addr.county || addr.state_district;

        return {
            full_address: data.display_name,
            state: state ? state.replace(' State', '') : 'Unknown', // Cleans "Lagos State" to "Lagos"
            city: city || 'Unknown'
        };
    } catch (error) {
        console.error("OSM Lookup failed", error);
    }
}
