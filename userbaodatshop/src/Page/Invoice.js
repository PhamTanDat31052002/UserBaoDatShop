import React from "react";
import InvoiceCRUD from "../Components/InvoiceCRUD";
import Header from "../Components/Header";
import Footer from "../Components/Footer"

export default function Invoice(){
   return(
    <>
     <Header/>
    <InvoiceCRUD/>
    <Footer/>
    </>
   )
}