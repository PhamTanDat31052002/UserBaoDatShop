import React from "react";
import { useEffect } from 'react';
import { variable } from "../Variable"
import { useState } from 'react';
import { NavLink } from "react-router-dom";
import "../Assets/css/stylepay.css"
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Alert, Space, message } from 'antd';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
export default function PayBuyNowCRUD() {

    var location = useLocation();
    var tongTien=location.state[2]
    var dc=location.state[0];
    var sdt=location.state[1];
    var idProductSize=location.state[3];
    var idProduct=location.state[4];
    var number=location.state[5];
    var name=location.state[6];

    var [productSize, setProductSize] = useState();
    var [itemPr, setitemPr] = useState();
    var [open1, setopen] = useState(false);

    var history=useNavigate();
    var [payMedIV, setPayMedIV] = useState(false);
   
    var payIV=false;
    var [infor, setInfor] = useState();

    


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

     fetch(variable.API_URL + "ProductSizes/GetByid/"+ idProductSize)
            .then(respone => respone.json())
            .then(result => {
                setProductSize(result)
            }).catch(err => console.log(err))
        fetch(variable.API_URL + "Products/GetProductById/"+ idProduct)
            .then(respone => respone.json())
            .then(result => {
                setitemPr(result)
            }).catch(err => console.log(err))
     

    }, [])

    const AddInvoiceBuyNow=(()=>{
        const token=getToken();
        fetch(variable.API_URL + "Inovices/CreateInvoiceNow", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token.value}`
            },
            body: JSON.stringify({
                nameCustomer:name,
                quantity:number,
                productSizeID: idProductSize,
                paymentMethods: payMedIV,
                pay:payIV,
                total: tongTien,
                shippingAddress:dc,
                shippingPhone:sdt
            })
        })
        .then(response => response.json())
        .then(result => {
            if(result==true)
            {
                setopen(false)
                 message.success("Đặt hàng thành công!")
            history("/invoice")}
           
        }, (error) => {
            console.log(error);
        })
    })

    return (
        <>

            <>
            <Dialog
                open={open1}
                keepMounted
                onClose={() => {
                    setopen(false)
                }}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Bạn chắc chắn muốn đặt đơn hàng?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                            Kiểm tra kĩ thông tin giao nhận hàng trước khi xác nhận
                        </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        AddInvoiceBuyNow()
                    }}>Xác nhận</Button>
                    <Button onClick={() => {
                        setopen(false)
                    }}>Hủy</Button>
                </DialogActions>
            </Dialog>
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
                                    {
                                      itemPr!=null?
                                            <ul class="item-list">
                                            <li className="itemCheckOut">
                                                <div className="imgItemCheckOut">
                                                    <img src={"https://localhost:7067/wwwroot/image/product/" + itemPr.image} alt="sp"></img>
                                                </div>
                                                <div className="tenItemCheckOut">
                                                    <div>
                                                        <span style={{ wordWrap: "break-word" }}>{itemPr.name}</span>
                                                    </div>
                                                    <div>
                                                        <span style={{ fontSize: "13px" }}>Size: {productSize.name} | Số lượng: {number}</span>
                                                    </div>
                                                </div>
                                                <div className="giaItemCheckOut">
                                                    <span>{VND.format(itemPr.price * number)}</span>
                                                </div>
                                            </li>
                                        </ul>:null
                                            
                                    }

                                    </div>

                                    <form class="card p-3">
                                        <div class="input-group">
                                            {/* <input type="text" class="form-control" placeholder="Mã giảm giá" />
                                            <div class="input-group-append">
                                                <button type="submit" class="btn btn-secondary">Sử dụng</button>
                                            </div> */}
                                            <div className="tamTinhCO">
                                                <div className="itemTamTinh1">
                                                    <div>
                                                        <span>Tạm tính</span>
                                                    </div>
                                                  


                                                </div>
                                                <div className="itemTamTinh2">
                                                    <div>
                                                        <span>{VND.format(tongTien)}</span>
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
                                            <span style={{ paddingBottom: "2%" }}>Phương thức thanh toán</span>
                                        </div>
                                        <div className="cacPhuongThucThanhToan">
                                            <div className="containerPay">
                                                <input type="radio" name="itempay" onClick={()=>setPayMedIV(false)} className="itempay" id="item1" checked />
                                                <label className="itempay" for="item1">Thanh toán khi nhận hàng (COD)</label>
                                                <input type="radio" name="itempay" onClick={()=>setPayMedIV(true)} className="itempay" id="item2" />
                                                <label className="itempay" for="item2">Chuyển khoản qua nhân hàng</label>
                                            </div>
                                        </div>
                                            <div>
                                                <button  className='hoanTatDonHang' onClick={()=>setopen(true)}>Hoàn tất đơn hàng</button>
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