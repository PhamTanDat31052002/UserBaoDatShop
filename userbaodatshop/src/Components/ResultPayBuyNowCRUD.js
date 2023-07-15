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
    const result = url.toString().replace('http://localhost:3000/resultpaybuynow', '');
    const [dataPay, setDataPay] = useState('')
    const [ketQua, setKetQua] = useState('')
    const getToken = (() => {
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken
    })
  
    useEffect(() => {
        const token = getToken();
        fetch(variable.API_URL + "APIPayment/CheckReuslt" + result, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token.value}`,
            }
        }).then(response => response.json())
            .then(data => setKetQua(data)).catch(err => console.log(err))
    }, [])
    const [isLoading, setIsLoading] = useState(false);
    const AddInvoice = (() => {
        setIsLoading(true)
        const token = getToken();
        if (result != null) {
            fetch(variable.API_URL + "APIPayment/GeDATaURLBuyNow" + result, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'Authorization': `Bearer ${token.value}`
                },
            })
                .then(response => response.json())
                .then(result => {
                   

                    if (result.vnPayResponseCode == "00") {
                        setIsLoading(false)
                        message.success("Đã hoàn tất đơn hàng")
                        history("/invoice")
                    }
                    else if (result.vnPayResponseCode == "24") {
                        setIsLoading(false)
                        message.error("Không thể hoàn tất do khách hàng hủy giao dịch")
                        history("/")
                    }
                    else {
                        setIsLoading(false)
                        message.error("Không thể hoàn tất đơn")
                        history("/")
                    }
                }, (error) => {
                    console.log(error);
                })

        }
    })

    return (
        <>
            <div className="login-box">
                {
                     ketQua.vnPayResponseCode == "00" ? <h2 style={{ color: 'black' }}>Xác nhận thanh toán</h2>:<h2 style={{ color: 'black' }}>Thanh toán thất bại</h2>
                }
               
                <form>
                    {
                        ketQua.vnPayResponseCode == "00" ?
                            isLoading==false?   <a style={{ marginLeft: "15%", marginBottom: "4%" }} onClick={() => {

                                AddInvoice()
                            }}>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                Hoàn tất đơn hàng
                            </a>:null :
                            <a style={{ marginLeft: "15%", marginBottom: "4%" }} onClick={() => {
                                
                                history("/")
                            }}>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                Trở về trang chủ
                            </a>
                    }

                </form>
                <div>
                    {
                        isLoading==true?<span>Loading...</span>:null
                    }
                </div>
                <div>
                    {
                          ketQua.vnPayResponseCode == "00" ?<span style={{ fontStyle: "italic" }}>*Lưu ý: Vui lòng bấm hoàn tất đơn hàng để xác nhận thanh toán và đặt đơn hàng! </span>:null
                    }
                    

                </div>

            </div>

        </>
    )
}