
import React from 'react';
import { variable } from "../Variable"
import "../Assets/css/styledetailproduct.css"
import { NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

import Loading from "../Page/Loading";

// import "../Assets/scrip/zoomScrip"

import { Alert, Space, message } from 'antd';

export default function Product2() {
    var location = useLocation();
    var id = location.state;
    const [number, setNumber] = useState(1);
    var [records, setRecords] = useState()
    var [sizePr, setSizePr] = useState();
    var [idPrSize, setIdPrSize] = useState('');
    const [itemSize, setItemSize] = useState('');
    var [tonKho, setTonKho] = useState(0);
    const [stars, setStars] = useState([false, false, false, false, false]);
    var [review, setReview] = useState([]);
    var [starTB, setStarTB] = useState(0);
    var [contentAddRV, setContentAddRV] = useState('');
    var [starAddRV, setStarAddRV] = useState(0);
    var [load, setLoad] = useState(0);
    var [tongComment, setTongComment] = useState(0);
    var [tongStar, setTongStar] = useState(0);
    const itemSizeClick = (event) => {
        setItemSize(event.target.value);
    };
    const [selectedImage, setSelectedImage] = useState('');

    const handleClick = (image) => {
        setSelectedImage(image);
    }
    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    const loading = (() =>
        <Loading />
    )

    const getToken = (() => {
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken
    })


    useEffect(() => {

        fetch(variable.API_URL + "Products/GetProductById/" + id)
            .then(response => response.json())
            .then(data => {
                setRecords(data)
                setSelectedImage(data.image)
            }).catch(err => console.log(err))

        fetch(variable.API_URL + "ProductSizes/GetProductSizeByProductId/" + id)
            .then(response => response.json())
            .then(data => setSizePr(data)).catch(err => console.log(err))

        fetch(variable.API_URL + "Reviews/GetAllReviewProduct/" + id)
            .then(response => response.json())
            .then(data => {
                setTongComment(data.length)
                setReview(data)

            }).catch(err => console.log(err))
        fetch(variable.API_URL + "Reviews/GetAverageStartReview/" + id)
            .then(response => response.json())
            .then(data => setStarTB(data)).catch(err => console.log(err))

    }, [load])
   
    const truDi1 = () => {
        number >= 2 ?
            setNumber(number - 1) : setNumber(number - 0);
    }
    const congThem1 = () => {
        number >= tonKho ?
            setNumber(number + 0) : setNumber(number + 1);
    }

    const AddCart = (data) => {
        const token = getToken();
        if (itemSize == "")
            return setTimeout(() => {
                message.error("Bạn chưa chọn size")
            }, 0);

        if (token == null)
            return message.warning("Bạn cần đăng nhập để thêm giỏ hàng!")


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
                if (result == "Thành công")
                    message.success("Thêm giỏ hàng thành công!")
            }, (error) => {
                console.log(error);
            })
    }
    const Addreview = () => {
        const token = getToken();

        if (token == null)
            return message.warning("Bạn cần đăng nhập để đánh giá!")


        fetch(variable.API_URL + "Reviews/CreateReview", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token.value}`
            },
            body: JSON.stringify({
                productId: id,
                content: contentAddRV,
                star: starAddRV
            })
        })
            .then(response => response.json())
            .then(result => {
                if (result == true) {
                    message.success("Đã đánh giá")
                    setLoad(load + 1)
                }

            }, (error) => {
                console.log(error);
            })
    }
    //  zoom hình
    const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (event) => {
        const { left, top } = event.target.getBoundingClientRect();
        const x = event.clientX - left;
        const y = event.clientY - top;
        setZoomPosition({ x, y });
    };
    //   đánh giá



    const clickStar = ((index) => {
        const newStars = [...stars];
        for (let i = 0; i <= index; i++) {
            newStars[i] = true;
        }
        setStars(newStars);
    })
    const DatetimeFormat = ((e) => {
        const abc = new Date(e)
        var day = abc.getDate() + "/";
        var month = abc.getMonth() + 1 + "/";
        var year = abc.getFullYear()
        let format4 = day + month + year;
        return format4;
    })

    const handleCommentChange = ((event) => {
        setContentAddRV(event.target.value);
    });

    const handleSubmit = ((event) => {
        event.preventDefault();

        setContentAddRV('');
    });
    // show đánh giá
    const [showAllComments, setShowAllComments] = useState(false);

    const handleToggleComments = () => {
        setShowAllComments(!showAllComments);
    };
    const displayedComments = showAllComments ? review : review.slice(0, 5);
    // ẩn đánh giá
    const handleResetComments = () => {
        setContentAddRV('');
        setShowAllComments(false);
    };



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
                                            {/* <img id="imgDT" src={require("../Assets/images/" + records.image)} alt="sp" /> */}
                                            <div>
                                                <img id="imgDT" src={"https://localhost:7067/wwwroot/image/product/" + selectedImage} alt="Ảnh lớn" />

                                            </div>

                                        </div>


                                    </div>

                                </div>  <div className="thumbnail-gallery">
                                    <img
                                        src={"https://localhost:7067/wwwroot/image/product/" + records.image}
                                        alt="Ảnh nhỏ 1"
                                        className={selectedImage == records.image ? 'selected' : null}
                                        onClick={() => handleClick(records.image)}
                                    />
                                    <img
                                        src={require("../Assets/images/AoMU2023.png")}
                                        alt="Ảnh nhỏ 1"
                                        className={selectedImage == 'AoMU2023.png' ? 'selected' : null}
                                        onClick={() => handleClick('AoMU2023.png')}
                                    />
                                    <img
                                        src={require("../Assets/images/AoMU2023.png")}
                                        alt="Ảnh nhỏ 2"
                                        className={selectedImage == 'AoMU2023.png' ? 'selected' : null}
                                        onClick={() => handleClick('AoMU2023.png')}
                                    />
                                    {/* Thêm các ảnh nhỏ khác tương tự */}
                                </div>
                            </div>
                            <div className="columnDT2">
                                <div>
                                    <p className="tieudeDT" style={{fontWeight:"400"}} >{records.name}</p>
                                   
                                    <span className="phudeDT" style={{fontWeight:"500"}}>Mã số: <span style={{fontWeight:"100"}}>{records.sku}</span> </span>
                                    <span className="phudeDT" style={{fontWeight:"500"}}>Thương hiệu: <span style={{fontWeight:"100"}}>{records.brandProduct.name}</span></span>
                                </div>
                                <div className='hienThiGia'>
                                    <div>
                                        <span className="giaDT2" >Giá gốc:  <span className="soGiaGocDT">{VND.format(records.price)}</span> </span>
                                    </div>
                                    <div>
                                        <span className="giaDT">Giá Sale: {VND.format(records.priceSales)}</span>
                                    </div>



                                </div>
                                <div className='kichThuoc'>
                                    <span style={{ marginTop: "1%" }}>Kích thước:</span>
                                    {sizePr != null ?
                                        sizePr.map(e =>
                                            e.stock != 0 ?
                                                <div className='itemSizeDT'>
                                                    <input type="radio" name={e.productId} id={e.name} value={e.id} onChange={itemSizeClick} onClick={() => {
                                                        setNumber(1)
                                                        setTonKho(e.stock)
                                                        setIdPrSize(e.id)
                                                    }} />
                                                    <label className="itemRadioDT" for={e.name}>{e.name}</label>

                                                </div>
                                                : <div className='itemSizeDTFalse'>
                                                    <label className="itemRadioDTFalse" for={e.name}>{e.name}</label>

                                                </div>
                                        ) : null}

                                </div>
                                <div className='tonKho'>
                                    <span>Tồn kho: {tonKho}</span>
                                </div>

                                <div className='divcongtru'>

                                    <div>
                                        <span style={{ marginLeft: "1%" }}>Số lượng:</span>
                                    </div>
                                    <button className='congTru' onClick={truDi1}>-</button>

                                    <input type="text" className='textCongTru' value={number}></input>

                                    <button className='congTru' onClick={congThem1}>+</button>

                                    <  button className="comic-button" onClick={() => AddCart(records)}>Thêm vào giỏ </button>
                                </div>


                                <div>
                                    {
                                        idPrSize == '' ?

                                            <button className='muaNgayDT' onClick={() => message.error("Bạn chưa chọn size!")}>
                                                Mua ngay
                                            </button>


                                            : <NavLink to={'/checkoutbuynow'}
                                                state={[number, idPrSize, records.priceSales * number, id]}>
                                                <button className='muaNgayDT'>
                                                    Mua ngay
                                                </button>
                                            </NavLink>
                                    }

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
                                <div>

                                    <span>{starTB.toFixed(1)}</span>
                                    <span> trên</span>
                                    <span> 5</span>
                                    <span> ({tongComment} đánh giá)</span>
                                    <div className="starReview ">
                                    {

                                    starTB == 5  ? <div><span className='starRVHienThi'>★★★★★</span></div> :
                                    starTB >= 4 && starTB <5 ? <div><span className='starRVHienThi'>★★★★</span><span>★</span></div> :
                                    starTB >= 3 && starTB <4? <div><span className='starRVHienThi'>★★★</span><span>★★</span></div> :
                                    starTB >= 2 && starTB <3? <div><span className='starRVHienThi'>★★</span><span>★★★</span></div> :
                                    starTB >= 1 && starTB <2? <div><span className='starRVHienThi'>★</span><span>★★★★</span></div> :
                                    starTB <= 1 && starTB >=0? <div><span>★★★★★</span></div>: null

}

                                    </div>
                                </div>

                                {
                                    displayedComments != null ?
                                        displayedComments.map(rv =>
                                            <div className='cacDanhGia'>
                                                <div className='itemCacDanhGia1'>
                                                    <div className="imgReview">
                                                        <img src={"https://localhost:7067/wwwroot/image/Avatar/" + rv.account.avatar} alt="ac"></img>
                                                    </div>
                                                </div>
                                                <div className='itemCacDanhGia2'>
                                                    <div>
                                                        <span>{rv.account.fullName}</span>
                                                    </div>
                                                    <div className="starUser ">
                                                        {

                                                            rv.star == 5 ? <div><span className='starRVHienThi'>★★★★★</span></div> :
                                                                rv.star == 4 ? <div><span className='starRVHienThi'>★★★★</span><span>★</span></div> :
                                                                    rv.star == 3 ? <div><span className='starRVHienThi'>★★★</span><span>★★</span></div> :
                                                                        rv.star == 2 ? <div><span className='starRVHienThi'>★★</span><span>★★★</span></div> :
                                                                            rv.star == 1 ? <div><span className='starRVHienThi'>★</span><span>★★★★</span></div> : null

                                                        }

                                                    </div>
                                                    <div className='noiDungDanhGia'>
                                                        <div>
                                                            <span>{rv.content}</span>
                                                        </div>

                                                        <div className='ngayDanhGia'><span>Ngày đánh giá: {DatetimeFormat(rv.dateTime)} </span></div>
                                                    </div>
                                                </div>

                                            </div>
                                        )
                                        : null
                                }

                                <div className='vietDanhGia'>
                                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                                        Viết đánh giá
                                    </button>

                                    {!showAllComments && review.length > 5 && (
                                        <button class="btn btn-light xemthemBL" onClick={handleToggleComments}>Xem thêm ({review.length - 5}) bình luận</button>
                                    )}
                                    <button>
                                        {showAllComments && (
                                            <button class="btn btn-light xemthemBL" onClick={handleResetComments}>Ẩn bớt</button>
                                        )}
                                    </button>
                                    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div class="modal-dialog" role="document">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="exampleModalLabel">Đánh giá</h5>
                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div class="modal-body">
                                                    <div class="mb-3">

                                                        {stars.map((filled, index) => (
                                                            <span
                                                                key={index}
                                                                className={`starRV ${filled ? 'filled' : ''}`}
                                                                onClick={() => {
                                                                    setStarAddRV(index + 1)
                                                                    clickStar(index)
                                                                }}
                                                            >
                                                                ★
                                                            </span>
                                                        ))}
                                                    </div>

                                                    <div class="row">

                                                        <textarea
                                                            value={contentAddRV}
                                                            onChange={handleCommentChange}
                                                            placeholder="Nhập bình luận"
                                                            className="comment-input"
                                                            required
                                                        />
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Thoát</button>
                                                        <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={() => {
                                                            if (starAddRV == 0) {
                                                                return message.warning("Bạn chưa chọn sao!")
                                                            }
                                                            Addreview()
                                                        }} >Gửi đánh giá</button>
                                                    </div>

                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* zoom */}
                        {/* <div className="image-zoom-container">
      <div className="image-container" onMouseMove={handleMouseMove}>
        <div className="zoom-box" style={{
          left: zoomPosition.x,
          top: zoomPosition.y,
        }}></div>
        <img src={require("../Assets/images/AoBarca2023.png")} alt="Hình ảnh" className="zoomable-image" />
      </div>
    </div> */}
                        {/* zoom */}
                    </div> : null


                // <img src={require("../Assets/images/AoBarca2023.png")} alt="Hình ảnh" />

            }
        </>
    )

}

