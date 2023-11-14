import React from "react";
import "./scss/app.scss";
import "./App.css";

// components
import { Header } from "./components/Header";
import { Sort } from "./components/Sort";
import { Categories } from "./components/Categories";
import { PizzaBlock } from "./components/PizzaBlock";

function App() {
  // хронилище всех пиц
  const [items, setItems] = React.useState([]);
  React.useEffect(() => {
    // запрос на сервер для получения данных
    fetch("http://localhost:5500/data")
      .then((res) => res.json())
      .then((json) => setItems(json));
  }, []);

  // console.log(items);
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
            {items.map((item) => {
              return <PizzaBlock key={item.id + item.title} {...item} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
