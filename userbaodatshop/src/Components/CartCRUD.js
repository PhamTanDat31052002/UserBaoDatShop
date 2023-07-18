import React from 'react'
import "../Assets/css/stylecart.css"
import "../Assets/css/bootstrap.min.css"
import { variable } from "../Variable"
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';




import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { result } from 'lodash';
import { message } from 'antd';
export default function CartCRUD() {
    const [number, setNumber] = useState(1);
    var [records, setRecords] = useState([]);
    var [productItem, setProductItem] = useState([]);
    var [total, settotal] = useState(0);
    var [open1, setopen] = useState(false);
    var [openDeleteAll, setOpenDeleteAll] = useState(false);
    const history = useNavigate()

    const getToken = (() => {
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken
    })
    var [count, setcount] = useState(0);
    var [id, setid] = useState(0);
    useEffect(() => {

        const token = getToken();
        fetch(variable.API_URL + "Carts/GetAllCart", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token.value}`,
            }
        })
            .then(response => response.json())
            .then(data => setRecords(data)).catch(err => console.log(err))
        //product
        fetch(variable.API_URL + "Products/GetAllProductStatusTrue")
            .then(respone => respone.json())
            .then(result => {
                setProductItem(result)
            }).catch(err => console.log(err))

        // toatl
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

    }, [count])

    const DeleteCartById = ((id) => {
        const token = getToken();
        fetch(variable.API_URL + "Carts/DeleteCart/" + id, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token.value}`,
            }
        }).then(response => response.json())
            .then(result => {

                
                    setopen(false)
                setcount(count + 1)
               message.success("Đã xóa sản phẩm khỏi giỏ hàng!")
            })

    })
    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    const UpdateCartAdd = ((id,sizeid) => {

        const token = getToken();
       
        fetch(variable.API_URL + "Carts/UpdateCart+1/" + id, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token.value}`
            }
        }).then(response => response.json())
            .then(result => {

                // if(result=="Thành công")
                // {
                setcount(count + 1)
                //  }
                //    window.location.reload();
            })
    })
    const UpdateCartMinus = ((id) => {
        const token = getToken();
        fetch(variable.API_URL + "Carts/UpdateCart-1/" + id, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token.value}`
            }
        }).then(response => response.json())
            .then(result => {

                // if(result=="Thành công")
                // {
                setcount(count + 1)
                //  }
                //    window.location.reload();
            })
    })



    const DeleteAllCart = (() => {
        const token = getToken();
        if(records=='')
        { 
            setOpenDeleteAll(false)
            return message.error("Giỏ hàng chưa có sản phẩm để xóa!")
        }


            fetch(variable.API_URL + "Carts/DeleteAllCart", {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'Authorization': `Bearer ${token.value}`
                }
            }).then(response => response.json())
                .then(result => {

               
                        setOpenDeleteAll(false)
                    setcount(count + 1)
                    message.success("Đã xóa toàn bộ sản phẩm!")
                
                })
               
        
    })


    return (
        <>
    {/* Xóa sản phẩm */}
            <Dialog
                open={open1}
                keepMounted
                onClose={() => {
                    setopen(false)
                }}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?"}</DialogTitle>
                <DialogContent>
                    {/* <DialogContentText id="alert-dialog-slide-description">
                            Khi hủy xong thì sẽ không thể khôi phục lại được
                        </DialogContentText> */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        DeleteCartById(id)
                    }}>Xóa</Button>
                    <Button onClick={() => {
                        setopen(false)
                    }}>Hủy</Button>
                </DialogActions>
            </Dialog>
{/* Xóa all */}
<Dialog
                open={openDeleteAll}
                keepMounted
                onClose={() => {
                    setOpenDeleteAll(false)
                }}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Bạn có chắc muốn xóa toàn bộ giỏ hàng?"}</DialogTitle>
                <DialogContent>
                    {/* <DialogContentText id="alert-dialog-slide-description">
                            Khi hủy xong thì sẽ không thể khôi phục lại được
                        </DialogContentText> */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        DeleteAllCart()
                    }}>Xóa</Button>
                    <Button onClick={() => {
                        setOpenDeleteAll(false)
                    }}>Hủy</Button>
                </DialogActions>
            </Dialog>

            <div className='containerCart'>
                <div className='itemCart1'>

                    <div className='cntHeadCart'>
                        <span className='itemHeadCart1'>Sản phẩm</span>
                        <span className='itemHeadCart2'>Đơn giá</span>
                        <span className='itemHeadCart2'>Số lượng</span>
                        <span className='itemHeadCart2'>Thành tiền</span>
                    </div>
                    {
                        records != null ?
                            records.map(dep =>
                                productItem.filter((item) => {

                                    return item.id == dep.productSize.productId ?
                                        item
                                        : null
                                })
                                    .map(data =>
                                        <div className='ctnDetailCart'>


                                            <div className='itemDetailCart1'>
                                                <button onClick={() => {
                                                    setopen(true)
                                                    setid(dep.id)
                                                }
                                                    // DeleteCartById(dep.id)
                                                } style={{ background: "none" }} class="fas fa-times"></button>

                                            </div>
                                            <div className='itemDetailCart2'>
                                                <div className="imgItemDetailCart2">
                                                    <div className='itemIMG'>
                                                        <img src={"https://localhost:7067/wwwroot/image/product/" + data.image
                                                        } alt='sp' ></img>
                                                    </div>

                                                </div>
                                                <div className='textItemDetailCart2'>
                                                    <p>{data.name} </p>
                                                    <p>Mã:{data.sku}
                                                    </p>
                                                    <p>Size: {dep.productSize.name}</p>
                                                </div>
                                            </div>
                                            <div className='itemDetailCart3'>
                                                <p style={{ marginTop: "2%" }}>{VND.format(data.priceSales)} </p>
                                            </div>
                                            <div className='itemDetailCart3'>
                                                <div className='divcongtruCart'>

                                                    <button className='congTruCart' onClick={() => {
                                                        if (dep.quantity >= 2) {

                                                            UpdateCartMinus(dep.id)
                                                        }
                                                        else {
                                                            DeleteCartById(dep.id)
                                                        }
                                                    }}>-</button>

                                                    <input type="text" className='textCongTruCart' value={dep.quantity}></input>

                                                    <button className='congTruCart' onClick={() => UpdateCartAdd(dep.id,dep.productSizeId)}>+</button>

                                                </div>
                                            </div>
                                            <div className='itemDetailCart4'>

                                                {VND.format(dep.quantity * data.priceSales)}
                                            </div>

                                        </div>)


                            )
                            : null

                    }

                    <div className='cnttiepTucMuaSam'>
                        <NavLink className="tiepTucMuaSam" to={"/product"} ><i class="fas fa-chevron-left"></i> Tiếp tục mua sắm</NavLink>
                        <button className='deleteAllCart' onClick={() => setOpenDeleteAll(true)}>Xóa toàn bộ giỏ hàng</button>
                    </div>

                </div>
                <div className='itemCart2'>
                    <div className='thanhTienCart'>
                        <div className='itemThanhTienCart1'>
                            <span>Thành tiền</span>
                        </div>
                        <div className='itemThanhTienCart2'>
                            <span >

                                {VND.format(total)}

                            </span>
                        </div>

                    </div>
                    <div>
                        <button className='thanhToanCart ' onClick={() => {

                            if (records == "") return message.error("Giỏ hàng của bạn chưa có gì!")
                            else return history("/checkout")
                        }}>Thanh toán</button>
                    </div>

                </div>
            </div>




        </>
    )
}