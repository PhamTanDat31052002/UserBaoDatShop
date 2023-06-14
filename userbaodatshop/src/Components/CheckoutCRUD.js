import React from "react";
import "../Assets/css/stylecheckout.css"
export default function CheckoutCRUD() {
    return (
        <>
            <div class="container">

               

                <div class="row">
                    <div class="col-md-4 order-md-2 mb-4">
                        <h4 class="d-flex justify-content-between align-items-center mb-3">
                            <span class="text-muted">Giỏ hàng</span>
                            <span class="badge badge-secondary badge-pill">3</span>
                        </h4>
                        <ul class="list-group mb-3">
                            <li class="list-group-item d-flex justify-content-between lh-condensed">
                                <div>
                                    <img src={require("../Assets/images/AoBarca2023.png")} alt="a"></img>
                                    <h6 class="my-1">Product name</h6>
                                    <small class="text-muted">Brief description</small>
                                </div>
                                <span class="text-muted">$12</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between lh-condensed">
                                <div>
                                    <h6 class="my-0">Second product</h6>
                                    <small class="text-muted">Brief description</small>
                                </div>
                                <span class="text-muted">$8</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between lh-condensed">
                                <div>
                                    <h6 class="my-0">Third item</h6>
                                    <small class="text-muted">Brief description</small>
                                </div>
                                <span class="text-muted">$5</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between bg-light">
                                <div class="text-success">
                                    <h6 class="my-0">Promo code</h6>
                                    <small>EXAMPLECODE</small>
                                </div>
                                <span class="text-success">-$5</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between">
                                <span>Total (USD)</span>
                                <strong>$20</strong>
                            </li>
                        </ul>

                        <form class="card p-2">
                            <div class="input-group">
                                <input type="text" class="form-control" placeholder="Promo code" />
                                <div class="input-group-append">
                                    <button type="submit" class="btn btn-secondary">Redeem</button>
                                </div>
                            </div>
                        </form>

                    </div>

                    <div class="col-md-8 order-md-1">
                        <h4 class="mb-3">Thông tin giao hàng</h4>
                        <form class="needs-validation" novalidate>
                            <div class="row">
                           
                            </div>

                            <div class="mb-3">
                                <label for="email">Họ và tên <span class="text-muted"></span></label>
                                <input type="email" class="form-control" id="name" placeholder="Họ và tên" />
                                <div class="invalid-feedback">
                                   Vui lòng nhập họ và tên!
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="email">Email <span class="text-muted"></span></label>
                                <input type="email" class="form-control" id="email" placeholder="Email" />
                                <div class="invalid-feedback">
                                    Vui lòng nhập Email!
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="email">Số điện thoại <span class="text-muted"></span></label>
                                <input type="number" class="form-control" id="numberphone" placeholder="Số điện thoại" />
                                <div class="invalid-feedback">
                                    Vui lòng nhập số điện thoại nhận hàng!
                                </div>
                            </div>

                            <div class="mb-3">
                                <label for="address">Địa chỉ </label>
                                <input type="text" class="form-control" id="address" placeholder="Số nhà, tên đường" required />
                                <div class="invalid-feedback">
                                   Vui lòng nhập địa chỉ cụ thể!
                                </div>
                            </div>

                            {/* <div class="mb-3">
                                <label for="address2">Address 2 <span class="text-muted">(Optional)</span></label>
                                <input type="text" class="form-control" id="address2" placeholder="Apartment or suite" />
                            </div> */}

                            <div class="row">
                                <div class="col-md-4 mb-3">
                                    <label for="country">Tỉnh</label>
                                    <select class="custom-select d-block w-100" id="country" required>
                                        <option value="">Chọn...</option>
                                        <option>United States</option>
                                    </select>
                                    <div class="invalid-feedback">
                                        Please select a valid country.
                                    </div>
                                </div>
                                <div class="col-md-4 mb-3">
                                    <label for="state">Quận/Huyện</label>
                                    <select class="custom-select d-block w-100" id="state" required>
                                        <option value="">Chọn...</option>
                                        <option>California</option>
                                    </select>
                                    <div class="invalid-feedback">
                                        Please provide a valid state.
                                    </div>
                                </div>
                                <div class="col-md-4 mb-3">
                                    <label for="state">Phường/Xã</label>
                                    <select class="custom-select d-block w-100" id="state" required>
                                        <option value="">Chọn...</option>
                                        <option>California</option>
                                    </select>
                                    <div class="invalid-feedback">
                                        Please provide a valid state.
                                    </div>
                                </div>
                            </div>
                            <hr class="mb-4" />
                            <div class="custom-control custom-checkbox">
                                <input type="checkbox" class="custom-control-input" id="same-address" />
                                <label class="custom-control-label" for="same-address">Shipping address is the same as my billing address</label>
                            </div>
                            <div class="custom-control custom-checkbox">
                                <input type="checkbox" class="custom-control-input" id="save-info" />
                                <label class="custom-control-label" for="save-info">Save this information for next time</label>
                            </div>
                            <hr class="mb-4" />

                            <h4 class="mb-3">Payment</h4>

                            <div class="d-block my-3">
                                <div class="custom-control custom-radio">
                                    <input id="credit" name="paymentMethod" type="radio" class="custom-control-input" checked required />
                                    <label class="custom-control-label" for="credit">Credit card</label>
                                </div>
                                <div class="custom-control custom-radio">
                                    <input id="debit" name="paymentMethod" type="radio" class="custom-control-input" required />
                                    <label class="custom-control-label" for="debit">Debit card</label>
                                </div>
                                <div class="custom-control custom-radio">
                                    <input id="paypal" name="paymentMethod" type="radio" class="custom-control-input" required />
                                    <label class="custom-control-label" for="paypal">PayPal</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label for="cc-name">Name on card</label>
                                    <input type="text" class="form-control" id="cc-name" placeholder="" required />
                                    <small class="text-muted">Full name as displayed on card</small>
                                    <div class="invalid-feedback">
                                        Name on card is required
                                    </div>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label for="cc-number">Credit card number</label>
                                    <input type="text" class="form-control" placeholder="" required />

                                    <div class="invalid-feedback">
                                        Credit card number is required/
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-3 mb-3">
                                    <label for="cc-expiration">Expiration</label>
                                    <input type="text" class="form-control" id="cc-expiration" placeholder="" required />
                                    <div class="invalid-feedback">
                                        Expiration date required/
                                    </div>
                                </div>
                                <div class="col-md-3 mb-3">
                                    <label for="cc-cvv">CVV</label>
                                    <input type="text" class="form-control" id="cc-cvv" placeholder="" required />
                                    <div class="invalid-feedback">
                                        Security code required/
                                    </div>
                                </div>
                            </div>
                            <hr class="mb-4" />
                            <button class="btn btn-primary btn-lg btn-block" type="submit">Continue to checkout</button>
                        </form>
                    </div>
                </div>
                <div>
                    <footer class="my-5 pt-5 text-muted text-center text-small">
                        <p class="mb-1">&copy; 2017-2019 Company Name</p>
                        <ul class="list-inline">
                            <li class="list-inline-item">Privacy</li>
                            <li class="list-inline-item">ABC</li>
                            <li class="list-inline-item">Support</li>
                        </ul>
                    </footer>
                </div>
            </div>

        </>
    )
}