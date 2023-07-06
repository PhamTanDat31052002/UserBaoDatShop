import React from "react";
import { useEffect } from 'react';
import { variable } from "../Variable"
import { useState } from 'react';
import { Alert, Space, message } from 'antd';
    export default function ResultPayCRUD()
    {
        const [duLieuPay,setDuLieuPay]=('')
        const getToken = (() => {
            const tokenString = localStorage.getItem('token');
            const userToken = JSON.parse(tokenString);
            return userToken
        })
        useEffect(() => {
            const token=getToken()
            // const url = new URL(window.location.href);
            // const token = url.searchParams.get("Token")
            // const email = url.searchParams.get("Email")
            // if (token != null && email != null) {
            //     const token = url.searchParams.get("Token").replace(/\s/g, "+");
                fetch(variable.API_URL + "APIPayment/GeDATaURL", {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        'Authorization': `Bearer ${token.value}`,
                    }
                    
                    })
                    .then(response => response.json())
                    .then(data => setDuLieuPay(data)).catch(err => console.log(err))

            
        }, [])
        console.log(duLieuPay)
        return(
            <>
            
            </>
        )
    }