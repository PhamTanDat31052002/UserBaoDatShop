import React from 'react'
// import "../Assets/css/bootstrap.min.css"
// import "../Assets/css/style.css"

// import "../Assets/css/font-awesome.min.css"
export default function HomeCRUD() {
    return (
        <>


            <div class="header_section">
                <div class="container">
                    <div class="row">
                        <div class="col-sm-3">
                            {/* <div class="logo"><a href="#"><img src="images/logo.png"></a></div> */}
                        </div>
                        <div class="col-sm-9">
                            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                                    <span class="navbar-toggler-icon"></span>
                                </button>
                                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                                    <div class="navbar-nav">
                                        <a class="nav-item nav-link" href="index.html">Trang chủ</a>
                                        <a class="nav-item nav-link" href="collection.html">Bộ sưu tập</a>
                                        <a class="nav-item nav-link" href="shoes.html">Áo đá banh</a>
                                        <a class="nav-item nav-link" href="racing boots.html">Giày đá banh</a>
                                        <a class="nav-item nav-link" href="contact.html">Liên hệ</a>
                                        {/* <a class="nav-item nav-link last" href="#"><img src="images/search_icon.png"></a>
                           <a class="nav-item nav-link last" href="contact.html"><img src="images/shop_icon.png"></a> */}
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
                <div class="banner_section">
                    <div class="container-fluid">
                        <section class="slide-wrapper">
                            <div class="container-fluid">
                                <div id="myCarousel" class="carousel slide" data-ride="carousel">

                                    <ol class="carousel-indicators">
                                        <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
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
                                                    {/* <div class="shoes_img"><img src="images/running-shoes.png"></div> */}
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

            <div class="layout_padding collection_section">
                <div class="container">
                    <h1 class="new_text"><strong>Bộ sưu tập mới</strong></h1>
                    <p class="consectetur_text">consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</p>
                    <div class="collection_section_2">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="about-img">
                                    <button class="new_bt">New</button>
                                    {/* <div class="shoes-img"><img src="images/shoes-img1.png"></div> */}
                                    <p class="sport_text">Men Sports</p>
                                    {/* <div class="dolar_text">$<strong style="color: #f12a47;">90</strong> </div> */}
                                    <div class="star_icon">
                                        <ul>
                                            {/* <li><a href="#"><img src="images/star-icon.png"></a></li>
    	    						<li><a href="#"><img src="images/star-icon.png"></a></li>
    	    						<li><a href="#"><img src="images/star-icon.png"></a></li>
    	    						<li><a href="#"><img src="images/star-icon.png"></a></li>
    	    						<li><a href="#"><img src="images/star-icon.png"></a></li> */}
                                        </ul>
                                    </div>
                                </div>
                                <button class="seemore_bt">See More</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div class="collection_section">
                <div class="container">
                    <h1 class="new_text"><strong>Racing Boots</strong></h1>
                    <p class="consectetur_text">consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</p>
                </div>
            </div>
            <div class="collectipn_section_3 layuot_padding">
                <div class="container">
                    <div class="racing_shoes">
                        <div class="row">
                            <div class="col-md-8">
                                {/* <div class="shoes-img3"><img src="images/shoes-img3.png"></div> */}
                            </div>
                            <div class="col-md-4">
                                {/* <div class="sale_text"><strong>Sale <br><span style="color: #0a0506;">JOGING</span> <br>SHOES</strong></div> */}
                                {/* <div class="number_text"><strong>$ <span style="color: #0a0506">100</span></strong></div> */}
                                <button class="seemore">See More</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="collection_section layout_padding">
                <div class="container">
                    <h1 class="new_text"><strong>New Arrivals Products</strong></h1>
                    <p class="consectetur_text">consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</p>
                </div>
            </div>
        </>
    )
}