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
		fetch(variable.API_URL + "Products/GetAllProduct")
			.then(response => response.json())
			.then(data => setRecord(data)).catch(err => console.log(err))
	}, [id])

	useEffect(() => {
		fetch(variable.API_URL + "ProductTypes/GetAllProductType")
			.then(response => response.json())
			.then(data => setProductType(data)).catch(err => console.log(err))
	}, [id]);
	// Filter
	
	useEffect(() => {
		if(selectedType === "")
		{
			setFilteredProducts(records);
		}
		if (selectedType === 'Tất cả') {
			setFilteredProducts(records);
		} else {
			const filtered = records.filter(pr => pr.productTypeId === selectedType);
			setFilteredProducts(filtered);
		
		}
		console.log(selectedType)
		
	
	}, [selectedType]);

	const handleFilterByType = (productTypeId) => {
		setSelectedType(productTypeId);
	};
	// chuyển trang
	const [currentPage, setcurrenPage] = useState(1);
	const recordsPerPage = 5;
	const lastIndex = currentPage * recordsPerPage;
	const firstIndex = lastIndex - recordsPerPage;
	const a = records.slice(firstIndex, lastIndex);
	const npage = Math.ceil(records.length / recordsPerPage)
	const numbers = Array.from({ length: npage }, (_, i) => i + 1)
	
	
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
						
							<select  value={selectedType} onChange={(e) => handleFilterByType(e.target.value)}>
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
								{filteredProducts.map(dep =>
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
					</div>
				</div>
			</div>


		</>
	)
	function changePage(id) {
		setcurrenPage(id)
	}
	function nextPage() {
		if (currentPage !== npage) {
			setcurrenPage(currentPage + 1)
		}
	}
	function prePage() {
		if (currentPage !== 1) {
			setcurrenPage(currentPage - 1)
		}
	}
}