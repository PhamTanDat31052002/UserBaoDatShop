import React from "react";
import "../Assets/css/styledetailproduct.css"
import { useLocation } from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';
import { variable } from "../Variable"


export default function DetailProductCRUD(props) {
    var location = useLocation();
    var id = location.state;
    var [records, setRecords] = useState([])
    useEffect(() => {
        fetch(variable.API_URL + "Products/GetProductById/" + id)
            .then(response => response.json())
            .then(data => { setRecords(data) }
            ).catch(err => console.log(err))
    }, [id]);


    console.log(records.image);
    return (

        <>

            <div className="containerDT">
                <div className="columnDT1">
                    <div className="cntimgDT">
                        {/* <img className="imgDT" src={require("../Assets/images/"+records.image)} alt="sp" /> */}
                    </div>
                </div>
                <div className="columnDT2">
                    <div>
                        <p className="tieudeDT" >{records.name}</p>
                        <p className="phudeDT">Chất liệu:</p>
                        <p className="phudeDT">Loại: </p>
                        <p className="phudeDT">Mã số: {records.sku}</p>
                    </div>
                    <div>
                        <p className="giaDT" >Giá gốc:  <span className="soGiaGocDT">{records.price}</span>Đ </p>

                        <p className="giaDT">Giá Sale: {records.price} Đ</p>
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