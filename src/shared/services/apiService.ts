import * as firebase from "firebase/app";
import "firebase/firestore";

import { FIREBASE_CONFIG } from "../config";

class ApiService {
  public db: firebase.firestore.Firestore | null;
  public constructor() {
    // this.initFirebase();
    this.db = null;
  }

  public initFirebase() {
    firebase.initializeApp(FIREBASE_CONFIG);
    this.db = firebase.firestore();
  }

  public addDataToCollection = async (collectionName: string, data: any) => {
    if (!this.db) return;
    return await this.db.collection(collectionName).add(data);
  };

  public updateDocInCollection = async (
    collectionName: string,
    docId: string,
    data: any
  ) => {
    if (!this.db) return;
    return await this.db
      .collection(collectionName)
      .doc(docId)
      .update(data);
  };

  public getCollection = async (collectionName: string) => {
    if (!this.db) return;
    return await this.db.collection(collectionName).get();
  };

  public getCollectionConditional = async (
    collectionName: string,
    queryModifier: (
      collection: firebase.firestore.CollectionReference
    ) => firebase.firestore.Query
  ) => {
    if (!this.db) return;
    return await queryModifier(this.db.collection(collectionName)).get();
  };

  public getDocInCollection = async (collectionName: string, docId: string) => {
    if (!this.db) return;
    return await this.db
      .collection(collectionName)
      .doc(docId)
      .get();
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
