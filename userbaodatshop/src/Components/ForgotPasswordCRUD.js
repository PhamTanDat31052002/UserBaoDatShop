import React from "react"
import { useState, useEffect } from 'react'
import { variable } from "../Variable"
import "../Assets/css/styleLogin.css"
import PropTypes from 'prop-types';import jwt_decode from "jwt-decode";
import { message } from "antd";

export default function ForgotPasswordCRUD(){
    var [email,setEmail]=useState('');
  
    const getToken = (() => {
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken
    })
    const ChangeEmail = (value) => {
		setEmail(value)
	}
   

    const guiMailXacThuc=(()=>{
        
        console.log(email)
        fetch(variable.API_URL + "Account/ForgotPasswordCustomer", {
            method: "POST",
            headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
             body: JSON.stringify({
                email: email,
            
            })
        }).then(response => response.json())
            .then(data => {
                if(data=="Thành công")
                    return message.success("Đã gửi link đổi lại mật khẩu vào Email của bạn")
            }).catch(err => console.log(err))
    })
    return(
        <>
        <div className="login-box">
    <h2 style={{color:'black'}}>Quên mật khẩu</h2>
    <form>
        
        
            <div className="user-box">
                <input type="text" className="form-style" placeholder="Email" onChange={(e) => ChangeEmail(e.target.value)} />
                <i className="input-icon uil uil-at"></i>
                <label>Nhập email đã đăng xác thực với tài khoản</label>
            </div>
        
      
    
      <a  onClick={()=>
        {
            if(email=='')
            {
                return message.error('Vui lòng nhập email đã xác thực với tài khoản!')
            }
         
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
            return message.error('Địa chỉ email không hợp lệ! Vui lòng nhập một địa chỉ email hợp lệ.');
            }
            guiMailXacThuc()
        }}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
       Tiếp tục
      </a>
    </form>
	

	
  </div>
        </>
    )
}