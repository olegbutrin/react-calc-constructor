import { Dispatch } from "redux";
import * as constants from "../constants/constructor.constants";

import { TDraggableNames, TDraggablePads } from "../../utils/types";

export interface ISetDisplay {
  readonly type: typeof constants.SET_DISPLAY;
  readonly payload: "display";
}

export interface IRemoveDisplay {
  readonly type: typeof constants.REMOVE_DISPLAY;
}

export interface IAddPad {
  readonly type: typeof constants.ADD_PAD;
  readonly payload: TDraggablePads;
}

export interface IRemovePad {
  readonly type: typeof constants.REMOVE_PAD;
  readonly payload: TDraggablePads;
}

export interface ISwapPads {
  readonly type: typeof constants.SWAP_PADS;
  readonly payload: { source: TDraggablePads; dest: TDraggablePads };
}

export type TConstructorType =
  | ISetDisplay
  | IRemoveDisplay
  | IAddPad
  | IRemovePad
  | ISwapPads;

export function addDisplay() {
  return function (dispatch: Dispatch) {
    dispatch({ type: constants.SET_DISPLAY, payload: "display" });
  };
}

export function removeDisplay() {
  return function (dispatch: Dispatch) {
    dispatch({ type: constants.REMOVE_DISPLAY });
  };
}

export function addPad(pad: TDraggableNames) {
  return function (dispatch: Dispatch) {
    if (pad !== "display") {
      dispatch({ type: constants.ADD_PAD, payload: pad });
    }
  };
}

export function removePad(pad: TDraggablePads) {
  return function (dispatch: Dispatch) {
    dispatch({ type: constants.REMOVE_PAD, payload: pad });
  };
}

export function swapPads(source: TDraggablePads, dest: TDraggablePads) {
  return function (dispatch: Dispatch) {
    dispatch({ type: constants.SWAP_PADS, payload: {source: source, dest: dest} });
  };
}
