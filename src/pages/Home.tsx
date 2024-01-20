import * as React from "react";
import { useNavigate } from "react-router-dom";
// отображения параметров URL
import qs from "qs";

// redux (useSelector)- чтение, (useDispatch) - запись
import { useSelector } from "react-redux";

// useAppDispatch  костомный useDispatch
import { useAppDispatch } from "../redux/store";

// Slice Методы для изминений записи в Slice файле filterSlice.js
import { selectFilter, setCategoryId, setFiltres } from "../redux/slices/filterSlice";

// Slice Методы для изминений записи в Slice файле pizzasSlice.ts
import { ResultPizzas, fetchPizzas, selectPizzaData } from "../redux/slices/pizzasSlice";

import { SortPopup, list } from "../components/Sort";
import { Categories } from "../components/Categories";
import { PizzaBlock } from "../components/PizzaBlock";
import Sceleton from "../components/PizzaBlock/Skeleton";
import { Pagination } from "../components/Pagination";

export function Home() {
  // создаётся один раз при первом рендере
  const onChangeCategory = React.useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);

  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  // redux получение из filter
  const { categoryId, sortType, currentPage, limit, searchValue } = useSelector(selectFilter);

  // redux получение из pizzas
  const { items, status } = useSelector(selectPizzaData);

  // redux запись
  const dispatch = useAppDispatch();

  // гинирация блоков пиц
  const pizzas = items.result.map((item: ResultPizzas, index: number) => {
    return <PizzaBlock key={index} {...item} />;
  });
  // отображение запросса на сервер
  const sceletons = [...new Array(6)].map((_, index) => {
    return <Sceleton key={index} />;
  });

  // запрос на сервер
  async function getPizzas() {
    // выбор сортировки
    const order = sortType.sortProperty.includes("-") ? "asc" : "desc";
    // // замена символа
    // const sortBy = sortType.sortProperty.replace("-", "");
    // выбор категории
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    // поиск по названию
    const search = searchValue ? `&search=${searchValue}` : "";

    // запрос на сервер для получения данных Синхронное выполнени

    dispatch(
      fetchPizzas({
        order,
        sortType,
        category,
        search,
        currentPage,
        limit,
      }),
    );

    window.scrollTo(0, 0);
  }

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
        limit: 6,
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
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sortType, currentPage, searchValue, limit]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        {<SortPopup />}
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <div className="content__error">
          <h1>Ошибка на сервере</h1>
        </div>
      ) : (
        <div className="content__items">{status === "loading" ? sceletons : pizzas}</div>
      )}

      {items.numberOfPages > 1 ? <Pagination allPages={items.numberOfPages} /> : ""}
    </div>
  );
}
