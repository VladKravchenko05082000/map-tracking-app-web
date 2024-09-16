import { lazyLoad } from "utils/lazy-load";

export const MapPage = lazyLoad(
  () => import("./map"),
  module => module.default,
);
