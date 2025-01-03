import "../App.css";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import CreateAccount from "./CreateAccount";
import Home from "./Home"

function App() {

  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/createAccount" element={<CreateAccount/>} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
