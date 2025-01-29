import { useOutletContext, useNavigate, NavLink } from "react-router-dom";

function NavBar() {

    const { setUser } = useOutletContext();
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
          <NavLink
          to="/"
          className="nav-link"
          >
            Home
          </NavLink>
          <NavLink
          to="/courses"
          className="nav-link"
          >
            Courses
          </NavLink>
          <NavLink
          to="/scorecards"
          className="nav-link"
          >
            Scorecards
          </NavLink>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </nav>
    )
}

export default NavBar;