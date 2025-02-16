import "../App.css";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState(null);

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
  }, []);

  return (
    <div className="App">
      <Outlet context={{ user, setUser, courses, setCourses }} />
    </div>
  );
}

export default App;
