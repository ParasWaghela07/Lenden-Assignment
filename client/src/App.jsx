import { useState } from 'react'
import {Routes, Route } from "react-router-dom";
import Login from './pages/login';
import Signup from './pages/signup';
import Profile from './pages/profile';
import './App.css'

function App() {

  return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/' element={<Profile/>} />
      </Routes>
  )
}

export default App
