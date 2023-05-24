import React from 'react'
// import "../Assets/css/"
import CartCRUD from '../Components/CartCRUD'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import Login from './Login';
export default function Cart() {
    function setToken(userToken) {
        localStorage.setItem('token', JSON.stringify(userToken));
    }

    function getToken() {
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken
    }
    const token = getToken();
    if (token == null) {

        return <Login setToken={setToken} />
    }
    return (
        <div>
            
            <>
            <Header/>
            <CartCRUD />
            <Footer/>
            </>
        </div>
    )
}