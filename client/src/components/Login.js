import MyCaddyLogo from "../Assets/MyCaddyLogo.png";
import GoogleLogo from "../Assets/google-logo.webp";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";
import { useFormik } from "formik";
import * as Yup from "yup";


function Login() {
    const { setUser } = useUser();
    const navigate = useNavigate();
  
    const formSchema = Yup.object({
      username: Yup.string().required("Username is required."),
      password: Yup.string().required("Password is required."),
    });

    function handleGoogleLogin() {
      window.location.href = "http://127.0.0.1:5555/login/google";
    }
  
    const formik = useFormik({
      initialValues: {
        username: "",
        password: "",
      },
      validationSchema: formSchema,
      onSubmit: (values, { resetForm }) => {
        fetch("/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(values),
        })
          .then((response) => {
            if (!response.ok) {
              alert("Invalid login credentials.")
              resetForm();
              throw new Error("Invalid credentials");
            }
            return response.json();
          })
          .then((user) => {
            setUser(user); 
            navigate("/"); 
          })
          .catch((err) => {
            console.error("Login failed:", err);
          });
      },
    });

    return (
        <main className="login-container">
            <img id="logo" src={MyCaddyLogo} alt="my caddy logo"/>
            <div className="login-window-border">
                <div className="login-window">
                    <h1>Sign in</h1>
                    <form className="login-form" onSubmit={formik.handleSubmit}>
                        <input 
                          id="username" 
                          name="username" 
                          placeholder="Username" 
                          value={formik.values.username} 
                          onChange={formik.handleChange}
                        />
                        <input 
                          id="password" 
                          name="password" 
                          type="password"
                          placeholder="Password" 
                          value={formik.values.password} 
                          onChange={formik.handleChange}
                        />
                        <button type="submit" className="login-buttons">Log In</button>
                        <button className="login-google" onClick={handleGoogleLogin}>
                          <img src={GoogleLogo} alt="Google Logo" className="google-logo" />
                          Sign in with Google
                        </button>
                        <hr></hr>
                        <span className="login-text">New to MyCaddy? Click below to create an account!</span>
                        <Link to="/createAccount"><button className="login-buttons">Create Account</button></Link>
                    </form>
                </div>
            </div>
        </main>
        
    );
};

export default Login;
