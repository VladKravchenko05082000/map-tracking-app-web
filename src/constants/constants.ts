import { Icon } from "leaflet";

const blackPin = new Icon({
  iconUrl: "/static/black-pin.png",
  iconSize: [24, 24], // size of the icon
  iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});
const redPin = new Icon({
  iconUrl: "/static/red-pin.png",
  iconSize: [24, 24], // size of the icon
  iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});

export const REGEX = {
  passwordAndUsername: /^[a-zA-Z0-9]{5,}$/,
};

export const COOKIE_NAMES = {
  isLogin: "isLogin",
};

export const MAP_CONFIG = {
  position: { lng: 51.505, lt: -0.09 },
  urlForTitleLayer: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  attributionForTitleLayer: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors"`,
  imagePinForActiveStatus: {
    blackPin,
    redPin,
  },
};
