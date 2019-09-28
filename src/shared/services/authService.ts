import * as firebase from "firebase/app";
import "firebase/auth";

import ApiService from "./apiService";

class AuthService {
  private providers: Map<
    "GOOGLE" | "FACEBOOK",
    firebase.auth.GoogleAuthProvider | firebase.auth.FacebookAuthProvider
  > = new Map();

  public constructor() {
    this.setupProviders();
  }

  setupProviders() {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    googleProvider.addScope("profile");
    googleProvider.addScope("email");
    this.providers.set("GOOGLE", googleProvider);
  }

  public async authenticateUsingGoogle() {
    const googleProvider = this.providers.get("GOOGLE");
    if (!googleProvider) {
      console.error("No provider registered for Google");
      return;
    }
    return await firebase.auth().signInWithPopup(googleProvider);
  }

  public getLoggedInUser() {
    return firebase.auth().currentUser;
  }

  public onAuthStateChanged(callback: (user: firebase.User | null) => void) {
    firebase.auth().onAuthStateChanged(callback);
  }

  public async logout() {
    return await firebase.auth().signOut();
  }
}

export default new AuthService();
