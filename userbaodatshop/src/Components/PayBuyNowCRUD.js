import React from "react";
import { useEffect } from 'react';
import { variable } from "../Variable"
import { useState } from 'react';
import { NavLink } from "react-router-dom";
import "../Assets/css/stylepay.css"
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Alert, Space, message } from 'antd';
import { Radio, RadioGroup, FormControlLabel } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
export default function PayBuyNowCRUD() {

    var location = useLocation();
    var tongTien = location.state[2]
    var dc = location.state[0];
    var sdt = location.state[1];
    var idProductSize = location.state[3];
    var idProduct = location.state[4];
    var number = location.state[5];
    var name = location.state[6];
    var voucher=location.state[7];

    var [truPhiShip, setTruPhiShip] = useState(0)
    var [productSize, setProductSize] = useState();
    var [itemPr, setitemPr] = useState();
    var [open1, setopen] = useState(false);
    var [hienThiBtnHoanThanh, setHienThiBtnHoanThanh] = useState(true);
    var history = useNavigate();
    var [payMedIV, setPayMedIV] = useState(null);
    var [KTpttt, setKTpttt] = useState(null);
    var payIV = false;
    var [infor, setInfor] = useState();
  
    const [selectedValue, setSelectedValue] = useState('');

    const handleRadioChange = (event) => {
        setSelectedValue(event.target.value);
    };
    const redirectToNewURL = (e) => {
        const newURL = e;
        window.location.href = newURL;
    };


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

        fetch(variable.API_URL + "ProductSizes/GetByid/" + idProductSize)
            .then(respone => respone.json())
            .then(result => {
                setProductSize(result)
            }).catch(err => console.log(err))
        fetch(variable.API_URL + "Products/GetProductById/" + idProduct)
            .then(respone => respone.json())
            .then(result => {
                setitemPr(result)
            }).catch(err => console.log(err))


    }, [])

    const AddInvoiceBuyNow = (() => {
        const token = getToken();
        fetch(variable.API_URL + "Inovices/CreateInvoiceNow", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token.value}`
            },
            body: JSON.stringify({
                nameCustomer: name,
                quantity:number,
                productSizeID:idProductSize,
                paymentMethods: payMedIV,
                pay: payIV,
                total: tongTien,
                shippingAddress: dc,
                shippingPhone: sdt,
                voucherId:voucher==null?null:voucher
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
     //custom phương thức vận chuyển
     const [selectedValueShip, setSelectedValueShip] = useState('');

     const handleRadioChangeShip = (event) => {
         setSelectedValueShip(event.target.value);
     };
    const VNPAY = (() => {
        const token = getToken();
        fetch(variable.API_URL + "APIPayment/CreateVNPAYURLBuyNow", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token.value}`
            },
            body: JSON.stringify({
                nameCustomer: name,
                total: tongTien - truPhiShip,
                shippingAddress: dc,
                shippingPhone: sdt,
                paymentMethods: payMedIV,
                pay: true,
                quantity:number,
                productSizeID:idProductSize,
                voucherId:voucher==null?null:voucher
            })
        })
            .then(response => response.json())
            .then(result => {
                redirectToNewURL(result)
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
                                        <span class="badge badge-secondary badge-pill">1</span>
                                    </h4>

                                    <div class="scroll-container">
                                        {
                                            itemPr != null ?
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
                                                            <span>{VND.format(itemPr.priceSales * number)}</span>
                                                        </div>
                                                    </li>
                                                </ul> : null

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
                                                        <span>{VND.format(tongTien - truPhiShip)}</span>
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
                                    <RadioGroup value={selectedValueShip} onChange={handleRadioChangeShip}>
                                        <FormControlLabel
                                            value="option1"
                                            control={<Radio className={selectedValueShip === 'option1' ? 'radio-checked' : ''} />}
                                            label="Giao hàng tận nơi: 35.000đ"
                                            classes={{
                                                root: 'radio-root',
                                                label: 'radio-label',
                                            }}
                                            onClick={() => {
                                                setTruPhiShip(0)
                                                setPayMedIV(true)
                                            }}
                                        />

                                        <FormControlLabel
                                            value="option2"
                                            control={<Radio className={selectedValueShip === 'option2' ? 'radio-checked' : ''} />}
                                            label="Đến lấy tại cửa hàng: 0đ"
                                            classes={{
                                                root: 'radio-root',
                                                label: 'radio-label',
                                            }}
                                            onClick={() => {
                                                setTruPhiShip(35000)
                                                setPayMedIV(false)
                                            }}
                                        />
                                    </RadioGroup>
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
                                                            onClick={() => {
                                                                setHienThiBtnHoanThanh(true)
                                                                setKTpttt(true)
                                                            }}
                                                        />
                                                        <FormControlLabel
                                                            value="option2"
                                                            control={<Radio className={selectedValue === 'option2' ? 'radio-checked' : ''} />}
                                                            label="Thanh toán VNPay"
                                                            classes={{
                                                                root: 'radio-root',
                                                                label: 'radio-label',
                                                            }}
                                                            onClick={() => {
                                                                setKTpttt(false)
                                                                setHienThiBtnHoanThanh(false)
                                                            }}
                                                        />
                                                    </RadioGroup>

                                                    {selectedValue === 'option1' && (
                                                        <div className="content">
                                                            <p style={{ textAlign: "center" }}>Khách nhận hàng vui lòng thanh toán tiền hàng + tiền ship cho bên vận chuyển</p>
                                                            <p style={{ textAlign: "center" }}>Shop cam kết hỗ trợ đổi hàng trong vòng 7 ngày đối với HÀNG MỚI chưa qua sử dụng. Quý khách vui lòng giữ sản phẩm sạch khi thử phòng trường hợp phải đổi hàng.</p>
                                                            <p style={{ textAlign: "center" }}>BAODATSHOP HỖ TRỢ CHO XEM HÀNG NHƯNG KHÔNG HỖ TRỢ CHO KHÁCH THỬ GIÀY KHI NHẬN HÀNG</p>
                                                        </div>
                                                    )}

                                                    {selectedValue === 'option2' && (
                                                         <div className="content">
                                                         <p style={{ textAlign: "center" }}>Thanh toán trực tiếp bằng ứng dụng VNPay</p>
                                                         <button className='hoanTatDonHang' onClick={() => {
                                                             payMedIV == null ?
                                                                 message.warning("Vui lòng chọn phương thức vận chuyển") : 
                                                                 VNPAY()
 
                                                         }}>Thanh toán</button>
                                                     </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                           {
                                            hienThiBtnHoanThanh == true ?
                                            <button className='hoanTatDonHang' onClick={() => {

                                                payMedIV == null ?
                                                    message.warning("Vui lòng chọn phương thức vận chuyển") :
                                                    KTpttt == null ?
                                                        message.warning("Vui lòng chọn phương thức thanh toán") :
                                                        setopen(true)
                                            }}>Hoàn tất đơn hàng</button> : null
                                           }
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