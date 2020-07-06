import { combineReducers } from "redux";
// import auth from './auth';

import { ADD_ERROR, REMOVE_ERROR, CLEAR_ERRORS } from "../actions/errors";

interface ActionProps {
  type: string;
  id: string;
  error: string;
}

export default combineReducers({
  //   auth,
  //   user,
  error: (state: any[] = [], action: ActionProps) => {
    switch (action.type) {
      case ADD_ERROR: {
        const id = state.length !== 0 ? state[state.length - 1].id + 1 : 0;
        return [...state, { id, error: action.error }];
      }
      case REMOVE_ERROR:
        return state.filter((error) => error.id !== action.id);
      case CLEAR_ERRORS:
        return [];
      default:
        return state;
    }
  }
});
