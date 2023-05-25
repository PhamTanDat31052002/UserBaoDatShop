import React from "react"
import { useState, useEffect } from 'react'
import { variable } from "../Variable"
import "../Assets/css/styleLogin.css"
import PropTypes from 'prop-types';
const Auth = () => {
	const [username, setusername] = useState("")
	function setToken(userToken) {
		localStorage.setItem('token', JSON.stringify(userToken));
	}
	const [password, setpassword] = useState("")
	const ChangeName = (value) => {
		setusername(value)
	}
	const ChangePass = (value) => {
		setpassword(value)
	}
	const Login = () => {

		if (username == "") return alert("Nhập Username");
		if (password == "") return alert("Nhập Password");

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
				if (result == "Failed") alert("Failed");
				if (result != "Failed") {
					setToken(result);//api tra ve token       name id
					window.location.reload(false);
				}

			}, (error) => {
				alert("Failed");
			}
			)
	}
	return (
		<>


			<body className="bodyLogin">
				<div className="section">
					<div className="container">
						<div className="row full-height justify-content-center">
							<div className="col-12 text-center align-self-center py-5">
								<div className="section pb-5 pt-5 pt-sm-2 text-center">
									<h6 className="mb-0 pb-3"><span>Đăng nhập </span><span>Đăng ký</span></h6>
									<input className="checkbox" type="checkbox" id="reg-log" name="reg-log" />
									<label for="reg-log"></label>
									<div className="card-3d-wrap mx-auto">
										<div className="card-3d-wrapper">
											<div className="card-front">
												<div className="center-wrap">
													<div className="section text-center">
														<h4 className="mb-4 pb-3">Đăng nhập</h4>
														<div className="form-group">
															<input type="email" className="form-style" placeholder="Email" onChange={(e) => ChangeName(e.target.value)} />
															<i className="input-icon uil uil-at"></i>
														</div>
														<div className="form-group mt-2">
															<input type="password" className="form-style" placeholder="Mật khẩu" onChange={(e) => ChangePass(e.target.value)} />
															<i className="input-icon uil uil-lock-alt"></i>
														</div>
														<a onClick={() => Login()} className="btn mt-4">Đăng nhập</a>
														<p className="mb-0 mt-4 text-center"><a href="a" className="link">Quên mật khẩu</a></p>
													</div>
												</div>
											</div>
											<div className="card-back">
												<div className="center-wrap">
													<div className="section text-center">
														<h4 className="mb-3 pb-3">Đăng ký</h4>
														<div className="form-group">
															<input type="text" className="form-style" placeholder="Họ và tên" />
															<i className="input-icon uil uil-user"></i>
														</div>
														<div className="form-group mt-2">
															<input type="tel" className="form-style" placeholder="Số điện thoại" />
															<i className="input-icon uil uil-phone"></i>
														</div>
														<div className="form-group mt-2">
															<input type="email" className="form-style" placeholder="Email" />
															<i className="input-icon uil uil-at"></i>
														</div>
														<div className="form-group mt-2">
															<input type="password" className="form-style" placeholder="Mật khẩ" />
															<i className="input-icon uil uil-lock-alt"></i>
														</div>
														<a href="a" className="btn mt-4">Đăng ký</a>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</body>



		</>
	)
}
export default Auth
Auth.propTypes = {
	setToken: PropTypes.func.isRequired
}