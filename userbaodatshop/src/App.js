
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
import Favourites from './Page/Favourites';
import Register from './Page/Register';
import CheckoutBuyNow from './Page/CheckoutBuyNow';
import PayBuyNow from './Page/PayBuyNow';
import Colection from './Page/Colection';
import ForgotPassword from './Page/ForgotPassword';
import ER404 from './Page/ER404';
import ResultPay from './Page/ResultPay';
import ResultPayBuyNow from './Page/ResultPayBuyNow';
import DoiMatKhau from './Page/DoiMatKhau';
import ChangePass from './Page/ChangePass';


function App() {
 
  
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/cart" exact element={<Cart />} />
        <Route path='/checkout' exact element={<Checkout />} />
        <Route path='/contact' exact element={<Contact />} />
        <Route path='/product' exact element={<Product />} />
        <Route path='/detail/:id' exact element={<DetailProduct />}/>
        <Route path='/login' exact element={<Login />} />
        <Route path='/account' exact element={<IFAccount/>}/>
        <Route path='/pay' exact element={<Pay/>}/>
        <Route path='/loading' exact element={<Loading/>}/>
        <Route path='/invoice' exact element={<Invoice/>}/>   
        <Route path='/favourites' exact element={<Favourites/>}/>
        <Route path='/register' exact element={<Register/>}/>
        <Route path='/checkoutbuynow' exact element={<CheckoutBuyNow/>}/>
        <Route path='/paybuynow' exact element={<PayBuyNow/>}/>
        <Route path='/colection' exact element={<Colection/>}/>
        <Route path='/forgotpass' exact element={<ForgotPassword/>}/>
        <Route path='/error' exact element={<ER404/>}/>
        <Route path='/resultpay' exact element={<ResultPay/>}/>
        <Route path='/resultpaybuynow' exact element={<ResultPayBuyNow/>}/>
        <Route path='/doimatkhau' exact element={<DoiMatKhau/>}/>
        <Route path='/changepass' exact element={<ChangePass/>}/>
        <Route path="*" exact element={<ER404 />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
