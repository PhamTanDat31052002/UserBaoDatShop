import React from "react";
import { NavLink } from "react-router-dom";
import "../Assets/css/styleInvoice.css"
import { variable } from "../Variable";
import { useState } from 'react';
import { useEffect } from 'react';
export default function InvoiceCRUD() {
    var [invoice, setInvoice] = useState([]);
    var [invoiceDT, setInvoiceDT] = useState([]);

    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    const getToken = (() => {
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken
    })
    useEffect(() => {
        const token = getToken();
        fetch(variable.API_URL + "Inovices/GetAllInvoiceOfAccount", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token.value}`,
            }
        })
            .then(response => response.json())
            .then(data => setInvoice(data)).catch(err => console.log(err))

        fetch(variable.API_URL + "InvoiceDetails/GetAllInvoiceDetails", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token.value}`,
            }
        })
            .then(response => response.json())
            .then(data => setInvoiceDT(data)).catch(err => console.log(err))

    }, [])
    console.log(invoiceDT)

  


    return (
        <>
            <div className="containerIF">

                <div className="IF1">
                    <div className="itemIF1_1">
                        <NavLink to={"/account"}><p>Tài khoản của tôi</p></NavLink>
                        <NavLink to={'/invoice'}><p>Đơn hàng của tôi</p></NavLink>
                        <p>Kho voucher</p>
                        <p>Thông báo</p>
                    </div>
                </div>
                <div className="IV2">
                    <div className="cntTinhTrangDon">
                        <p className="hscuatoi">Tình trạng đơn hàng</p>
                    </div>
                    {

                        invoice != null ?
                            invoice.map(dep =>

                                <div className="ctnDongHang">

                                    <div className="donHang">
                                        <div className="quaTrinhVanChuyen">
                                            <div className="itemQuaTrinhVanChuyen">
                                                <span>Quá trình vận chuyển</span>
                                            </div>
                                            <div className="itemQuaTrinhVanChuyen" style={{ textAlign: "right" }}>
                                                {
                                                   dep.orderStatus==1?<span>Chưa xác nhận</span>:
                                                   dep.orderStatus==2?<span>Đang chuẩn bị</span>:
                                                   dep.orderStatus==3?<span>Đang vận chuyển</span>:
                                                   dep.orderStatus==4?<span>Đã hủy</span>:
                                                   dep.orderStatus==5?<span>Hoàn tất</span>:null

                                                }
                                            </div>
                                        </div>
                                        {
                                            invoiceDT.filter((item)=>
                                            {
                                                return item.invoiceId==dep.id?item:null
                                            }).map(data=>
                                                <NavLink to={'/detail'} state={data.productSize.product.id}>
                                                    <div className="itemDonHang">
                                                <div className="sanPhamIV">
                                                    <div className="imgsanPhamIV">
                                                        <img style={{ border: "1px solid rgb(215, 215, 199)" }} src={require("../Assets/images/"+ data.productSize.product.image)} width={"100px"} alt="sp"></img>
                                                    </div>
                                                    <div className="chiTietsanPhamIV">
                                                        <div><span>{data.productSize.product.name}</span></div>
                                                        <div><span>Size: {data.productSize.name}</span></div>
                                                        <div><span>Số lượng: {data.quantity}</span></div>
                                                    </div>
                                                    <div className="giasanPhamIV">
                                                        {VND.format(data.productSize.product.price* data.quantity)}
                                                    </div>
                                                </div>
                                            </div>
                                                </NavLink>
                                                
                                            )
                                        }


                                        <div className="thanhTienIV">
                                            <span>Thành tiền: </span>
                                            <span>{VND.format(dep.total)}</span>
                                        </div>
                                        <div className="huyDonIV">
                                            <button className="btnHuyDonIV">Hủy đơn</button>
                                        </div>
                                    </div>
                                </div>
                            )

                            : null
                    }


                </div>

            </div>
        </>
    )
}