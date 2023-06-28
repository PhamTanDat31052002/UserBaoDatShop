import React from "react";
import { variable } from "../Variable"
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
export default function FavouriteCRUD(){




      var [records, setRecords] = useState();
    const getToken = (() => {
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken
    })
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
    },[])
    return(
        <>
        {
         
          records!=null?
                <div className="containerIF">
                <div className="IF1">
                   <div className="itemIF1_1">
                   <NavLink to={"/account"}><p>Tài khoản của tôi</p></NavLink>
                    <NavLink to={'/invoice'}><p>Đơn hàng của tôi</p></NavLink>
                    <NavLink to={'/favourites'}><p>Danh sách yêu thích</p></NavLink>
                    <p>Kho voucher</p>
                    <p>Thông báo</p>
                   </div>
                </div>
                <div className="IF2">
                   <div className="itemIF2_1">
                        <p className="hscuatoi">Danh sách yêu thích</p>
                     
                    </div>
                    
                  
                </div>  
            </div>:null
                
          
        }
          
        </>
    )
}