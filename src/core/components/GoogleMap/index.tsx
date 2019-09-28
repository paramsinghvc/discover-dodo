import React, { useState, useEffect, useCallback } from "react";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

import mapStyle from "./mapStyle";
import { foundData, lostData } from "./data";
import { Paper } from "@material-ui/core";

const DEFAULT_ZOOM = 12;

type CoordinatesType = {
  lat: number;
  lng: number;
};

export function Map(props: any) {
  const [selectedPlace, setSelectedPlace] = useState<any>(null);
  const [currentLocation, setCurrentLocation] = useState<CoordinatesType>({
    lat: 0,
    lng: 0
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getPosition);
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const getPosition = useCallback(position => {
    setCurrentLocation({
      lat: position.coords.latitude,
      lng: position.coords.longitude
    });
  }, []);

  return (
    <GoogleMap
      defaultZoom={DEFAULT_ZOOM}
      center={currentLocation}
      defaultOptions={{
        styles: mapStyle,
        fullscreenControl: false,
        panControl: false,
        streetViewControl: false,
        mapTypeControl: false
      }}
    >
      {foundData.map(place => {
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
      {lostData.map(place => {
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
              url: "/pawprint-red.svg",
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
          options={{
            style: { opacity: 0.2 }
          }}
        >
          <Paper>Pet info goes here</Paper>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

const MapComponent = withScriptjs(withGoogleMap(Map));
export default MapComponent;
