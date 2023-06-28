import React from "react"
import { useState, useEffect } from 'react'
import { variable } from "../Variable"
import "../Assets/css/styleLogin.css"
import PropTypes from 'prop-types'; import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import { Alert, Space, message } from 'antd';
import "../Assets/css/styleRegister.css"
const RegisterCRUD = () => {
	const history = useNavigate()

	const [username, setusername] = useState("")
	const [password, setpassword] = useState("")
	const [email, setEmail] = useState("")
	const [phone, setPhone] = useState("")
	const [address, setAddress] = useState("")
	const [fullName, setFullName] = useState("")
	const [avatar, setAvatar] = useState("")
	const [nameavatar, setNameAvatar] = useState("")
	const ChangeName = (value) => {
		setusername(value)
	}
	const ChangePass = (value) => {
		setpassword(value)
	}
	const ChangeEmail = (value) => {
		setEmail(value)
	}
	const ChangePhone = (value) => {
		setPhone(value)
	}
	const ChangeAddress = (value) => {
		setAddress(value)
	}
	const ChangeFullName = (value) => {
		setFullName(value)
	}
	const ChangeAvatar = (value) => {
		setAvatar(value.target.files[0])
		setNameAvatar(value.target.files[0].name)
	}

	function setToken(userToken) {
		const now = new Date()
		const item = {
			value: userToken,
			expiry: now.getDate() + 7,
		}

		localStorage.setItem('token', JSON.stringify(item));
	}
	const Register = () => {

		if (username == "") return message.error("Bạn chưa nhập tên tài khoản!")
		if (email == "") return message.error("Bạn chưa nhập Email!")
		if (password == "") return message.error("Bạn chưa nhập mật khẩu!")
		if (phone == ""||phone.length!=10) return message.error("Số điện thoại không hợp lệ!")
		if (fullName == "") return message.error("Bạn chưa nhập họ và tên!")
		if (address == "") return message.error("Bạn chưa nhập địa chỉ!")
		if (avatar == "") return message.error("Bạn chưa chọn ảnh đại diện!")

		fetch(variable.API_URL + "Account/register-Customer", {
			method: "POST",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				Username: username,
				Password: password,
				Email: email,
				Phone: phone,
				Address: address,
				FullName: fullName,
				Image: "",
			})
		}).then(res => res.json())
			.then(result => {
				if (result == true) {
					const formData = new FormData()
					var imagelName = username
					formData.append("model", avatar, imagelName)
					fetch(variable.API_URL + "Account/CreateAvatarImage", {
						method: "POST",
						body: formData
					}).then(res => res.json()).then(result => {
						if (result == true) {
							history("/login")
							message.success("Đăng ký thành công, mời bạn đăng nhập!")
						}
					})
				}
				else {
					message.error(result)
				}

			}, (error) => {
				setTimeout(() => {
					message.error("Đăng ký thất bại!")
				}, 0);
			}
			)
	}
	return (
		<>
			<body className="registerCNT">
				<div className="register-box">
					<h2 style={{ color: 'black' }}>Đăng nhập</h2>
					<form>
						<div className="user-box">
							<input type="text" className="form-style" placeholder="Username" onChange={(e) => ChangeName(e.target.value)} required="" />
							<i className="input-icon uil uil-at"></i>
							<label>Tên đăng nhập</label>
						</div>
						<div className="user-box">
							<input type="email" className="form-style" placeholder="Email" onChange={(e) => ChangeEmail(e.target.value)} required="" />
							<i className="input-icon uil uil-at"></i>
							<label>Email</label>
						</div>
						<div className="user-box">
							<input type="password" classNameName="form-style" placeholder="Password" onChange={(e) => ChangePass(e.target.value)} required="" />
							<i classNameName="input-icon uil uil-lock-alt"></i>
							<label>Mật khẩu</label>
						</div>
						<div className="user-box">
							<input type="number" className="form-style" placeholder="Phone number" onChange={(e) => ChangePhone(e.target.value)} required="" />
							<i className="input-icon uil uil-at"></i>
							<label>Số điện thoại</label>
						</div>
						<div className="user-box">
							<input type="text" className="form-style" placeholder="Full name" onChange={(e) => ChangeFullName(e.target.value)} required="" />
							<i className="input-icon uil uil-at"></i>
							<label>Họ và tên</label>
						</div>
						<div className="user-box">
							<input type="text" className="form-style" placeholder="Address" onChange={(e) => ChangeAddress(e.target.value)} required="" />
							<i className="input-icon uil uil-at"></i>
							<label>Địa chỉ</label>
						</div>
						<div className="user-box">
							<input type="file" className="form-style" placeholder="Address" onChange={(e) => ChangeAvatar(e)} required="" />
							<i className="input-icon uil uil-at"></i>
							<label>Hình</label>
						</div>
						<a onClick={() => Register()}>
							<span></span>
							<span></span>
							<span></span>
							<span></span>
							Đăng ký
						</a>
					</form>
				</div>

			</body>




		</>
	)
}
export default RegisterCRUD

