import React from "react"
import { useState, useEffect } from 'react'
import { variable } from "../Variable"
import "../Assets/css/styleLogin.css"
import PropTypes from 'prop-types'; import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import { Alert, Space, message } from 'antd';
import "../Assets/css/styleRegister.css"
import {
    Avatar, Hidden,

} from '@mui/material';
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
		if (value.target.files[0] != null) {
			setAvatar(value.target.files[0])
			setNameAvatar(value.target.files[0].name)
		}
	}

	function setToken(userToken) {
		const now = new Date()
		const item = {
			value: userToken,
			expiry: now.getDate() + 7,
		}

		localStorage.setItem('token', JSON.stringify(item));
	}
	const [messageApi, contextHolder] = message.useMessage();

	const [isLoading, setIsLoading] = useState(false);

	const Register = () => {

		//tên tài khoản
		if (username == "") return message.error("Bạn chưa nhập tên tài khoản!")
		const usernameRegex = /^(?=.*[A-Z])[a-zA-Z0-9]{5,}$/;
		if (!usernameRegex.test(username)) {
			return message.error(" Vui lòng nhập tên tài khoản có ít nhất 5 ký tự (không dùng tiếng việt có dấu) và ít nhất 1 chữ viết hoa.")
		}
		//email
		if (email == "") return message.error("Bạn chưa nhập Email!")
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return message.error('Địa chỉ email không hợp lệ! Vui lòng nhập một địa chỉ email hợp lệ.');
		}
		//password
		const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()])[a-zA-Z0-9!@#$%^&*()]{8,}$/;
		if (password == "") return message.error("Bạn chưa nhập mật khẩu!")
		if (!passwordRegex.test(password)) {
			return message.error('Mật khẩu không hợp lệ! Vui lòng nhập mật khẩu có ít nhất 1 ký tự hoa, 1 ký tự đặc biệt và độ dài tối thiểu 8 ký tự.')
		}
		//số điện thoại
		const phoneRegex = /^0\d{9}$/;
		if (phone == "") return message.error("Số điện thoại không được để trống")

		if (!phoneRegex.test(phone)) {
			return message.error("Số điện thoại không hợp lệ! Vui lòng nhập đúng định dạng.");
		}

		//họ và tên	
		if (fullName == "") return message.error("Bạn chưa nhập họ và tên!")


		if (address == "") return message.error("Bạn chưa nhập địa chỉ!")
		if (avatar == "") return message.error("Bạn chưa chọn ảnh đại diện!")

		setIsLoading(true)
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
				if (result == "Thanh cong") {
					const formData = new FormData()
					var imagelName = username
					formData.append("model", avatar, imagelName)
					fetch(variable.API_URL + "Account/CreateAvatarImage", {
						method: "POST",
						body: formData
					}).then(res => res.json()).then(result => {
						if (result == true) {
							history("/login")
							setIsLoading(false)
							return message.success("Đăng ký thành công. Truy cập link đã gửi vào email của bạn để tiến hành xác minh tài khoản!")
						}
						// if (result == 1)
						// 	return message.error("Tên đăng nhập này đã được sử dụng")
						// if (result == 2)
						// 	return message.error("Số điện thoại này đã được sử dụng")
						// else if (result == 3)
						// 	return message.error("Email này đã được sử dụng")

					})
				}
				if (result == 1)
				{
					setIsLoading(false)
					return message.error("Tên đăng nhập này đã được sử dụng")
				}
					
				if (result == 2)
				{
					setIsLoading(false)
					return message.error("Số điện thoại này đã được sử dụng")
				}
					
				if (result == 3)
				{
					setIsLoading(false)
					return message.error("Email này đã được sử dụng")
				}
					

				// message.error("Đăng ký thất bại!")

			}, (error) => {
				setTimeout(() => {
					setIsLoading(false)
					return message.error("Đăng ký thất bại!")
				}, 0);
			}
			)
		messageApi.destroy()
	}

	return (
		<>
			<body className="registerCNT">
				<div className="register-box">
					<h2 style={{ color: 'black' }}>Đăng ký</h2>
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
						<div className="user-box " style={{display:"flex"}}>
							<input  type="file" id="avatarrg" className="form-style" placeholder="Chọn ảnh" onChange={(e) => ChangeAvatar(e)} />
							{/* <button className="btnChonAnhRegis" onClick={()=>{
								document.getElementById("avatarrg").click()
							}}>
								Chọn ảnh
							</button> */}
							
							
							{
								avatar!=""?
								<Avatar
            
								src={URL.createObjectURL(avatar)}
								alt={""}
								sx={{
								    ml:10,
									width: 35,
									height: 35,
								}}/>:null
							}
							{/* <Avatar
            
							src={"https://localhost:7067/wwwroot/image/product/6.png"}
							alt={""}
							sx={{
								ml:10,
								width: 40,
								height: 40,
							}}/> */}
						</div>
						<div className="user-box">
							<span style={{ fontStyle: "italic" }}>Lưu ý: Link xác thực sẽ được gửi vào email bạn đăng ký. Truy cập email để xác thực ngay sau khi đăng ký để có thể đăng nhập.</span>
						</div>
						{
							isLoading==false?<a onClick={() => Register()}>
							<span></span>
							<span></span>
							<span></span>
							<span></span>
							Đăng ký
						</a>:null
						}
						
					</form>
					{
						isLoading == true ?
							<span>Loading...</span> : null
					}
				</div>

			</body>




		</>
	)
}
export default RegisterCRUD

