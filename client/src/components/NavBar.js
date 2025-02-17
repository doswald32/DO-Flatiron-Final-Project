import { useNavigate, NavLink } from "react-router-dom";
import { useUser } from "./UserContext";
import logo from "../Assets/MyCaddyLogo.png";

function NavBar() {

    const { setUser } = useUser();
    const navigate = useNavigate();

    function handleLogout() {
        fetch("/logout", {
          method: "DELETE",
          credentials: "include", 
        })
          .then((response) => {
            if (response.ok) {
              setUser(null); 
              navigate("/login"); 
            } else {
              console.error("Failed to log out");
            }
          })
          .catch((err) => {
            console.error("Error during logout:", err);
          });
      }

      return (
        <nav>
            <div className="nav-left">
                <img id="navbar-logo" src={logo} alt="my caddy logo"/>
            </div>
            <div className="nav-center">
                <NavLink to="/" className="nav-link">Home</NavLink>
                <NavLink to="/courses" className="nav-link">Courses</NavLink>
                <NavLink to="/scores" className="nav-link">Scorecards</NavLink>
            </div>
            <div className="nav-right">
                <button className="logout-button" onClick={handleLogout}>Logout</button>
            </div>
        </nav>
    )
}

export default NavBar;