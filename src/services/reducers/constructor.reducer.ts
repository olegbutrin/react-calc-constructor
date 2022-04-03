import { Reducer } from "redux";
import * as constants from "../constants/constructor.constants";
import { TDraggablePads } from "../../utils/types";
import { TConstructorType } from "../actions/constructor.actions";

export type TConstructorStore = {
  display: "display" | "";
  pads: TDraggablePads[];
};

export const initialState: TConstructorStore = {
  display: "",
  pads: [],
};

export const constructorReducer: Reducer<
  TConstructorStore,
  TConstructorType
> = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_DISPLAY:
      return { ...state, display: action.payload };
    case constants.REMOVE_DISPLAY:
      return { ...state, display: "" };
    case constants.ADD_PAD:
      return {
        ...state,
        pads: [
          ...state.pads.filter((item) => {
            return item !== action.payload;
          }),
          action.payload,
        ],
      };
    case constants.REMOVE_PAD:
      return {...state, pads: state.pads.filter((item) => {
        return item !== action.payload;
      })}
    case constants.SWAP_PADS:
      return {
        ...state,
        pads: state.pads.map((item) => {
          return item === action.payload.source
            ? action.payload.dest
            : item === action.payload.dest
            ? action.payload.source
            : item;
        }),
      };
    default:
      return state;
  }
};
