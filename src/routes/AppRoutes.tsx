import React from 'react';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';

import Login from '../pages/Login';
import Register from '../pages/Register';
import ErrandHome from '../pages/ErrandHome';

const AppRoutes: React.FC = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/errandsHome" element={<ErrandHome />} />
          <Route path="*" element={<Navigate to={'/'} />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default AppRoutes;
