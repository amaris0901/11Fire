// src/router.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from '../Pages/LoginPage';
import FilesPage from '../Pages/FilesPage';
import SwarmOption from '../Pages/SwarmOption';
import UserOption from '../Pages/UserOption';
import JoinSwarm from '../Pages/JoinSwarm';
import CreateSwarm from '../Pages/CreateSwarm';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/swarm" element={<SwarmOption />} />
      <Route path="/user-option" element={<UserOption />} />
      <Route path="/join-swarm" element={<JoinSwarm />} />
      <Route path="/create-swarm" element={<CreateSwarm />} />
      <Route path="/files" element={<FilesPage />} />
    </Routes>
  );
};

export default AppRouter;
