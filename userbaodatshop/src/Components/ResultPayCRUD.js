import React from "react";
import { useEffect } from 'react';
import { variable } from "../Variable"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Space, message } from 'antd';
import queryString from 'query-string';
import { useLocation } from "react-router-dom";
export default function ResultPayCRUD() {
    const [duLieuPay, setDuLieuPay] = ('')
    var history = useNavigate();
    const count = 0;
    const url = new URL(window.location.href);
    const result = url.toString().replace('http://localhost:3000/resultpay', '');
    const [dataPay, setDataPay] = useState('')
    useEffect(() => {

        if (result != null) {
            fetch(variable.API_URL + "APIPayment/GeDATaURL" + result, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            })
                .then(response => response.json())
                .then(result => {
                    setDataPay(result)
                }, (error) => {
                    console.log(error);
                })
        }

        if (dataPay.success == true) {
            console.log(dataPay)
            const token = dataPay.token;
            var orderDescription = dataPay.orderDescription.split('/')
            const paymentmethod = orderDescription[0];
            const pay = orderDescription[1];
            const total = orderDescription[2];
            const address = orderDescription[3];
            const phone = orderDescription[4];
            const name = orderDescription[5];
            fetch(variable.API_URL + "Inovices/CreateInvoice", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'Authorization': `Bearer ${token.value}`
                },
                body: JSON.stringify({
                    nameCustomer: name,
                    total: total,
                    shippingAddress: address,
                    shippingPhone: phone,
                    paymentMethods: paymentmethod,
                    pay: pay
                })
            })
                .then(response => response.json())
                .then(re => {
                    if (re == true) {

                        message.success("Đặt hàng thành công!")
                        history("/invoice")
                    }

                }, (error) => {
                    console.log(error);
                })
        }

    }, [count])

    return (
        <>

        </>
    )
}