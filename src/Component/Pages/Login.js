import React from "react";
import "../Styles/Login.css"
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import Mongo from "../Image/Mongo.PNG";

export default function Login() {
    return (
        <div>
            <div className="main">

                <div className="submain">
                    <div>
                      {/* <FaUserCircle size="40px"/> */}
                      <img src={Mongo} height={40}/>
                    </div>
                    <div style={{marginBottom:"40px", marginTop:"30px"}}>
                     <h2>Login</h2>
                    </div>
                    <div>
                     <input className="input" type="text" placeholder="Email"/>
                    </div>
                    <div>
                     <input className="input" type="Password" placeholder="Password"/>
                    </div>
                    <div>
                        <button className="button">Submit</button>
                    </div>
                    <div className="footer1">
                        <div style={{marginLeft:"0px"}}>
                            <Link to="/forget">Forget Password?...</Link>
                        </div>
                        <div  style={{marginLeft:"70px"}}>
                            <Link to="/register">Create Account?...</Link>
                        </div>
                       
                    </div>
                  

                </div>
               

            </div>

        </div>

    );
}