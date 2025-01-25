import "../App.css";
import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function App() {

  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/check_session")
      .then((r) => {
        if (r.ok) {
          r.json().then((data) => {
            setUser(data);
            navigate("/"); 
          });
        } else {
          navigate("/login"); 
        }
      })
      .catch((error) => console.error("Error checking session:", error))
  }, [navigate]);

  return (
    <>
      <div className="App">
        <Outlet context={{ user, setUser }}/>
      </div>
    </>
  );
}

export default App;
