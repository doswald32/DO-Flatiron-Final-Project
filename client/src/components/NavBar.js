import { useOutletContext, useNavigate } from "react-router-dom";

function NavBar() {

    const { setUser } = useOutletContext();
    const navigate = useNavigate();

    function handleLogout() {
        fetch("http://127.0.0.1:5555/logout", {
            method: "DELETE",
        }).then(() => setUser(null));
        navigate("/login");
    }
    return (
        <nav>
            <button onClick={handleLogout}>Logout</button>
        </nav>
    )
}

export default NavBar;