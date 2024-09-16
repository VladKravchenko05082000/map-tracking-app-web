import { useEffect } from "react";
import { observer } from "mobx-react-lite";

import { useStoreContext } from "context";

import { Box, Typography } from "@mui/material";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import theme from "theme";
import { MAP_CONFIG } from "constants/constants";

import "leaflet/dist/leaflet.css";

const Map: React.FC = observer(() => {
  const {
    mapStore: { fetchAndAddObjectToMap, markAsLostMapObject, removeMapObject, mapObjects },
  } = useStoreContext();

  let idForFetch = 1;
  let idForLost = 1;

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
              object.isLost ? MAP_CONFIG.imagePinForActiveStatus.redPin : MAP_CONFIG.imagePinForActiveStatus.blackPin
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
                  Direction:
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
