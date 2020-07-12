import React from "react";
import ReactDOM from "react-dom";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import { Provider } from "react-redux";
import { createFirestoreInstance } from "redux-firestore";

import * as serviceWorker from "./serviceWorker";
import store from "./utils/store";

import "./index.css";
import App from "./App";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { firebaseConfig } from "./utils/config";

const fbConfig = firebaseConfig;

// react-redux-firebase config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

// Initialize firebase instance
try {
  firebase.initializeApp(fbConfig);
} catch (err) {
  console.error(err);
}

try {
  firebase.firestore();
} catch (err) {
  console.error(err);
}

const rrfProps = {
  firebase,
  config: rrfConfig,

  dispatch: store.dispatch,
  createFirestoreInstance // <- needed if using firestore
};

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
