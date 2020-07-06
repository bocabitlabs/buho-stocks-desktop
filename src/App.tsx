import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Button } from "antd";
import {
  ExampleComponent,
  ExampleComponentWithType
} from "./components/ExampleComponent";

function App() {
  /**
   * Main
   */
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
          <ExampleComponent who={"me"} />
          <ExampleComponentWithType who={"me2"} />
        </p>
        <Button type="primary">Learn React</Button>
      </header>
    </div>
  );
}

export default App;
