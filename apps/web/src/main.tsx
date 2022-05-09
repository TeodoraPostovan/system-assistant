import { CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import App from './app/app';
import Account from './app/containers/Account';
import Chat from './app/containers/Chat';
import Coaches from './app/containers/Coaches';
import Dashboard from './app/containers/Dashboard';
import Diary from './app/containers/Diary';
import ExerciseSuggestions from './app/containers/Exercise-Suggestions';
import Layout from './app/containers/Layout';
import Login from './app/containers/Login';
import RecipeSuggestions from './app/containers/Recipe-Suggestions';
import Register from './app/containers/Register';
import Survey from './app/containers/Survey';
import { AppState } from './app/state/state';
import ProtectedRoute from './app/utils/ProtectedRoute';
import { theme } from './theme';

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppState>
        <BrowserRouter>
          <App>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route
                  path="dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="account"
                  element={
                    <ProtectedRoute>
                      <Account />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="coaches"
                  element={
                    <ProtectedRoute>
                      <Coaches />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="mydiary"
                  element={
                    <ProtectedRoute>
                      <Diary />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="chat"
                  element={
                    <ProtectedRoute>
                      <Chat />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="recipe-suggestions"
                  element={
                    <ProtectedRoute>
                      <RecipeSuggestions />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="exercise-suggestions"
                  element={
                    <ProtectedRoute>
                      <ExerciseSuggestions />
                    </ProtectedRoute>
                  }
                />
                <Route path="/" element={<Navigate to="/dashboard" />} />
              </Route>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/survey"
                element={
                  <ProtectedRoute>
                    <Survey />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </App>
        </BrowserRouter>
      </AppState>
    </ThemeProvider>
  </React.StrictMode>
);
