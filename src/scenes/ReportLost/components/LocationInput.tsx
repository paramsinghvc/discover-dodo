import React, { FC, useRef, useEffect, ChangeEvent } from "react";
import TextField from "@material-ui/core/TextField";

const LocationInput: FC<{
  onChange: (event: ChangeEvent, value?: any) => void;
  value: string | { address: string; lat: number; long: number };
}> = ({ onChange, value, ...props }) => {
  const inputRef = useRef(null);
  useEffect(() => {
    if (typeof google === "undefined") return;
    const autocomplete = new (window as any).google.maps.places.Autocomplete(
      inputRef.current
    );
    autocomplete.addListener("place_changed", function(e) {
      const place = autocomplete.getPlace();
      console.warn(place);
      if (!place.geometry) {
        console.warn("No details available for input: '" + place.name + "'");
        return;
      }

      // let address = "";
      if (place.address_components) {
        const address = [
          (place.address_components[0] &&
            place.address_components[0].short_name) ||
            "",
          (place.address_components[1] &&
            place.address_components[1].short_name) ||
            "",
          (place.address_components[2] &&
            place.address_components[2].short_name) ||
            ""
        ].join(", ");
        const [lat, long] = [
          place.geometry.location.lat(),
          place.geometry.location.lng()
        ];
        onChange &&
          onChange(e, {
            address,
            lat,
            long
          });
      }
    });
  }, [inputRef, onChange]);
  return (
    <TextField
      inputRef={inputRef}
      onChange={onChange}
      {...props}
      value={typeof value === "string" ? value : value && value.address}
    />
  );
};

export default LocationInput;
