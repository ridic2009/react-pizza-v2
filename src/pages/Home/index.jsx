// Components
import Categories from "../../components/Categories";
import Sort from "../../components/Sort";
import PizzaItem from "../../components/PizzaItem";
import Loader from "../../components/Loader";
import Pagination from "../../components/Pagination";

// libs and hooks
import { v4 as uuidv4 } from "uuid";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppContext } from "../../App";

import { setCategoryId } from "../../redux/slices/filterSlice";

export default function Home() {
  const { items, setItems, isLoading, setIsLoading } = useContext(AppContext);
  const [currentPage, setCurrentPage] = useState(1);

  // redux hooks
  const { categoryId, sort } = useSelector(state => state.filter);
  const { searchValue } = useSelector(state => state.search)
  const dispatch = useDispatch();

  const onChangeCategoryId = id => {
    dispatch(setCategoryId(id));
  };

  useEffect(() => {

    const search = searchValue ? `search=${searchValue}&` : ''
    const category = categoryId > 0 ? `&category=${categoryId}` : ''

    setIsLoading(true);
    const fetchPizzaFromBackend = async () => {
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
    fetchPizzaFromBackend();
  }, [sort, categoryId, searchValue, currentPage]);

  return (
    <div className="content">
      <div className="container">
        <div className="content__top">
          <Categories
            value={categoryId}
            onChangeCategory={idx => onChangeCategoryId(idx)}
          />
          <Sort  />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {isLoading
            ? [...new Array(10)].map(item => <Loader key={uuidv4()} />)
            : items.map(item => <PizzaItem key={uuidv4()} {...item} />)}
        </div>
        <Pagination
          onChangePage={numberOfPage => setCurrentPage(numberOfPage)}
        />
      </div>
    </div>
  );
}
