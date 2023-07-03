import React from 'react'
// import "../Assets/css/bootstrap.min.css"
import "../Assets/css/style.css"
import { useEffect } from 'react';
import { variable } from "../Variable"
import { useState } from 'react';
import "../Assets/scrip/slide.js"
import { NavLink, useLocation } from 'react-router-dom';
export default function HomeCRUD() {
    var [product, setProduct] = useState([]);
    var [records, setRecords] = useState([]);
    function getToken() {
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken
    }
    
    useEffect(() => {
       
         fetch(variable.API_URL + "AdvertisingPanels/GetAllAdvertisingPanelStatusTrue", {
                method: "GET",
               
            }).then(response => response.json())
                .then(data => {
                    setRecords(data)
                }).catch(err => console.log(err))
        
         fetch(variable.API_URL + "Products/GetTop10BestSeller")
                .then(response => response.json())
                .then(data => setProduct(data)).catch(err => console.log(err))
                
    }, [])
    const VND = new Intl.NumberFormat('vi-VN', {
		style: 'currency',
		currency: 'VND',
	});

    return (
        <>
             

            <div className="header_section">
               
                <div className="banner_section">
                    <div className="container-fluid">
                        <section className="slide-wrapper">
                            <div className="container-fluid">
                                <div id="myCarousel" className="carousel slide" data-ride="carousel">

                                    <ol className="carousel-indicators">
                                        <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                                        <li data-target="#myCarousel" data-slide-to="1"></li>
                                        <li data-target="#myCarousel" data-slide-to="2"></li>
                                        <li data-target="#myCarousel" data-slide-to="3"></li>
                                    </ol>
                                    <div class="carousel-inner">
                                    <div class="carousel-item active">
                    <div class="row">
					<div class="col-sm-2 padding_0">
						<p class="mens_taital">Phụ kiện thể thao</p>
						<div class="page_no">0/2</div>
						<p class="mens_taital_2">Phụ kiện thể thao</p>
					</div>
					<div class="col-sm-5">
						<div class="banner_taital">
							<h1 class="banner_text">Mẫu áo bóng đá mới </h1>
							<h1 class="mens_text"><strong>Hot nhất</strong></h1>
							<p class="lorem_text">pla pla pla</p>
							<button class="buy_bt">Mua ngay</button>
							<button class="more_bt">Xem thêm</button>
						</div>
					</div>
					<div class="col-sm-5">
						<div class="shoes_img"><img src={"https://localhost:7067/wwwroot/image/product/6.png"} alt=''/></div>
					</div>
				</div>
                </div>
                <div class="carousel-item ">
                    <div class="row">
					<div class="col-sm-2 padding_0">
						<p class="mens_taital">Phụ kiện thể thao</p>
						<div class="page_no">0/2</div>
						<p class="mens_taital_2">Phụ kiện thể thao</p>
					</div>
					<div class="col-sm-5">
						<div class="banner_taital">
							<h1 class="banner_text">Giày đá bóng </h1>
							<h1 class="mens_text"><strong>Men's Like Plex</strong></h1>
							<p class="lorem_text">ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
							<button class="buy_bt">Buy Now</button>
							<button class="more_bt">See More</button>
						</div>
					</div>
					<div class="col-sm-5">
                    <div class="shoes_img"><img src={"https://localhost:7067/wwwroot/image/product/7.png"} alt=''/></div>
					</div>
				</div>
                </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>

            <div className="layout_padding collection_section">
                <div className="container">
                    <h1 className="new_text"><strong>Bộ sưu tập mới</strong></h1>
                    <p className="consectetur_text">consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</p>
                    <div className="collection_section_2">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="about-img">
                                    <button className="new_bt">New</button>
                                    <div className="shoes-img"><img src={require('../Assets/images/AoBarcaKhach2023.png')} alt='' /></div>
                                    <p className="sport_text">Men Sports</p>
                                    <div className="dolar_text">$<strong >90</strong> </div>
                                    <div className="star_icon">
                                        <ul>
                                            <li><a href="a"><img src={require("../Assets/images/star-icon.png")} alt='' /></a></li>
                                            <li><a href="a"><img src={require("../Assets/images/star-icon.png")} alt='' /></a></li>
                                            <li><a href="a"><img src={require("../Assets/images/star-icon.png")} alt='' /></a></li>
                                            <li><a href="a"><img src={require("../Assets/images/star-icon.png")} alt='' /></a></li>
                                            <li><a href="a"><img src={require("../Assets/images/star-icon.png")} alt='' /></a></li>
                                        </ul>
                                    </div>
                                </div>
                                <button className="seemore_bt">See More</button>
                            </div>
                            <div className="col-md-6">
                                <div className="about-img2">
                                    <div className="shoes-img2"><img src={require('../Assets/images/AoMU2023.png')} alt='' /></div>
                                    <p className="sport_text">Men Sports</p>
                                    <div className="dolar_text">$<strong style={{ color: "#f12a47" }}>90</strong> </div>
                                    <div className="star_icon">
                                        <ul>
                                            <li><a href="a"><img src={require("../Assets/images/star-icon.png")} alt='' /></a></li>
                                            <li><a href="a"><img src={require("../Assets/images/star-icon.png")} alt='' /></a></li>
                                            <li><a href="a"><img src={require("../Assets/images/star-icon.png")} alt='' /></a></li>
                                            <li><a href="a"><img src={require("../Assets/images/star-icon.png")} alt='' /></a></li>
                                            <li><a href="a"><img src={require("../Assets/images/star-icon.png")} alt='' /></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div className="collection_section">
                <div className="container">
                    <h1 className="new_text"><strong>Racing Boots</strong></h1>
                    <p className="consectetur_text">consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</p>
                </div>
            </div>

            <div className="collectipn_section_3 layuot_padding">
                <div className="container">
                    <div className="racing_shoes">
                        <div className="row">
                            <div className="col-md-8">
                                <div className="shoes-img3"><img src={require("../Assets/images/AoMU2023.png")} alt='' /></div>
                            </div>
                            <div className="col-md-4">
                                <div className="sale_text">
                                    <strong>Sale

                                        <span style={{ color: "#0a0506" }}>JOGING</span>

                                    </strong>
                                </div>
                                {/* <br><span style="color: #0a0506;">JOGING</span> <br>SHOES */}
                                <div className="number_text"><strong>$ <span>100</span></strong></div>
                                <button className="seemore">See More</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="collection_section layout_padding">
                <div className="container">
                    <h1 className="new_text" style={{marginTop:"2%"}}><strong>Top 10 sản phẩm bán chạy nhất</strong></h1>
                    <p className="consectetur_text">consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</p>
                </div>
            </div>



            {/* Sản phẩm */}




            <div class="layout_padding gallery_section">
                <div class="container">
                    <div class="row">
                        {
                            product!=null?
                                product.map(pr=>
                                    <div class="col-sm-3 itemPR">
                                    <div class="best_shoes parent">
                                     <NavLink to="/detail" state={pr.id}><p className="best_text "><a href="a">{pr.name}</a>  </p></NavLink>
                                      
                                        <NavLink to="/detail" state={pr.id}><div className="shoes_icon "><a href="a"><img src={"https://localhost:7067/wwwroot/image/product/" + pr.image} alt='a' /></a></div></NavLink>

                                  
                                        <div className="star_text " >
													<NavLink to="/detail" state={pr.id}>
														<div className="left_part ">
															<ul>
																<li><img className="star" src={require("../Assets/images/star-icon.png")} alt='' /></li>
																<li><img className="star" src={require("../Assets/images/star-icon.png")} alt='' /></li>
																<li><img className="star" src={require("../Assets/images/star-icon.png")} alt='' /></li>
																<li><img className="star" src={require("../Assets/images/star-icon.png")} alt='' /></li>
																<li><img className="star" src={require("../Assets/images/star-icon.png")} alt='' /></li>
															</ul>
														</div>
													</NavLink>

													<NavLink to="/detail" state={pr.id}><div className="right_part hidden-child">
														<div className="shoes_price "><span >{VND.format(pr.priceSales)}</span></div>



													</div></NavLink>


												</div>
                                    </div>
                                </div>
                                    ) :null
                        }
                      

                    </div>
                </div>
            </div>
        </>
    )
}