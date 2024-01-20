import * as React from "react";
import { Routes, Route } from "react-router-dom";

import "./scss/app.scss";
import "./App.css";

// components
import { Header } from "./components/Header";
// import { FullPizza } from "./pages/FullPizza";
import { Home } from "./pages/Home";
// import { Cart } from "./pages/Cart";
// import { NotFound } from "./pages/NotFound";

const Cart = React.lazy(() => import("./pages/Cart"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const FullPizza = React.lazy(() => import("./pages/FullPizza"));

export function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/cart"
            element={
              <React.Suspense
                fallback={
                  <div>
                    <p>загрузка</p>
                  </div>
                }>
                <Cart />
              </React.Suspense>
            }
          />
          <Route
            path="/pizza/:id"
            element={
              <React.Suspense
                fallback={
                  <div>
                    <p>загрузка</p>
                  </div>
                }>
                <FullPizza />
              </React.Suspense>
            }
          />
          <Route
            path="*"
            element={
              <React.Suspense
                fallback={
                  <div>
                    <p>загрузка</p>
                  </div>
                }>
                <NotFound />
              </React.Suspense>
            }
          />
        </Routes>
      </div>
    </div>
  );
}
