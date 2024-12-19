import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App';
import './styles/index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';


const root = ReactDOM.createRoot(document.getElementById('root'));
console.log("Client ID ---> ", process.env.REACT_APP_CLIENT_ID);

root.render(

  <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>

  <App />
  </GoogleOAuthProvider>

);
