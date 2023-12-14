import React from "react";

import { Sort } from "../components/Sort";
import { Categories } from "../components/Categories";
import { PizzaBlock } from "../components/PizzaBlock";
import Sceleton from "../components/PizzaBlock/Skeleton";
import { Pagination } from "../components/Pagination";
import { SearchContext } from "../App";

export function Home() {
  const { searchValue } = React.useContext(SearchContext);
  // получение с сервера даных
  const [items, setItems] = React.useState([]);
  // скелитон
  const [isLoading, setIsLoading] = React.useState(true);
  // категория
  const [categoryId, setCategoryId] = React.useState(0);
  //сортировка
  const [sortType, setSortType] = React.useState({
    name: "популярности (DESC)",
    sortProperty: "rating",
  });
  //получение количество страниц
  const [numberPageServer, setNumberPageServer] = React.useState(1);
  // для страниц
  const [currentPage, setCurrentPage] = React.useState(numberPageServer);

  const pizzas = items.map((item) => {
    return <PizzaBlock {...item} key={item.id} />;
  });
  const sceletons = [...new Array(6)].map((_, index) => {
    return <Sceleton key={index} />;
  });

  React.useEffect(() => {
    // статус для Sceleton
    setIsLoading(true);

    // выбор сортировки
    const order = sortType.sortProperty.includes("-") ? "asc" : "desc";
    // замена символа
    const sortby = sortType.sortProperty.replace("-", "");
    // выбор категории
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    // поиск по названию
    const search = searchValue ? `&search=${searchValue}` : "";

    // запрос на сервер для получения данных
    fetch(
      `http://localhost:5500/data?p=${currentPage}&l=6&${category}&sortby=${sortby}&orderBy=${order}${search}`,
    )
      .then((res) => res.json())
      .then((json) => {
        setItems(json.result);
        setNumberPageServer(json.numberOfPages);
        // статус для Sceleton
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, currentPage, searchValue, numberPageServer]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={(id) => setCategoryId(id)} />
        {<Sort value={sortType} onChangeSort={(i) => setSortType(i)} />}
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? sceletons : pizzas}</div>
      {numberPageServer > 1 ? (
        <Pagination
          numberPageServer={numberPageServer}
          onChangePage={(number) => {
            setCurrentPage(number);
          }}
        />
      ) : (
        ""
      )}
    </div>
  );
}
