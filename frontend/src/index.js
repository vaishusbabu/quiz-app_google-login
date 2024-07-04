import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GoogleOAuthProvider } from "@react-oauth/google"




ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId='1027325725164-1htvgdqebi4ocafpo8ae8d58qirri7lb.apps.googleusercontent.com'>
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  </GoogleOAuthProvider>
)
