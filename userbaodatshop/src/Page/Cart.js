import React from 'react'
// import "../Assets/css/"
import CartCRUD from '../Components/CartCRUD'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
export default function Cart() {
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