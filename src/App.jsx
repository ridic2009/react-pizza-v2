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
  const [searchValue, setSearchValue] = useState('')

  return (
    <AppContext.Provider
      value={{
        items,
        isLoading,
        setItems,
        setIsLoading
      }}
    >
      <div className="App">
        <div className="wrapper">
          <Header value={searchValue} setValue={setSearchValue}/>

          <Routes>
            <Route path="/" element={<Home value={searchValue} />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
