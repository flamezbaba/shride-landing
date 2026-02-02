export const mapBoxToken = "pk.eyJ1IjoicGVhY2VtYXJrIiwiYSI6ImNtZHlpd2VlYTAyZWgya3Bzamc2bHp5MzgifQ.fZiR6UPfCimt030XXnRAow";
export const googleApiKey = "AIzaSyAcqQhu0KYYlu5V7w9lDmnzSU4O7eKkijU";
export const sessionToken = "a33aa3156b09fdd3795171d1";
// export const apiUrl = "http://192.168.0.102/shride-laravel.test/api/v1";
export const apiUrl = "https://shrideapp.com.ng/api/v1";
// export const guestToken = "6804|o42GiZiyYQQSefPosRDRhpZQhNroXTXUMsNR8iSg4fc3d713"; //dev
export const guestToken = "7457|k0WikZFjA9UuFBVWX3WgSDaayoQszXg3r83tl3Mta072e919"; //prod

export const getAddressLabel = (addr: any) => {
  const arr = addr?.split(",");

  if (arr?.length > 0) {
    let ans = arr[0];
    if (arr[0]?.includes("+") || arr[0]?.length < 4) {
      ans = arr[1];
    }

    return ans?.trim();
  } else {
    return addr;
  }
};

export const shortenWords = (text: any, length: any) => {
  if (text && length) {
    if (text?.length > length) {
      return text.substring(0, length) + "...";
    }

    return text;
  }
};

export const getLoggedUser = (user: any) => {
  if (!user) {
    return null;
  }

  if (user?.uuid == "GUEST") {
    return null;
  }

  return user;
};