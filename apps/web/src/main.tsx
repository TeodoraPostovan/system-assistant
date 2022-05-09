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
import Layout from './app/containers/Layout';
import Login from './app/containers/Login';
import Register from './app/containers/Register';
import Suggestions from './app/containers/Suggestions';
import Survey from './app/containers/Survey';
import { AppState } from './app/state/state';
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
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="account" element={<Account />} />
                <Route path="coaches" element={<Coaches />} />
                <Route path="mydiary" element={<Diary />} />
                <Route path="chat" element={<Chat />} />
                <Route path="recipe-suggestions" element={<Suggestions />} />
                <Route path="/" element={<Navigate to="/dashboard" />} />
              </Route>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/survey" element={<Survey />} />
            </Routes>
          </App>
        </BrowserRouter>
      </AppState>
    </ThemeProvider>
  </React.StrictMode>
);
