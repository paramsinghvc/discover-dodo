import React from "react";
import { GoogleMap, withGoogleMap, Marker } from "react-google-maps";

import safeGet from "shared/utils/safeGet";
import { PetInfoType } from "shared/types";

const Map = (props: { petInfo: PetInfoType }) => (
  <GoogleMap
    defaultZoom={12}
    center={{
      lat: safeGet(props, "petInfo.lastSeenAt.lat", 0),
      lng: safeGet(props, "petInfo.lastSeenAt.long", 0)
    }}
    defaultOptions={
      {
        fullscreenControl: false,
        panControl: false,
        streetViewControl: false,
        mapTypeControl: false
      } as any
    }
  >
    <Marker
      position={{
        lat: safeGet(props, "petInfo.lastSeenAt.lat", 0),
        lng: safeGet(props, "petInfo.lastSeenAt.long", 0)
      }}
    />
  </GoogleMap>
);

const wrappedMap = withGoogleMap(Map);
export default wrappedMap;
