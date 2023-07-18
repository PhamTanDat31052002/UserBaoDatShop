import React from 'react'
// import "../Assets/css/"
import CartCRUD from '../Components/CartCRUD'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import jwt_decode from "jwt-decode";
import Login from './Login';
import PageContainer from "./ten";
export default function Cart() {
  function getToken() {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    if (userToken == null) return null;
    const now = new Date()
    if (now.getDate() > userToken.expiry) {
      localStorage.clear()
      return null
    }
    return tokenString
  }
      const token = getToken();
      if (token == null) {
        return <Login />
      }
      
  const decoded = jwt_decode(token);
  if (decoded.RoleUser =="Costumer")
    return (
      <PageContainer title="Giỏ hàng" description="this is Sample page">
        <div>
            
            <>
            <Header/>
            <CartCRUD />
            <Footer/>
            </>
        </div>
      </PageContainer>
    )
    else  return   <Login />    
}