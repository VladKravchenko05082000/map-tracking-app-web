export type MapObject = {
  id: string;
  latitude: number;
  longitude: number;
  direction: DirectionEnum;
  isLost?: boolean;
};

export enum DirectionEnum {
  north = "North",
  south = "South",
  west = "West",
  east = "East",
}
