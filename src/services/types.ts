import { Action, ActionCreator, Dispatch } from "redux";
import { rootReducer } from "./reducers";
import { TAppType } from "./actions/app.actions";
import { ThunkAction } from "redux-thunk";

export type RootState = ReturnType<typeof rootReducer>;

export type TApplicationActions = TAppType;

export type AppDispatch = Dispatch<TApplicationActions>;

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;
