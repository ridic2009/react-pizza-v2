import Header from "./components/Header";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";

import "./scss/app.scss";
import { createContext, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

export const AppContext = createContext();

function App() {
  useEffect(() => {
    const fetchPizzaFromBackend = async () => {
      try {
        const resp = await fetch(
          "https://64e4d6a0c55563802913d5cf.mockapi.io/pizza"
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
  }, []);

  const [items, setItems] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const [activeIndex, setActiveIndex] = useState(0);
  const [activeSort, setActiveSort] = useState("популярности");


  const fetchData = async url => {
    setIsLoading(true)
    const resp = await fetch(
      `${url}`
    );

    const data = await resp.json()
    setItems(data)
    setIsLoading(false)
  }

  const filterByCategory = async (idx, category) => {
    try {
      const categories = {
        Все: "",
        Мясные: 1,
        Вегетарианская: 2,
        Гриль: 3,
        Острые: 4,
        Закрытые: 5
      };

      fetchData(`https://64e4d6a0c55563802913d5cf.mockapi.io/pizza?category=${categories[category]}`)

    } catch (error) {
      console.error(
        "Вознилка ошибка при выполнении функции filterByCategory",
        error
      );
    } finally {
      setActiveIndex(idx);
    }
  };

  const sortItems = async sortMethod => {
    try {
      console.log(sortMethod);

      if (sortMethod === "популярности") {
          fetchData(`https://64e4d6a0c55563802913d5cf.mockapi.io/pizza?sortBy=rating&order=desc`)
      }

      if (sortMethod === 'цене') {
        fetchData(`https://64e4d6a0c55563802913d5cf.mockapi.io/pizza?sortBy=price`)
      }

      if (sortMethod === 'алфавиту') {
        fetchData(`https://64e4d6a0c55563802913d5cf.mockapi.io/pizza?sortBy=title&order=asc`)
      }
    } catch (error) {
      console.error("Возникла ошибка при выполнении функции sortItems", error);
    } finally {
      setActiveSort(sortMethod);
      setIsOpen(false);
    }
  };

  return (
    <AppContext.Provider
      value={{
        items,
        isLoading,
        isOpen,
        activeIndex,
        activeSort,
        filterByCategory,
        sortItems,
        setIsOpen
      }}
    >
      <div className="App">
        <div className="wrapper">
          <Header />

          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
