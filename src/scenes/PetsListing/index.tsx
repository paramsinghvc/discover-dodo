import React, { FC, useState, useCallback } from "react";
import { RouteComponentProps } from "react-router";

import ContentHeadSection from "./components/ContentHead";
import MapView from "./MapView";
import ListView from "./ListView";
import { PetInfoType } from "shared/types";

const PetInfo2: PetInfoType = {
  isLost: true,
  isSpayed: false,
  isVaccinated: true,
  lastSeenAt: {
    address: "Yelahanka, Bengaluru, Bangalore Urban",
    lat: 13.1185614,
    long: 77.59746169999994
  },
  ownerAddress: "#2/49,rudrana complex , bhartinagar yelahanaka bangalore",
  ownerEmail: "vineetpanwar027@gmail.com",
  ownerName: "vineet panwar",
  ownerPhone: "8123307697",
  petBreed: "african",
  petColor: "black",
  petGender: "Female",
  petName: "cansandra",
  petNotes: "she was  agile and cute",
  petSpecies: "Cat",
  photos: [],
  reward: "",
  timestamp: "2019-09-29T11:19:24.180Z"
};

const PetsListing: FC<{} & RouteComponentProps> = ({ history }) => {
  const [activeView, setActiveView] = useState(0);
  const handleViewChange = useCallback((view: number) => {
    setActiveView(view);
  }, []);
  return (
    <>
      <ContentHeadSection
        isMapView={activeView === 0}
        onViewChange={handleViewChange}
      />
      {activeView === 0 ? <MapView petDetails={PetInfo2} /> : <ListView />}
    </>
  );
};

export default PetsListing;
