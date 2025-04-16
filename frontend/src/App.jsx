import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Dashboard from "./Components/Dashboard";
import JobApplicationPage from "./Components/Job";
import HomePage from "./Components/ResumeUpload";
import SoftSkillsForm from "./Components/SoftSkills";
import Login from "./Components/login";
import Location from "./Components/location";
import Hardskills from "./Components/Hardskills";
import Aisim from "./Components/Aisim";
import Linkd from "./Components/Linkd";
import Tech from "./Components/Tech";
import Landing from "./Components/Landing";
const AppContainer = styled.div`
  // display: flex;
  height: 100vh;
  width: 100vw;
  overflow-y: auto; /* Enable vertical scrolling */
  overflow-x: hidden; /* Disable horizontal scrolling */
  background-color: #c5e8e0;
`;


const App = () => {
  return (
    <Router>
      <AppContainer>
        <Routes>
        <Route path="/" element={<Landing/>} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/job" element={<JobApplicationPage />} />
          <Route path="/resume" element={<HomePage />} />
          <Route path="/softskills" element={<SoftSkillsForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/location" element={<Location />} />
          <Route path="/hardskills" element={<Hardskills />} />
          <Route path="/aisim" element={<Aisim />} />
          <Route path="/linkd" element={<Linkd/>} />
          <Route path="/tech" element={<Tech/>} />
        </Routes>
      </AppContainer>
    </Router>
  );
};

export default App;