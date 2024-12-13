import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'react-bootstrap';
import App from './App.jsx'
// import dotenv from 'dotenv';

// dotenv.config();
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

