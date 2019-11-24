import React, { lazy, Suspense } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { MoonLoader } from "react-spinners";
import { PublicRoute, PrivateRoute } from "./RouteGuards/";
import FirebaseAuthProvider from "./context/firebaseContext";
import "./App.css";

const HomePage = lazy(() => import("./pages/HomePage"));

function App() {
  return (
    <main className="App">
      <BrowserRouter>
        <FirebaseAuthProvider>
          <Suspense fallback={<MoonLoader size={25} loading />}>
            <Switch>
              <PublicRoute exact path="/" component={HomePage} />
            </Switch>
          </Suspense>
        </FirebaseAuthProvider>
      </BrowserRouter>
    </main>
  );
}

export default App;
