import { useOutletContext } from "react-router-dom";

function NavBar() {

    const { setUser, user } = useOutletContext();
    // const navigate = useNavigate();

    function handleLogout() {
        fetch("http://127.0.0.1:5555/logout", {
            method: "DELETE",
        }).then(() => setUser(null));
        // THIS ISN'T SETTING THE USER TO NULL. UNLESS IT'S HAPPENING AFTER
        console.log('inside function:', user)
        // navigate("/login");
    }

    return (
        <nav>
            <button onClick={handleLogout}>Logout</button>
        </nav>
    )
}

export default NavBar;