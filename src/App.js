import React from "react";
import "./scss/app.scss";
import "./App.css";

// components
import { Header } from "./components/Header";
import { Sort } from "./components/Sort";
import { Categories } from "./components/Categories";
import { PizzaBlock } from "./components/PizzaBlock";

import pizzas from "./assets/pizzas.json";
function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {pizzas.map((item) => {
              return <PizzaBlock key={item.id + item.title} {...item} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
