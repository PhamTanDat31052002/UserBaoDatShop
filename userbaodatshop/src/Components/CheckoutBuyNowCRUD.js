import React from "react";
import "../Assets/css/stylecheckout.css"
import { useEffect } from 'react';
import { variable } from "../Variable"
import { useState } from 'react';
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { Alert, Space, message } from 'antd';
import { useLocation } from 'react-router-dom';



export default function CheckoutBuyNowCRUD() {
    var location = useLocation();
    var number = location.state[0];
    var idProductSize = location.state[1];
    var total = location.state[2];
    var idProduct = location.state[3];
    var [itemPr, setitemPr] = useState([]);


    var [infor, setInfor] = useState();
    var [productSize, setProductSize] = useState([]);
    var [APIDiaChi, setAPIDiaChi] = useState([]);
    var [APIHuyen, setAPIHuyen] = useState([]);
    var [APIxa, setAPIXa] = useState([]);
    var [IdTinh, setIdTinh] = useState(0);
    var [IdHuyen, setIdHuyen] = useState(0);
    var [Address, setAddress] = useState("");
    var [Quan, setQuan] = useState("");
    var [Tinh, setTinh] = useState("");
    var [Xa, setXa] = useState("");
    var [Address1, setAddress1] = useState("");
    const [show, setShow] = useState(false);
    const history = useNavigate();
    const handleClose = () => setShow(false);
    var [sdtPay, setSDTPay] = useState(0);
    var [dcPay, setDcPay] = useState('');
    var [dataPay, setdatapay] = useState([]);
    var [phiShip, setPhiShip] = useState(20000);
    var [voucher, setVoucher] = useState("");
    var [giaCuoiCung, setGiaCuoiCung] = useState(0);
    var [Disscount,setDisscount]=useState("");
   // dữ liệu truyền qua pay
   var [diachi,setdiachi]=useState("");
   var [email,seteamal]=useState(0);
   var [ten,setten]=useState('');
   var [dt,setdt]=useState("");



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
        .then(data => {
            setInfor(data)
            setdiachi(data.address)
            seteamal(data.email)
            setten(data.fullName)
            setdt(data.phone)
        }
           
            ).catch(err => console.log(err))


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
        // địa chỉ
        fetch("https://provinces.open-api.vn/api/?depth=3")
            .then(response => response.json())
            .then(data => setAPIDiaChi(data)).catch(err => console.log(err))

    }, [])
    const validationVOucher=((e)=>{
        const token = getToken();
        fetch(variable.API_URL + "Vouchers/ValidationVoucher", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token.value}`,
            },body: JSON.stringify({
				name:e
			})
        })
            .then(response => response.json())
            .then(data => {
                if(data=="null")
                {
                    setDisscount("")
                    return message.error("Mã không hợp lệ")
                }
               
                else{
                    message.success("Mã đã được kích hoạt")
                    setDisscount(data)
                }
                
            }
               
                )
            .catch(err => console.log(err))
    })
    return (
        <>
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

                                <div class="card p-3">
                                    <div class="input-group">
                                         <input type="text" class="form-control" onChange={(e)=>setVoucher(e.target.value)} value={voucher} placeholder="Mã giảm giá" />
                                        <div class="input-group-append">
                                            <button onClick={()=>{
                                               validationVOucher(voucher)
                                            }}  class="btn btn-secondary">Sử dụng</button>
                                        </div>
                                        <div className="tamTinhCO">
                                            <div className="itemTamTinh1">
                                                <div>
                                                    <span>Tạm tính</span>
                                                </div>
                                                <div>
                                                    <span>Phí vận chuyển</span>
                                                </div>
                                                <div>
                                                    <span>Giảm giá:</span>
                                                </div>
                                                <div>
                                                    <span>Tiết kiệm:</span>
                                                </div>
                                                <div style={{ borderTop: "1px solid" }}>
                                                    <span style={{ fontSize: "23px" }}>Tổng tiền:</span>
                                                </div>

                                            </div>
                                            <div className="itemTamTinh2">
                                                <div>
                                                    <span>{VND.format(total)}</span>
                                                </div>
                                                <div>
                                                    <span>{VND.format(phiShip)}</span>
                                                </div>
                                                <div>
                                                    <span>{Disscount.disscount}%</span>
                                                </div>
                                                <div>
                                                <span>{
                                                        Disscount==""?0:
                                                    VND.format(total*Disscount.disscount/100)
                                                    }</span>
                                                </div>

                                                <div style={{ paddingTop: "2%", borderTop: "1px solid" }}>
                                                    <span style={{ fontSize: "23px" }}>
                                                    {
                                                        Disscount==""?
                                                        VND.format(total+phiShip): VND.format(total-(total*Disscount.disscount/100)+phiShip)
                                                        }
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div class="col-md-8 order-md-1">
                                <h4 class="mb-3">Thông tin giao hàng</h4>
                                <form class="needs-validation" novalidate>
                                    <div class="row">

                                    </div>

                                    <div class="mb-3">
                                        <label for="text">Họ và tên <span class="text-muted"></span></label>
                                        <input type="text" class="form-control" id="name" placeholder="Họ và tên" value={infor.fullName} onChange={(e) => setten(e.target.value)} />
                                        <div class="invalid-feedback">
                                            Vui lòng nhập họ và tên!
                                        </div>
                                    </div>
                                    <div class="mb-3">
                                        <label for="email">Email <span class="text-muted"></span></label>
                                        <input type="email" class="form-control" id="email" placeholder="Email" value={infor.email} onChange={(e) => seteamal(e.target.value)} />
                                        <div class="invalid-feedback">
                                            Vui lòng nhập Email!
                                        </div>
                                    </div>
                                    <div class="mb-3">
                                        <label for="email">Số điện thoại <span class="text-muted"></span></label>
                                        <input type="number" class="form-control" id="numberphone" placeholder="Số điện thoại" value={infor.phone} onChange={(e) => {
                                            setdt(e.target.value)
                                            setSDTPay(e.target.value)
                                        }} />
                                        <div class="invalid-feedback">
                                            Vui lòng nhập số điện thoại nhận hàng!
                                        </div>
                                    </div>

                                    <div class="mb-3">

                                        <label for="address">Địa chỉ </label>
                                        <input type="text" class="form-control" readOnly id="address" placeholder="Số nhà, tên đường" required value=
                                            {
                                                Address1 == "" ?
                                                    infor.address : Address1

                                            }
                                            onChange={(e) => {
                                                setdiachi(e.target.value)
                                                setAddress1(e.target.value)
                                            }} />
                                        <div class="invalid-feedback">
                                            Vui lòng nhập địa chỉ cụ thể!
                                        </div>
                                    </div>
                                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                                        Thay đổi địa chỉ
                                    </button>
                                    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div class="modal-dialog" role="document">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="exampleModalLabel">Thông tin địa chỉ</h5>
                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div class="modal-body">
                                                    <div class="mb-3">

                                                        <label for="address">Địa chỉ cụ thể </label>
                                                        <input type="text" class="form-control" id="address" placeholder="Số nhà, tên đường" required value={Address} onChange={(e) => setAddress(e.target.value)} />
                                                        <div class="invalid-feedback">
                                                            Vui lòng nhập địa chỉ cụ thể!
                                                        </div>
                                                    </div>

                                                    <div class="row">
                                                        <div class="col-md-4 mb-3">
                                                            <label for="country">Tỉnh</label>
                                                            <select class="custom-select d-block w-100" id="country" required onChange={(e) => {
                                                                setIdTinh(e.target.value)
                                                                setTinh(e.target.value)

                                                            }

                                                            }
                                                                onClick={() => {
                                                                    setAPIHuyen([])
                                                                    setAPIXa([])
                                                                }}
                                                            >
                                                                <option value="">Chọn...</option>
                                                                {
                                                                    APIDiaChi != null ?
                                                                        APIDiaChi.map(tinh =>
                                                                            <option value={tinh.name}>{tinh.name}</option>
                                                                        )
                                                                        : null
                                                                }

                                                            </select>
                                                            <div class="invalid-feedback">
                                                                Please select a valid country.
                                                            </div>
                                                        </div>
                                                        <div class="col-md-4 mb-3">
                                                            <label for="state">Quận/Huyện</label>
                                                            <select class="custom-select d-block w-100" id="state" required onClick={() => {
                                                                APIDiaChi.filter((a) => {
                                                                    if (a.name == IdTinh)
                                                                        setAPIHuyen(a.districts)
                                                                })
                                                                if (APIxa != null) setAPIXa([])
                                                            }

                                                            }
                                                                onChange={(e) => {
                                                                    setIdHuyen(e.target.value)
                                                                    setQuan(e.target.value)
                                                                }}>
                                                                <option value="">Chọn..</option>
                                                                {
                                                                    APIHuyen.map(huyen =>
                                                                        <option value={huyen.name}>{huyen.name}</option>
                                                                    )}
                                                            </select>
                                                            <div class="invalid-feedback">
                                                                Please provide a valid state.
                                                            </div>
                                                        </div>
                                                        <div class="col-md-4 mb-3">
                                                            <label for="state">Phường/Xã</label>
                                                            <select class="custom-select d-block w-100" id="state" required onClick={() =>
                                                                APIHuyen.filter((a) => {
                                                                    if (a.name == IdHuyen)
                                                                        setAPIXa(a.wards)

                                                                })
                                                            }
                                                                onChange={(e) => setXa(e.target.value)}
                                                            >
                                                                <option value="">Chọn...</option>
                                                                {
                                                                    APIxa.map(tinh =>
                                                                        <option value={tinh.name}>{tinh.name}</option>
                                                                    )}
                                                            </select>
                                                            <div class="invalid-feedback">
                                                                Please provide a valid state.
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Hủy</button>
                                                    <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={() => {
                                                        if (Address == '' || Xa == '' || Quan == '' || Tinh == '') {
                                                            return message.warning("Dữ liệu không được để trống!")
                                                        }
                                                        else {
                                                            setAddress1(Address + "," + Xa + "," + Quan + "," + Tinh)
                                                        }


                                                    }

                                                    }>Lưu</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <hr class="mb-4" />
                                    <div className="tiepTucThanhToan">
                                        <NavLink to={"/cart"}><p>Giỏ hàng</p></NavLink>
                                        {/* <NavLink to={"/pay"}> */}
                                        {
                                            // sdtPay == "" ||sdtPay.length!=10?
                                            //     <button style={{ marginLeft: "20%" }} class="btn btn-primary btn-lg" type="submit" onClick={()=>message.error("Số điện thoại không hợp lệ!")} >  Tiếp tục đến phương thức thanh toán
                                            //     </button>
                                            //     :

                                                <button style={{ marginLeft: "20%" }} class="btn btn-primary btn-lg" type="submit"  >

                                                    <NavLink to={'/paybuynow'} state={[Address1 == '' ?diachi : Address1,
                                                     sdtPay == 0 ? dt : sdtPay,
                                                     Disscount==''? total+phiShip: total-(total*Disscount.disscount/100)+phiShip,
                                                       idProductSize,
                                                        idProduct,
                                                         number,
                                                         ten
                                                         ]}  >
                                                        Tiếp tục đến phương thức thanh toán</NavLink>
                                                </button>
                                        }

                                        {/* </NavLink> */}
                                    </div>

                                </form>
                            </div>
                        </div >

                    </div > : null
            }


        </>
    )
}
