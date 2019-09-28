import React, { FC } from "react";
import styled from "@emotion/styled";

import MapComponent from "../../core/components/GoogleMap/index";

const MapContainer = styled.div`
  position: relative;
  height: 600px;
  width: 600px;
  border: 1px red solid;
`;

const MapView: FC<{}> = () => {
  return (
    <>
      <MapContainer>
        <MapComponent
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyA0jvl7CUF52Q9EwIEBJ4rosocGdocYTTA`}
          containerElement={<div style={{ height: "100%" }} />}
          loadingElement={<div style={{ height: "100%" }} />}
          mapElement={<div style={{ height: "100%" }} />}
        />
      </MapContainer>
    </>
  );
};
export default MapView;
