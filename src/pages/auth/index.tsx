import { lazyLoad } from "utils/lazy-load";

export const LoginPage = lazyLoad(
  () => import("./login"),
  module => module.default,
);
