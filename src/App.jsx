import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/Navbar";
import Header from "./components/Header/Header";
import Footer from "./components/Footer";
import DashBoard from "./pages/DashBoard";
import UserManagement from "./components/DashBoard/UserManagement";
import AddUser from "./components/DashBoard/AddUser";
import UpdateUser from "./components/DashBoard/UpdateUser";
import Exercise from "./pages/Exercise";
import Exercises from "./pages/Exercises";
import ExerciseManagement from "./components/DashBoard/ExerciseManagementPage";
import ExerciseList from "./components/Exercises/ExerciseList";
import ExerciseDetail from "./pages/Exercise";
import AddExercise from "./components/Exercises/AddExercise";
import UpdateExercise from "./components/Exercises/UpdateExercise";
import DeleteExercise from "./components/Exercises/DeleteExercise";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import SignUp from "./pages/SignUp";
import MyAccount from "./pages/MyAccount";
import ForgottenPassWord from "./pages/ForgottenPassWord";
import Contact from "./pages/Contact";
import "./App.scss";


function App() {
  return (
    <BrowserRouter>
      <div className="wrapper">
        <NavBar />
        {/* <Header /> */}
        
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<DashBoard />}/> 
            <Route path="/users-list" element={<UserManagement/>}/>
            <Route path="add-user" element={<AddUser />} />            
            <Route path="/update-user/:userId" element={<UpdateUser />} />
            <Route path="/exercise-management" element={<ExerciseManagement/>}/>
            <Route path="/exercise" element={<Exercise/>}/>
            <Route path="/exercises-list" element={<ExerciseList/>}/>
            <Route path="/exercise-detail/:id" element={<ExerciseDetail/>}/>
            <Route path="/add-exercise" element={<AddExercise/>}/>
            <Route path="/update-exercise/:id" element={<UpdateExercise/>}/>
            <Route path="/delete-exercise/:id" element={<DeleteExercise/>}/>
            <Route path="/exercises" element={<Exercises />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/myaccount" element={<MyAccount />} />
            <Route path="/forgotten" element={<ForgottenPassWord />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
          
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
