import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.css';

import {MainPage, DisplayCampaigns } from './components';
import CampaignDetails from './components/CampaignDetails';
import ProjectForm from './components/ProjectForm';
import MyCampaigns from './components/MyCampaigns';


// Main App component
const App = () => {
  return (
    <div className="bg-dark">
      <BrowserRouter>
        <Routes>
           <Route path="/" element={<MainPage />} />
           <Route path="/display-campaigns" element={<DisplayCampaigns />} />
           <Route path="/create-campaign" element={<ProjectForm />} />
           <Route path="/my-campaigns" element={<MyCampaigns />} />
           <Route path="/campaign-details" element={<CampaignDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
