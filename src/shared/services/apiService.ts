import * as firebase from "firebase/app";
import "firebase/firestore";

import { FIREBASE } from "../config";

class ApiService {
  public db: firebase.firestore.Firestore;
  public constructor() {
    this.initFirebase();
    this.db = firebase.firestore();
  }

  initFirebase() {
    firebase.initializeApp({
      apiKey: FIREBASE.API_KEY,
      authDomain: FIREBASE.AUTH_DOMAIN,
      projectId: FIREBASE.PROJECT_ID
    });
  }

  public addDataToCollection = async (collectionName: string, data: any) => {
    return await this.db.collection(collectionName).add(data);
  };

  public getCollection = async (collectionName: string) => {
    return await this.db.collection(collectionName).get();
  };
}

export default new ApiService();

export const wrapOperation = <T>(operation: (...args: any[]) => Promise<T>) => {
  return async (...args: any[]) => {
    try {
      return { response: await operation(...args) };
    } catch (e) {
      return { error: e };
    }
  };
};
