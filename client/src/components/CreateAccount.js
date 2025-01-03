import React, { useState } from "react";
import logo from "../Assets/jaunt_logo.png";
import { Link } from "react-router-dom"

function CreateAccount() {
    
    const [newUserData, setNewUserData] = useState({
        firstName: "",
        lastName: "",
        newUserName: "",
        newPassword: "",
        email: "",
        phone: "",
      });

      function onChangeFirst(e) {
        setNewUserData({ ...newUserData, firstName: e.target.value })
      }
    
      function onChangeLast(e) {
        setNewUserData({ ...newUserData, lastName: e.target.value })
      }
    
      function onChangeNewUsername(e) {
        setNewUserData({ ...newUserData, newUserName: e.target.value })
      }
    
      function onChangeNewPassword(e) {
        setNewUserData({ ...newUserData, newPassword: e.target.value })
      }
    
      function onChangeEmail(e) {
        setNewUserData({ ...newUserData, email: e.target.value })
      }
    
      function onChangePhone(e) {
        setNewUserData({ ...newUserData, phone: e.target.value })
      }

    return (
        <main className="login-container">
            <div>
                <img id="logo" src={logo} alt="jaunt logo"/>
            </div>
            <div className="login-window-border">
                <div className="login-window">
                    <h1>Create an Account</h1>
                    <form className="create-account-form">
                        <input className="create-account-first" type="text" placeholder="First Name" value={newUserData.firstName} onChange={onChangeFirst}/>
                        <input className="create-account-last" type="text" placeholder="Last Name" value={newUserData.lastName} onChange={onChangeLast}/>
                        <input className="create-account-username" type="text" placeholder="Username" value={newUserData.newUsername} onChange={onChangeNewUsername}/>
                        <input className="create-account-password" type="password" placeholder="Password" value={newUserData.newPassword} onChange={onChangeNewPassword}/>
                        <input className="create-account-email" type="text" placeholder="Email" value={newUserData.email} onChange={onChangeEmail}/>
                        <input className="create-account-phone" type="tel" placeholder="Phone Number" value={newUserData.phone} onChange={onChangePhone}/>
                        <button className="login-buttons">Create Account</button>
                        <hr></hr>
                        <span className="login-text">Already have an account?</span>
                        <Link to="/login"><button className="login-buttons">Sign In</button></Link>
                    </form>
                </div>
            </div>
        </main>
        
    );
};

export default CreateAccount;