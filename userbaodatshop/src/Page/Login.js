import React, { useEffect } from "react";
import Header from "../Components/Header";
import LoginCRUD from "../Components/LoginCRUD";
import Footer from "../Components/Footer";
import ER404 from "../Page/ER404"
import { variable } from "../Variable"
import { Result, message } from "antd";
export default function Login() {


    const getToken = (() => {
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken
    })
    useEffect(() => {
        const url = new URL(window.location.href);
        const token = url.searchParams.get("Token")
        const email = url.searchParams.get("Email")
        if (token != null && email != null) {
            const token = url.searchParams.get("Token").replace(/\s/g, "+");
            fetch(variable.API_URL + "Account/ConfirmEmail", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                }
                , body: JSON.stringify({
                    token: token,
                    email: email,
                })
            }).then(response => response.json()).then((Result) => {
                if (Result == "Thành công")
                    message.success("Xác thực thành công, mời bạn đăng nhập")
            }
            )
        }
    }, [])
    const token = getToken()
    if (token != null) {
        return (
            <>

                <ER404 />
            </>
        )
    }
    else {
        return (
            <>
                <div style={{ backgroundColor: "gainsboro" }} >
                    <Header />
                    <LoginCRUD />
                </div>
            </>
        )
    }

}