import { combineReducers } from "redux";

import { appReducer } from "./app.reducer";
import { constructorReducer } from "./constructor.reducer";
import { calculatorReducer } from "./calculator.reducer";

export const rootReducer = combineReducers({
  app: appReducer,
  constr: constructorReducer,
  calc: calculatorReducer,
});
