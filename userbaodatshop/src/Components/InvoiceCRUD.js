import React from "react";
import { NavLink } from "react-router-dom";
import "../Assets/css/styleInvoice.css"
import { variable } from "../Variable";
import { useState } from 'react';
import { useEffect } from 'react';
import { message } from "antd";
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
export default function InvoiceCRUD() {
    var [invoice, setInvoice] = useState([]);
    var [filter, setFilter] = useState([]);
    var [invoiceDT, setInvoiceDT] = useState([]);
    var history=useNavigate();
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
            .then(data =>{
                setInvoice(data)
                setFilter(data)
            } ).catch(err => console.log(err))

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
    const deleteInvoice = ((id) => {
        const token = getToken();

        fetch(variable.API_URL + "Inovices/DeleteInvoiceByCostumer/" + id, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token.value}`,
            }
        })
            .then(response => response.json())
            .then(result => {
                if (result == "Thành công") {
                    message.success("Bạn đã hủy đơn hàng!")
                }
                else{
                    message.error("Bạn không thể hủy đơn!")
                }
            }).catch(err => console.log(err))
        window.location.reload(false);
    })
    const filterTinhTrang=((id)=>
    {  
        if(id==0)
        {
            setFilter(invoice)
        }
        else{
            var data= invoice.filter(item=>item.orderStatus==id )
            setFilter(data)
        }
    })
 
    const DatetimeFormat=((e)=>{
        const abc = new Date(e) 
        var day =  abc.getDate()  +"/";
        var month = abc.getMonth()+1 + "/";
        var year = abc.getFullYear()
        let format4 = day   + month  + year;
        return format4;
    })
 


    return (
        <>
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
                <div className="IV2">
                    <div className="cntTinhTrangDon">
                        <p className="hscuatoi">Tình trạng đơn hàng</p>
                       <div className="thongKeTinhTrang">
                       <ButtonGroup variant="" className="btnTinhTrang"  aria-label="outlined primary button group">
                            <Button onClick={()=>filterTinhTrang(0)}>Tất cả</Button>
                            <Button onClick={()=>filterTinhTrang(1)}>Chưa xác nhận</Button>
                            <Button onClick={()=>filterTinhTrang(2)}>Đang chuẩn bị</Button>
                            <Button onClick={()=>filterTinhTrang(3)}>Đang vận chuyển</Button>
                            <Button onClick={()=>filterTinhTrang(5)}>Hoàn tất</Button>
                            <Button onClick={()=>filterTinhTrang(4)}>Đã hủy</Button>
                            </ButtonGroup>
                       </div>
                      
                    </div>
                    
                    {
                        
                        filter != null ?
                            filter.map(dep =>

                                <div className="ctnDongHang">

                                    <div className="donHang">
                                        <div className="quaTrinhVanChuyen">
                                            <div className="itemQuaTrinhVanChuyen">
                                                <span>Quá trình vận chuyển</span>
                                            </div>
                                            <div className="itemQuaTrinhVanChuyen" style={{ textAlign: "right" }}>
                                                {
                                                    dep.orderStatus == 1 ? <span>Chưa xác nhận</span> :
                                                        dep.orderStatus == 2 ? <span>Đang chuẩn bị</span> :
                                                            dep.orderStatus == 3 ? <span>Đang vận chuyển</span> :
                                                                dep.orderStatus == 4 ? <span>Đã hủy</span> :
                                                                    dep.orderStatus == 5 ? <span>Hoàn tất</span> : null

                                                }
                                            </div>
                                        </div>
                                        {
                                            invoiceDT.filter((item) => {
                                                return item.invoiceId == dep.id ? item : null
                                            }).map(data =>
                                                <NavLink to={'/detail'} state={data.productSize.product.id}>
                                                    <div className="itemDonHang">
                                                        <div className="sanPhamIV">
                                                            <div className="imgsanPhamIV">
                                                                <img style={{ border: "1px solid rgb(215, 215, 199)" }} src={require("../Assets/images/" + data.productSize.product.image)} width={"100px"} alt="sp"></img>
                                                            </div>
                                                            <div className="chiTietsanPhamIV">
                                                                <div><span>{data.productSize.product.name}</span></div>
                                                                <div><span>Size: {data.productSize.name}</span></div>
                                                                <div><span>Số lượng: {data.quantity}</span></div>
                                                               
                                                            </div>
                                                            <div className="giasanPhamIV">
                                                                {VND.format(data.productSize.product.price * data.quantity)}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </NavLink>

                                            )
                                        }


                                        <div className="thanhTienIV">
                                            <div className="thanhTien1">
                                                <span>Ngày đặt hàng: {DatetimeFormat(dep.issuedDate)}</span>
                                            </div>
                                            <div className="thanhTien2">
                                            <span>Thành tiền: </span>
                                            <span>{VND.format(dep.total)}</span>
                                            </div>
                                           
                                        </div>

                                        {dep.orderStatus == 4 ?
                                            <div className="huyDonIV">

                                                <button className="btnHuyDonIV" onClick={() => history('/product')  
                                                } >Mua lại</button>
                                            </div>
                                            : dep.orderStatus==5?
                                            <div className="huyDonIV">

                                            <button className="btnHuyDonIV" onClick={() => history('/')  
                                            } >Đánh giá</button>
                                        </div>:
                                            <div className="huyDonIV">
                                                    {/* modal */}
                                                  
                                                    
                                            

                                                        {/* modal */}
                                                <button className="btnHuyDonIV" onClick={() => {
                                                    if (dep.orderStatus == 1 || dep.orderStatus == 2) {
                                                        console.log(dep.orderStatus)
                                                        deleteInvoice(dep.id)

                                                    }
                                                    else {
                                                        message.error("Đơn hàng đang vận chuyển không thể hủy! ")
                                                   
                                                    }
                                                }} >Hủy đơn</button>
                                            </div>
                                        }

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