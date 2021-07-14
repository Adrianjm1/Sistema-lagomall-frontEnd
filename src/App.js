import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import React from 'react';

// Routes
import Router from './routes';

// Components
import Footer from './components/Footer'

// Provider
import UserContext from './Hooks/UserContext';


function App() {
  return (
    <UserContext>
      <Router />
      <Footer />
    </UserContext>
  );
}

export default App;
