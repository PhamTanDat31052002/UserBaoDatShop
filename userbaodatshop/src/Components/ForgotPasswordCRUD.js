import React from "react"
import { useState, useEffect } from 'react'
import { variable } from "../Variable"
import "../Assets/css/styleLogin.css"
import PropTypes from 'prop-types';import jwt_decode from "jwt-decode";
import { message } from "antd";
import { NavLink, useNavigate } from 'react-router-dom';
export default function ForgotPasswordCRUD(){
    var [email,setEmail]=useState('');
    const history = useNavigate()
    const getToken = (() => {
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken
    })
    const ChangeEmail = (value) => {
		setEmail(value)
	}
    const [isLoading, setIsLoading] = useState(false);

    const guiMailXacThuc=(()=>{
        
        setIsLoading(true)
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
                {
                    setIsLoading(false)
                    return message.success("Đã gửi link đổi lại mật khẩu vào Email của bạn")
                }
                else if(data=="Email này không khớp với tài khoản nào cả")
                {
                    setIsLoading(false)
                    return message.error("Email này không khớp với tài khoản nào cả")
                }
                else if(data=="Thất bại, vì tài khoản này chưa được kích hoạt")
                {
                    setIsLoading(false)
                    return message.error("Thất bại, vì tài khoản này chưa được kích hoạt")
                }
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
       Gửi Link đổi mật khẩu
      </a>
    </form>
    <div>
	
		<span><button className="btnDangKyNgay" style={{background:"none"}} onClick={()=>history('/login')}>Quay lại</button></span>
	</div>
	{
        isLoading==true?<span>Loading...</span>:null
    }

	
  </div>
        </>
    )
}