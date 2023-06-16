import React from "react";
import { useEffect } from 'react';
import { variable } from "../Variable"
import { useState } from 'react';
import { NavLink } from "react-router-dom";
import "../Assets/css/stylepay.css"
export default function PayCRUD(){

    var [infor, setInfor] = useState();
    var [allCart, setAllCart] = useState();
    var [productItem, setProductItem] = useState([]);
    var [total, settotal] = useState(0);

    
    const getToken = (() => {
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken
    })
    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    useEffect(() => {
        const token = getToken();
        fetch(variable.API_URL + "Account/GetDetailAccount", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token.value}`,
            }
        }).then(response => response.json())
            .then(data => setInfor(data)).catch(err => console.log(err))

        fetch(variable.API_URL + "Carts/GetAllCart", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token.value}`,
            }
        })
            .then(response => response.json())
            .then(data => setAllCart(data)).catch(err => console.log(err))
        fetch(variable.API_URL + "Products/GetAllProductStatusTrue")
            .then(respone => respone.json())
            .then(result => {
                setProductItem(result)
            }).catch(err => console.log(err))
        //total
        fetch(variable.API_URL + "Carts/GetAllTotal", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token.value}`,
            }
        })
            .then(response => response.json())
            .then(data => settotal(data)).catch(err => console.log(err))
       
     

    }, [])


    return(
        <>
        
        <>
            {
                infor != null ?
                    <div class="container">

                        <div class="row">
                            <div class="col-md-4 order-md-2 mb-4">
                                <h4 class="d-flex justify-content-between align-items-center mb-3">
                                    <span class="text-muted">Giỏ hàng</span>
                                    <span class="badge badge-secondary badge-pill">3</span>
                                </h4>

                                <div class="scroll-container">
                                    {allCart != null ?
                                        allCart.map(dep =>
                                            productItem.filter((item) => {
                                                return item.id == dep.productSize.productId ?
                                                    item : null
                                            }
                                            ).map(data => <ul class="item-list">
                                                <li className="itemCheckOut">
                                                    <div className="imgItemCheckOut">
                                                        <img src={require("../Assets/images/" + data.image)} alt="sp"></img>
                                                    </div>
                                                    <div className="tenItemCheckOut">
                                                        <div>
                                                            <span style={{ wordWrap: "break-word" }}>{data.name}</span>
                                                        </div>
                                                        <div>
                                                            <span style={{ fontSize: "13px" }}>Size: {dep.productSize.name} | Số lượng: {dep.quantity}</span>
                                                        </div>
                                                    </div>
                                                    <div className="giaItemCheckOut">
                                                        <span>{VND.format(dep.quantity * data.price)}</span>
                                                    </div>
                                                </li>
                                            </ul>)

                                        )
                                        : null
                                    }

                                </div>

                                <form class="card p-3">
                                    <div class="input-group">
                                        <input type="text" class="form-control" placeholder="Mã giảm giá" />
                                        <div class="input-group-append">
                                            <button type="submit" class="btn btn-secondary">Sử dụng</button>
                                        </div>
                                        <div className="tamTinhCO">
                                            <div className="itemTamTinh1">
                                                <div>
                                                    <span>Tạm tính</span>
                                                </div>
                                                <div>
                                                    <span>Phí vận chuyển</span>
                                                </div>


                                            </div>
                                            <div className="itemTamTinh2">
                                                <div>
                                                    <span>{VND.format(total)}</span>
                                                </div>
                                                <div>
                                                    <span>-</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>

                            </div>

                            <div class="col-md-8 order-md-1" >
                                <h4 class="mb-3">Phương thức thanh toán</h4>
                               <div>
                                    <span>Phương thức vận chuyển</span>
                               </div>
                               <div className="GHTanNoi">
                                    <div className="itemGHTanNoi1">
                                        <span>Giao hàng tận nơi</span>
                                    </div>
                                    <div className="itemGHTanNoi2">
                                    <span>20000</span>
                                    </div>
                               </div>
                               <div className="phuongThucThanhToan">
                                    <div>
                                        <span style={{paddingBottom:"2%"}}>Phương thức thanh toán</span>
                                    </div>
                                    <div className="cacPhuongThucThanhToan">
                                        <div className="containerPay">
                                        <input type="radio" name="itempay" className="itempay" id="item1" checked/>
                                            <label className="itempay" for="item1">Thanh toán khi nhận hàng (COD)</label>
                                            <input type="radio" name="itempay" className="itempay" id="item2"/>
                                            <label className="itempay" for="item2">Chuyển khoản qua nhân hàng</label>
                                        </div>
                                    </div>
                               </div>
                            </div>
                        </div>
                    
                    </div> : null
            }


        </>
    )
        </>
    )
}