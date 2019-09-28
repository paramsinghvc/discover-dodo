import { IAppState } from "core/App/app.redux";

export interface IRootState {
  app: IAppState;
  home?: any;
}
