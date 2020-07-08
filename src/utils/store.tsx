import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import root from "../reducers/root";

const store = createStore(
  root,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);

export default store;
