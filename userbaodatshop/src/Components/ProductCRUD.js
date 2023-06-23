
import React from "react";
import { variable } from "../Variable"
import { NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

import Dropdown from 'react-dropdown-select';
import "../Assets/css/style.css"

export default function ProductCRUD() {

	var [records, setRecord] = useState([]);
	var [ProductType, setProductType] = useState([]);
	const [selectedType, setSelectedType] = useState('Tất cả');
	const [filteredProducts, setFilteredProducts] = useState([]);
	var [dtProduct, setdtProduct] = useState([]);
	var [sizePr, setSizePr] = useState();
	var [idProduct, setidProduct] = useState();
	const [number, setNumber] = useState(1);
	var [tonKho, setTonKho] = useState(0);
	const [itemSize, setItemSize] = useState('');
	const itemSizeClick = (event) => {
		setItemSize(event.target.value);
	};
	useEffect(() => {
		fetch(variable.API_URL + "Products/GetAllProductStatusTrue")
			.then(response => response.json())
			.then(data => setRecord(data)).catch(err => console.log(err))
	}, [])

	useEffect(() => {
		fetch(variable.API_URL + "ProductTypes/GetAllProductTypeStatusTrue")
			.then(response => response.json())
			.then(data => setProductType(data)).catch(err => console.log(err))
	}, []);


	const handleFilterByType = (productTypeId) => {
		setSelectedType(productTypeId);
	};

	const ChangeFilter = (productTypeId) => {

		if (productTypeId === "0") {
			fetch(variable.API_URL + "Products/GetAllProductStatusTrue")
				.then(response => response.json())
				.then(data => setRecord(data)).catch(err => console.log(err))
		} else {
			fetch(variable.API_URL + "Products/GetAllProductInProductType/" + productTypeId)
				.then(response => response.json())
				.then(data => setRecord(data)).catch(err => console.log(err))
		}
		fetch(variable.API_URL + "Products/GetProductById/" + idProduct)
			.then(response => response.json())
			.then(data => {
				setdtProduct(data)

			}).catch(err => console.log(err))

		fetch(variable.API_URL + "ProductSizes/GetProductSizeByProductId/" + idProduct)
			.then(response => response.json())
			.then(data => setSizePr(data)).catch(err => console.log(err))
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
	const AddCart = (data) => {
		const token = getToken();

		fetch(variable.API_URL + "Carts/CreateCart", {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				'Authorization': `Bearer ${token.value}`
			},
			body: JSON.stringify({
				productId: data.id,
				quantity: 1,
			})
		})
			.then(response => response.json())
			.then(result => {
				alert("Thêm giỏ hàng thành công!")
			})
	}
	// chuyển trang
	const [currentPage, setcurrenPage] = useState(1);
	const recordsPerPage = 12;
	const lastIndex = currentPage * recordsPerPage;
	const firstIndex = lastIndex - recordsPerPage;
	const a = records.slice(firstIndex, lastIndex);
	const npage = Math.ceil(records.length / recordsPerPage)
	const numbers = Array.from({ length: npage }, (_, i) => i + 1)
	const changePage = ((currentPage) => {
		setcurrenPage(currentPage)
	});
	const nextPage = ((currentPage, npage) => {
		if (currentPage !== npage) {
			setcurrenPage(currentPage + 1)
		}
	});
	const prePage = ((currentPage) => {
		if (currentPage !== 1) {
			setcurrenPage(currentPage - 1)
		}
	});
	const FilterPrice = (productTypeId) => {

	};
	// const AddCart = (data) => {
	//     if(itemSize=="")
	//     return <div class="modal-dialog modal-sm">{alert("a")}</div>


	//     const token = getToken();

	//     fetch(variable.API_URL + "Carts/CreateCart", {
	//         method: "POST",
	//         headers: {
	//             'Content-Type': 'application/json',
	//             Accept: 'application/json',
	//             'Authorization': `Bearer ${token.value}`
	//         },
	//         body: JSON.stringify({
	//             productSizeId: itemSize,
	//             quantity: number,
	//         })
	//     })
	//         .then(response => response.json())
	//         .then(result => {
	//             if(result=="Thành công")
	//             alert("Thêm giỏ hàng thành công!")
	//         }, (error) => {
	//             console.log(error);
	//         })
	// }
	//custom select
	const options = [
		{ value: 'Option 1', label: 'Option 1' },
		{ value: 'Option 2', label: 'Option 2' },
		{ value: 'Option 3', label: 'Option 3' },
	];


	const truDi1 = () => {
		number >= 2 ?
			setNumber(number - 1) : setNumber(number - 0);
	}
	const congThem1 = () => {
		number >= tonKho ?
			setNumber(number + 0) : setNumber(number + 1);
	}
	return (
		<>



			<div>
				<div>
					<select className="selectLoc" onChange={(e) => FilterPrice(e.target.value)}>
						<option value={"1"}>Giá tăng dần</option>
						<option value={"0"}>Giá giảm dần</option>

					</select>
				</div>
				<div className="ContainerProduct">


					<div className="collection_section layout_padding columnPD1">
						<div className="container ">
							{/* <div className="custom-select">

								<Dropdown value={selectedType} onChange={(e) => ChangeFilter(e.target.value)} options={ProductType} />
							</div> */}
							<select value={selectedType} onChange={(e) => ChangeFilter(e.target.value)}>

								<option value="0" hidden>Tất cả</option>

								<option value="0">Tất cả</option>
								{
									ProductType.map(a =>
										<>
											<option className="itemSelectPD" value={a.id}>{a.name}</option>
										</>

									)
								}

							</select>
						</div>


					</div>
					<div className="layout_padding gallery_section">
						<div className="container">
							<div className="row">
								{

									a.map(dep =>
										<div className="col-sm-3 itemPR ">
											<div className="best_shoes parent ">

												<NavLink to="/detail" state={dep.id}><p className="best_text "><a href="a">{dep.name}</a>  </p></NavLink>

												<NavLink to="/detail" state={dep.id}><div className="shoes_icon "><a href="a"><img src={require("../Assets/images/" + dep.image)} alt='a' /></a></div></NavLink>

												<div className="star_text " >
													<NavLink to="/detail" state={dep.id}>
														<div className="left_part ">
															<ul>
																<li><img className="star" src={require("../Assets/images/star-icon.png")} alt='' /></li>
																<li><img className="star" src={require("../Assets/images/star-icon.png")} alt='' /></li>
																<li><img className="star" src={require("../Assets/images/star-icon.png")} alt='' /></li>
																<li><img className="star" src={require("../Assets/images/star-icon.png")} alt='' /></li>
																<li><img className="star" src={require("../Assets/images/star-icon.png")} alt='' /></li>
															</ul>
														</div>
													</NavLink>

													<NavLink to="/detail" state={dep.id}><div className="right_part hidden-child">
														<div className="shoes_price "><span >{VND.format(dep.price)}</span></div>



													</div></NavLink>


												</div>
												<div className="hidden-child2">
													{/* <i className="fa fa-shopping-cart gioHangPD"></i> */}
													<button className="gioHangPD"><img src={require("../Assets/images/iconThemGioHang.png")} alt="giohang"></img></button>
													{/* <button className="btnMua">Mua ngay</button> */}

													{/* btnmua */}
													<button type="button" class="btnMua" data-toggle="modal" data-target="#exampleModal" onClick={() => setdtProduct(dep.id)}>Mua ngay</button>
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
																		{

																		}
																		<div>
																			<p className="tieudeDT" >{records.name}</p>
																			{/* <p className="phudeDT">Chất liệu:</p>
                                    <p className="phudeDT">Loại: </p> */}
																			<span className="phudeDT">Mã số: {records.sku}</span>
																		</div>
																		<div className='hienThiGia'>
																			<p className="giaDT2" >Giá gốc:  <span className="soGiaGocDT">{VND.format(records.price)}</span> </p>

																			<p className="giaDT">Giá Sale: {VND.format(records.price)}</p>

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
																							}} />
																							<label className="itemRadioDT" for={e.name}>{e.name}</label>

																						</div>
																						: <div className='itemSizeDT'>
																							<label className="itemRadioDT" for={e.name}>{e.name}</label>

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


																		</div>

																		<div>
																			<button className='muaNgayDT'>Mua ngay</button>
																		</div>
																	</div>


																</div>
																<div class="modal-footer">
																	<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
																	<button type="button" class="btn btn-primary" data-dismiss="modal" onClick={() => { }

																	}>Lưu</button>
																</div>
															</div>
														</div>
													</div>
													{/* btnmua */}

												</div>
											</div>
										</div>
									)}

							</div>


						</div>

						<div className="nextPage">


							<nav>
								<ul className='pagination'>
									<li className='page-item'>
										<a href='#' className='page-link' onClick={() => prePage(currentPage)}>Trước</a>
									</li>
									{
										numbers.map((n, i) => (
											<li className={`page-item  ${currentPage === n ? 'active' : ''}`} key={i}>
												<a href='#' className='page-link'
													onClick={() => changePage(n)}>{n}</a>
											</li>
										))
									}
									<li className='page-item'>
										<a href='#' className='page-link' onClick={() => nextPage(currentPage, npage)}>Sau</a>
									</li>

								</ul>
							</nav>
						</div>
					</div>

				</div>

			</div>


		</>
	)

}