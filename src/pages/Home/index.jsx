// Components
import Categories from "../../components/Categories";
import Sort, { sortList } from "../../components/Sort";
import PizzaItem from "../../components/PizzaItem";
import Loader from "../../components/Loader";
import Pagination from "../../components/Pagination";

// libs and hooks
import { v4 as uuidv4 } from "uuid";
import { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import QueryString from "qs";

import {
  setCategoryId,
  setCurrentPage,
  setFilters
} from "../../redux/slices/filterSlice";

export default function Home() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { items, setItems, isLoading, setIsLoading } = useContext(AppContext);

  // redux hooks
  const { categoryId, sort, currentPage } = useSelector(state => state.filter);
  const { searchValue } = useSelector(state => state.search);

  // Получение пицц с мокапи
  const fetchPizzaFromBackend = async () => {
    setIsLoading(true);
    const search = searchValue ? `search=${searchValue}&` : "";
    const category = categoryId > 0 ? `&category=${categoryId}` : "";

    try {
      const resp = await fetch(
        `https://64e4d6a0c55563802913d5cf.mockapi.io/pizza?${search}page=${currentPage}&limit=4&sortBy=${sort.sortMethod}${category}&order=desc`
      );
      const data = await resp.json();
      setItems(data);
    } catch (error) {
      console.error("При запросе данных произошла ошибка! >:(", error);
    } finally {
      setIsLoading(false);
      window.moveTo(0, 0);
    }
  };

// Если изменили параметры и был первый рендер
  useEffect(() => {
    if (isMounted.current) {
      const qs = QueryString.stringify({
        sortMethod: sort.sortMethod,
        categoryId,
        currentPage
      });

      navigate(`?${qs}`);
    }
    isMounted.current = true;
  }, [sort.sortMethod, categoryId, currentPage]);

  // Если был первый рендер, то проверяем URL параметры и сохраняем в редакс
  useEffect(() => {
    if (window.location.search) {
      const parameters = QueryString.parse(window.location.search.substring(1));

      const sort = sortList.find(
        obj => obj.sortMethod === parameters.sortMethod
      );

      dispatch(
        setFilters({
          ...parameters,
          sort
        })
      );
      isSearch.current = true;
    }
  }, []);

  // Если был первый рендер, то запрашиваем пиццы
  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      fetchPizzaFromBackend();
    }
    isSearch.current = false;
  }, [sort.sortMethod, categoryId, searchValue, currentPage]);

  const onChangeCategoryId = id => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = page => {
    dispatch(setCurrentPage(page));
  };

  return (
    <div className="content">
      <div className="container">
        <div className="content__top">
          <Categories
            value={categoryId}
            onChangeCategory={idx => onChangeCategoryId(idx)}
          />
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {isLoading
            ? [...new Array(10)].map(item => <Loader key={uuidv4()} />)
            : items.map(item => <PizzaItem key={uuidv4()} {...item} />)}
        </div>
        <Pagination onChangePage={numberOfPage => onChangePage(numberOfPage)} />
      </div>
    </div>
  );
}
