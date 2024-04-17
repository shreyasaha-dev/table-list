import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DoctorList from "./Screens/DoctorList";
import CreateSchedule from "./Screens/CreateSchedule";
import EditSchedule from "./Screens/EditSchedule";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DoctorList />} />
        <Route path="/create" element={<CreateSchedule />} />
        <Route path="/edit/:id" element={<EditSchedule />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
