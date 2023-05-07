
import './App.css';
import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom"
import Home from "./Page/Home";
import Cart from './Page/Cart';
import Checkout from './Page/Checkout';
import Contact from './Page/Contact';
import Product from './Page/Product';

function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/cart" exact element={<Cart/>} />
        <Route path='/checkout' exact element={<Checkout/>}/>
        <Route path='/contact' exact element={<Contact/>}/>
        <Route path='/product' exact element={<Product/>}/>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
