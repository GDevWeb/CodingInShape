import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/Navbar';
import Header from './components/Header/Header';
import Footer from './components/Footer';
import DashBoard from './pages/DashBoard';
import Exercises from './pages/Exercises';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import SignUp from './pages/SignUp';
import MyAccount from './pages/MyAccount';
import ForgottenPassWord from './pages/ForgottenPassWord';
import Contact from './pages/Contact';
import './App.scss'


function App() {

  return (
    <BrowserRouter>
        <div className="wrapper">

      <NavBar/>
      <Header/>
      <main>
      <Routes>


        <Route path="/" element={<Home/>} />
        <Route path="/dashboard" element={<DashBoard/>} />
        <Route path="/exercises" element={<Exercises/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/myaccount" element={<MyAccount/>} />
        <Route path="/forgotten" element={<ForgottenPassWord/>} />
        <Route path="/contact" element={<Contact/>} />

        {/* Routes imbriquées : */}
        {/* <Route path="/example" element={<Example/>}>
    <Route path="/analytics/example" element={<Example/>}/>
  </Route> */}



  <Route path="*" element={<NotFound/>} />
      </Routes>
  </main>
      <Footer/>
      
  </div>
      </BrowserRouter>
  )
}

export default App
