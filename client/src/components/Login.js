import { Route, Link, Routes } from "react-router-dom";
import Main from "./Main";
import Result from "./Result";
import Card from "./Card";
import Home from "./Home";
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './Home.css';
import { useState } from "react";
import Button from "@mui/material/Button";
import axios from "axios";


function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const[message,setMessage]=useState()

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const userInfo={username:username,password:password}
      const response = await fetch("/login", { method: "POST",
      headers: {"content-type": "application/json"},
      body: JSON.stringify(userInfo) });
      console.log(response)
      if (response.status===200){
        const user= await response.json();
        console.log(user)
        localStorage.setItem("user", JSON.stringify(user));
        setMessage("Logging you in...")
        
        setTimeout(()=>{
          window.location.replace("/Main")
        },2000)

      }else{
        const errorResponse= await response.json();
        console.log(errorResponse)
        setMessage("Wrong Username Or Password")
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box className="box">
      <h1>POKEDEX</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          margin="normal"
        />
        <Button variant="contained" type="submit" >
          Login
        </Button>
      </form>
      {message && message }
    </Box>
  );
}

export default Login;

