import React from "react";
import { useState, useEffect } from 'react'
import { variable } from "../Variable"
import { NavLink, useNavigate } from 'react-router-dom';
import { message } from "antd";
export default function ChangePassCRUD()
{
    const history = useNavigate()
    var [oldPass,setOldPass]=useState('')
    var [newPass,setNewPass]=useState('')
    var [newPassAgain,setNewPassAgain]=useState('')
   

    const getToken = (() => {
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken
    })
    const ChangeOldPass = (value) => {
		setOldPass(value)
	}
    const ChangeNewPass = (value) => {
		setNewPass(value)
	}
    const ChangeNewPassAgain = (value) => {
		setNewPassAgain(value)
	}
    const ChangePass=(()=>{
        const token = getToken();
        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()])[a-zA-Z0-9!@#$%^&*()]{8,}$/;
		if (newPass == "") return message.error("Bạn chưa nhập mật khẩu!")
		if (!passwordRegex.test(newPass)) {
			return message.error('Mật khẩu mới không hợp lệ! Vui lòng nhập mật khẩu có ít nhất 1 ký tự hoa, 1 ký tự đặc biệt và độ dài tối thiểu 8 ký tự.')
		}
        if(newPass!=newPassAgain)
        {
            return message.error("Nhập lại mật khẩu mới không khớp")
        }
        fetch(variable.API_URL + "Account/ChangePassWord", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token.value}`
            },
            body:JSON.stringify({
                confirmPassword:newPassAgain,
                password:oldPass,
                passwordNew:newPass
            })

        })
            .then(response => response.json())
            .then(result => {
             if(result=="Bạn đã nhập sai mật khẩu")
                  return message.error("Mật khẩu cũ không chính xác")
            else if(result=="Thành công")
            {
                history("/")
                return message.success("Đổi mật khẩu thành công")
            }
            else{
                return message.error("Đổi mật khẩu thất bại")
            }
            }).catch(err => console.log(err))
    })
    return(
        <>
        <div className="login-box">
    <h2 style={{color:'black'}}>Đổi mật khẩu</h2>
    <form>
      <div className="user-box">
		  <input type="password" className="form-style" placeholder="Username" onChange={(e) => ChangeOldPass(e.target.value)} required=""/>
		 <i className="input-icon uil uil-at"></i>
		 <label>Mật khẩu cũ</label>
      </div>
      <div className="user-box">
	 	 <input type="password" classNameName="form-style" placeholder="Password" onChange={(e) => ChangeNewPass(e.target.value)}required=""/>
		 <i classNameName="input-icon uil uil-lock-alt"></i>
        <label>Mật khẩu mới</label>
      </div>
      <div className="user-box">
	 	 <input type="password" classNameName="form-style" placeholder="Password" onChange={(e) => ChangeNewPassAgain(e.target.value)}required=""/>
		 <i classNameName="input-icon uil uil-lock-alt"></i>
        <label>Nhâp lại mật khẩu mới</label>
      </div>
      <a onClick={()=>ChangePass()}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Đổi mật khẩu
      </a>
    </form>
	<div>
	
		<span><button className="btnDangKyNgay" style={{background:"none"}} onClick={()=>history('/')}>Trở về</button></span>
	</div>
  </div>
        </>
    )
}