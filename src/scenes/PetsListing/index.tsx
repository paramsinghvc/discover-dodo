import React, { FC, useState, useCallback, useEffect } from "react";
import { RouteComponentProps } from "react-router";

import ApiService, { wrapOperation } from "shared/services/apiService";
import ContentHeadSection from "./components/ContentHead";
import MapView from "./MapView";
import ListView from "./ListView";

const PetsListing: FC<{} & RouteComponentProps> = ({ history }) => {
  const [activeView, setActiveView] = useState(0);
  const [petsList, setPetsList] = useState<any>([]);

  const fetchPetsList = useCallback(
    async ({
      filters = { isLost: true, isFound: true }
    }: {
      filters?: { isLost: boolean; isFound: boolean };
    }) => {
      const shouldFilterFound = filters.isFound && !filters.isLost;
      const shouldFilterLost = !filters.isFound && filters.isLost;
      const operation = shouldFilterFound
        ? wrapOperation(ApiService.getCollectionConditional)(
            "pets",
            collection => collection.where("isFound", "==", true)
          )
        : shouldFilterLost
        ? wrapOperation(ApiService.getCollectionConditional)(
            "pets",
            collection => collection.where("isLost", "==", true)
          )
        : wrapOperation(ApiService.getCollection)("pets");

      const { response, error } = await operation;

      if (response) {
        const { docs } = response;
        const dataSource: any = [];
        docs.forEach(document => {
          let petDocument = {};
          petDocument = { ...document.data(), id: document.id };
          dataSource.push(petDocument);
        });

        setPetsList(dataSource);
      } else {
        console.error("Oops", error);
      }
    },
    [setPetsList]
  );

  useEffect(() => {
    fetchPetsList({});
  }, []);

  const handleViewChange = useCallback((view: number) => {
    setActiveView(view);
  }, []);

  return (
    <>
      <ContentHeadSection
        isMapView={activeView === 0}
        onViewChange={handleViewChange}
        fetchPetsList={fetchPetsList}
      />
      {activeView === 0 ? (
        <MapView petDetails={petsList} />
      ) : (
        <ListView petDetails={petsList} />
      )}
    </>
  );
};

export default PetsListing;
