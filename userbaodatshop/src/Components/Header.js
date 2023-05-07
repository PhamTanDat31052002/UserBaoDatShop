import React from "react";
import "../Assets/css/style.css"

export default function Header()
{
    return(
        <>
        	<div class="header_section header_main">
		<div class="container">
			<div class="row">
				<div class="col-sm-3">
                   <div className="logo"><a href="a"><img src={require('../Assets/images/logo.png')} alt=''/></a></div>
				</div>
				<div class="col-sm-9 ">
					<nav class="navbar navbar-expand-lg navbar-light bg-light">
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                        </button>
                    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div class="navbar-nav">
                           <a class="nav-item nav-link itemsa" href="index.html">Home</a>
                           <a class="nav-item nav-link" href="collection.html">Collection</a>
                           <a class="nav-item nav-link" href="shoes.html">Shoes</a>
                           <a class="nav-item nav-link" href="racing boots.html">Racing Boots</a>
                           <a class="nav-item nav-link" href="contact.html">Contact</a>
                           <a className="nav-item nav-link last" href="s"><img src={require('../Assets/images/search_icon.png')} alt=''/></a>
                           <a className="nav-item nav-link last" href="contact.html"><img src={require('../Assets/images/shop_icon.png')} alt=''/></a>
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