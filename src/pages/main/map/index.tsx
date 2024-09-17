import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import L from "leaflet";

import { useStoreContext } from "context";

import { Box, Typography } from "@mui/material";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import theme from "theme";
import { MAP_CONFIG } from "constants/constants";

import "leaflet/dist/leaflet.css";
import { DirectionEnum } from "store/map/types";

const Map: React.FC = observer(() => {
  const {
    mapStore: { fetchAndAddObjectToMap, markAsLostMapObject, removeMapObject, mapObjects },
  } = useStoreContext();

  let idForFetch = 1;
  let idForLost = 1;

  const directionAngle = {
    [DirectionEnum.north]: 180,
    [DirectionEnum.south]: 0,
    [DirectionEnum.west]: 90,
    [DirectionEnum.east]: 270,
  };

  const createRotatedIcon = (angle: number, src: string) => {
    const iconHtml = `
      <div style="transform: rotate(${angle}deg);">
        <img src=${src} style="width: 24px; height: 24px;" />
      </div>
    `;

    return L.divIcon({
      html: iconHtml,
      iconAnchor: [22, 94],
      popupAnchor: [-3, -76],
      className: "", // clear className, to avoid using standard styles
    });
  };

  useEffect(() => {
    const fetchInterval = setInterval(() => {
      fetchAndAddObjectToMap(idForFetch);
      idForFetch++;
    }, 3000);

    const lostInterval = setInterval(() => {
      mapObjects.forEach(obj => {
        if (+obj.id === idForLost) {
          markAsLostMapObject(obj.id);
        }
      });

      idForLost++;
    }, 5000);

    const removeInterval = setInterval(() => {
      mapObjects.forEach(obj => {
        if (obj.isLost) {
          removeMapObject(obj.id);
        }
      });
    }, 5 * 60 * 1000);

    return () => {
      clearInterval(fetchInterval);
      clearInterval(lostInterval);
      clearInterval(removeInterval);
    };
  }, []);

  return (
    <Box sx={theme.customComponents.centerDiv}>
      <MapContainer
        center={[MAP_CONFIG.position.lng, MAP_CONFIG.position.lt]}
        zoom={4}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer attribution={MAP_CONFIG.attributionForTitleLayer} url={MAP_CONFIG.urlForTitleLayer} />
        {mapObjects.map(object => (
          <Marker
            key={object.id}
            position={[object.latitude, object.longitude]}
            icon={
              object.isLost
                ? createRotatedIcon(directionAngle[object.direction], MAP_CONFIG.imageSrcForMarker.redPin)
                : createRotatedIcon(directionAngle[object.direction], MAP_CONFIG.imageSrcForMarker.blackPin)
            }
          >
            <Popup>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                <Typography variant="body1" component="p">
                  ID:
                  <Typography variant="body1" component="span" sx={{ fontWeight: "400" }}>
                    {object.id}
                  </Typography>
                </Typography>

                <Typography variant="body1" component="p">
                  DirectionEnum:
                  <Typography variant="body1" component="span" sx={{ fontWeight: "400" }}>
                    {object.direction}
                  </Typography>
                </Typography>

                <Typography variant="body1" component="p">
                  Status:
                  <Typography variant="body1" component="span" sx={{ fontWeight: "400" }}>
                    {object.isLost ? "Lost" : "Active"}
                  </Typography>
                </Typography>
              </Box>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </Box>
  );
});

export default Map;
