import { useState } from 'react'
import './App.css'
// import '../public/css/responsive.css';
import '../public/css/style.css';
import '../src/bundle.plugins.css';
import Navbar from '../src/Component/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './Component/Footer';
import WebRoutes from './WebRoutes';

function App() {

  return (
    <>
     <Router>
      <Navbar/>
        <WebRoutes/>
      <Footer/>
      </Router>
    </>
  )
}

export default App
