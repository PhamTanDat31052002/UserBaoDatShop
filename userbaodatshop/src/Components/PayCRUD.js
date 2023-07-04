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
import { Radio, RadioGroup, FormControlLabel } from '@mui/material';
export default function PayCRUD() {
    var location = useLocation();
    var tongTien = location.state[2]
    var dc = location.state[0];
    var sdt = location.state[1];
    var name = location.state[3];
    var history = useNavigate();
    var [payMedIV, setPayMedIV] = useState(null);
  
    var payIV = false;
    var [infor, setInfor] = useState();
    var [allCart, setAllCart] = useState();
    var [productItem, setProductItem] = useState([]);
    var [open1, setopen] = useState(false);
    var [countCart, setCountCart] = useState(0);

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
            .then(data => {
                setAllCart(data)
                var a = 0;
                data.forEach(element => {
                    a = a + 1
                })
                setCountCart(a)
            }).catch(err => console.log(err))
        fetch(variable.API_URL + "Products/GetAllProductStatusTrue")
            .then(respone => respone.json())
            .then(result => {
                setProductItem(result)
            }).catch(err => console.log(err))



    }, [])

    const AddInvoice = (() => {
        const token = getToken();
        fetch(variable.API_URL + "Inovices/CreateInvoice", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token.value}`
            },
            body: JSON.stringify({
                nameCustomer: name,
                total: tongTien,
                shippingAddress: dc,
                shippingPhone: sdt,
                paymentMethods: payMedIV,
                pay: payIV
            })
        })
            .then(response => response.json())
            .then(result => {
                if (result == true) {
                    setopen(false)
                    message.success("Đặt hàng thành công!")
                    history("/invoice")
                }

            }, (error) => {
                console.log(error);
            })
    })
    //custom phương thức thanh toán
    const [selectedValue, setSelectedValue] = useState('');

    const handleRadioChange = (event) => {
      setSelectedValue(event.target.value);
    };
  
    
    return (
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
                        AddInvoice()
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
                                    <span class="badge badge-secondary badge-pill">{countCart}</span>
                                    
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
                                                        <img src={"https://localhost:7067/wwwroot/image/product/" + data.image} alt="sp"></img>
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
                                                        <span>{VND.format(dep.quantity * data.priceSales)}</span>
                                                    </div>
                                                </li>
                                            </ul>)

                                        )
                                        : null
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
                                        <div className="ctnPTTT">
                                                <RadioGroup value={selectedValue} onChange={handleRadioChange}>
                                                    <FormControlLabel
                                                    value="option1"
                                                    control={<Radio className={selectedValue === 'option1' ? 'radio-checked' : ''} />}
                                                    label="Thanh toán khi nhận hàng(COD)"
                                                    classes={{
                                                        root: 'radio-root',
                                                        label: 'radio-label',
                                                    }}
                                                    onClick={() => setPayMedIV(false)} 
                                                    />
                                                    <FormControlLabel
                                                    value="option2"
                                                    control={<Radio className={selectedValue === 'option2' ? 'radio-checked' : ''} />}
                                                    label="Thanh toán ngân hàng"
                                                    classes={{
                                                        root: 'radio-root',
                                                        label: 'radio-label',
                                                    }}
                                                    onClick={() => setPayMedIV(true)}
                                                    />
                                                </RadioGroup>

                                                {selectedValue === 'option1' && (
                                                    <div className="content">
                                                    <p style={{textAlign:"center"}}>Khách nhận hàng vui lòng thanh toán tiền hàng + tiền ship cho bên vận chuyển</p>
                                                    <p style={{textAlign:"center"}}>Shop cam kết hỗ trợ đổi hàng trong vòng 7 ngày đối với HÀNG MỚI chưa qua sử dụng. Quý khách vui lòng giữ sản phẩm sạch khi thử phòng trường hợp phải đổi hàng.</p> 
                                                    <p style={{textAlign:"center"}}>BAODATSHOP HỖ TRỢ CHO XEM HÀNG NHƯNG KHÔNG HỖ TRỢ CHO KHÁCH THỬ GIÀY KHI NHẬN HÀNG</p>
                                                    </div>
                                                )}

                                                {selectedValue === 'option2' && (
                                                    <div className="content">
                                                    <p style={{textAlign:"center"}}>Quý khách vui lòng chuyển khoản tới một trong những ngân hàng dưới đây theo cú pháp nội dung: (SĐT mua hàng) ck đơn hàng (Mã đơn hàng)</p>
                                                    <p style={{textAlign:"center"}}>MB BANK</p>
                                                    <p style={{textAlign:"center"}}>Số TK: 0000031052002</p>
                                                    <p style={{textAlign:"center"}}>Chủ TK: PHAM TAN DAT</p>
                                                    </div>
                                                )}
                                        </div>
                                            {/* <input type="radio" name="itempay" onClick={() => setPayMedIV(false)} className="itempay" id="item1" checked />
                                            <label className="itempay" for="item1">Thanh toán khi nhận hàng (COD)</label>
                                            <input type="radio" name="itempay" onClick={() => setPayMedIV(true)} className="itempay" id="item2" />
                                            <label className="itempay" for="item2">Chuyển khoản qua nhân hàng</label> */}
                                        </div>
                                    </div>
                                    <div>
                                        <button className='hoanTatDonHang' onClick={() =>{
                                           
                                            payMedIV==null?
                                             message.warning("Vui lòng chọn phương thức thanh toán"):
                                            setopen(true)}}>Hoàn tất đơn hàng</button>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div> : null

            }



            
        </>
    )
}