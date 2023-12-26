import React from "react";
import { useNavigate } from "react-router-dom";
// отображения параметров URL
import qs from "qs";

// redux (useSelector)- чтение, (useDispatch) - запись
import { useSelector, useDispatch } from "react-redux";
// Slice Методы для изминений записи в Slice файле filterSlice.js
import {
  setCategoryId,
  setCurrentPage,
  setNumberOfPages,
  setFiltres,
} from "../redux/slices/filterSlice";

import axios from "axios";

import { Sort, list } from "../components/Sort";
import { Categories } from "../components/Categories";
import { PizzaBlock } from "../components/PizzaBlock";
import Sceleton from "../components/PizzaBlock/Skeleton";
import { Pagination } from "../components/Pagination";
import { SearchContext } from "../App";

export function Home() {
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  // redux получение id
  const { categoryId, sortType, currentPage, numberOfPages, limit } = useSelector(
    (state) => state.filter,
  );

  // redux запись
  const dispatch = useDispatch();

  // поиск
  const { searchValue } = React.useContext(SearchContext);
  // получение с сервера даных о пицах
  const [items, setItems] = React.useState([]);
  // скелитон
  const [isLoading, setIsLoading] = React.useState(true);

  const pizzas = items.map((item) => {
    return <PizzaBlock {...item} key={item.id} />;
  });

  // отображение запросса на сервер
  const sceletons = [...new Array(6)].map((_, index) => {
    return <Sceleton key={index} />;
  });

  // запрос на сервер
  const fetchPizzas = () => {
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
    axios
      .get(
        `http://localhost:5500/data?p=${currentPage}&l=${limit}&${category}&sortby=${sortby}&orderBy=${order}${search}`,
      )
      .then((data) => {
        const result = data.data;
        setItems(result.result);
        dispatch(setCurrentPage(result.page));
        dispatch(setNumberOfPages(result.numberOfPages));
        console.log(data);
        setIsLoading(false);
      });
  };

  // Если был первый рендер то проверяем URL-параметры и сохраняем в Redux
  React.useEffect(() => {
    if (window.location.search) {
      // чтение параметров из URL
      const params = qs.parse(window.location.search.substring(1));

      const sort = list.find((obj) => obj.sortProperty === params.sort);

      dispatch(setFiltres({ ...params, sort }));
      isSearch.current = true;
    }
  }, []);

  // Если изменили параметры и был первый рендер
  React.useEffect(() => {
    // отображение параметров в URL
    if (isMounted.current) {
      const queryString = qs.stringify({
        page: currentPage,
        sort: sortType.sortProperty,
        categoryId,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, currentPage]);

  // Если был первый рендер, то запрашиваем пиццы
  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      fetchPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sortType, currentPage, searchValue, limit]);
  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={(id) => dispatch(setCategoryId(id))} />
        {<Sort />}
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? sceletons : pizzas}</div>
      {numberOfPages > 1 ? <Pagination /> : ""}
    </div>
  );
}
