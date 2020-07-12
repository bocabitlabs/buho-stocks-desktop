import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { getFirebaseAuth } from "../selectors/profile";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }: RouteProps) => {
  const { uid }: any = useSelector(getFirebaseAuth);
  if (!Component) return null;
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        !!uid ? <Component {...routeProps} /> : <Redirect to={"/login"} />
      }
    />
  );
};

export default PrivateRoute;
