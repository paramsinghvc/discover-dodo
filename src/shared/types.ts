import { IAppState } from "src/core/App/app.redux";

export interface IRootState {
  app: IAppState;
  home?: any;
}
