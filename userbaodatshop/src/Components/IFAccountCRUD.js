import React from "react";
import "../Assets/css/styleIF.css"
import { useEffect } from 'react';
import { variable } from "../Variable"
import { useState } from 'react';
import { NavLink } from "react-router-dom";

export default function IFAccountCRUD(){
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
                    <p>Kho voucher</p>
                    <p>Thông báo</p>
                   </div>
                </div>
                <div className="IF2">
                   <div className="itemIF2_1">
                        <p className="hscuatoi">Hồ sơ của tôi</p>
                        <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
                    </div>
                    <div className="itemIF2_2">
                        <div className="item1_itemIF2_2">
                            <p>Tên đăng nhập</p>
                            <p>Tên</p>
                            <p>Email</p>
                            <p>Số điện thoại</p>
                            <p>Địa chỉ</p>
                        </div>
                        <div className="item2_itemIF2_2">
                              <p>{records.username}</p>
                            <p>{records.fullName}</p>
                            <p>{records.email}</p>
                            <p>{records.phone}</p>
                            <p>{records.address}</p>
                            <button className="btnLuuIF">Lưu</button>
                        </div>
                        <div className="item3_itemIF2_2">
                            <div className="imgIF">
                            <img src={require("../Assets/images//AoBarca2023.png")} alt="ac"></img>
                            </div>
                             <div>
                                <button className="btnChonAnh">Chọn ảnh</button>
                             </div>
                        </div>
                      
                    </div>
                  
                </div>  
            </div>:null
                
          
        }
          
        </>
    )
}