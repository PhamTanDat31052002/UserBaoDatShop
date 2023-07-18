import React from "react";
import Header from "../Components/Header";
import { useState, useEffect } from 'react'
import { variable } from "../Variable"
import ER404 from "../Page/ER404"
import DoiMatKhauCRUD from "../Components/DoiMatKhauCRUD";
import { NavLink, useNavigate } from 'react-router-dom';
import { Alert, Space, message } from 'antd';
import PageContainer from "./ten";
export default function DoiMatKhau()
{

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
        <DoiMatKhauCRUD/>
        </>
    )
    }
}