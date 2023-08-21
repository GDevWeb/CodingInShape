<<<<<<< HEAD
import React from 'react';
=======
import React from 'react'
>>>>>>> devGaëtan
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Header from './components/Header';
import Footer from './components/Footer';
import DashBoard from './pages/DashBoard';
import ExerciseDetail from './pages/ExerciseDetail';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Register from './pages/Register';

import './App.css'


function App() {

  return (
    <>
      <BrowserRouter>

      <NavBar />
      <Header/>
      <Routes>

        <Route path="/" element={<Home/>} />
        <Route path="/dashboard" element={<DashBoard/>} />
        <Route path="/exercice_detail" element={<ExerciseDetail/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />

        {/* Routes imbriquées : */}
        {/* <Route path="/example" element={<Example/>}>
    <Route path="/analytics/example" element={<UIUX/>}/>
  </Route> */}



  <Route path="*" element={<NotFound/>} />
      </Routes>
      <Footer/>
      
      </BrowserRouter>
    </>
  )
}

export default App
