import { useState } from 'react'
import './App.css'
import React from "react";
import { BrowserRouter , Route, Routes, Link } from 'react-router-dom';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import Services from './components/pages/Services';
import Navbar from './components/Navbar'
 
 
function App() {
 
  return (
    <>
      <div>
        <Navbar/>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<Services />} />
          </Routes>
        </BrowserRouter>
       
 
      </div>
    </>
  )
}
 
export default App
 
 

