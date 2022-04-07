import { Dispatch } from "redux";
import * as constants from "../constants/calculator.constatnts";

export type TDigits = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | ".";
export type TActions = "+" | "-" | "*" | "/";
export type TSumm = "=";

export interface IAddNum {
  readonly type: typeof constants.ADD_NUM;
  readonly payload: TDigits;
}

export interface IAddAction {
  readonly type: typeof constants.ADD_ACTION;
  readonly payload: TActions;
}

export interface IAddASumm {
  readonly type: typeof constants.ADD_SUM;
  readonly payload: TSumm;
}

export interface IClearData {
  readonly type: typeof constants.CLEAR_DATA;
}

export type TCalculatorType = IAddNum | IAddAction | IAddASumm | IClearData;

export function addNum(digit: TDigits) {
  return function (dispatch: Dispatch) {
    dispatch({ type: constants.ADD_NUM, payload: digit });
  };
}

export function addAction(action: TActions) {
  return function (dispatch: Dispatch) {
    dispatch({ type: constants.ADD_ACTION, payload: action });
  };
}

export function addSum(sum: TSumm) {
  return function (dispatch: Dispatch) {
    dispatch({ type: constants.ADD_SUM, payload: sum });
  };
}

export function clearCalc() {
  return function (dispatch: Dispatch) {
    dispatch({ type: constants.CLEAR_DATA });
  };
}