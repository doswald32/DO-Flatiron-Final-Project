import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LoginSuccess({ setUser }) {
    const navigate = useNavigate();

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const userId = queryParams.get("user_id");

        if (userId) {
            fetch(`/check_session`, {
                method: "GET",
                credentials: "include",
            })
                .then((res) => res.json())
                .then((user) => {
                    if (user) {
                        // Save user in context/state
                        setUser(user);
                        navigate("/"); // Navigate to home page after login
                    } else {
                        console.error("User session not found.");
                    }
                })
                .catch((err) => console.error("Error fetching session:", err));
        } else {
            console.error("No user ID returned from Google login.");
        }
    }, [navigate, setUser]);

    return <div>Logging you in...</div>;
}

export default LoginSuccess;