import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SwarmOption from '../Pages/SwarmOption';
import JoinSwarm from '../Pages/JoinSwarm';
import CreateSwarm from '../Pages/CreateSwarm';
import UserOption from '../Pages/UserOption';
import EmailLoginPage from '../Pages/EmailLoginPage';
import SignupPage from '../Pages/SignupPage';
import AppLayout from '../Layout/AppLayout'; // layout with sidebar

const Router = () => (
  <Routes>
    {/* Pages WITHOUT sidebar */}
    <Route path="/" element={<SignupPage />} />
    <Route path="/signup" element={<SignupPage />} />
    <Route path="/email-login" element={<EmailLoginPage />} />
    <Route path="/swarm" element={<SwarmOption />} />
    <Route path="/join-swarm" element={<JoinSwarm />} />
    <Route path="/create-swarm" element={<CreateSwarm />} />
    <Route path="/user-option" element={<UserOption />} />

    {/* Pages WITH sidebar via layout */}
    <Route path="/files" element={<AppLayout />} />
    {/* you can add more like: <Route path="/home" element={<AppLayout />} /> */}
  </Routes>
);

export default Router;
