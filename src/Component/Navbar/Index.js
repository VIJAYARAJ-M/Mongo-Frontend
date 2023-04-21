import React from "react";
import Navbar from "./Navbar";
import { Routes ,Route} from "react-router-dom";
import Report1 from "../Report/Report1";

export default function Index(){
    return(
        <div>
            <Navbar/>
            <Routes>
                <Route path="report1" element={<Report1/>}/>
                
            </Routes>

        </div>
    )
}