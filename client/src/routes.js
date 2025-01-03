import App from "./components/App";
import CreateAccount from "./components/CreateAccount";
import Login from "./components/Login";

const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/login",
                element: <Login/>,
            },
            {
                path: "/createAccount",
                element: <CreateAccount/>,
            }
        ]
    }
    
]

export default routes;