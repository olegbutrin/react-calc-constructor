import { combineReducers } from "redux";

import { appReducer } from "./app.reducer";
import { constructorReducer } from "./constructor.reducer";

export const rootReducer = combineReducers({
  app: appReducer,
  constr: constructorReducer,
});
