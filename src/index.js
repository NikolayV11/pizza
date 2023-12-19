import React from "react";
import ReactDOM from "react-dom/client";

// подключение библиотеки Router
import { BrowserRouter } from "react-router-dom";

import { App } from "./App";

// redux store file
import { store } from "./redux/store";
// redux подключение библиотеки
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
);
