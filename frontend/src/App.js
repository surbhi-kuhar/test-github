import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Home from './Pages/Home';
import ActivateAccount from "./Pages/ActivateAccount";

const App = () => (
 
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/sign-up" element={<SignUp />}></Route>
        <Route path="/activation/:activationToken" element={<ActivateAccount/>}></Route>
      </Routes>
    </BrowserRouter>
  
);

export default App;
