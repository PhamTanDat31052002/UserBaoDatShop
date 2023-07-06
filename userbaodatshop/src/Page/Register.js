import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import RegisterCRUD from "../Components/RegisterCRUD";
import ER404 from "../Page/ER404"
export default function Register(){
    const getToken = (() => {
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken
    })
    const token=getToken()
    if(token!=null)
    {
        return(<ER404/>)
    }
    else{
        return(
        
            <>
                <Header/>
                <RegisterCRUD/>
               
            </>
        )
    }
   
}