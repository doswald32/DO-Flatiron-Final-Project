import React, { useState } from "react";
import logo from "../Assets/jaunt_logo.png";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";


function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    // const [password, setPassword] = useState("");

    const formSchema = Yup.object({
        username: Yup.string().required("Username is required."),
        password: Yup.string()
    })

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: formSchema,
        onSubmit: (values, {resetForm }) => {
            fetch('http://127.0.0.1:5555/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values, null, 2),
            })
            .then((r) => r.json())
            .then((user) => onLogin(user))
        }
    })

    // function onChangeUsername(e) {.

    //     setUsername(e.target.value)
    //   }
    
    // function onChangePassword(e) {
    //     setPassword(e.target.value)
    //   }

    return (
        <main className="login-container">
            <img id="logo" src={logo} alt="jaunt logo"/>
            <div className="login-window-border">
                <div className="login-window">
                    <h1>Sign in</h1>
                    <form className="login-form" onSubmit={formik.handleSubmit}>
                        <input className="login-username" type="text" placeholder="Username or Email" value={formik.values.username} onChange={formik.handleChange}/>
                        <input className="login-password" type="password" placeholder="Password" value={formik.values.password} onChange={formik.handleChange}/>
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
