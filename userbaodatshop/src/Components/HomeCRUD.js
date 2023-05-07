import React from 'react'
// import "../Assets/css/bootstrap.min.css"
import "../Assets/css/style.css"

// import "../Assets/css/font-awesome.min.css"
export default function HomeCRUD() {
    return (
        <>


            <div className="header_section">
                <div classNameName="container">
                    <div className="row">
                        <div className="col-sm-3">
                            {/* <div className="logo"><a href="#"><img src="images/logo.png"></a></div> */}
                        </div>
                        <div className="col-sm-9">
                            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                                    <div className="navbar-nav">
                                        <a className="nav-item nav-link" href="index.html">Trang chủ</a>
                                        <a className="nav-item nav-link" href="collection.html">Bộ sưu tập</a>
                                        <a className="nav-item nav-link" href="shoes.html">Áo đá banh</a>
                                        <a className="nav-item nav-link" href="racing boots.html">Giày đá banh</a>
                                        <a className="nav-item nav-link" href="contact.html">Liên hệ</a>
                                        {/* <a className="nav-item nav-link last" href="#"><img src="images/search_icon.png"></a>
                           <a className="nav-item nav-link last" href="contact.html"><img src="images/shop_icon.png"></a> */}
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
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


                                    <div className="carousel-inner">
                                        <div className="carousel-item active">
                                            <div className="row">
                                                <div className="col-sm-2 padding_0">
                                                    <p className="mens_taital">Phụ kiện thể thao</p>
                                                    <div className="page_no">0/2</div>
                                                    <p className="mens_taital_2">Phụ kiện thể thao</p>
                                                </div>
                                                <div className="col-sm-5">
                                                    <div className="banner_taital">
                                                        <h1 className="banner_text">Mẫu áo bóng đá mới </h1>
                                                        <h1 className="mens_text"><strong>Hot nhất</strong></h1>
                                                        <p className="lorem_text">pla pla pla</p>
                                                        <button className="buy_bt">Mua ngay</button>
                                                        <button className="more_bt">Xem thêm</button>
                                                    </div>
                                                </div>
                                                <div className="col-sm-5">
                                                    <div className="shoes_img"><img src={require('../Assets/images/running-shoes.png')} alt=''/></div>
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
                                    {/* <div className="shoes-img"><img src="images/shoes-img1.png"></div> */}
                                    <p className="sport_text">Men Sports</p>
                                    {/* <div className="dolar_text">$<strong style="color: #f12a47;">90</strong> </div> */}
                                    <div className="star_icon">
                                        <ul>
                                            {/* <li><a href="#"><img src="images/star-icon.png"></a></li>
    	    						<li><a href="#"><img src="images/star-icon.png"></a></li>
    	    						<li><a href="#"><img src="images/star-icon.png"></a></li>
    	    						<li><a href="#"><img src="images/star-icon.png"></a></li>
    	    						<li><a href="#"><img src="images/star-icon.png"></a></li> */}
                                        </ul>
                                    </div>
                                </div>
                                <button className="seemore_bt">See More</button>
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
                                {/* <div className="shoes-img3"><img src="images/shoes-img3.png"></div> */}
                            </div>
                            <div className="col-md-4">
                                {/* <div className="sale_text"><strong>Sale <br><span style="color: #0a0506;">JOGING</span> <br>SHOES</strong></div> */}
                                {/* <div className="number_text"><strong>$ <span style="color: #0a0506">100</span></strong></div> */}
                                <button className="seemore">See More</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="collection_section layout_padding">
                <div className="container">
                    <h1 className="new_text"><strong>New Arrivals Products</strong></h1>
                    <p className="consectetur_text">consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</p>
                </div>
            </div>
        </>
    )
}