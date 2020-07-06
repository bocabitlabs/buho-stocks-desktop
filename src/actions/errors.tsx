export const ADD_ERROR = "Error occurred";
export const REMOVE_ERROR = "Remove error";
export const CLEAR_ERRORS = "Clear all the errors";

export function addError(error: object) {
  return { type: ADD_ERROR, error };
}

export function removeError(errorId: string) {
  return { type: REMOVE_ERROR, id: errorId };
}

export function clearError() {
  return { type: CLEAR_ERRORS };
}
