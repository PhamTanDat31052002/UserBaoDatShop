
import './App.css';
import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom"
import Home from "./Page/Home";
import Cart from './Page/Cart';
import Checkout from './Page/Checkout';
import Contact from './Page/Contact';
import Product from './Page/Product';
import DetailProduct from './Page/DetailProduct';
import Login from './Page/Login';
import IFAccount from './Page/IFAccount';
import Pay from './Page/Pay';
import Loading from './Page/Loading';
import Invoice from './Page/Invoice';

function App() {
 
  
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/cart" exact element={<Cart />} />
        <Route path='/checkout' exact element={<Checkout />} />
        <Route path='/contact' exact element={<Contact />} />
        <Route path='/product' exact element={<Product />} />
        <Route path='/detail' exact element={<DetailProduct />} />
        <Route path='/login' exact element={<Login />} />
        <Route path='/account' exact element={<IFAccount/>}/>
        <Route path='/pay' exact element={<Pay/>}/>
        <Route path='/loading' exact element={<Loading/>}/>
        <Route path='/invoice' exact element={<Invoice/>}/>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
