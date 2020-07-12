export const getProfileLoaded = (state: { firebase: { profile: any } }) =>
  state.firebase.profile.isLoaded;

export const getFirebaseAuth = (state: { firebase: { auth: any } }) =>
  state.firebase.auth;
