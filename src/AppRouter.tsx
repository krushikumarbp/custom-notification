import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Notification from './pages/Notification';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/notification" element={<Notification />} />
    </Routes>
  );
};

export default AppRouter;
