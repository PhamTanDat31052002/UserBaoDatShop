import React from "react";
import { variable } from "../Variable"
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
export default function FavouriteCRUD(){




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
    useEffect(()=>{
        const token=getToken();
        fetch(variable.API_URL + "Account/GetDetailAccount",{
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'Authorization': `Bearer ${token.value}`,
                }
            }).then(response => response.json())
            .then(data => setRecords(data)).catch(err => console.log(err))
        fetch(variable.API_URL + "FavoriteProducts/GetAllFavoriteProduct",{
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'Authorization': `Bearer ${token.value}`,
                }
            }).then(response => response.json())
            .then(data => setAllFavourite(data)).catch(err => console.log(err))

    },[])
    const DeleteFavourite=(()=>{
        const token=getToken();
        fetch(variable.API_URL + "Account/GetDetailAccount",{
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'Authorization': `Bearer ${token.value}`,
                }
            }).then(response => response.json())
            .then(data => setRecords(data)).catch(err => console.log(err))
    })
    return(
        <>
        {
         
          records!=null?
                <div className="containerIF">
                <div className="IF1">
                   <div className="itemIF1_1">
                   <NavLink to={"/account"}><p style={{fontWeight:"bold"}}>Tài khoản của tôi</p></NavLink>
                    <NavLink to={'/invoice'}><p style={{fontWeight:"bold"}}>Đơn hàng của tôi</p></NavLink>
                    <NavLink to={'/favourites'}><p style={{fontWeight:"bold"}}>Danh sách yêu thích</p></NavLink>
                    <p>Kho voucher</p>
                    <p>Thông báo</p>
                   </div>
                </div>
                <div className="IF2">
                   <div className="itemIF2_1">
                        <p className="hscuatoi">Danh sách yêu thích</p>
                     
                     <div>
                     {
                            allFavourite!=null?
                                            allFavourite.map(data =>
                                                <NavLink to={'/detail'} state={data.productId}>
                                                    <div className="itemDonHang">
                                                        <div className="sanPhamIV">
                                                            <div className="imgsanPhamIV">
                                                                <img style={{ border: "1px solid rgb(215, 215, 199)" }} src={"https://localhost:7067/wwwroot/image/product/" + data.product.image} width={"100px"} alt="sp"></img>
                                                            </div>
                                                            <div className="chiTietsanPhamIV">
                                                                <div><span> {data.product.name}</span></div>
                                                                <div><span>Giá: {VND.format(data.product.price)}</span></div>
                                                                
                                                               
                                                            </div>
                                                            <div className="giasanPhamIV">
                                                            <div className='itemDetailCart1'>
                                                                            <button  class="fas fa-times btnXoayeuthich"></button>

                                                                        </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </NavLink>

                                             ) :null
                                        }
                     </div>
                    </div>
                    
                  
                </div>  
            </div>:null
                
          
        }
          
        </>
    )
}