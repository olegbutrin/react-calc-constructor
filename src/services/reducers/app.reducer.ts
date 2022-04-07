import { Reducer } from "redux";
import * as constants from "../constants/app.constants";
import { TAppMode, TAppType } from "../actions/app.actions";

export type TAppStore = {
  mode: TAppMode;
};

export const initialState: TAppStore = {
  mode: "constructor",
};

export const appReducer: Reducer<TAppStore, TAppType> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case constants.SET_MODE:
      return { ...state, mode: action.payload };
    default:
      return state;
  }
};
