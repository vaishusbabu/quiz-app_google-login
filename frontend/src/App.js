import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Quiz from './Quiz';
import Login from './Login';
import Register from './Register';
import HomePage from './HomePage';
import Dashboard from './Dashboard';
// import { GoogleLogin } from '@react-oauth/google';

function App() {
  // const responseMessage = (response) => {
  //   console.log(response);
  // };
  // const errorMessage = (error) => {
  //   console.log(error);
  // };
  return (
    <div>
      {/* <GoogleLogin onSuccess={responseMessage} onError={errorMessage} /> */}
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>


  );
}

export default App;

