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
            .then(data => setRecords(data)).catch(err => console.log(err))
    }, [id]);
    const isEmpty = (v) => {
        return Object.keys(v).length === 0;
      };
    return (
        
        <>
        <p>{records.image}</p>
            <div className="containerDT">
                <div className="columnDT1">
                    <div className="cntimgDT">
                        if({records.image}.length!=0)
                        {
                               <img className="imgDT" src={require("../Assets/images/"+records.image)} alt="sp" />
                        }
                        else{
                             <img className="imgDT" src={require("../Assets/images/AoMC2023.png")} alt="sp" />
                        }
                     
                    </div>
                </div>
                <div className="columnDT2">
                    <div>
                        <p className="tieudeDT" >{records.name}</p>
                        <p className="phudeDT">Chất liệu:</p>
                        <p className="phudeDT">Loại:</p>
                        <p className="phudeDT">Mã số:</p>
                    </div>
                    <div>
                        <p className="giaDT" >Giá gốc:  <span className="soGiaGocDT">12312</span>Đ </p>

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