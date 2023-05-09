import React from "react";
import "../Assets/css/style.css"
import { NavLink } from "react-router-dom";
export default function Header()
{
    return(
        <>
        	<div class="header_section header_main">
		<div class="container">
			<div class="row">
				<div class="col-sm-3">
                   <div className="logo"><NavLink to="/"><img src={require('../Assets/images/logo.png')} alt=''/></NavLink></div>
				</div>
				<div className="col-sm-9 ">
					<nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                        </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                           {/* <a className="nav-item nav-link itemsa" href="index.html">Home</a> */}
                       
                           <NavLink to="/" className="nav-item nav-link" >Trang chủ</NavLink>
                           <NavLink to="/product" className="nav-item nav-link" >Sản phẩm</NavLink>
                        
                           <a className="nav-item nav-link last" href="s"><img src={require('../Assets/images/search_icon.png')} alt=''/></a>
                           {/* <a className="nav-item nav-link last" href="contact.html"><img src={require('../Assets/images/shop_icon.png')} alt=''/></a> */}
                           <NavLink to="/cart" className="nav-item nav-link last" ><img src={require('../Assets/images/shop_icon.png')} alt=''/></NavLink>
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