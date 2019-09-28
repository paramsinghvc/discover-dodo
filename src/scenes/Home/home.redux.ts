import {
  createActionWithPayload,
  makeConstants,
  IActionFactory,
  IAction,
  createReduxOperation
} from "@mollycule/redux-operation";

const {
  actions: [petsRequest, petsSuccess, petsFailure],
  constants: petsConstants,
  reducer: petsReducer
} = createReduxOperation("PET_DETAILS");

export const fetchPets = createActionWithPayload<string, number>(
  "PET_DETAILS_INIT"
);

export { petsRequest, petsSuccess, petsFailure, petsConstants, petsReducer };
