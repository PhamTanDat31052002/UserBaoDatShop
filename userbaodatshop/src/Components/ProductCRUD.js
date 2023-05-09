import React from "react";
import { variable } from "../Variable"
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import "../Assets/css/style.css"

export default function ProductCRUD() {
	var location = useLocation();
	var id = location.state;
	var [records, setRecord] = useState([]);
	useEffect(() => {
		fetch(variable.API_URL + "Products/GetAllProduct")
			.then(response => response.json())
			.then(data => setRecord(data)).catch(err => console.log(err))
	}, [id])

	const [currentPage, setcurrenPage] = useState(1);
	const recordsPerPage = 5;
	const lastIndex = currentPage * recordsPerPage;
	const firstIndex = lastIndex - recordsPerPage;
	const a = records.slice(firstIndex, lastIndex);
	const npage = Math.ceil(records.length / recordsPerPage)
	const numbers = Array.from({ length: npage }, (_, i) => i + 1);

	return (
		<>
			<div className="collection_section layout_padding">
				<div className="container">
					<h1 className="new_text"><strong>New Arrivals Products</strong></h1>
					<p className="consectetur_text">consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</p>
				</div>
			</div>
			<div className="layout_padding gallery_section">
				<div className="container">
					<div className="row">
						{a.map(dep =>
							<div className="col-sm-4  ">
								<div className="best_shoes parent ">
									<p className="best_text "> {dep.name} </p>
									<div className="shoes_icon imageMax"><img src={require("../Assets/images/" + dep.image)} alt='a' /></div>
									<div className="star_text " >
										<div className="left_part">
											<ul>
												<li><a href="a"><img src={require("../Assets/images/star-icon.png")} alt='' /></a></li>
												<li><a href="a"><img src={require("../Assets/images/star-icon.png")} alt='' /></a></li>
												<li><a href="a"><img src={require("../Assets/images/star-icon.png")} alt='' /></a></li>
												<li><a href="a"><img src={require("../Assets/images/star-icon.png")} alt='' /></a></li>
												<li><a href="a"><img src={require("../Assets/images/star-icon.png")} alt='' /></a></li>
											</ul>
										</div>
										<div className="right_part">
											<div className="shoes_price hidden-child"><span >{dep.price}đ</span></div>
											
										</div>
									</div>
								</div>
							</div>
						)}

					</div>

					<div className="buy_now_bt">
						<button className="buy_text">Buy Now</button>
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