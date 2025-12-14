import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import Login from './pages/Login';
import Onboarding from './pages/Onboarding';
import Home from './pages/Home';
import Track from './pages/Track';
import Play from './pages/Play';
import Shop from './pages/Shop';
import Heroes from './pages/Heroes';
import Landing from './pages/Landing';
import Learn from './pages/Learn';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useApp();
  if (!isAuthenticated) {
    return <Navigate to="/welcome" replace />;
  }
  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/welcome" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/onboarding" element={
        <ProtectedRoute>
          <Onboarding />
        </ProtectedRoute>
      } />
      <Route path="/" element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      } />
      <Route path="/track" element={
        <ProtectedRoute>
          <Track />
        </ProtectedRoute>
      } />
      <Route path="/play" element={
        <ProtectedRoute>
          <Play />
        </ProtectedRoute>
      } />
      <Route path="/shop" element={
        <ProtectedRoute>
          <Shop />
        </ProtectedRoute>
      } />
      <Route path="/heroes" element={
        <ProtectedRoute>
          <Heroes />
        </ProtectedRoute>
      } />
      <Route path="/learn" element={
        <ProtectedRoute>
          <Learn />
        </ProtectedRoute>
      } />
      <Route path="*" element={<Navigate to="/welcome" />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AppProvider>
  );
};

export default App;