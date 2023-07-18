import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import DetailProductCRUD from "../Components/DetailProductCRUD";
import PageContainer from "./ten";
export default function DetailProduct()
{
    return(
        <>
        <Header/>
        <DetailProductCRUD/>
        <Footer/>
        </>
        
    )
}