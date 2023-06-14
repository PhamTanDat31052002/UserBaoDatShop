import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import IFAccountCRUD from "../Components/IFAccountCRUD";

export default function IFAccount(){
    return(
        <>
        <Header/>
        <IFAccountCRUD/>
        <Footer/>
        </>
    )
}