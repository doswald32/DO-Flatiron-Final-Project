import React, { useState } from "react";
import logo from "../Assets/jaunt_logo.png";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

function CreateAccount() {
    
    const [newUserData, setNewUserData] = useState({
        first_name: "",
        last_name: "",
        username: "",
        password: "",
      });

    const formSchema = Yup.object({
      first_name: Yup.string().required("First name is required."),
      last_name: Yup.string().required("Last name is required."),
      username: Yup.string().required("Username is required."),
      password: Yup.string().required("Password is required"),
    })

    const formik = useFormik({
      initialValues: {
        first_name: "",
        last_name: "",
        username: "",
        password: "",
      },
      validationSchema: formSchema,
      onSubmit: (values) => {
        fetch('http://127.0.0.1:5555/create_account', {
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
          }, 
          body: JSON.stringify(values, null, 2)
        })
        .then((r) => r.json())
        .then((data) => console.log(data))
      }
    })

    // function onChangeFirst(e) {
    //   setNewUserData({ ...newUserData, first_name: e.target.value })
    // }
  
    // function onChangeLast(e) {
    //   setNewUserData({ ...newUserData, last_name: e.target.value })
    // }
  
    // function onChangeNewUsername(e) {
    //   setNewUserData({ ...newUserData, username: e.target.value })
    // }
  
    // function onChangeNewPassword(e) {
    //   setNewUserData({ ...newUserData, password: e.target.value })
    // }

    console.log(formik.values)

    return (
        <main className="login-container">
            <div>
                <img id="logo" src={logo} alt="jaunt logo"/>
            </div>
            <div className="login-window-border">
                <div className="login-window">
                    <h1>Create an Account</h1>
                    <form className="create-account-form" onSubmit={formik.handleSubmit}>
                        <input id="first_name" name="first_name" placeholder="First Name" value={formik.values.first_name} onChange={formik.handleChange}/>
                        <input id="last_name" name="last_name" placeholder="Last Name" value={formik.values.last_name} onChange={formik.handleChange}/>
                        <input id="username" name="username" placeholder="Username" value={formik.values.username} onChange={formik.handleChange}/>
                        <input id="password" name="password" type="password" placeholder="Password" value={formik.values.password} onChange={formik.handleChange}/>
                        <button type="submit" className="login-buttons">Create Account</button>
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