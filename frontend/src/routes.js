import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./View/Login/login_page";
import Home from "./View/Home/home";

const Routering = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}></Route>
                <Route path="/home" element={<Home/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Routering;