import * as React from "react";
import * as ReactDOM from "react-dom/client";

// подключение библиотеки Router
import { BrowserRouter } from "react-router-dom";

import { App } from "./App";

// redux store file
import { store } from "./redux/store";
// redux подключение библиотеки
import { Provider } from "react-redux";
const rootElem = document.getElementById("root");

if (rootElem) {
  const root = ReactDOM.createRoot(rootElem);
  root.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
  );
}
