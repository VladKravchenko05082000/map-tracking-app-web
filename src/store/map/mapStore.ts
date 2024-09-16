import { makeAutoObservable, runInAction } from "mobx";

import { fetchMapObject } from "api";

import { MapObject } from "./types";

class MapStore {
  mapObjects: MapObject[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  fetchAndAddObjectToMap = async (idForFetch: number) => {
    try {
      const res: MapObject[] = await fetchMapObject(idForFetch);

      runInAction(() => {
        if (res.length) {
          this.mapObjects.push({ ...res[0], isLost: false });
        }
      });
    } catch (e: any) {
      this.mapObjects = [];
      throw new Error(e.message);
    }
  };

  markAsLostMapObject = (id: string) => {
    const object = this.mapObjects.find(obj => obj.id === id);
    if (object) {
      object.isLost = true;
    }
  };

  removeMapObject = (id: string) => {
    this.mapObjects = this.mapObjects.filter(obj => obj.id !== id);
  };

  resetMapStore = () => {
    this.mapObjects = [];
  };
}

const mapStore = new MapStore();
export default mapStore;
