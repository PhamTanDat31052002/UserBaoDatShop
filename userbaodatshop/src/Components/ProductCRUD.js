
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
		
		if(productTypeId==="0") 
		{ fetch(variable.API_URL + "Products/GetAllProductStatusTrue")
		.then(response => response.json())
		.then(data => setRecord(data)).catch(err => console.log(err))
		}else{
		fetch(variable.API_URL + "Products/GetAllProductInProductType/"+productTypeId)
		.then(response => response.json())
		.then(data => setRecord(data)).catch(err => console.log(err))}
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
	const FilterPrice = (productTypeId) => {
	
	};
	//custom select
	const options = [
		{ value: 'Option 1', label: 'Option 1' },
		{ value: 'Option 2', label: 'Option 2' },
		{ value: 'Option 3', label: 'Option 3' },
	  ];
	return (
		<>
		  {/* <div className="custom-select">
      <Dropdown options={options} />
    </div> */}


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