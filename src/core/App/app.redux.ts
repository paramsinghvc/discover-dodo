import {
  createActionWithPayload,
  makeConstants,
  IActionFactory,
  IAction
} from "@mollycule/redux-operation";

export const SET_SHOW_SNACKBAR = "SET_SHOW_SNACKBAR";

export const AppConstants = makeConstants([SET_SHOW_SNACKBAR]);

export type IAppState = {
  shouldShowSnackbar: boolean;
};

const initialState: IAppState = {
  shouldShowSnackbar: false
};

export const appReducer = (
  state = initialState,
  { type, payload }: IAction<symbol, any>
) => {
  switch (type) {
    case AppConstants.get(SET_SHOW_SNACKBAR): {
      return { ...state, shouldShowSnackbar: payload };
    }
    default:
      return state;
  }
};

export const setShowSnackbar: IActionFactory<
  symbol,
  boolean
> = createActionWithPayload(AppConstants.get(SET_SHOW_SNACKBAR)!);
