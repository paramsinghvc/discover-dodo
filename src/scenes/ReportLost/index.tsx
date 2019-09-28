import React, { FC, useEffect } from "react";
import * as firebase from "firebase/app";

import ApiService, { wrapOperation } from "shared/services/apiService";
import safeGet from "shared/utils/safeGet";

const ReportLost: FC<{}> = () => {
  async function getFoo() {
    const { response, error } = await wrapOperation(ApiService.getCollection)(
      "users"
    );

    if (response) {
      const { docs } = response;
      docs.forEach(document => console.warn(document.data()));
    } else {
      console.error("Oops", error);
    }
  }

  async function addEntry() {
    const postData = {
      address: "905, HSR Layout, Bangalore",
      location: new firebase.firestore.GeoPoint(1, 1),
      name: "John Doe",
      phone: "8296886955",
      token: ""
    };

    const { response, error } = await wrapOperation(
      ApiService.addDataToCollection
    )("users", postData);
    if (response) {
      console.warn("Added", response);
    } else {
      console.error(error);
    }
  }

  useEffect(() => {
    // getFoo();
    // addEntry();
  }, []);
  return <p>Hola</p>;
};

export default ReportLost;
