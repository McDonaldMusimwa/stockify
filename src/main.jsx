import React from 'react';
import { createRoot } from 'react-dom/client'; // Updated import statement
import App from './App.jsx';
import './index.css';
//import { AuthProvider } from 'react-auth-kit'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>


    <App />


  </React.StrictMode>
);
