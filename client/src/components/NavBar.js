import { useOutletContext, useNavigate } from "react-router-dom";

function NavBar() {

    const { setUser, user } = useOutletContext();
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
            <button onClick={handleLogout}>Logout</button>
        </nav>
    )
}

export default NavBar;