import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Dashboard from "./Components/Dashboard";
import JobApplicationPage from "./Components/Job";
import Hardskills from "./Components/Hardskills";
import Aisim from "./Components/Aisim";
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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/job" element={<JobApplicationPage />} />
          <Route path="/hardskills" element={<Hardskills />} />
          <Route path="/aisim" element={<Aisim />} />
        </Routes>
      </AppContainer>
    </Router>
  );
};

export default App;