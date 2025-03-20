import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Class from "./components/Class";
import ClassSchedule from "./components/ClassSchedule";
import Student from "./components/Student";
import StudentClass from "./components/StudentClass";
import Schedule from "./components/Schedule";
import Header from "./layout/Header/Header";
import Footer from "./layout/Footer/Footer";

import "./App.css"; // Ensure no duplicate imports

// Wrapper function to ensure AuthProvider and FavoritesProvider are available
function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route path="/" element={<Class />} />
          <Route path="/student" element={<Student />} />
          <Route path="/studentclass" element={<StudentClass />} />
          <Route path="/classschedule" element={<ClassSchedule />} />
          <Route path="/schedule" element={<Schedule />} />
          
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;