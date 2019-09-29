import React from "react";
import styled from "@emotion/styled";

import MapComponent from "./components/GoogleMap";
import { PetInfoType } from "shared/types";

const MapContainer = styled.div`
  position: fixed;
  top: 0px;
  bottom: 0;
  right: 0;
  left: 0;
  padding-top: 64px;
  z-index: -1;
`;
type MapProps = {
  petDetails: PetInfoType[];
};

const MapView = (props: MapProps) => {
  return (
    <>
      <MapContainer>
        <MapComponent
          // googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_API_KEY}`}
          containerElement={<div style={{ height: "100%" }} />}
          // loadingElement={<div style={{ height: "100%" }} />}
          mapElement={<div style={{ height: "100%" }} />}
          petDetails={props.petDetails}
        />
      </MapContainer>
    </>
  );
};
export default MapView;
