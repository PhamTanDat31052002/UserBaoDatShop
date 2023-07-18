import React from "react";
import ProductCRUD from "../Components/ProductCRUD";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import PageContainer from "./ten";
export default function Product()
{
    return(
        <>
        <Header/>
        <ProductCRUD/>
        <Footer/>
        </>
    )
}