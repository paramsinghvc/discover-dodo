import { IAppState } from "core/App/app.redux";

export interface IRootState {
  app: IAppState;
  home?: any;
}

export type PetInfoType = {
  id: string;
  isLost: boolean;
  isSpayed: boolean;
  isVaccinated: boolean;
  lastSeenAt: {
    address: string;
    lat: number;
    long: number;
  };
  ownerAddress: string;
  ownerEmail: string;
  ownerName: string;
  ownerPhone: string;
  petBreed: string;
  petColor: string;
  petGender: string;
  petName: string;
  petNotes: string;
  petSpecies: string;
  photos: Array<any>;
  reward: string;
  timestamp: string;
  ownerPhoto: string;
};
