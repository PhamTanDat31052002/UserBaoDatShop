import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import IFAccountCRUD from "../Components/IFAccountCRUD";
import Login from './Login';
export default function IFAccount(){
    function getToken() {
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        if (userToken == null) return null;
        const now = new Date()
        if (now.getDate() > userToken.expiry) {
          localStorage.clear()
          return null
        }
        return userToken
      }
      const token = getToken();
      if (token == null) {
        return <Login />
      }
    return(
        <>
        <Header/>
        <IFAccountCRUD/>
        <Footer/>
        </>
    )
}