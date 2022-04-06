import { Reducer } from "redux";
import {
  TActions,
  TDigits,
  TSumm,
  TCalculatorType,
} from "../actions/calculator.actions";
import * as constants from "../constants/calculator.constatnts";

export type TCalculatorStore = {
  digits: TDigits[];
  action: TActions | TSumm | null;
  memory: number | null;
  error: string;
};

export const initialState: TCalculatorStore = {
  digits: ["0"],
  action: null,
  memory: null,
  error: "",
};

const safeNumber = (a: string) => {
  const num = a.includes(".") ? parseFloat(a) : parseInt(a);
  return !Number.isNaN(num) && Number.isFinite(num) ? num : null;
};

const safeCalc = (a: number, b: number, operator: TActions | "=") => {
  switch (operator) {
    case "*":
      return a * b;
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "/":
      return a / b;
    default:
      return 0;
  }
};

export const calculatorReducer: Reducer<TCalculatorStore, TCalculatorType> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case constants.ADD_NUM:
      return {
        ...state,
        digits:
          state.error !== initialState.error
            ? initialState.digits
            : action.payload === "." && state.digits.includes(action.payload)
            ? state.digits
            : state.digits.length > 20
            ? state.digits
            : state.digits.length === 1 && state.digits[0] === "0"
            ? [action.payload]
            : [...state.digits, action.payload],
        error: initialState.error,
      };
    case constants.ADD_ACTION:
      return {
        ...state,
        action:
          state.error !== initialState.error
            ? initialState.action
            : state.action === null || state.action === "="
            ? action.payload
            : state.action,
        memory:
          state.error !== initialState.error
            ? initialState.memory
            : state.action === null || state.action === "="
            ? safeNumber(state.digits.join(""))
            : state.memory,
        digits:
          state.error !== initialState.error
            ? initialState.digits
            : state.action === null || state.action === "="
            ? initialState.digits
            : state.digits,
        error: initialState.error,
      };
    case constants.ADD_SUM:
      return {
        ...state,
        digits:
          state.error !== initialState.error
            ? initialState.digits
            : state.memory != null &&
              state.action != null &&
              safeNumber(state.digits.join("")) != null
            ? safeNumber(
                safeCalc(
                  state.memory,
                  safeNumber(state.digits.join("")) as number,
                  state.action
                ).toString()
              ) !== null
              ? (safeCalc(
                  state.memory,
                  safeNumber(state.digits.join("")) as number,
                  state.action
                )
                  .toString()
                  .split("") as TDigits[])
              : initialState.digits
            : state.digits,
        memory:
          state.error !== initialState.error
            ? initialState.memory
            : state.memory !== null &&
              state.action !== null &&
              safeNumber(state.digits.join("")) != null
            ? initialState.memory
            : state.memory,
        action: initialState.action,
        error:
          state.error !== initialState.error
            ? initialState.error
            : state.memory !== null &&
              state.action !== null &&
              safeNumber(state.digits.join("")) != null &&
              safeNumber(
                safeCalc(
                  state.memory,
                  safeNumber(state.digits.join("")) as number,
                  state.action
                ).toString()
              ) === null
            ? "Ошибка!" : initialState.error,
      };
    case constants.CLEAR_DATA:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
