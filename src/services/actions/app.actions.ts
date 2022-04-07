import { Dispatch } from "redux";
import * as constants from "../constants/app.constants";

export type TAppMode = "runtime" | "constructor";

export interface ISetAppMode {
  readonly type: typeof constants.SET_MODE;
  readonly payload: TAppMode;
}

export type TAppType = ISetAppMode;

export function setAppMode(mode: TAppMode) {
  return function (dispatch: Dispatch) {
    dispatch({ type: constants.SET_MODE, payload: mode });
  };
}
