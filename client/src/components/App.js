import "../App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import CreateAccount from "./CreateAccount";
import Home from "./Home"

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4000/check_session')
    .then((r) => r.json())
    .then((data) => setUser(data));
  }, []);

  // if (user) {
  //   return <h2>Welcome, {user.username}!</h2>
  // } else {
  //   return <Login onLogin={setUser}></Login>
  // }

  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login onLogin={user}/>} />
            <Route path="/createAccount" element={<CreateAccount/>} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
