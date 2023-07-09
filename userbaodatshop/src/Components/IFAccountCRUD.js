import React from "react";
import "../Assets/css/styleIF.css"
import { useEffect } from 'react';
import { variable } from "../Variable"
import { useState } from 'react';
import { NavLink } from "react-router-dom";
import { Email, Phone } from "@mui/icons-material";
import {
    Avatar,

} from '@mui/material';
import { Alert, Space, message } from 'antd';
export default function IFAccountCRUD() {
    var [records, setRecords] = useState();
    var [name, setName] = useState("");
    var [email, setEmail] = useState("");
    var [phone, setPhone] = useState("");
    var [address, setAddress] = useState("");
    var [avatar, setAvatar] = useState();
    var [NameAvatar, setNameAvatar] = useState('');
    var [count,setCount]=useState(0);
    var [tamp,setTamp]=useState(0);
    const getToken = (() => {
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken
    })
    const ChangeAvatar = (value) => {
		if (value.target.files[0] != null) {
			setAvatar(value.target.files[0])
			setNameAvatar(value.target.files[0].name)
		}

	}
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
            .then(data =>{
                setRecords(data)
                setPhone(data.phone)
                setName(data.fullName)
                setAddress(data.address)
            }).catch(err => console.log(err))
    }, [count])

    const Update = (() => {
        const token = getToken();
        if (name == "") return message.error("Số điện thoại không được để trống")
        const phoneRegex = /^0\d{9}$/;
		if (phone == "") return message.error("Số điện thoại không được để trống")
       
            if (!phoneRegex.test(phone)) {
                return message.error("Số điện thoại không hợp lệ! Vui lòng nhập đúng định dạng.");
            }
		if (address == "") return message.error("Địa chỉ không được để rỗng!")
        fetch(variable.API_URL + "Account/UpdateAccountCustomer", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token.value}`,
            }
            , body: JSON.stringify({
                phone: phone,
                Address: address,
                fullName: name,
            })
        }).then(response => response.json())
            .then(data =>{
                if(data=="True")
                {
                    setCount(count+1)
                    message.success("Cập nhật thành công")
                }
                else if(data=="SDT"){
                    message.error("Số điện thoại đã được sử dụng")
                }
                else {
                    message.error("Cập nhật thất bại")
                }
            }).catch(err => console.log(err))
    })
    
    const UpdateAndImage = (() => {
        const token = getToken();

        const phoneRegex = /^0\d{9}$/;
		if (phone == "") return message.error("Số điện thoại không được để trống")

		if (!phoneRegex.test(phone)) {
			return message.error("Số điện thoại không hợp lệ! Vui lòng nhập đúng định dạng.");
		}
        if (name == "") return message.error("Họ tên không được để rỗng!")


		if (address == "") return message.error("Địa chỉ không được để rỗng!")
        const formData = new FormData()
        
					formData.append("model", avatar, NameAvatar)

        fetch(variable.API_URL + "Account/UpdateAccountCustomer/" + phone +"&"+address+"&"+name , {
            method: "POST",
            headers: {
                
                'Authorization': `Bearer ${token.value}`,
            }
            , body:  formData
               
               
        
        }).then(response => response.json())
            .then(data =>{
                if(data==true)
                {
                    setCount(count+1)
                    message.success("Cập nhật thành công")
                }
                else if(data=="SDT"){
                    message.error("Số điện thoại đã được sử dụng")
                }
                else{
                    message.error("Cập nhật thất bại")
                }
            }).catch(err => console.log(err))
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
                                        <input className="itemIP" type="text" onChange={(e) => {
                                              setTamp(tamp+1)
                                            setName(e.target.value)
                                             }} value={name} ></input>
                                    </div>
                                    <div>
                                        <input  className="itemIP" type="text" value={records.email} readOnly ></input>
                                    </div>
                                    <div>
                                        <input  className="itemIP" type="number" onChange={(e) => { 
                                              setTamp(tamp+1)
                                            setPhone(e.target.value)
                                             }} value={phone}  ></input>
                                    </div>
                                    <div>
                                        <input  className="itemIP" type="text" onChange={(e) => { 
                                            setTamp(tamp+1)
                                            setAddress(e.target.value)
                                             }} value={address} ></input>
                                    </div>

                                             {
                                                tamp!=0?  <button className="btnLuuIF" onClick={() =>
                                                    {
                                                        NameAvatar==''?
                                                        Update():UpdateAndImage()
                                                    } }> Lưu</button>:
                                                    <button className="btnLuuIF" onClick={() =>
                                                        {
                                                           message.error("Bạn chưa thay đổi thông tin")
                                                        } }> Lưu</button>
                                             }
                                  
                                </div>
                                <div className="item3_itemIF2_2">
                                <div className="imgIF">
                                    <Avatar
            
                                            src={"https://localhost:7067/wwwroot/image/Avatar/" + records.avatar}
                                            alt={""}
                                            sx={{
                                              
                                            //    ml:10,
                                                width: 100,
                                                height: 100,
                                            }}
                                        />
                                        </div>
                                    {/* <div>
                                        <img  className="imgIF" src={"https://localhost:7067/wwwroot/image/Avatar/" + records.avatar} alt="ac"></img>
                                    </div> */}
                                    <div>
                                     
                                        
                                        <input type="file" id="avatar" className="form-style" placeholder="Address" onChange={(e) =>
                                            { setTamp(tamp+1)
                                                ChangeAvatar(e)}}  />
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