import React from "react";
// import "../Assets/css/bootstrap.min.css"

export default function ProductCRUD()
{
    return(
        <>
            <div class="collection_section layout_padding">
    	<div class="container">
    		<h1 class="new_text"><strong>New Arrivals Products</strong></h1>
    	    <p class="consectetur_text">consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</p>
    	</div>
    </div>
    <div class="layout_padding gallery_section">
    	<div class="container">
    		<div class="row">
    			<div class="col-sm-4">
    				<div class="best_shoes">
    					<p class="best_text">Best Shoes </p>
    					<div class="shoes_icon"><img src={require("../Assets/images/shoes-img4.png")} alt=''/></div>
    					<div class="star_text">
    						<div class="left_part">
    							<ul>
    	    					<li><a href="a"><img src={require("../Assets/images/star-icon.png")} alt=''/></a></li>
    	    						<li><a href="a"><img src={require("../Assets/images/star-icon.png")} alt=''/></a></li>
    	    						<li><a href="a"><img src={require("../Assets/images/star-icon.png")} alt=''/></a></li>
    	    						<li><a href="a"><img src={require("../Assets/images/star-icon.png")} alt=''/></a></li>
    	    						<li><a href="a"><img src={require("../Assets/images/star-icon.png")} alt=''/></a></li>
    	    					</ul>
    						</div>
    						<div class="right_part">
    							<div class="shoes_price">$ <span >60</span></div>
    						</div>
    					</div>
    				</div>
    			</div>
				<div class="col-sm-4">
    				<div class="best_shoes">
    					<p class="best_text">Best Shoes </p>
    					<div class="shoes_icon"><img src={require("../Assets/images/shoes-img4.png")} alt=''/></div>
    					<div class="star_text">
    						<div class="left_part">
    							<ul>
    	    					<li><a href="a"><img src={require("../Assets/images/star-icon.png")} alt=''/></a></li>
    	    						<li><a href="a"><img src={require("../Assets/images/star-icon.png")} alt=''/></a></li>
    	    						<li><a href="a"><img src={require("../Assets/images/star-icon.png")} alt=''/></a></li>
    	    						<li><a href="a"><img src={require("../Assets/images/star-icon.png")} alt=''/></a></li>
    	    						<li><a href="a"><img src={require("../Assets/images/star-icon.png")} alt=''/></a></li>
    	    					</ul>
    						</div>
    						<div class="right_part">
    							<div class="shoes_price">$ <span >60</span></div>
    						</div>
    					</div>
    				</div>
    			</div>
				<div class="col-sm-4">
    				<div class="best_shoes">
    					<p class="best_text">Best Shoes </p>
    					<div class="shoes_icon"><img src={require("../Assets/images/shoes-img4.png")} alt=''/></div>
    					<div class="star_text">
    						<div class="left_part">
    							<ul>
    	    					<li><a href="a"><img src={require("../Assets/images/star-icon.png")} alt=''/></a></li>
    	    						<li><a href="a"><img src={require("../Assets/images/star-icon.png")} alt=''/></a></li>
    	    						<li><a href="a"><img src={require("../Assets/images/star-icon.png")} alt=''/></a></li>
    	    						<li><a href="a"><img src={require("../Assets/images/star-icon.png")} alt=''/></a></li>
    	    						<li><a href="a"><img src={require("../Assets/images/star-icon.png")} alt=''/></a></li>
    	    					</ul>
    						</div>
    						<div class="right_part">
    							<div class="shoes_price">$ <span >60</span></div>
    						</div>
    					</div>
    				</div>
    			</div>
				
    		
    		</div>
    		
    		<div class="buy_now_bt">
    			<button class="buy_text">Buy Now</button>
    		</div>
    	</div>
    </div>
    
        </>
    )
}