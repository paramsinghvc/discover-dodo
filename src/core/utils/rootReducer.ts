import { combineReducers } from "redux";

import { IRootState } from "shared/types";
import { appReducer } from "core/App/app.redux";

const rootReducer = combineReducers<IRootState>({
  app: appReducer
});

export default rootReducer;
export type AppState = ReturnType<typeof rootReducer>;
