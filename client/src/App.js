import logo from './logo.svg';
import './App.css';
import Main from "./components/Main";
import Result from "./components/Result";
import Card from "./components/Card";
import { AppBar } from '@mui/material';
import { Route, Link, Routes } from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import React from "react"
import ResponsiveAppBar from './components/ResponsiveAppBar';
import Test from './components/Test';
function App() {
  return (
    <div className="App">
      <ResponsiveAppBar/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/test' element={<Test />} />
        <Route path='/Main'element={<Main />} />
        <Route path='/Result'element={<Result />} />
        <Route path='/Login'element={<Login />} />
        <Route path='/Home' element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
