import React from "react";
import "../Assets/css/style.css"
import "../Assets/css/bootstrap.min.css"
import { variable } from "../Variable"
import { NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
export default function Footer()
{
	const [footer,setFooter]=useState()
	var count=0;
	useEffect(() => {
	
		fetch(variable.API_URL + "Footer/GetFooter")
			.then(response => response.json())
			.then(data => setFooter(data)).catch(err => console.log(err))
	}, [count])


    return(
        <>
		{
			footer!=null?
			<div class="section_footer">
			<div class="container">
				<div class="mail_section">
					<div class="row">
						<div class="col-sm-6 col-lg-2">
				  
							<div style={{ width:"70%" }}><a href="/"><img src={require('../Assets/images/logo.png')} alt=""/></a></div>
						</div>
						<div class="col-sm-6 col-lg-2">
							<div class="footer-logo"><img src={require('../Assets/images/phone-icon.png')} alt=""/><span class="map_text"> {footer.phone}</span></div>
						</div>
						<div class="col-sm-6 col-lg-3 ">
							<div class="footer-logo"><img src={require('../Assets/images/email-icon.png')} alt=""/><span class="map_text">{footer.email}</span></div>
						</div>
						<div class="col-sm-6 col-lg-3">
							<div class="social_icon">
								<ul>
									<li><a href={footer.linkFacebook}><img src={require('../Assets/images/fb-icon.png')} alt="" /></a></li> 
								
									<li><a href={footer.linkInstagram}><img src={require('../Assets/images/in-icon.png')} alt="" /></a></li>
									
								</ul>
							</div>
						</div>
						<div class="col-sm-2"></div>
					</div>
				</div> 
				<div class="footer_section_2">
					<div class="row">
						<div class="col-sm-4 col-lg-2">
							<p class="dummy_text"> </p>
						</div>
						<div class="col-sm-4 col-lg-2">
							<h2 class="shop_text">Địa chỉ </h2>
							<div class="image-icon"><img src={require("../Assets/images/map-icon.png")} alt=""/><span class="pet_text">{footer.adress}</span></div>
						</div>
						<div class="col-sm-4 col-md-6 col-lg-3">
							<h2 class="shop_text">Cửa hàng </h2>
							<div class="delivery_text">
								<ul>
									<li>Vận chuyển</li>
									<li>Thông tin cửa hàng</li>
									<li>Thanh toán an toàn</li>
									<li>Liên hệ chúng tôi</li>
								</ul>
							</div>
						</div>
					<div class="col-sm-6 col-lg-3">
						<h2 class="adderess_text">Sản phẩm</h2>
						<div class="delivery_text">
								<ul>
									<li>Giảm giá</li>
									<li>Sản phẩm mới</li>
									<li>Bán chạy nhất</li>
									<li>Sơ đồ trang web</li>
								</ul>
							</div>
					</div>
					{/* <div class="col-sm-6 col-lg-2">
						<h2 class="adderess_text">Bảng tin</h2>
						<div class="form-group">
							<input type="text" class="enter_email" placeholder="Enter Your email" name="Name"/>
						</div>
						<button class="subscribr_bt">Subscribe</button>
					</div> */}
					</div>
					</div> 
				</div>
			</div>:
			   <div class="section_footer">
			   <div class="container">
				   <div class="mail_section">
					   <div class="row">
						   <div class="col-sm-6 col-lg-2">
					 
							   <div style={{ width:"70%" }}><a href="/"><img src={require('../Assets/images/logo.png')} alt=""/></a></div>
						   </div>
						   <div class="col-sm-6 col-lg-2">
							   <div class="footer-logo"><img src={require('../Assets/images/phone-icon.png')} alt=""/><span class="map_text">(84)<br></br> 1234567890</span></div>
						   </div>
						   <div class="col-sm-6 col-lg-3">
							   <div class="footer-logo"><img src={require('../Assets/images/email-icon.png')} alt=""/><span class="map_text">pndat31052002@gmail.com</span></div>
						   </div>
						   <div class="col-sm-6 col-lg-3">
							   <div class="social_icon">
								   <ul>
									   <li><a href="https://www.facebook.com/"><img src={require('../Assets/images/fb-icon.png')} alt="" /></a></li> 
									   <li><a href="a"><img src={require('../Assets/images/twitter-icon.png')} alt="" /></a></li>
									   <li><a href="a"><img src={require('../Assets/images/in-icon.png')} alt="" /></a></li>
									   <li><a href="a"><img src={require('../Assets/images/google-icon.png')} alt="" /></a></li>
								   </ul>
							   </div>
						   </div>
						   <div class="col-sm-2"></div>
					   </div>
				   </div> 
				   <div class="footer_section_2">
					   <div class="row">
						   <div class="col-sm-4 col-lg-2">
							   <p class="dummy_text"> </p>
						   </div>
						   <div class="col-sm-4 col-lg-2">
							   <h2 class="shop_text">Địa chỉ </h2>
							   <div class="image-icon"><img src={require("../Assets/images/map-icon.png")} alt=""/><span class="pet_text">638 Lê Trọng Tấn, Bình Hưng Hòa, Bình Tân, TP.HCM</span></div>
						   </div>
						   <div class="col-sm-4 col-md-6 col-lg-3">
							   <h2 class="shop_text">Our Company </h2>
							   <div class="delivery_text">
								   <ul>
									   <li>Vận chuyển</li>
									   <li>Thông tin cửa hàng</li>
									   <li>Thanh toán an toàn</li>
									   <li>Liên hệ chúng tôi</li>
								   </ul>
							   </div>
						   </div>
					   <div class="col-sm-6 col-lg-3">
						   <h2 class="adderess_text">Sản phẩm</h2>
						   <div class="delivery_text">
								   <ul>
									   <li>Giảm giá</li>
									   <li>Sản phẩm mới</li>
									   <li>Bán chạy nhất</li>
									   <li>Sơ đồ trang web</li>
								   </ul>
							   </div>
					   </div>
					   {/* <div class="col-sm-6 col-lg-2">
						   <h2 class="adderess_text">Bảng tin</h2>
						   <div class="form-group">
							   <input type="text" class="enter_email" placeholder="Enter Your email" name="Name"/>
						   </div>
						   <button class="subscribr_bt">Subscribe</button>
					   </div> */}
					   </div>
					   </div> 
				   </div>
			   </div>
		}
       
    
        </>
    )
}