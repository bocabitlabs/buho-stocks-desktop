import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import PrivateRoute from "./routes/PrivateRoute";
import LoginRoute from "./routes/LoginRoute/LoginRoute";
import RegisterRoute from "./routes/RegisterRoute/RegisterRoute";
import HomeRoute from "./routes/HomeRoute/HomeRoute";
import CompanyDetailsRoute from "./routes/CompanyDetailsRoute/CompanyDetailsRoute";

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
            <Route exact path="/register" component={RegisterRoute} />
            <Route exact path="/company/:companyId" component={CompanyDetailsRoute} />
          </div>
        </Router>
      </header>
    </div>
  );
}

export default App;
