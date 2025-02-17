import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { useOutletContext, Navigate } from "react-router-dom";
import { UserProvider } from "./components/UserContext";
import Home from "./components/Home";
import Login from "./components/Login";
import CreateAccount from "./components/CreateAccount";
import Courses from "./components/Courses";
import ScoreCard from "./components/ScoreCard";
import CourseDetail from "./components/CourseDetail";
import Scores from "./components/Scores";

// function OutletWrapper({ children }) {
//     const { user, loading } = useOutletContext();

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (!user) {
//         return <Navigate to="/login" replace />
//     } else {
//         return children;
//     }
// }

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: (
                    // <OutletWrapper>
                        <Home />
                    // </OutletWrapper>
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
                path: "/courses",
                element: <Courses />,
            },
            {
                path: "/scorecard",
                element: <ScoreCard />
            },
            {
                path: "/course-detail/:id",
                element: <CourseDetail />
            },
            {
                path: "/scores",
                element: <Scores />
            }
        ]
    }
])


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<UserProvider><RouterProvider router={router}/></UserProvider>)
