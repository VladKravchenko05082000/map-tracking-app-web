import { useStoreContext } from "context";

import { Box, Button, Container, Typography } from "@mui/material";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import { MAP_CONFIG } from "constants/constants";
import theme from "theme";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";

const Map: React.FC = observer(() => {
  const {
    authStore: { logout },
    mapStore: { addObject, markAsLost, removeObject, objects },
  } = useStoreContext();

  const handleLogout = () => {
    logout();
  };

  //TODO: Refactor this useEffect for fetch data from store, getFunction, updateFunction, markAsLostFunction, removeFunction

  //TODO:Rename variables

  //TODO: Add comment about approuch with interval

  let idForFetch = 1;

  useEffect(() => {
    const fetchInterval = setInterval(() => {
      fetch(`http://localhost:3001/objects?id=${idForFetch}`)
        .then(res => res.json())
        .then(data => {
          if (data.length) {
            data.forEach((object: any) => {
              addObject({
                id: object.id,
                latitude: object.latitude,
                longitude: object.longitude,
                direction: object.direction,
              });
            });
          }

          idForFetch++;
        });
    }, 3000);

    const lostInterval = setInterval(() => {
      objects.forEach(obj => {
        markAsLost(obj.id);
      });
    }, 10000); //simulating loss of connection to the server(i know about socket.io, but it`s require to write node js server)

    const removeInterval = setInterval(() => {
      objects.forEach(obj => {
        if (obj.isLost) {
          removeObject(obj.id);
        }
      });
    }, 5 * 60 * 1000);

    return () => {
      clearInterval(fetchInterval);
      clearInterval(lostInterval);
      clearInterval(removeInterval);
    };
  }, []);

  //TODO: Split this component(header(logout title) and map component)

  //TODO: Add many items for fetch from db.json(100 items)

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: "65%",
          mb: 1.6,
        }}
      >
        <Button onClick={handleLogout} variant="outlined">
          Logout
        </Button>

        <Typography variant="h3" component="h1" sx={{ textAlign: "center" }}>
          Tracking App
        </Typography>
      </Box>

      <Box sx={theme.customComponents.centerDiv}>
        <MapContainer
          center={[MAP_CONFIG.position.lng, MAP_CONFIG.position.lt]}
          zoom={4}
          style={{ height: "500px", width: "100%" }}
        >
          <TileLayer attribution={MAP_CONFIG.attributionForTitleLayer} url={MAP_CONFIG.urlForTitleLayer} />
          {objects.map(object => (
            <Marker
              key={object.id}
              position={[object.latitude, object.longitude]}
              icon={
                object.isLost ? MAP_CONFIG.imagePinForActiveStatus.redPin : MAP_CONFIG.imagePinForActiveStatus.blackPin
              }
            >
              <Popup>
                <div>
                  <strong>ID: </strong> {object.id} <br />
                  <strong>Direction: </strong> {object.direction} <br />
                  <strong>Status: {object.isLost ? "Lost" : "Active"} </strong>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </Box>
    </Container>
  );
});

export default Map;
