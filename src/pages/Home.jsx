import React from "react";

import { Sort } from "../components/Sort";
import { Categories } from "../components/Categories";
import { PizzaBlock } from "../components/PizzaBlock";
import Sceleton from "../components/PizzaBlock/Skeleton";

export function Home() {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // запрос на сервер для получения данных
    fetch("http://localhost:5500/data")
      .then((res) => res.json())
      .then((json) => {
        setItems(json);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => {
              return <Sceleton key={index} />;
            })
          : items.map((item) => {
              return <PizzaBlock {...item} key={item.id} />;
            })}
      </div>
    </div>
  );
}
