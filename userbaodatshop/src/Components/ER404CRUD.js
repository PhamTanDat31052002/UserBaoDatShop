import React from "react";
import "../Assets/css/style404.css"
import { variable } from "../Variable";
import { useState } from 'react';
import { useEffect } from 'react';
import { message } from "antd";
import { useNavigate } from 'react-router-dom';
export default function ER404CRUD() {
    var history=useNavigate();
    return (
        <>
       <body class="bg-purple body404">
        
        <div class="star404">
            <div class="custom-navbar">
                {/* <div class="brand-logo">
                    <img src="http://salehriaz.com/404Page/img/logo.svg" width="80px"/>
                </div> */}
                {/* <div class="navbar-links">
                    <ul>
                      <li><a href="http://salehriaz.com/404Page/404.html" target="_blank">Home</a></li>
                      <li><a href="http://salehriaz.com/404Page/404.html" target="_blank">About</a></li>
                      <li><a href="http://salehriaz.com/404Page/404.html" target="_blank">Features</a></li>
                      <li><a href="http://salehriaz.com/404Page/404.html" class="btn-request" target="_blank">Request A Demo</a></li>
                    </ul>
                </div> */}
            </div>
            <div class="central-body">
                <img class="image-404" src="http://salehriaz.com/404Page/img/404.svg" width="300px"/>
                <a href="/" class="btn-go-home"  >Quay lại trang chủ</a>
            </div>
            <div class="objects">
                <img class="object_rocket" src="http://salehriaz.com/404Page/img/rocket.svg" width="40px"/>
                <div class="earth-moon">
                    <img class="object_earth" src="http://salehriaz.com/404Page/img/earth.svg" width="100px"/>
                    <img class="object_moon" src="http://salehriaz.com/404Page/img/moon.svg" width="80px"/>
                </div>
                <div class="box_astronaut">
                    <img class="object_astronaut" src="http://salehriaz.com/404Page/img/astronaut.svg" width="140px"/>
                </div>
            </div>
            <div class="glowing_stars">
                <div class="star404"></div>
                <div class="star404"></div>
                <div class="star404"></div>
                <div class="star404"></div>
                <div class="star404"></div>

            </div>

        </div>

    </body>
        </>
    )
}