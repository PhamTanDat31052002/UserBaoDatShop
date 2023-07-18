import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import ColectionCRUD from "../Components/ColectionCRUD";
import PageContainer from "./ten";
export default function Colection(){
    return(
        <>
            <Header/>
            <ColectionCRUD/>
            <Footer/>
        </>
    )
}