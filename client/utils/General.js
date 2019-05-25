import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const getDistance = (
  { lat: lat1, lng: lng1 },
  { lat: lat2, lng: lng2 },
  unit = "M"
) => {
  if (lat1 == lat2 && lng1 == lng2) return 0;
  const radlat1 = (Math.PI * lat1) / 180;
  const radlat2 = (Math.PI * lat2) / 180;
  const theta = lng1 - lng2;
  const radtheta = (Math.PI * theta) / 180;
  let dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);

  if (dist > 1) dist = 1;
  dist = Math.acos(dist);
  dist *= 180 / Math.PI;
  dist *= 60 * 1.1515;
  if (unit == "K") {
    dist *= 1.609344;
  } // Kilometres
  if (unit == "N") {
    dist *= 0.8684;
  } // Nautical
  return dist;
};
