import React from "react";
import { variable } from "../Variable"
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import { message } from "antd";
import "../Assets/css/styleFavourite.css"
export default function FavouriteCRUD() {



    var [count, setCount] = useState(0);
    var [records, setRecords] = useState();
    var [allFavourite, setAllFavourite] = useState([]);
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
            .then(data => setRecords(data)).catch(err => console.log(err))
        fetch(variable.API_URL + "FavoriteProducts/GetAllFavoriteProduct", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token.value}`,
            }
        }).then(response => response.json())
            .then(data => setAllFavourite(data)).catch(err => console.log(err))

    }, [count])
    const DontLikeProduct = (data) => {

        const token = getToken();

        fetch(variable.API_URL + "FavoriteProducts/DeleteFavoriteProduct?id=" + data, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token.value}`
            },

        })
            .then(response => response.json())
            .then(result => {
                message.success("Đã bỏ sản phẩm khỏi danh sách yêu thích!")
                setCount(count += 1)
            })
    }

    return (
        <>
            {

                records != null ?
                    <div className="containerIF">
                        <div className="IF1">
                            <div className="itemIF1_1">
                                <NavLink to={"/account"}><p style={{ fontWeight: "bold" }}>Tài khoản của tôi</p></NavLink>
                                <NavLink to={'/invoice'}><p style={{ fontWeight: "bold" }}>Đơn hàng của tôi</p></NavLink>
                                <NavLink to={'/favourites'}><p style={{ fontWeight: "bold" }}>Danh sách yêu thích</p></NavLink>
                                <p>Kho voucher</p>
                                <p>Thông báo</p>
                            </div>
                        </div>
                        <div className="IF2">
                            <div className="itemIF2_1">
                                <p className="hscuatoi">Danh sách yêu thích</p>

                                <div>
                                    {
                                        allFavourite != null ?
                                            allFavourite.map(data =>

                                               
                                                    <div className="ctnFavourite">
                                                         <NavLink to={`/detail/${data.productId}`} className="itemFavourite1" state={data.productId}>
                                                        <div >
                                                            <img style={{ border: "1px solid rgb(215, 215, 199)" }} src={"https://localhost:7067/wwwroot/image/product/" + data.product.image} width={"100px"} alt="sp"></img>
                                                        </div>
                                                        </NavLink>
                                                        <NavLink to={`/detail/${data.id}`}   className="itemFavourite2" state={data.productId}>
                                                        <div>
                                                            <div><span> {data.product.name}</span></div>
                                                            <div><span>Giá: {VND.format(data.product.priceSales)}</span></div>

                                                        </div>
                                                        </NavLink>

                                                        <div className='itemFavourite3'>
                                                            <button class="fas fa-times btnXoayeuthich" onClick={() => DontLikeProduct(data.productId)}></button>
                                                        </div>
                                                    </div>
                                               



                                            ) : null
                                    }
                                </div>
                            </div>


                        </div>
                    </div> : null


            }

        </>
    )
}