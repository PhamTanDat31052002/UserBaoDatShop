import React from "react";
import CheckoutBuyNowCRUD from "../Components/CheckoutBuyNowCRUD";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import PageContainer from "./ten";
export default function CheckoutBuyNow(){
    return(
        <>
            <Header/>
            <CheckoutBuyNowCRUD/>
            <Footer/>
        </>
    )
}