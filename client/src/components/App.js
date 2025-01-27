import "../App.css";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/check_session", {
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
        setLoading(false); 
      })
      .catch((err) => {
        console.error("Error fetching session:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <Outlet context={{ user, setUser, loading }} />
    </div>
  );
}

export default App;
