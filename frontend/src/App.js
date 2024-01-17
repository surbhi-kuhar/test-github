import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";

const App = () => (
 
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/sign-up" element={<SignUp />}></Route>
      </Routes>
    </BrowserRouter>
  
);

export default App;
