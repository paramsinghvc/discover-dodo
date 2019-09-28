import * as firebase from "firebase/app";
import "firebase/storage";

class StorageService {
  public storage: firebase.storage.Storage | null;
  public constructor() {
    this.storage = null;
  }

  public initStorage() {
    this.storage = firebase.storage();
  }
  public uploadFile = (
    bucket: string,
    file: File,
    metadata?: firebase.storage.UploadMetadata
  ) => {
    return this.storage && this.storage.ref(bucket).put(file, metadata);
  };

  public deleteFile = async (refPath: string) => {
    return await (this.storage && this.storage.ref(refPath).delete());
  };
}

export default new StorageService();
