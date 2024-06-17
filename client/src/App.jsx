import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
// import "file-upload-with-preview/dist/";
import Profile from "./Pages/Profile";
import Header from "./Components/Header";
import ProtectedRoute from "./Components/ProtectedRoute";
import About from "./Pages/About";
import CreateListing from "./Pages/CreateListing";
import Testing from "./Pages/Testing";

function App() {
   return (
      <BrowserRouter>
         <Header />
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/test" element={<Testing />} />
            <Route element={<ProtectedRoute />}>
               {/* <Route element=() */}
               <Route path="/profile" element={<Profile />} />
               <Route path="/createListing" element={<CreateListing />} />
            </Route>
         </Routes>
      </BrowserRouter>
   );
}

export default App;
