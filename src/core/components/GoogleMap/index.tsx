import React, { useState } from "react";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import mapStyle from "./mapStyle";

import { data } from "./data";

const DEFAULT_ZOOM = 10;

export function Map(props: any) {
  const [selectedPlace, setSelectedPlace] = useState<any>(null);

  return (
    <GoogleMap
      defaultZoom={DEFAULT_ZOOM}
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
            icon={{
              url: "/pawprint-green.svg",
              scaledSize: new (window as any).google.maps.Size(25, 25)
            }}
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

const MapComponent = withScriptjs(withGoogleMap(Map));
export default MapComponent;
