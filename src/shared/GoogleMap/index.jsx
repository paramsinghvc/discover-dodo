/* eslint-disable no-console */
import React, { useState, useCallback } from "react";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import styled from "@emotion/styled";
import mapStyle from "./mapStyle";
import { png } from "./pawprint.png";

import { data } from "./data";

const MapContainer = styled.div`
  position: relative;
  height: 600px;
  width: 600px;
  border: 1px red solid;
`;

function Map() {
  const [selectedPlace, setSelectedPlace] = useState(null);

  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 12.97, lng: 77.59 }}
      defaultOptions={{ styles: mapStyle }}
    >
      {data.map(place => {
        return (
          <Marker
            key={place.id}
            position={{
              lat: place.coordinates[0],
              lng: place.coordinates[1]
            }}
            onClick={() => {
              setSelectedPlace(place);
            }}
            // icon={{
            //   url=png
            // }}
          />
        );
      })}
      {selectedPlace && (
        <InfoWindow
          position={{
            lat: selectedPlace.coordinates[0],
            lng: selectedPlace.coordinates[1]
          }}
          onCloseClick={() => {
            setSelectedPlace(null);
          }}
        >
          <div>{selectedPlace.name}</div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

const MapWrapper = withScriptjs(withGoogleMap(Map));

export const MapPage = props => {
  return (
    <MapContainer>
      <MapWrapper
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyA0jvl7CUF52Q9EwIEBJ4rosocGdocYTTA`}
        containerElement={<div style={{ height: "100%" }} />}
        loadingElement={<div style={{ height: "100%" }} />}
        mapElement={<div style={{ height: "100%" }} />}
      />
    </MapContainer>
    // <MapContainer>hi</MapContainer>
  );
};

export default MapPage;
