
import './App.css';
import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom"
import Home from "./Page/Home";
import Cart from './Page/Cart';
import Checkout from './Page/Checkout';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/cart" exact element={<Cart/>} />
        <Route path='/checkout' exact element={<Checkout/>}/>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
