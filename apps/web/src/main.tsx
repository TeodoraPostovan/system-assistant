import { CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import App from './app/app';
import { theme } from './theme';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <App /> */}

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/app" element={<App />} />
        </Routes>
      </BrowserRouter>


    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
