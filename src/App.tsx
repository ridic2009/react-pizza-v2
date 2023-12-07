import Header from "./components/Header";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";

import "./scss/app.scss";
import { createContext, useState } from "react";
import { Routes, Route } from "react-router-dom";



export const AppContext = createContext({});

export default function App() {

  const [isLoading, setIsLoading] = useState(true);

  return (
    <AppContext.Provider
      value={{
        isLoading,
        setIsLoading
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
