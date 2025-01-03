import React, { useState } from "react";
import logo from "../Assets/jaunt_logo.png";
import { Link } from "react-router-dom"


function Login() {
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function onChangeUsername(e) {
        setUsername(e.target.value)
      }
    
    function onChangePassword(e) {
        setPassword(e.target.value)
      }

    return (
        <main className="login-container">
            <img id="logo" src={logo} alt="jaunt logo"/>
            <div className="login-window-border">
                <div className="login-window">
                    <h1>Sign in</h1>
                    <form className="login-form">
                        <input className="login-username" type="text" placeholder="Username or Email" value={username} onChange={onChangeUsername}/>
                        <input className="login-password" type="password" placeholder="Password" value={password} onChange={onChangePassword}/>
                        <p>Forgot password?</p>
                        <button className="login-buttons">Log In</button>
                        <hr></hr>
                        <span className="login-text">New to Jaunt? Click below to create an account!</span>
                        <Link to="/createAccount"><button className="login-buttons">Create Account</button></Link>
                    </form>
                </div>
            </div>
        </main>
        
    );
};

export default Login;