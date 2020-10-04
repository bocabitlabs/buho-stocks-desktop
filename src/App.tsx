import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

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
            <Route exact path="/" component={HomeRoute} />
          </div>
        </Router>
      </header>
    </div>
  );
}

export default App;
