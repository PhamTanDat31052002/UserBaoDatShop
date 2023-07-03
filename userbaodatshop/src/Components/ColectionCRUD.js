import React from "react";
import "../Assets/css/styleColection.css"
import { variable } from "../Variable"
import { NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
export default function ColectionCRUD() {
    var [product, setProduct] = useState([]);
    var [idBrand, setIdBrand] = useState(1);



    const containerRef = useRef(null);
    const containerRef2 = useRef(null);
    const [scrollDirection, setScrollDirection] = useState('right');
    const [scrollDirection2, setScrollDirection2] = useState('right');
    var [allPrById,setAllPrById]=useState([]);
    var [allBrand,setAllBrand]=useState([])
    // useEffect(() => {
    //     const container = containerRef.current;
    //     const scrollInterval = setInterval(() => {
    //         if (scrollDirection === 'right') {
    //             container.scrollLeft += 1; // Thay đổi giá trị tùy ý cho tốc độ cuộn
    //             if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
    //                 setScrollDirection('left');
    //             }
    //         } else {
    //             container.scrollLeft -= 1; // Thay đổi giá trị tùy ý cho tốc độ cuộn
    //             if (container.scrollLeft <= 0) {
    //                 setScrollDirection('right');
    //             }
    //         }
            

            
    //     }, 10);
        
    //     return () => {
    //         clearInterval(scrollInterval);
    //     };
    // }, [scrollDirection]);
    
    // useEffect(() => {
    //     const container2 = containerRef2.current;
    //     const scrollInterval2 = setInterval(() => {
    //         if (scrollDirection2 === 'right') {
    //             container2.scrollLeft += 1; 
    //             if (container2.scrollLeft >= container2.scrollWidth - container2.clientWidth) {
    //                 setScrollDirection2('left');
    //             }
    //         } else {
    //             container2.scrollLeft -= 1; 
    //             if (container2.scrollLeft <= 0) {
    //                 setScrollDirection2('right');
    //             }
    //         }
    //     }, 10); 

    //     return () => {
    //         clearInterval(scrollInterval2);
    //     };
    // }, [scrollDirection2]);
    useEffect(() => {
        fetch(variable.API_URL + "Products/GetTop10BestSeller")
            .then(response => response.json())
            .then(data => setProduct(data)).catch(err => console.log(err))
    fetch(variable.API_URL + "BrandProducts/GetAllBrandProducts")
        .then(response => response.json())
        .then(data => setAllBrand(data)).catch(err => console.log(err))
       
    }, []);
    
    const getAllPrByIdBrand=((id)=>{
        
        fetch(variable.API_URL + "BrandProducts/GetProductByBrandProductsId/"+id)
           .then(response => response.json())
           .then(data => setAllPrById(data)).catch(err => console.log(err))
    });
  console.log(allPrById)
    return (
       

        <>
        {
           
            allBrand!=null?
                allBrand.map(brand=>
                    <button onClick={()=>{
                        // setIdBrand(brand.id)
                        getAllPrByIdBrand(brand.id)
                        
                    }}>{brand.name}</button>
                    
                ):null

                
            // <div className="ctnColection">
            //     <div className="rowColection" ref={containerRef}>
            //         {
            //             product != null ?
            //                 product.map(pr =>
            //                     <NavLink to="/detail" state={pr.id}><div className="itemRowColection">
            //                         <div>
            //                             <img src={"https://localhost:7067/wwwroot/image/product/" + pr.image} alt=""></img>
            //                         </div>
            //                         <div style={{ width: "100%", padding: "1%", textAlign: "center", fontWeight: "bold" }}>
            //                             <p>{pr.name}</p>
            //                         </div>
            //                     </div></NavLink>
            //                 ) : null
            //         }
            //     </div>

            //     <div style={{padding:"2%"}}></div>
            //     {/* Bộ sưu tập 2 */}
               
            // </div>:null
        }
        {
             allPrById!=''?
            <div className="ctnColection">
                <div className="rowColection" ref={containerRef}>
                     {
                     
                     allPrById.map(pr =>
                                <NavLink to="/detail" state={pr.id}><div className="itemRowColection">
                                    <div>
                                        <img src={"https://localhost:7067/wwwroot/image/product/" + pr.image} alt="" width="400px"></img>
                                    </div>
                                    <div style={{ width: "100%", padding: "1%", textAlign: "center", fontWeight: "bold" }}>
                                        <p>{pr.name}</p>
                                    </div>
                                </div></NavLink>
                            )
                    }
                </div>

                <div style={{padding:"2%"}}></div>
                {/* Bộ sưu tập 2 */}
               
            </div>:null
            
        }
            
        </>
    )
}


//  {/* <div>
//                     <h2>Champions league 2022</h2>
//                 </div>
//                 <div className="rowColection" ref={containerRef2}>
//                     {
//                         product != null ?
//                             product.map(pr =>
//                                 <NavLink to="/detail" state={pr.id}><div className="itemRowColection">
//                                     <div>
//                                         <img src={"https://localhost:7067/wwwroot/image/product/" + pr.image} alt=""></img>
//                                     </div>
//                                     <div style={{ width: "100%", padding: "1%", textAlign: "center", fontWeight: "bold" }}>
//                                         <p>{pr.name}</p>
//                                     </div>
//                                 </div></NavLink>
//                             ) : null
//                     }
//                 </div> */}