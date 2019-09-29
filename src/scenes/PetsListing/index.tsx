import React, { FC, useState, useCallback } from "react";
import { RouteComponentProps } from "react-router";

import ContentHeadSection from "./components/ContentHead";
import MapView from "./MapView";
import ListView from "./ListView";

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
      {activeView === 0 ? <MapView /> : <ListView />}
    </>
  );
};

export default PetsListing;
