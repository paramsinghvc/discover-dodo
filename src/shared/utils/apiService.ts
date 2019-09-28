import firebase, { firestore } from "firebase";

import { FIREBASE } from "../config";

class ApiService {
  public db: firestore.Firestore;
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

  public wrapOperation(operation: Function) {
    return async (...args) => {
      try {
        return { response: await operation(...args) };
      } catch (e) {
        return { error: e };
      }
    };
  }

  public async addDataToCollection(collectionName: string, data: any) {
    return await this.db.collection(collectionName).add(data);
  }

  public async getCollection(collectionName: string) {
    return await this.db.collection(collectionName).get();
  }
}

export default new ApiService();
