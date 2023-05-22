import React from "react";
import "../Assets/css/style.css"
import { NavLink } from "react-router-dom";
export default function Header()
{
    return(
        <>
        	<div class="header_section header_main">
		<div class="headerlink">
			<div class="row">
				<div class="col-sm-3">
                   <div className="logo " style={{marginLeft:"15%"}}><NavLink to="/"><img src={require('../Assets/images/logo.png')} alt=''/></NavLink></div>
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
                            <NavLink to="/cart" className="fa fa-shopping-bag nav-item nav-link itemTask2"style={{fontSize: "32px"}}></NavLink>
                          {/* <NavLink to="/cart" className="nav-item nav-link itemTask2" ><img src={require('../Assets/images/shop_icon.png')} alt=''/></NavLink> */}
                          <NavLink to="/login" className="	far fa-user-circle nav-item nav-link itemTask2"style={{fontSize: "32px"}}></NavLink>
                          
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