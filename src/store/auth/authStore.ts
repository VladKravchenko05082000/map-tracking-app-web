import { makeAutoObservable, runInAction } from "mobx";
import Cookies from "js-cookie";

import { COOKIE_NAMES } from "constants/constants";

import { InitialValues } from "pages/auth/login/hooks/types";
import { sendLoginData } from "api";

class AuthStore {
  isAuthenticated = false;
  pending = false;

  constructor() {
    makeAutoObservable(this);

    const authStatus = Cookies.get(COOKIE_NAMES.isLogin);
    this.isAuthenticated = authStatus === "1";
  }

  login = async ({ username, password }: InitialValues) => {
    this.pending = true;

    try {
      await sendLoginData({ username, password });

      runInAction(() => {
        this.pending = false;
        this.isAuthenticated = true;
        Cookies.set(COOKIE_NAMES.isLogin, "1");
      });
    } catch (error: any) {
      runInAction(() => {
        this.pending = false;
      });
    }
  };

  resetAuthStore = () => {
    this.isAuthenticated = false;
    this.pending = false;
    Cookies.set(COOKIE_NAMES.isLogin, "0");
  };
}

const authStore = new AuthStore();
export default authStore;
