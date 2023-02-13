import { combineReducers } from "redux";
import { listReducer, diariJajanReducer } from "./listReducers";

const rootReducer = combineReducers({
  list: listReducer,
  diariJajan: diariJajanReducer,
});

export default rootReducer;
