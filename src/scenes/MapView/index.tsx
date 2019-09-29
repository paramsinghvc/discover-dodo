import React, { FC } from "react";
import styled from "@emotion/styled";

import MapComponent from "scenes/MapView/components/GoogleMap";

const MapContainer = styled.div`
  position: fixed;
  top: 0px;
  bottom: 0;
  right: 0;
  left: 0;
  padding-top: 64px;
`;

const MapView: FC<{}> = () => {
  return (
    <>
      <MapContainer>
        <MapComponent
          // googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_API_KEY}`}
          containerElement={<div style={{ height: "100%" }} />}
          loadingElement={<div style={{ height: "100%" }} />}
          mapElement={<div style={{ height: "100%" }} />}
        />
      </MapContainer>
    </>
  );
};
export default MapView;
