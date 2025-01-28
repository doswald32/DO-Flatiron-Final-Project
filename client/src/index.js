import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import "./index.css";
import { createBrowserRouter, RouterProvider, useOutletContext, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import CreateAccount from "./components/CreateAccount";
import LoginSuccess from "./components/LoginSuccess";
import Courses from "./components/Courses";


function OutletWrapper({ children }) {
    const { user, loading } = useOutletContext();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/login" replace />
    } else {
        return children;
    }
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: (
                    <OutletWrapper>
                        <Home />
                    </OutletWrapper>
                ),
            },
            {
                path: "/login",
                element: <Login/>,
            },
            {
                path: "/createAccount",
                element: <CreateAccount/>,
            },
            {
                path: "/login-success",
                element: <LoginSuccess />,
            },
            {
                path: "/courses",
                element: <Courses />,
            },
        ]
    }
])


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router}/>)
