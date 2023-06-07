import React from 'react'
import "../Assets/css/stylecart.css"
import "../Assets/css/bootstrap.min.css"

export default function CartCRUD() {
    return (
        <>

         
                <section class="shopping-cart dark">
                    <div class="container">
                       
                        <div class="content">
                            <div class="row">
                                <div class="col-md-12 col-lg-8">
                                    <div class="items">
                                        <div class="product">
                                            <div class="row">
                                                <div class="col-md-3">

                                                    <img class="img-fluid mx-auto d-block image" src={require('../Assets/images/running-shoes.png')} alt="sp" />
                                                </div>
                                                <div class="col-md-8">
                                                    <div class="info">
                                                        <div class="row">
                                                            <div class="col-md-5 product-name">
                                                                <div class="product-name">
                                                                    {/* <a href="#">Lorem Ipsum dolor</a> */}
                                                                    <div class="product-info">
                                                                        <div>Display: <span class="value">5 inch</span></div>
                                                                        <div>RAM: <span class="value">4GB</span></div>
                                                                        <div>Memory: <span class="value">32GB</span></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-4 quantity">
                                                                <label for="quantity">Quantity:</label>
                                                                {/* <input id="quantity" type="number" value ="1" class="form-control quantity-input"> */}
                                                            </div>
                                                            <div class="col-md-3 price">
                                                                <span>$120</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                      
                                    </div>
                                </div>
                                <div class="col-md-12 col-lg-4">
                                    <div class="summary">
                                        <h3>Summary</h3>
                                        <div class="summary-item"><span class="text">Tổng tiền</span><span class="price"></span></div>
                                        <div class="summary-item"><span class="text">Giảm giá</span><span class="price"></span></div>
                                        <div class="summary-item"><span class="text">Phí vận chuyển</span><span class="price"></span></div>
                                        <div class="summary-item"><span class="text">Tổng cộng</span><span class="price"></span></div>
                                        <button type="button" class="btn btn-primary btn-lg btn-block">Thanh toán</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
      

        </>
    )
}