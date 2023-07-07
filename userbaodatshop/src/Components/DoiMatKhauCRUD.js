import React from "react"
import { useState, useEffect } from 'react'
import { variable } from "../Variable"

import PropTypes from 'prop-types';import jwt_decode from "jwt-decode";
import { message } from "antd";
import { NavLink, useNavigate } from 'react-router-dom';
export default function DoiMatKhauCRUD()
{    const history = useNavigate()
    const [password, setpassword] = useState("")
    const [confirmPassword, setconfirmPassword] = useState("")
    const [dataXacthuc,setDataXacThuc]=useState('')
    const ChangePassConfirm = (value) => {
		setconfirmPassword(value)
	}
	const ChangePass = (value) => {
		setpassword(value)
	}
    const url = new URL(window.location.href);
         const token = url.searchParams.get("Token").replace(/\s/g, "+");
        const email = url.searchParams.get("Email")
 
    const resetPass=(()=>{
        
        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()])[a-zA-Z0-9!@#$%^&*()]{8,}$/;
		if (password == "") return message.error("Bạn chưa nhập mật khẩu!")
		if (!passwordRegex.test(password)) {
			return message.error('Mật khẩu không hợp lệ! Vui lòng nhập mật khẩu có ít nhất 1 ký tự hoa, 1 ký tự đặc biệt và độ dài tối thiểu 8 ký tự.')
		}
        if(token==null)
        {
            return message.error("Đổi mật khẩu thất bại")
        }
        
        if(email==null)
        {
            return message.error("Đổi mật khẩu thất bại")
        }
      
        fetch(variable.API_URL + "Account/ResetPassWord", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }
            , body: JSON.stringify({
                token: token,
                email: email,
                password:password,
                confirmPassword:confirmPassword
            })
        }).then(response => response.json()).then((Result) => {
            if (Result == "Thành công")
            {
                message.success("Đổi mật khẩu thành công. Mời bạn đăng nhập!")
                history('/login')
            }
            else{
                message.error("Đổi mật khẩu thất bại")
            }
        }).catch(err => console.log(err))
    })
    return(
        <>
        <div className="login-box">
    <h2 style={{color:'black'}}>Đổi mật khẩu</h2>
    <form>
      <div className="user-box">
		  <input type="password" className="form-style" onChange={(e) => ChangePass(e.target.value)} placeholder="Password"  required=""/>
		 <i className="input-icon uil uil-at"></i>
		 <label>Mật khẩu mới</label>
      </div>
      <div className="user-box">
	 	 <input type="password" classNameName="form-style" onChange={(e) => ChangePassConfirm(e.target.value)} placeholder="Password" required=""/>
		 <i classNameName="input-icon uil uil-lock-alt"></i>
        <label>Nhập lại mật khẩu</label>
      </div>
      <a onClick={()=>{
        password!=confirmPassword? message.error("Nhập lại mật khẩu chưa trùng với mật khẩu"):
        resetPass()
      }}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Đổi mật khẩu
      </a>
    </form>
	<div>
	
		<span><button className="btnDangKyNgay" style={{background:"none"}} onClick={()=>history('/forgotpass')}>Quay lại</button></span>
	</div>
	
  </div>

        </>
    )
}