import "../App.css";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState(null);

  useEffect(() => {
    fetch("/check_session", {
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
        setLoading(false); 
      })
      .catch((err) => {
        console.error("Error fetching session:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <Outlet context={{ user, setUser, loading, courses, setCourses }} />
    </div>
  );
}

export default App;
