import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { FirebaseContext } from "../context/firebaseContext";
import { Layout } from "../Layout/";

let PrivateRoute = ({ component: Component, path, exact }) => {
  return (
    <Route
      exact={exact}
      path={path}
      render={props => {
        return (
          <FirebaseContext.Consumer>
            {context =>
              context.isUserSignedIn ? (
                <Layout>
                  <Component {...props} {...context} />
                </Layout>
              ) : (
                <Redirect
                  to={{ pathname: "/login", state: { from: props.location } }}
                />
              )
            }
          </FirebaseContext.Consumer>
        );
      }}
    />
  );
};

let PublicRoute = ({ component: Component, path, exact, ...routeProps }) => {
  return (
    <Route
      exact={exact}
      path={path}
      render={props => {
        return (
          <FirebaseContext.Consumer>
            {context => (
              <Layout>
                <Component {...props} {...context} />
              </Layout>
            )}
          </FirebaseContext.Consumer>
        );
      }}
    />
  );
};
export { PublicRoute, PrivateRoute };
