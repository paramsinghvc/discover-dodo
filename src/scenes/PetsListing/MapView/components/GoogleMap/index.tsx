import React, { useState, useEffect, useCallback } from "react";
import {
  GoogleMap,
  withGoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import mapStyle from "./mapStyle";
import MapInfo from "../InfoWindow";
import { PetInfoType } from "shared/types";

const DEFAULT_ZOOM = 12;

type CoordinatesType = {
  lat: number;
  lng: number;
};

type MapProps = {
  petDetails: PetInfoType[];
};

export const Map: React.FC<MapProps> = props => {
  const [selectedPlace, setSelectedPlace] = useState<any>(null);
  const [currentLocation, setCurrentLocation] = useState<CoordinatesType>({
    lat: 12.971599,
    lng: 77.594566
  });

  const getPosition = useCallback(position => {
    setCurrentLocation({
      lat: position.coords.latitude,
      lng: position.coords.longitude
    });
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getPosition);
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, [getPosition]);

  return (
    <GoogleMap
      defaultZoom={DEFAULT_ZOOM}
      center={currentLocation}
      defaultOptions={
        {
          styles: mapStyle,
          fullscreenControl: false,
          panControl: false,
          streetViewControl: false,
          mapTypeControl: false
        } as any
      }
    >
      {props.petDetails.map(place => {
        return (
          <Marker
            key={place.id}
            position={{
              lat: place.lastSeenAt.lat,
              lng: place.lastSeenAt.long
            }}
            onClick={() => {
              setSelectedPlace(place);
            }}
            icon={{
              url: place.isLost ? "/pawprint-red.svg" : "/pawprint-green.svg",
              scaledSize: new (window as any).google.maps.Size(30, 30)
            }}
          />
        );
      })}

      {selectedPlace && (
        <InfoWindow
          position={{
            lat: selectedPlace.lastSeenAt.lat,
            lng: selectedPlace.lastSeenAt.long
          }}
          onCloseClick={() => {
            setSelectedPlace(null);
          }}
          options={
            {
              style: { overflow: "hidden" },
              pixelOffset: new (window as any).google.maps.Size(0, -20)
            } as any
          }
        >
          <MapInfo petDetails={selectedPlace} />
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

const MapComponent = withGoogleMap(Map);
export default MapComponent;
