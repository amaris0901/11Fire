import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from '../Pages/LoginPage';
import SwarmOption from '../Pages/SwarmOption';
import JoinSwarm from '../Pages/JoinSwarm';
import CreateSwarm from '../Pages/CreateSwarm';
import UserOption from '../Pages/UserOption';
import FilesPage from '../Pages/FilesPage';
import EmailLoginPage from '../Pages/EmailLoginPage';
import SignupPage from '../Pages/SignupPage';

const Router = () => (
  <Routes>
    <Route path="/" element={<SignupPage />} />
    <Route path="/swarm" element={<SwarmOption />} />
    <Route path="/join-swarm" element={<JoinSwarm />} />
    <Route path="/create-swarm" element={<CreateSwarm />} />
    <Route path="/user-option" element={<UserOption />} />
    <Route path="/files" element={<FilesPage />} />
    <Route path="/email-login" element={<EmailLoginPage />} />
    <Route path="/signup" element={<SignupPage />} />
  </Routes>
);
export default Router;