import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

import reducer from "../reducers/root";

/**
 * Render a component with React Router support
 * @param {*} ui
 * @param {*} param1
 */
function renderWithRouter(
  ui,
  {
    route = "/",
    history = createMemoryHistory({ initialEntries: [route] })
  } = {}
) {
  const Wrapper = ({ children }) => (
    <Router history={history}>{children}</Router>
  );
  return {
    ...render(ui, { wrapper: Wrapper }),
    // adding `history` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    history
  };
}

/**
 * Render a component with React Router and Redux support
 * @param {} ui
 * @param {*} param1
 */
function renderWithRouterAndRedux(
  ui,
  {
    route = "/",
    history = createMemoryHistory({ initialEntries: [route] }),
    initialState = {},
    store = createStore(reducer, initialState),
    ...renderOptions
  } = {}
) {
  const Wrapper = ({ children }) => (
    <Provider store={store}>
      <Router history={history}>{children}</Router>
    </Provider>
  );
  return {
    ...rtlRender(ui, { wrapper: Wrapper, ...renderOptions }),
    // adding `history` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    history
  };
}

/**
 * Override the render method of React Testing Library to add Redux support
 * @param {*} ui
 * @param {*} param1
 */
function render(
  ui,
  {
    initialState = {},
    store = createStore(reducer, initialState),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from "@testing-library/react";

// override render method
export { render, renderWithRouter, renderWithRouterAndRedux };
