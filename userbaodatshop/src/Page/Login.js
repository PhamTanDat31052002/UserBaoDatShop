import React from "react";
import Header from "../Components/Header";
import LoginCRUD from "../Components/LoginCRUD";
import Footer from "../Components/Footer";

export default function Login() {

    return(
        <>
        <div style={{ backgroundColor: "gainsboro"}} >    
                <Header/>
        <LoginCRUD/>
        </div>
        </>
    )
}