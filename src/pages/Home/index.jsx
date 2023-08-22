import Categories from "../../components/Categories";
import Sort from "../../components/Sort";
import PizzaItem from "../../components/PizzaItem";
import Loader from "../../components/Loader";


import { v4 as uuidv4 } from "uuid";
import { useContext } from "react";
import { AppContext } from "../../App";


export default function Home() {

    const {items , isLoading} = useContext(AppContext)

    return (
        <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {isLoading
              ? [...new Array(10)].map(item => <Loader key={uuidv4()}/>)
              : items.map(item => (<PizzaItem key={uuidv4()} {...item} />))}
          </div>
        </div>
      </div>
    )
}