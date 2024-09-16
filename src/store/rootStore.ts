import authStore from "./auth/authStore";
import mapStore from "./map/mapStore";

class RootStore {
  authStore: typeof authStore;
  mapStore: typeof mapStore;

  constructor() {
    this.authStore = authStore;
    this.mapStore = mapStore;
  }
}

export const rootStore = new RootStore();
