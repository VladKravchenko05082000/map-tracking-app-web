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
  imageSrcForMarker: {
    blackPin: "/static/black-pin.webp",
    redPin: "/static/red-pin.webp",
  },
};
