import React from "react";
import { useEffect } from 'react';
import { variable } from "../Variable"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Space, message } from 'antd';
import queryString from 'query-string';
import { useLocation } from "react-router-dom";
export default function ResultPayBuyNowCRUD() {
    const [duLieuPay, setDuLieuPay] = ('')
    var history = useNavigate();
    const count = 0;
    const url = new URL(window.location.href);
    const result = url.toString().replace('http://localhost:3000/resultpay', '');
    const [dataPay, setDataPay] = useState('')
    const getToken = (() => {
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken
    })
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


    }, [count])

    const AddInvoice=(()=>{
             const token = getToken();
            var orderDescription = dataPay.orderDescription.split('/')
            var paymentmethod = orderDescription[0];
         
            const total = orderDescription[2];
            const address = orderDescription[3];
            const phone = orderDescription[4];
            const name = orderDescription[5];
            if(paymentmethod=="True")
            {
                paymentmethod=true;
            }
            else{
                paymentmethod=false
            }
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
                    pay: true
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
        

    })
    return (
         <>
 <div  className="login-box">
     <h2 style={{color:'black'}}>Xác nhận thanh toán</h2>
     <form> 
   
        <a style={{marginLeft:"20%",marginBottom:"4%"}} onClick={()=>{
            dataPay.success==true?
                AddInvoice(): message.error("Hoàn tất đơn hàng thất bại!")
        }}>
         <span></span>
         <span></span>
         <span></span>
         <span></span>
         Hoàn tất đơn hàng
       </a>
     </form>
 	<div>
 		<span style={{fontStyle:"italic"}}>*Lưu ý: Vui lòng bấm hoàn tất đơn hàng để xác nhận thanh toán và đặt đơn hàng! </span>
 		
 	</div>
 
   </div>

        </>
    )
}