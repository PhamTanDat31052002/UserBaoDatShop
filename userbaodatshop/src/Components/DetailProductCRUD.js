
import React from 'react';
import { variable } from "../Variable"
import "../Assets/css/styledetailproduct.css"
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import "../Components/Message.js"
import Loading from "../Page/Loading";
import Message from '../Components/Message.js';
// import "../Assets/scrip/zoomScrip"



export default function Product2() {
    var location = useLocation();
    var id = location.state;
    const [number, setNumber] = useState(1);
    var [records, setRecords] = useState()
    var [sizePr, setSizePr] = useState();
    const [itemSize, setItemSize] = useState('');
    const itemSizeClick = (event) => {
        setItemSize(event.target.value);
    };
    // const alertWithoutButtons = () => {
    //     const title = 'Thêm giỏ hàng thành công';
    //     const message = 'Successful, letting you in...';
    //     const emptyArrayButtons = [];
    //     const alertOptions = {
    //       cancelable: true,
    //     };

    //     alert(title);
    //   };
    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    const loading=(()=>
         <Loading/>
    )

    const getToken = (() => {
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken
    })


    useEffect(() => {

        fetch(variable.API_URL + "Products/GetProductById/" + id)
            .then(response => response.json())
            .then(data => setRecords(data)).catch(err => console.log(err))

        fetch(variable.API_URL + "ProductSizes/GetProductSizeByProductId/" + id)
            .then(response => response.json())
            .then(data => setSizePr(data)).catch(err => console.log(err))

        
    }, [id])

    const truDi1 = () => {
        number >= 2 ?
            setNumber(number - 1) : setNumber(number - 0);
    }
    const congThem1 = () => {
        number >= 100 ?
            setNumber(number + 0) : setNumber(number + 1);
    }

    const AddCart = (data) => {
        const token = getToken();
        if(itemSize=="")
        return <div class="modal-dialog modal-sm">{alert("Bạn chưa chọn size")}</div>
        if(token==null)           
        return <div class="modal-dialog modal-sm">{alert("Bạn cần đăng nhập để thêm giỏ hàng!")}</div>
  

        fetch(variable.API_URL + "Carts/CreateCart", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token.value}`
            },
            body: JSON.stringify({
                productSizeId: itemSize,
                quantity: number,
            })
        })
            .then(response => response.json())
            .then(result => {
                if(result=="Thành công")
                alert("Thêm giỏ hàng thành công!")
            }, (error) => {
                console.log(error);
            })
    }
    return (
        <>
            {
                records != null ?
                    <div>
                        <div className="containerDT">
                            <div className="columnDT1">
                                <div className='gallery'>
                

                                    <div className="cntimgDT ">
                                        <div classname='maxImgDT'>
                                            <img id="imgDT" src={require("../Assets/images/" + records.image)} alt="sp" />

                                        </div>

                                    </div>
                                    {/* <div className='anhPhu'>
                                <div className="thumbnail" onclick={changeImage(this)}>
                                 
                                    <img src={require("../Assets/images/" + records.image)} alt="img3" />
                                </div>
                                <div className="thumbnail" onclick={changeImage(this)}>
                               
                                 <img src={require("../Assets/images/" + records.image)} alt="img3" />
                                </div>
                                <div className="thumbnail" onclick={changeImage(this)}>
                                 <img src={require("../Assets/images/AoBarca2023.png")} alt="img3" />
                                 
                                </div>
                              
                            </div> */}
                                    {/* <div className="gallery">
     
                                 <img src={require({mainImage})} className="main-image"  alt="sp" />

    
                        <div className="thumbnails">
                            {thumbnailImages.map((image, index) => (
                            <div key={index} className="thumbnail" onClick={() => handleThumbnailClick(image)}>
                              
                                <img src={require({image})} alt='sp' />
                            </div>
                            ))}
      </div>
    </div> */}
                                </div>
                            </div>
                            <div className="columnDT2">
                                <div>
                                    <p className="tieudeDT" >{records.name}</p>
                                    {/* <p className="phudeDT">Chất liệu:</p>
                                    <p className="phudeDT">Loại: </p> */}
                                    <p className="phudeDT">Mã số: {records.sku}</p>
                                </div>
                                <div>
                                    <p className="giaDT" >Giá gốc:  <span className="soGiaGocDT">{VND.format(records.price)}</span> </p>

                                    <p className="giaDT">Giá Sale: {VND.format(records.price)}</p>
                                    <p>Tiết kiệm: 1312Đ</p>
                                </div>
                                <div className='kichThuoc'>
                                    <span style={{ marginTop: "1%" }}>Kích thước:</span>
                                    {sizePr != null ?
                                        sizePr.map(e =>
                                            e.stock != 0 ?
                                                <div className='itemSizeDT'>
                                                    <input type="radio" name={e.productId} id={e.name} value={e.id} onChange={itemSizeClick} />
                                                    <label className="itemRadioDT" for={e.name}>{e.name}</label>
                                                </div>
                                                : <div className='itemSizeDT'>
                                              
                                                <label className="itemRadioDT" for={e.name}>{e.name}</label>
                                            </div>
                                       ) : null}

                                </div>


                                <div className='divcongtru'>

                                    <div>
                                        <span style={{ marginLeft: "1%" }}>Số lượng:</span>
                                    </div>
                                    <button className='congTru' onClick={truDi1}>-</button>

                                    <input type="text" className='textCongTru' value={number}></input>

                                    <button className='congTru' onClick={congThem1}>+</button>

                                    <  button  className="comic-button" onClick={() => AddCart(records)}>Thêm vào giỏ </button>
                                </div>
                                {/* disabled={!itemSize} */}
                                <div>
                                    <button className='muaNgayDT'>Mua ngay</button>
                                </div>
                                <div className='ChiCoTai'>

                                    <span className='fas fa-store' style={{ fontSize: "21px" }}><b> Có tại 2 cửa hàng:</b></span>
                                    <div>

                                        <span className='fas fa-map-marker-alt' style={{ fontSize: "17px" }}> <b>638/26/21 Lê Trọng Tấn, P.Bình Hưng Hòa, Q.Bình Tân, TP.HCM</b></span>
                                    </div>
                                    <div>

                                        <span className='fas fa-map-marker-alt' style={{ fontSize: "17px" }}><b> 638/26/21 Lê Trọng Tấn, P.Bình Hưng Hòa, Q.Bình Tân, TP.HCM</b></span>
                                    </div>
                                </div>
                            </div>
                            <div className="columnDT3">
                                <p className="motaDT">Phúc lợi</p>
                                <div style={{ marginBottom: "5%" }}>
                                    <h5><span className='fas fa-gift'></span> ƯU ĐÃI TẶNG KÈM</h5>
                                    <span>
                                        Tặng kèm vớ dệt kim và balô chống thấm đựng giày cho mỗi đơn hàng Giày đá bóng.
                                    </span>
                                </div>
                                <div style={{ marginBottom: "5%" }}>

                                    <h5> <span className='fas fa-sync-alt'></span> ĐỔI HÀNG DỄ DÀNG</h5>
                                    <span>
                                        Hỗ trợ khách hàng đổi size hoặc mẫu trong vòng 7 ngày. (Sản phẩm chưa qua sử dụng).
                                    </span>
                                </div>
                                <div style={{ marginBottom: "5%" }}>
                                    <h5> <span className='fas fa-shipping-fast'></span> CHÍNH SÁCH GIAO HÀNG</h5>
                                    <span>
                                        COD Toàn quốc | Freeship toàn quốc khi khách hàng thanh toán chuyển khoản trước với đơn hàng Giày đá bóng trên 1 triệu.
                                    </span>
                                </div>
                                <div style={{ marginBottom: "5%" }}>
                                    <h5><span className='fas fa-money-check-alt'></span> THANH TOÁN TIỆN LỢI</h5>
                                    <span>
                                        Chấp nhận các loại hình thanh toán bằng thẻ, tiền mặt, chuyển khoản.
                                    </span>
                                </div>
                            </div>

                        </div>

                        <div>

                        </div>
                        <div>
                            <p className="motaDT">Mô tả sản phẩm</p>
                            <span>{records.description}</span>
                        </div>
                        <div className='containerDanhGia'>
                            <div>
                                <h5>Đánh giá sản phẩm</h5>
                            </div>
                            <div>
                                <span>4.9</span>
                                <span> trên</span>
                                <span> 5</span>
                                <div className="starReview ">
                                    <i class="fas fa-star itemStar"></i>
                                    <i class="fas fa-star itemStar"></i>
                                    <i class="fas fa-star itemStar"></i>
                                    <i class="fas fa-star itemStar"></i>
                                    <i class="fas fa-star itemStar"></i>

                                </div>
                                <div className='cacDanhGia'>
                                    <div className='itemCacDanhGia1'>
                                        <div className="imgReview">
                                            <img src={require("../Assets/images//AoBarca2023.png")} alt="ac"></img>
                                        </div>
                                    </div>
                                    <div className='itemCacDanhGia2'>
                                        <div>
                                            <span>Tên</span>
                                        </div>
                                        <div className="starUser ">
                                            <i class="fas fa-star itemStarUser"></i>
                                            <i class="fas fa-star itemStarUser"></i>
                                            <i class="fas fa-star itemStarUser"></i>
                                            <i class="fas fa-star itemStarUser"></i>
                                            <i class="fas fa-star itemStarUser"></i>
                                        </div>
                                        <div className='noiDungDanhGia'>
                                            <div>
                                                <span>Nội dung:</span>
                                            </div>
                                            <span>Tốt</span>
                                        </div>
                                    </div>

                                </div>
                                <div className='cacDanhGia'>
                                    <div className='itemCacDanhGia1'>
                                        <div className="imgReview">
                                            <img src={require("../Assets/images//AoBarca2023.png")} alt="ac"></img>
                                        </div>
                                    </div>
                                    <div className='itemCacDanhGia2'>
                                        <div>
                                            <span>Tên</span>
                                        </div>
                                        <div className="starUser ">
                                            <i class="fas fa-star itemStarUser"></i>
                                            <i class="fas fa-star itemStarUser"></i>
                                            <i class="fas fa-star itemStarUser"></i>
                                            <i class="fas fa-star itemStarUser"></i>
                                            <i class="fas fa-star itemStarUser"></i>
                                        </div>
                                        <div className='noiDungDanhGia'>
                                            <div>
                                                <span>Nội dung:</span>
                                            </div>
                                            <span>Tốt</span>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>:null
               
                     


            }
        </>
    )

}

