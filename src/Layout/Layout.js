import React, { Fragment } from "react";
import { Container } from "semantic-ui-react";

import { FirebaseContext } from "../context/firebaseContext";
import { Navbar } from "./Navbar";

const Layout = ({ children }) => (
  <FirebaseContext.Consumer>
    {context => (
      <Fragment>
        <Navbar context={context} />
        <Container style={{ marginTop: "105px" }}>{children}</Container>
      </Fragment>
    )}
  </FirebaseContext.Consumer>
);

export default Layout;
