import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import PrivateRoute from "./routes/PrivateRoute";
import LoginRoute from "./routes/LoginRoute";
import RegisterRoute from "./routes/RegisterRoute";
import HomeRoute from "./routes/HomeRoute";

function App() {
  /**
   * Main
   */
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <div>
            <PrivateRoute exact path="/" component={HomeRoute} />
            <Route exact path="/login" component={LoginRoute} />
            <Route exact path="/Register" component={RegisterRoute} />
          </div>
        </Router>
      </header>
    </div>
  );
}

export default App;
