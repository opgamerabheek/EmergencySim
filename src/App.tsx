import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './components/landing/LandingPage';
import { ScenarioHub } from './components/hub/ScenarioHub';
import { SimulationView } from './components/simulation/SimulationView';
import { ResultsPage } from './components/results/ResultsPage';

export const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/scenarios" element={<ScenarioHub />} />
      <Route path="/simulation/fire" element={<SimulationView />} />
      <Route path="/results" element={<ResultsPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
