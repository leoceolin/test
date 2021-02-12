import React, { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import { Container } from "./styles";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import farm221 from "./farm_221.json";
import farm231 from "./farm_231.json";
import farm271 from "./farm_271.json";

const MapView = ({ selectedFarm }) => {
  const [farm, setFarm] = useState(null);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    if (selectedFarm.farm_id === "221") {
      setFarm(farm221);
      setReload(!reload);
    }

    if (selectedFarm.farm_id === "231") {
      setFarm(farm231);
      setReload(!reload);
    }

    if (selectedFarm.farm_id === "271") {
      setFarm(farm271);
      setReload(!reload);
    }
  }, [selectedFarm]);
  return (
    <Container key={reload}>
      {selectedFarm.farm_id !== undefined && (
        <MapContainer
          center={[selectedFarm.latitude, selectedFarm.longitude]}
          zoom={12}
        >
          <TileLayer
            url="https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibGVvb2Nlb2xpbiIsImEiOiJja2wxbm5ucG4wYTRtMnBxajM2eHdld29yIn0.Bhy1CormTCnqL-iadtMXaQ"
            attribution='<a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <GeoJSON attribution="Lorem ipsum..." data={farm} />
        </MapContainer>
      )}
    </Container>
  );
};

MapView.propTypes = {
  selectedFarm: PropTypes.object
};

export default MapView;
