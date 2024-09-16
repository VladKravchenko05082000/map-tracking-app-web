import { makeAutoObservable } from "mobx";

interface MapObject {
  id: string;
  latitude: number;
  longitude: number;
  direction: string;
  isLost?: boolean;
}

class MapStore {
  objects: MapObject[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addObject = (object: MapObject) => {
    const existingObject = this.objects.find(obj => obj.id === object.id);
    if (existingObject) {
      if (existingObject.isLost) {
        return;
      } else {
        existingObject.latitude = object.latitude;
        existingObject.longitude = object.longitude;
        existingObject.direction = object.direction;
        existingObject.isLost = false;
      }
    } else {
      this.objects.push({ ...object, isLost: false });
    }
  };

  markAsLost = (id: string) => {
    const object = this.objects.find(obj => obj.id === id);
    if (object) {
      object.isLost = true;
    }
  };

  removeObject = (id: string) => {
    this.objects = this.objects.filter(obj => obj.id !== id);
  };
}

const mapStore = new MapStore();
export default mapStore;
