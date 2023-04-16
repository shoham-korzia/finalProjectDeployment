import { Route, Link, Routes } from "react-router-dom";
import Main from "./Main";
import Result from "./Result";
import Card from "./Card";
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './Home.css';
import { useState } from "react";



function Home() {
  const [username,setUsername]=useState()
  const [password,setPassword]=useState()
const [message,setMessage]=useState()
  const register = async(e)=>{
    e.preventDefault()
    const userInfo={username:username,password:password}
    const response = await fetch("/register", {
      method: "POST",
      headers: {"content-type": "application/json"},
      body: JSON.stringify(userInfo)
    })
console.log(response)
    const data = await response.json()
    if(response.status ===200){
      console.log(data)
      setMessage("Registered Successfully")
    }else{
      setMessage("Username Already in Use")
    }
    

  }

  const logUser=(e)=>{
    setUsername(e.target.value)
  }

  const logPassword=(e)=>{
    setPassword(e.target.value)
  }
  return (
    
    <div className="home-container">
  
      <h1 className="home-title">POKEDEX</h1>
      <div className="home-form">
        <form>
          <input onChange={logUser} className="home-input" type="text" placeholder="Username" />
          <input onChange={logPassword}className="home-input" type="password" placeholder="Password" />
          <br/><Link to="/Login">
            <button onClick={register} className="home-button">Register</button>
          </Link><br/>
          <Link to="/Login">
            <button className="home-button">Go to Login</button>
          </Link>
          
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default Home;