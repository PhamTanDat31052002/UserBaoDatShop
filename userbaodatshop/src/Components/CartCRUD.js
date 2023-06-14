import React from 'react'
import "../Assets/css/stylecart.css"
import "../Assets/css/bootstrap.min.css"
import { variable } from "../Variable"
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';


export default function CartCRUD() {
    const [number, setNumber] = useState(1);
    var [records, setRecords] = useState();
    var [productItem, setProductItem] = useState([]);
    var [total, settotal] = useState(0);


    const getToken = (() => {
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken
    })
    var [count, setcount] = useState(0);
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
    const DeleteCartById=((id)=>{
        const token = getToken();
        fetch(variable.API_URL+"Carts/DeleteCart/" +id ,{
           method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token.value}`,
            }
        }).then(response => response.json())
        .then(result => {
       
        //    if(result=="Thành công")
        //    {
            setcount(count+1)
         //  }
        //    window.location.reload();
        })
        
    })

    const UpdateCartAdd=((id)=>{
        const token=getToken();
        fetch(variable.API_URL+"Carts/UpdateCart+1/" +id,{
            method:"PUT",
            headers:{
                'Content-Type':'application/json',
                Accept:'application/json',
                'Authorization': `Bearer ${token.value}`
            }
        }).then(response => response.json())
        .then(result => {
           
            // if(result=="Thành công")
            // {
             setcount(count+1)
          //  }
         //    window.location.reload();
         })
    })
    const UpdateCartMinus=((id)=>{
        const token=getToken();
        fetch(variable.API_URL+"Carts/UpdateCart-1/" +id,{
            method:"PUT",
            headers:{
                'Content-Type':'application/json',
                Accept:'application/json',
                'Authorization': `Bearer ${token.value}`
            }
        }).then(response => response.json())
        .then(result => {
       
            // if(result=="Thành công")
            // {
             setcount(count+1)
          //  }
         //    window.location.reload();
         })
    })
   
    const DeleteAllCart=(()=>{
        const token=getToken();
        if (window.confirm('Are you sure?')) {
        
      
        fetch(variable.API_URL+ "Carts/DeleteAllCart",{
            method:"DELETE",
            headers:{
                'Content-Type':'application/json',
                Accept:'application/json',
                'Authorization': `Bearer ${token.value}`
            }
        }).then(response => response.json())
        .then(result => {
       
            // if(result=="Thành công")
            // {
             setcount(count+1)
           // }
         //    window.location.reload();
         })  }
    })


    return (
        <>


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
                                    return item.id == dep.productId ?
                                        item
                                        : null
                                })
                                    .map(data =>
                                        <div className='ctnDetailCart'>


                                            <div className='itemDetailCart1'>
                                                <button onClick={()=> DeleteCartById(dep.cartId) } class="fas fa-times"></button>

                                            </div>
                                            <div className='itemDetailCart2'>
                                                <div className="imgItemDetailCart2">
                                                    <div className='itemIMG'>
                                                        <img src={require('../Assets/images/' + data.image
                                                        )} alt='sp' ></img>
                                                    </div>

                                                </div>
                                                <div className='textItemDetailCart2'>
                                                    <p>{data.name} </p>
                                                    <p>Mã:{data.sku}
                                                    </p>
                                                    <p>Size: {data.productId}</p>
                                                </div>
                                            </div>
                                            <div className='itemDetailCart3'>
                                                <p  style={{ marginTop: "2%" }}>{data.price}đ </p>
                                            </div>
                                            <div className='itemDetailCart3'>
                                                <div className='divcongtruCart'>

                                                    <button className='congTruCart' onClick={()=>{
                                                           if(dep.quantity>=2)
                                                           {
                                                             
                                                               UpdateCartMinus(dep.cartId)
                                                           }
                                                           else{
                                                            DeleteCartById(dep.cartId)
                                                           }
                                                    }}>-</button>

                                                    <input type="text" className='textCongTruCart' value={dep.quantity}></input>

                                                    <button className='congTruCart' onClick={()=>UpdateCartAdd(dep.cartId)}>+</button>

                                                </div>
                                            </div>
                                            <div className='itemDetailCart4'>
                                                {dep.quantity * data.price}đ
                                            </div>

                                        </div>)
                            )
                            : null

                    }

                    <div className='cnttiepTucMuaSam'>
                        <NavLink className="tiepTucMuaSam" to={"/product"} ><i class="fas fa-chevron-left"></i> Tiếp tục mua sắm</NavLink>
                        <button className='deleteAllCart'  onClick={()=>DeleteAllCart()}>Xóa toàn bộ giỏ hàng</button>
                    </div>
                 
                </div>
                <div className='itemCart2'>
                    <div className='thanhTienCart'>
                        <div className='itemThanhTienCart1'>
                            <span>Thành tiền</span>
                        </div>
                        <div className='itemThanhTienCart2'>
                            <span >
                                {
                                    total + "VNĐ"
                                }
                            </span>
                        </div>

                    </div>
                    <NavLink to={"/checkout"}> <div>
                        <button className='thanhToanCart '>Thanh toán</button>
                    </div></NavLink>

                </div>
            </div>




        </>
    )
}