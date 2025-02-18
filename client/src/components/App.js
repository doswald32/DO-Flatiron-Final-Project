import "../App.css";
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useUser } from "./UserContext";

function App() {
  const { setUser } = useUser();

  useEffect(() => {
    fetch("/check_session", {
      method: "GET",
      credentials: "include",
    })
      .then((r) => {
        if (!r.ok) {
          throw new Error(`HTTP error! Status: ${reportError.status}`);
        }
        return r.json();
      })
      .then((data) => {
        setUser(data);
      })
      .catch((err) => {
        console.error("Error fetching session:", err);
      });
  }, [setUser]);

  return (
    <div className="App">
      <Outlet/>
    </div>
  );
}

export default App;
