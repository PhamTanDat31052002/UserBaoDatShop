import React from "react";
import "../Assets/css/styleIF.css"
import { useEffect } from 'react';
import { variable } from "../Variable"
import { useState } from 'react';
import { NavLink } from "react-router-dom";
import { Email, Phone } from "@mui/icons-material";

export default function IFAccountCRUD() {
    var [records, setRecords] = useState();
    var [name, setName] = useState("");
    var [email, setEmail] = useState("");
    var [phone, setPhone] = useState("");
    var [address, setAddress] = useState("");
    var [avatar, setAvatar] = useState();
    var [NameAvatar, setNameAvatar] = useState();

    const getToken = (() => {
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken
    })
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
    }, [])
    const Update = (() => {
        const token = getToken();
        fetch(variable.API_URL + "Account/UpdateAccount", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token.value}`,
            }
            , body: JSON.stringify({
                email: email,
                Phone: phone,
                Address: address,
                FullName: name,
            })
        }).then(response => response.json())
            .then(data => setRecords(data)).catch(err => console.log(err))
    })

    return (
        <>
            {

                records != null ?
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
                                <p className="hscuatoi">Hồ sơ của tôi</p>
                                <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
                            </div>
                            <div className="itemIF2_2">
                                <div className="item1_itemIF2_2">
                                   
                                    <p className="itemDeMucTT">Tên</p>

                                    <p className="itemDeMucTT">Email</p>

                                    <p className="itemDeMucTT">Số điện thoại</p>

                                    <p className="itemDeMucTT">Địa chỉ</p>

                                </div>
                                <div className="item2_itemIF2_2">
                                    
                                    <div>
                                        <input className="itemIP" type="text" onChange={(e) => { setName(e.target.value) }} value={name == "" ? records.fullName : name} ></input>
                                    </div>
                                    <div>
                                        <input  className="itemIP" type="text" onChange={(e) => { setEmail(e.target.value) }} value={email == "" ? records.email : email} ></input>
                                    </div>
                                    <div>
                                        <input  className="itemIP" type="text" onChange={(e) => { setPhone(e.target.value) }} value={records.phone}  ></input>
                                    </div>
                                    <div>
                                        <input  className="itemIP" type="text" onChange={(e) => { setAddress(e.target.value) }} value={records.address}></input>
                                    </div>

                                    <button className="btnLuuIF" onClick={() => Update()}>Lưu</button>
                                </div>
                                <div className="item3_itemIF2_2">
                                    <div className="imgIF">
                                        <img src={"https://localhost:7067/wwwroot/image/Avatar/" + records.avatar} alt="ac"></img>
                                    </div>
                                    <div>
                                        <input type="file"></input>
                                        <button className="btnChonAnh">Chọn ảnh</button>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div> : null


            }

        </>
    )
}