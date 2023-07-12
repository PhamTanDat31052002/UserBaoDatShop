
import React from "react";
import { variable } from "../Variable"
import { NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import "../Assets/css/styledetailproduct.css"
import Dropdown from 'react-dropdown-select';
import "../Assets/css/style.css"
import Slider from 'react-slider';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { message } from "antd";
import { Search, SearchOutlined } from "@mui/icons-material";
import triangleTopRight from "../Assets/css/giamgia.svg"
import Paragraph from "antd/lib/typography/Paragraph"
import { Radio, RadioGroup, FormControlLabel } from '@mui/material';
export default function ProductCRUD() {

	var [records, setRecord] = useState([]);
	var [ProductType, setProductType] = useState([]);
	const [selectedType, setSelectedType] = useState('Tất cả');
	const [nameType, setNameType] = useState('');
	const [filteredProducts, setFilteredProducts] = useState([]);
	var [dtProduct, setdtProduct] = useState();
	var [sizePr, setSizePr] = useState();
	var [idProduct, setidProduct] = useState();
	const [number, setNumber] = useState(1);
	var [tonKho, setTonKho] = useState(0);
	const [itemSize, setItemSize] = useState('');
	const [isLiked, setIsLiked] = useState(false);
	const [idStar, setIdStar] = useState(0);
	const [allLove, setAllLove] = useState([]);
	const [idMuaNgay, setIdMuaNgay] = useState();
	var [idPrSize, setIdPrSize] = useState('');
	const [top10, setProductTop10] = useState([]);
	// Yêu thích sp

	const [open, setOpen] = React.useState(false);
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const [isLoading, setIsLoading] = useState(false);
	const itemSizeClick = (event) => {
		setItemSize(event.target.value);
	};
	var [count,setCount]=useState(0);

	useEffect(() => {
		setIsLoading(true)
		var token = getToken();
		fetch(variable.API_URL + "Products/GetAllProductStatusTrue")
			.then(response => response.json())
			.then(data => setRecord(data)).catch(err => console.log(err))

		
		if (token != null) {
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
		fetch(variable.API_URL + "Products/GetTop10BestSeller")
		.then(response => response.json())
		.then(data => {
			setProductTop10(data)})
		setIsLoading(false)
	}, [count])

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
		// if(idMuaNgay!=null)
		// {
		// 	fetch(variable.API_URL + "Products/GetProductById/" + idMuaNgay)
		// 	.then(response => response.json())
		// 	.then(data => {
		// 		setdtProduct(data)

		// 	}).catch(err => console.log(err))

		// fetch(variable.API_URL + "ProductSizes/GetProductSizeByProductId/" + idMuaNgay)
		// 	.then(response => response.json())
		// 	.then(data => setSizePr(data)).catch(err => console.log(err))
		// }
		
	};
	const muaNgay=((id)=>{
		
	
			fetch(variable.API_URL + "Products/GetProductById/" + id)
			.then(response => response.json())
			.then(data => {
				setdtProduct(data)

			}).catch(err => console.log(err))

		fetch(variable.API_URL + "ProductSizes/GetProductSizeByProductId/" + id)
			.then(response => response.json())
			.then(data => setSizePr(data)).catch(err => console.log(err))
		
		
	})
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
	
		const token = getToken();
		if (token == null) {
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
				setCount(count+=1)
			})
	}
	const DontLikeProduct = (data) => {
	
		const token = getToken();
	
		fetch(variable.API_URL + "FavoriteProducts/DeleteFavoriteProduct?id="+ data, {
			method: "DELETE",
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				'Authorization': `Bearer ${token.value}`
			},
		
		})
			.then(response => response.json())
			.then(result => {
				message.success("Đã bỏ sản phẩm khỏi danh sách yêu thích!")
				setCount(count+=1)
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
	const isFavorite = ((id) =>{
		for(var i=0;i<allLove.length;i++)
		{
			if(allLove[i].productId==id)
			return true
		}
		return false;
	});
	const isTop10=((id)=>{
		for(var i=0;i<top10.length;i++)
		{
			if(top10[i].id==id)
			return true
		}
	})
	
	
	return (
		<>



			<div>
				<div style={{textAlign:"center"}}>
					{
						nameType==''?<h2>Tất cả sản phẩm</h2>:null
					}
					{
						
						ProductType.filter((item)=>{
							console.log(item)
							return item.name==nameType?item:null
						}
						).map(e=><h2>{e.name}</h2>)
					}
				</div>

				<div className="ContainerProduct">


					<div className="collection_section layout_padding columnPD1">
						<div className="container ">
							<div className="select-wrapper1">
								{/* <select className="custom-select1" value={selectedType} onChange={(e) =>
									{
										setcurrenPage(1)
										ChangeFilter(e.target.value)
									}}>
									
									<option value="0" hidden>Tất cả</option>

									<option value="0">Tất cả</option>
									{
										ProductType.map(a =>
											<>
												<option className="itemSelectPD" value={a.id}>{a.name}</option>
											</>
										)
									}

								</select> */}
								
								<RadioGroup value={selectedType} onChange={(e) =>
									{
										setcurrenPage(1)
										ChangeFilter(e.target.value)
									}}>
										
												<FormControlLabel
                                            value={0}
                                            control={<Radio className={ selectedType=== 0 ? 'radio-checked' : ''} />}
                                            label="Tất cả"
                                            classes={{
                                                root: 'radio-root',
                                                label: 'radio-label',
                                            }}
                                            onClick={()=>setNameType('')}
                                        />
										{
										ProductType.map(a =>
											<>
												<FormControlLabel
                                            value={a.id}
                                            control={<Radio className={ selectedType=== a.id ? 'radio-checked' : ''} />}
                                            label={a.name}
                                            classes={{
                                                root: 'radio-root',
                                                label: 'radio-label',
                                            }}
                                          onClick={()=>setNameType(a.name)}
                                        />
											</>
										)
									}
                                        

                                       
                                    </RadioGroup>
							</div>
						</div>
					</div>
					<div className="layout_padding gallery_section">
					{
								isLoading==true?<span>Loading...</span>:null
							}
						<div className="container">
							
							<div className="row">
								{
									a.map(dep =>
										<div className="col-sm-3 itemPR ">
											<div className="best_shoes parent ">

												<NavLink to={`/detail/${dep.id}`} state={dep.id}><p className="best_text "><a href="a">{dep.name}</a>  </p></NavLink>
													<div style={{height:"300px"}}>
														<NavLink to={`/detail/${dep.id}`} state={dep.id}><div className="shoes_icon "><a href="a"><img src={"https://localhost:7067/wwwroot/image/product/" + dep.image} alt='a' /></a></div></NavLink>
													</div>
												

												<div className="star_text " >
													<NavLink to={`/detail/${dep.id}`} state={dep.id}>
														<div className="left_part ">
															{/* <ul style={{visibility:"hidden"}}>
																<li><img className="star" src={require("../Assets/images/star-icon.png")} alt='' /></li>
																<li><img className="star" src={require("../Assets/images/star-icon.png")} alt='' /></li>
																<li><img className="star" src={require("../Assets/images/star-icon.png")} alt='' /></li>
																<li><img className="star" src={require("../Assets/images/star-icon.png")} alt='' /></li>
																<li><img className="star" src={require("../Assets/images/star-icon.png")} alt='' /></li>
															</ul> */}
															<div className="star"><span >{VND.format(dep.price)}</span></div>
														</div>
													</NavLink>

													<NavLink to={`/detail/${dep.id}`} state={dep.id}><div className="right_part hidden-child">
														<div className="shoes_price "><span >{VND.format(dep.priceSales)}</span></div>
													</div></NavLink>


												</div>
												<div className="hidden-child2">
													{/* <i className="fa fa-shopping-cart gioHangPD"></i> */}
													{
														isFavorite(dep.id)==true ? 
															<button
																className="gioHangPD"
																onClick={
																	() => {
																		DontLikeProduct(dep.id)
														
																		
																		
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
																	width:'13%'

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
														 	</button>:
															<button
																	className="gioHangPD"
																	onClick={
																		() => {
	
																			LikeProduct(dep.id)
																		
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
																	
																		width:'13%'
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
													{/* <span style={{ color: isFavorite(dep.id) ? 'red' : 'white' }}>❤️</span> */}
													




													{/* <button className="btnMua">Mua ngay</button> */}

													{/* btnmua */}
											
													{/* btnmua */}

													<NavLink to={`/detail/${dep.id}`} state={dep.id}>	<button className="btnMua" >Mua ngay</button></NavLink>
													
													{
														dtProduct!=null?
														<Dialog
														fullScreen={fullScreen}
														open={open}
														onClose={handleClose}
														aria-labelledby="responsive-dialog-title"
													>
														<DialogTitle id="responsive-dialog-title">
														{dtProduct.name}
														</DialogTitle>
														<DialogContent>
															{/* <DialogContentText>
																Let Google help apps determine location. This means sending anonymous
																location data to Google, even when no apps are running.
															</DialogContentText> */}
															<DialogContentText>

															
															{

																dtProduct!=null?
																<div>
																			<div>
	
																			<span className="phudeDT">Mã số: {dtProduct.sku}</span>
																		</div>
																		<div className='hienThiGia'>
																	
																			<div>
																					<span className="giaDT2" >Giá gốc:  <span className="soGiaGocDT">{VND.format(dtProduct.price)}</span> </span>
																				</div>
																				<div>
																					<span className="giaDT">Giá Sale: {VND.format(dtProduct.priceSales)}</span>
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
																						: <div className='itemSizeDT'>
																							<label className="itemRadioDT" for={e.name}>{e.name}</label>

																						</div>
																				) : null}

																		</div>
																		<div className='tonKho'>
																			<span>Tồn kho: {tonKho}</span>
																		</div>
																</div>:null
															}</DialogContentText>
															
														</DialogContent>
														<DialogActions>
															{
																idPrSize==''?
																<Button autoFocus onClick={()=>message.error("Bạn chưa chọn size")}>
																		Mua ngay
																	</Button>:
																	<Button autoFocus onClick={handleClose}>
																	Mua ngay
																</Button>
															}
															
															<Button onClick={handleClose} autoFocus>
																Hủy
															</Button>
														</DialogActions>
													</Dialog>:null
													}
													
													

												</div>
												
											</div>
											{
												isTop10(dep.id)==true?
												<Paragraph className='badge' style={{ position: 'absolute', top: 10, left:0 }}>
                                       					 <span>Bán chạy</span>
														    <img style={{ position: 'absolute', top: 23, left:4 }} src={triangleTopRight} alt=""/>
                                    				</Paragraph>:
													<Paragraph className='badge' style={{ position: 'absolute', top: 10, left:0 }}>
													<span>Giảm giá</span>
													<img style={{ position: 'absolute', top: 23, left:4 }} src={triangleTopRight} alt=""/>
											</Paragraph>
											}
											
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