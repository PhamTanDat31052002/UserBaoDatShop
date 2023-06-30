
import React from "react";
import { variable } from "../Variable"
import { NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

import Dropdown from 'react-dropdown-select';
import "../Assets/css/style.css"

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { message } from "antd";



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
	const [isLiked, setIsLiked] = useState(false);
	const [idStar, setIdStar] = useState(0);
	const [allLove, setAllLove] = useState([]);


	// Yêu thích sp
	const handleClickLike = () => {
		setIsLiked(!isLiked);
	};
	const [open, setOpen] = React.useState(false);
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  
	const handleClickOpen = () => {
	  setOpen(true);
	};
  
	const handleClose = () => {
	  setOpen(false);
	};


	const itemSizeClick = (event) => {
		setItemSize(event.target.value);
	};
	useEffect(() => {
		var token=getToken();
		fetch(variable.API_URL + "Products/GetAllProductStatusTrue")
			.then(response => response.json())
			.then(data => setRecord(data)).catch(err => console.log(err))

		// fetch(variable.API_URL + "GetAverageStartReview/"+idStar)
		// 	.then(response => response.json())
		// 	.then(data => (data)).catch(err => console.log(err))
		if(token!=null)
		{
			fetch(variable.API_URL + "FavoriteProducts/GetAllFavoriteProduct", {
				method: "GET",
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					'Authorization': `Bearer ${token.value}`,
				}
			}).then(response => response.json())
				.then(data => setAllLove(data)).catch(err => console.log(err))
		}

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
	const LikeProduct = (data) => {
		console.log(data)
		const token = getToken();
		if(token==null)
		{
			return message.error("Bạn cần đăng nhập để yêu thích!")
		}
		fetch(variable.API_URL + "FavoriteProducts/CreateFavoriteProduct", {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				'Authorization': `Bearer ${token.value}`
			},
			body: JSON.stringify({
				productId: data
			})
		})
			.then(response => response.json())
			.then(result => {
				message.success("Đã thêm vào danh sách yêu thích")
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



	const truDi1 = () => {
		number >= 2 ?
			setNumber(number - 1) : setNumber(number - 0);
	}
	const congThem1 = () => {
		number >= tonKho ?
			setNumber(number + 0) : setNumber(number + 1);
	}

	// Lọc giá
	const [tangGiam, setTangGiam] = useState("1"); // Giá trị ban đầu là "1" (Giá tăng dần)

	const handleFilterChangeTangGiam = (e) => {
		setTangGiam(e.target.value);
	};
	const filterDatatangGiam = () => {
		let filteredData = a;
	
		if (tangGiam === "1") {
		  // Giá tăng dần
		  filteredData.sort((a, b) => a.price - b.price);
		} else {
		  // Giá giảm dần
		  filteredData.sort((a, b) => b.price - a.price);
		}
	
	  };
	
	//   custom select
	
	return (
		<>



			<div>
				<div>
					<select className="selectLoc" onChange={(e) => handleFilterChangeTangGiam(e.target.value)}>
						<option value={"1"}>Giá tăng dần</option>
						<option value={"0"}>Giá giảm dần</option>

					</select>
				</div>
				<div className="ContainerProduct">


					<div className="collection_section layout_padding columnPD1">
						<div className="container ">
							<div className="select-wrapper1">
								<select className="custom-select1" value={selectedType} onChange={(e) => ChangeFilter(e.target.value)}>

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
													{
																
																allLove!=null?
																	allLove.filter((item)=>{
	
																		 return item.productId==dep.id ? item:null
																	
																	})
																	.map(maplike=>
																			<button
																		className="gioHangPD"
																		onClick={
																			() => {
																				
																				LikeProduct(dep.id)
																				handleClickLike()
																			}
																		}
																		style={{
																			display: 'inline-block',
																			padding: '4px',
																			borderRadius: '50%',
																			backgroundColor: 'white',
																			border: 'none',
																			cursor: 'pointer',
																			outline: 'none',
				
																		}}
																	>
																		<div
																			style={{
																				position: 'relative',
																				width: '24px',
																				height: '24px',
																			}}
																		>
																			<div
																				style={{
				
																					position: 'absolute',
																					top: 0,
																					left: 0,
																					width: '100%',
																					height: '100%',
				
																				}}
																			/>
																			❤️
																		
																		</div>
																		</button>
																	
																	):
																	<button
																	className="gioHangPD"
																	onClick={
																		() => {
																			
																			LikeProduct(dep.id)
																			handleClickLike()
																		}
																	}
																	style={{
																		display: 'inline-block',
																		padding: '4px',
																		borderRadius: '50%',
																		backgroundColor: 'white',
																		border: 'none',
																		cursor: 'pointer',
																		outline: 'none',
			
																	}}
																>
																	<div
																		style={{
																			position: 'relative',
																			width: '24px',
																			height: '24px',
																		}}
																	>
																		<div
																			style={{
			
																				position: 'absolute',
																				top: 0,
																				left: 0,
																				width: '100%',
																				height: '100%',
			
																			}}
																		/>
																		🤍
																	
																	</div>
																	</button>
															}




													{/* <button className="btnMua">Mua ngay</button> */}

													{/* btnmua */}
													{/* <button type="button" class="btnMua" data-toggle="modal" data-target="#exampleModal" onClick={() => setdtProduct(dep.id)}>Mua ngay</button>
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
													</div> */}
													{/* btnmua */}

													<button className="btnMua" onClick={handleClickOpen}>Mua ngay</button>
															
															<Dialog
																fullScreen={fullScreen}
																open={open}
																onClose={handleClose}
																aria-labelledby="responsive-dialog-title"
															>
																<DialogTitle id="responsive-dialog-title">
																{"Use Google's location service?"}
																</DialogTitle>
																<DialogContent>
																<DialogContentText>
																	Let Google help apps determine location. This means sending anonymous
																	location data to Google, even when no apps are running.
																</DialogContentText>
																</DialogContent>
																<DialogActions>
																<Button autoFocus onClick={handleClose}>
																	Hủy
																</Button>
																<Button onClick={handleClose} autoFocus>
																	Đồng ý
																</Button>
																</DialogActions>
															</Dialog>
															
													
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