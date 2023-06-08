
import React from "react";
import { variable } from "../Variable"
import { NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import "../Assets/css/style.css"

export default function ProductCRUD() {
	var location = useLocation();
	var id = location.state;
	var [records, setRecord] = useState([]);
	var [ProductType, setProductType] = useState([]);
	const [selectedType, setSelectedType] = useState('Tất cả');
	const [filteredProducts, setFilteredProducts] = useState([]);

	useEffect(() => {
		fetch(variable.API_URL + "Products/GetAllProductStatusTrue")
			.then(response => response.json())
			.then(data => setRecord(data)).catch(err => console.log(err))
	}, [id])

	useEffect(() => {
		fetch(variable.API_URL + "ProductTypes/GetAllProductTypeStatusTrue")
			.then(response => response.json())
			.then(data => setProductType(data)).catch(err => console.log(err))
	}, [id]);



	const handleFilterByType = (productTypeId) => {
		setSelectedType(productTypeId);
	};
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



	return (
		<>

			<div>
				<div>
					<select className="selectLoc">
						<option value={"a"}>Lọc</option>
						<option value={"a"}>Giá tăng dần</option>
						<option value={"a"}>Giá giảm dần</option>

					</select>
				</div>
				<div className="ContainerProduct">


					<div className="collection_section layout_padding columnPD1">
						<div className="container ">

							<select value={selectedType} onChange={(e) => handleFilterByType(e.target.value)}>
								<option value="Tất cả">Tất cả</option>

								{
									ProductType.map(a =>
										<option className="itemSelectPD" value={a.id}>{a.name}</option>
									)
								}
							</select>
						</div>
					</div>
					<div className="layout_padding gallery_section">
						<div className="container">
							<div className="row">
								{a.filter((item) => {

									return selectedType === "Tất cả"
										? item : item.productTypeId.toString().includes(selectedType)
								})
									.map(dep =>
										<div className="col-sm-3 itemPR ">
											<div className="best_shoes parent ">

												<NavLink to="/detail"  state={ dep.id }><p className="best_text "><a href="a">{dep.name}</a>  </p></NavLink>
												<NavLink to="/detail" state={ dep.id }><div className="shoes_icon "><a href="a"><img src={require("../Assets/images/" + dep.image)} alt='a' /></a></div></NavLink>

												<div className="star_text " >
													<NavLink to="/detail"state={ dep.id }>
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

													<NavLink to="/detail" state={ dep.id }><div className="right_part hidden-child">
														<div className="shoes_price "><span >{dep.price}đ</span></div>



													</div></NavLink>


												</div>
												<div className="hidden-child2">
													{/* <i className="fa fa-shopping-cart gioHangPD"></i> */}
													<button className="gioHangPD"><img src={require("../Assets/images/iconThemGioHang.png")} alt="giohang"></img></button>
													<button className="btnMua">Mua ngay</button>


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