import React from "react"
import { useState, useEffect } from 'react'
import { variable } from "../Variable"
import "../Assets/css/styleLogin.css"
import PropTypes from 'prop-types';import jwt_decode from "jwt-decode";
import { NavLink, useNavigate } from 'react-router-dom';
import { Alert, Space, message } from 'antd';
const Auth = () => {
	const [username, setusername] = useState("")
	const history = useNavigate()

	const [password, setpassword] = useState("")
	const ChangeName = (value) => {
		setusername(value)
	}
	const ChangePass = (value) => {
		setpassword(value)
	}
	function setToken(userToken) {
        const now = new Date()
        const item = {
            value: userToken,
            expiry: now.getDate() + 7,
        }
		
        localStorage.setItem('token', JSON.stringify(item));
    }
	const Login = () => {

		if (username == "") return message.error("Bạn chưa nhập tên tài khoản!")
		if (password == "") return message.error("Bạn chưa nhập mật khẩu!")

		fetch(variable.API_URL + "Account/Signin", {
			method: "POST",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				Username: username,
				Password: password
			})
		}).then(res => res.json())
			.then(result => {
				if (result == "Failed") message.error("Sai tài khoản hoặc mật khẩu");
				if(result=="Người dùng đã bị khóa")
				{
					return message.error("Tài khoản đã bị khóa")
				}
				if(result=="Chưa xác minh Email")
				{
					return message.error("Email chưa được xác minh")
				}
                if (result != "Failed") {
                    setToken(result);
					const tokenString = localStorage.getItem('token');
                    const decoded = jwt_decode(tokenString);
					if (decoded.RoleUser == "Costumer") {
                        setTimeout(() => {
                            message.success("Đăng nhập thành công!")
                        }, 0);
                        setTimeout(() => {
							history("/")
                        }, 50);
                    }
                }
				
			

			}, (error) => {
				setTimeout(() => {
                    message.error("Đăng nhập thất bại!")
                }, 0);
			}
			)
	}
	return (
		<>

<div className="login-box">
    <h2 style={{color:'black'}}>Đăng nhập</h2>
    <form>
      <div className="user-box">
		  <input type="text" className="form-style" placeholder="Username" onChange={(e) => ChangeName(e.target.value)} required=""/>
		 <i className="input-icon uil uil-at"></i>
		 <label>Tên đăng nhập</label>
      </div>
      <div className="user-box">
	 	 <input type="password" classNameName="form-style" placeholder="Password" onChange={(e) => ChangePass(e.target.value)}required=""/>
		 <i classNameName="input-icon uil uil-lock-alt"></i>
        <label>Mật khẩu</label>
      </div>
      <a onClick={()=>Login()}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Đăng nhập
      </a>
    </form>
	<div>
		<span>Bạn chưa có tài khoản? </span>
		<span><button className="btnDangKyNgay" style={{background:"none"}} onClick={()=>history('/register')}>Đăng ký ngay</button></span>
	</div>
	<div>
	<span><button className="btnDangKyNgay" style={{background:"none",marginTop:"1%"}}  onClick={()=>history('/forgotpass')}>Quên mật khẩu?</button></span>
	</div>
  </div>






		</>
	)
}
export default Auth
Auth.propTypes = {
	setToken: PropTypes.func.isRequired
}

// <input type="email" classNameName="form-style" placeholder="Tên đăng nhập" onChange={(e) => ChangeName(e.target.value)} />
// <i classNameName="input-icon uil uil-at"></i>
// </div>
// <div classNameName="form-group mt-2">
// <input type="password" classNameName="form-style" placeholder="Mật khẩu" onChange={(e) => ChangePass(e.target.value)} />
// <i classNameName="input-icon uil uil-lock-alt"></i>