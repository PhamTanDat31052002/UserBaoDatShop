import React from "react";
import "../Assets/css/style.css"
export default function Footer()
{
    return(
        <>
          <div class="section_footer">
    	<div class="container">
    		<div class="mail_section">
    			<div class="row">
    				<div class="col-sm-6 col-lg-2">
              
    					<div><a href="a"><img src={require('../Assets/images/footer-logo.png')} alt=""/></a></div>
    				</div>
    				<div class="col-sm-6 col-lg-2">
    					<div class="footer-logo"><img src={require('../Assets/images/phone-icon.png')} alt=""/><span class="map_text">(71) 1234567890</span></div>
    				</div>
    				<div class="col-sm-6 col-lg-3">
    					<div class="footer-logo"><img src={require('../Assets/images/email-icon.png')} alt=""/><span class="map_text">Demo@gmail.com</span></div>
    				</div>
    				<div class="col-sm-6 col-lg-3">
    					<div class="social_icon">
    						<ul>
    							<li><a href="a"><img src={require('../Assets/images/fb-icon.png')} alt="" /></a></li> 
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
    		        	<p class="dummy_text"> ipsum dolor sit amet, consectetur ipsum dolor sit amet, consectetur  ipsum dolor sit amet,</p>
    		        </div>
    		        <div class="col-sm-4 col-lg-2">
    		        	<h2 class="shop_text">Address </h2>
    		        	<div class="image-icon"><img src={require("../Assets/images/map-icon.png")} alt=""/><span class="pet_text">No 40 Baria Sreet 15/2 NewYork City, NY, United States.</span></div>
    		        </div>
    		        <div class="col-sm-4 col-md-6 col-lg-3">
    				    <h2 class="shop_text">Our Company </h2>
    				    <div class="delivery_text">
    				    	<ul>
    				    		<li>Delivery</li>
    				    		<li>Legal Notice</li>
    				    		<li>About us</li>
    				    		<li>Secure payment</li>
    				    		<li>Contact us</li>
    				    	</ul>
    				    </div>
    		        </div>
    			<div class="col-sm-6 col-lg-3">
    				<h2 class="adderess_text">Products</h2>
    				<div class="delivery_text">
    				    	<ul>
    				    		<li>Prices drop</li>
    				    		<li>New products</li>
    				    		<li>Best sales</li>
    				    		<li>Contact us</li>
    				    		<li>Sitemap</li>
    				    	</ul>
    				    </div>
    			</div>
    			<div class="col-sm-6 col-lg-2">
    				<h2 class="adderess_text">Newsletter</h2>
    				<div class="form-group">
                        <input type="text" class="enter_email" placeholder="Enter Your email" name="Name"/>
                    </div>
                    <button class="subscribr_bt">Subscribe</button>
    			</div>
    			</div>
    	        </div> 
	        </div>
    	</div>
    
        </>
    )
}