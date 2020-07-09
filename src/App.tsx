import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Button } from "antd";
import {
  ExampleComponent,
  ExampleComponentWithType
} from "./components/ExampleComponent";
import AddCurrencyButton from "./components/AddCurrencyButton";
import CurrencyList from "./components/CurrencyList";

function App() {
  /**
   * Main
   */
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          Edit <code>src/App.tsx</code> and save to reload.
          <ExampleComponent who={"me"} />
          <ExampleComponentWithType who={"me2"} />
        </div>
        <Button type="primary">Learn React</Button>
        <AddCurrencyButton />
        <CurrencyList />
      </header>
    </div>
  );
}

export default App;
