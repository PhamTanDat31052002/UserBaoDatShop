import React from "react";
import "../Assets/css/style.css"
import { NavLink } from "react-router-dom";
export default function Header() {
    function getToken() {
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken
    }
    const token = getToken();
    var a = 1;
    return (
        <>
        <div>
        <div class="fab-wrapper">
        <input id="fabCheckbox" type="checkbox" class="fab-checkbox"></input>
        <label class="fab" for="fabCheckbox">
           <i class="icon-cps-fab-menu"></i>
           {/* <!-- <i class="icon-cps-close"></i> --> */}
        </label>
        <div class="fab-wheel">
           <a className="fab-action fab-action-1" href="https://www.google.com/maps/place/638+L%C3%AA+Tr%E1%BB%8Dng+T%E1%BA%A5n,+B%C3%ACnh+H%C6%B0ng+Ho%C3%A0,+T%C3%A2n+Ph%C3%BA,+Th%C3%A0nh+ph%E1%BB%91+H%E1%BB%93+Ch%C3%AD+Minh,+Vi%E1%BB%87t+Nam/@10.8137324,106.6041641,17z/data=!3m1!4b1!4m6!3m5!1s0x31752beadc166d1b:0xfa60a6bb4dcd07a1!8m2!3d10.8137324!4d106.606739!16s%2Fg%2F11c5nwzjgz?hl=vi-VN&entry=ttu" >
              <span class="fab-title">Tìm cửa hàng</span>
              <div class="fab-button fab-button-1"><i class="icon-cps-local"></i></div>
           </a>
           <a class="fab-action fab-action-2" href="tel:0362047571" rel="nofollow">
              <span class="fab-title">Gọi trực tiếp</span>
              <div class="fab-button fab-button-2"><i class="icon-cps-phone"></i></div>
           </a>
           <a class="fab-action fab-action-3" href="https://www.facebook.com/phamtandat2002" >
              <span class="fab-title">Chat ngay</span>
              <div class="fab-button fab-button-3"><i class="icon-cps-chat"></i></div>
           </a>
           <a class="fab-action fab-action-4" href="https://zalo.me/0362047571" >
              <span class="fab-title">Chat trên Zalo</span>
              <div class="fab-button fab-button-4"><i class="icon-cps-chat-zalo"></i></div>
           </a>
        </div>
        <div class="suggestions-chat-box hidden" style={{display:"none"}}>
           <div class="box-content d-flex justify-content-around align-items-center">
              <i class="fa fa-times-circle" aria-hidden="true" id="btnClose" onclick="jQuery('.suggestions-chat-box').hide()"></i>
              <p class="mb-0 font-14">Liên hệ ngay <i class="fa fa-hand-o-right" aria-hidden="true"></i></p>
           </div>
        </div>
        <div class="devvn_bg"></div>
     </div>
        </div>


            <div class="header_section header_main">
                <div class="headerlink">
                    <div class="row">
                        <div class="col-sm-3">
                            <div className="logo " style={{ marginLeft: "15%" }}><NavLink to="/"><img src={require('../Assets/images/logo.png')} alt='' /></NavLink></div>
                        </div>
                        <div className="col-sm-9 ">
                            <nav className="navbar navbar-expand-lg navbar-dark  ">
                                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                                    <div className="containerHeader">
                                        <div className="itemHeader1">
                                            <NavLink to="/" className="nav-item nav-link itemTask1" >Trang chủ</NavLink>
                                            <NavLink to="/product" className="nav-item nav-link itemTask1" >Sản phẩm</NavLink>
                                            
                                                    
                                        </div>
                                        <div className="itemHeader2">
                                            
                                            {/* <a className="nav-item nav-link last" href="s"><img src={require('../Assets/images/search_icon.png')} alt=''/></a> */}
                                            <NavLink to="/cart" className="fas fa-shopping-cart nav-item nav-link itemTask2" style={{ fontSize: "32px" }}></NavLink>
                                            {/* <NavLink to="/cart" className="nav-item nav-link itemTask2" ><img src={require('../Assets/images/shop_icon.png')} alt=''/></NavLink> */}
                                            {token == null ?// eslint-disable-next-line
                                                <NavLink to="/login" className="far fa-user-circle nav-item nav-link itemTask2"
                                                    style={{ fontSize: "32px" }}></NavLink> :
                                                <div className="select-wrapper">
                                                    <div className="select-trigger">
                                                    <NavLink to="/a" className="far fa-user-circle nav-item nav-link itemTask2"
                                                    style={{ fontSize: "32px" }}></NavLink>
                                                    </div>
                                                    <ul className="select-dropdown">
                                                        <li> <NavLink onClick={() => {
                                                            localStorage.clear()
                                                            window.location.reload(false);

                                                        }}
                                                            style={{ fontSize: "15px" }}> Đăng xuất</NavLink></li>
                                                    </ul>

                                                </div>

                                            }
                                        </div>
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}