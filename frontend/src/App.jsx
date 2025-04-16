import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Dashboard from "./Components/Dashboard";
import JobApplicationPage from "./Components/Job";
import HomePage from "./Components/ResumeUpload";
import SoftSkillsForm from "./Components/SoftSkills";
import Login from "./Components/login";
import Location from "./Components/location";
import Landing from "./Components/Landing";
const AppContainer = styled.div`
  // display: flex;
  height: 100vh;
  width: 100vw;
  overflow-y: auto; /* Enable vertical scrolling */
  overflow-x: hidden; /* Disable horizontal scrolling */
  background-color: #ecf0f1;
`;


const App = () => {
  return (
    <Router>
      <AppContainer>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/job" element={<JobApplicationPage />} />
          <Route path="/resume" element={<HomePage />} />
          <Route path="/softskills" element={<SoftSkillsForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/location" element={<Location />} />
          <Route path="/" element={<Landing />} />
        </Routes>
      </AppContainer>
    </Router>
  );
};

export default App;