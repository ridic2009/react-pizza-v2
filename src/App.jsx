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
        console.log("test");
        setIsLoading(false);
        window.moveTo(0, 0);
      }
    };
    fetchPizzaFromBackend();
  }, []);

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const filterByCategory = async (idx, category) => {
    setIsLoading(true)
    try {
      let categories = {
        Все: "",
        Мясные: 1,
        Вегетарианская: 2,
        Гриль: 3,
        Острые: 4,
        Закрытые: 5
      };

      const resp = await fetch(
        `https://64e4d6a0c55563802913d5cf.mockapi.io/pizza?category=${categories[category]}`
      );
      const data = await resp.json();

      console.log(data);
      setItems(data);
      setIsLoading(false)
    } catch (error) {
      console.error(
        "Вознилка ошибка при выполнении функции filterByCategory",
        error
      );
    } finally {
      setActiveIndex(idx);
    }
  };
  
  return (
    <AppContext.Provider
      value={{ items, isLoading, activeIndex, filterByCategory }}
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
