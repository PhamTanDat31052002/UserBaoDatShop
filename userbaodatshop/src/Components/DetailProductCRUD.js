import React from "react";
import "../Assets/css/styledetailproduct.css"
export default function DetailProductCRUD()
{
    return (
        <>
        <div className="containerDT">
            <div className="columnDT1">
                
                <div className="cntimgDT">
                    <img className="imgDT"  src={require('../Assets/images/shoes-img9.png')} alt="sp"/>
                </div>
                
            </div>
            <div className="columnDT2">
                <div>
                    <p className="tieudeDT" > Tên</p>
                    <p className="phudeDT">Chất liệu:</p>
                    <p className="phudeDT">Loại:</p>
                    <p className="phudeDT">Mã số:</p>
                </div>
                <div>
                    <p className="giaDT" >Giá gốc:  <span  className="soGiaGocDT">12312</span>Đ </p>
                   
                    <p className="giaDT">Giá Sale:1232131 Đ</p>
                    <p>Tiết kiệm: 1312Đ</p>
                </div>
            </div>
            <div className="columnDT3">
                <p className="motaDT">Mô tả sản phẩm</p>
             </div>
        </div>
        </>
    )
}