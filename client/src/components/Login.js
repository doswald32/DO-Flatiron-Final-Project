import React from "react";
import logo from "../Assets/jaunt_logo.png";
import { Link, useOutletContext, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";


function Login() {

    const { setUser } = useOutletContext();
    const navigate = useNavigate();

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
        onSubmit: (values) => {
            fetch('/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values, null, 2),
            })
            .then((r) => {
                if (r.ok) {
                    return r.json();
                } else {
                    throw new Error("Invalid credentials");
                }
            })
            .then((user) => {
                setUser(user);
                navigate("/");
            })
            .catch((err) => {
                console.error("Login failed:", err);
            })
        }
    })

    return (
        <main className="login-container">
            <img id="logo" src={logo} alt="jaunt logo"/>
            <div className="login-window-border">
                <div className="login-window">
                    <h1>Sign in</h1>
                    <form className="login-form" onSubmit={formik.handleSubmit}>
                        <input id="username" name="username" placeholder="Username" value={formik.values.username} onChange={formik.handleChange}/>
                        <input id="password" name="password" type="password" placeholder="Password" value={formik.values.password} onChange={formik.handleChange}/>
                        <p>Forgot password?</p>
                        <button type="submit" className="login-buttons">Log In</button>
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
