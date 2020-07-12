import { ADD_CURRENCY } from "../actions/currency";
import { CurrencyActionProps, CurrencyFields } from "../types/currency";

const INITIAL_STATE: CurrencyFields[] = [];
/**
 * Currencies reducer
 * @param state The current state of the reducer
 * @type state: Array
 * @param action The content of the action
 * @type action: CurrencyActionProp
 */
export const currencies = (
  state = INITIAL_STATE,
  action: CurrencyActionProps
) => {
  // switch (action.type) {
  //   case ADD_CURRENCY:
  //     const id: number =
  //       state.length !== 0 ? state[state.length - 1].id + 1 : 0;
  //     return [
  //       ...state,
  //       {
  //         id: id,
  //         name: action.name,
  //         abbreviation: action.abbreviation
  //       }
  //     ];
  //   default:
  //     return state;
  // }
  return state;
};
