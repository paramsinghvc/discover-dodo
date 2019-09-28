import { combineReducers } from "redux";

import { IRootState } from "src/shared/types";
import { appReducer } from "src/core/App/app.redux";

const rootReducer = combineReducers<IRootState>({
  app: appReducer
});

export default rootReducer;
export type AppState = ReturnType<typeof rootReducer>;
