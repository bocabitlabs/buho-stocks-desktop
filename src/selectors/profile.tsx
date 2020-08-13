/**
 * Get authentication item from the redux state
 * @param state Redux state
 * @typeParam state Dictionary
 * @returns The auth content from Firebase authentication result
 */
export const getFirebaseAuth = (state: { firebase: { auth: any } }) =>
  state.firebase.auth;
