import React, { FC } from "react";
import styled from "@emotion/styled";

import MapComponent from "../../core/components/GoogleMap/index";

const MapContainer = styled.div`
  position: fixed;
  top: 0px;
  bottom: 10px;
  right: 10px;
  left: 10px;
  padding-top: 75px;
`;

const MapView: FC<{}> = () => {
  return (
    <>
      <MapContainer>
        <MapComponent
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=`}
          containerElement={<div style={{ height: "100%" }} />}
          loadingElement={<div style={{ height: "100%" }} />}
          mapElement={<div style={{ height: "100%" }} />}
        />
      </MapContainer>
    </>
  );
};
export default MapView;
