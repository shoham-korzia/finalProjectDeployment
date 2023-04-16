import { Route, Link, Routes } from "react-router-dom";
import * as React from 'react';
import './Main.css';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';


function Main() {
  const [searchInput, setSearchInput] = React.useState("");
  const [pokemonData, setPokemonData] = React.useState([]);
  const [filteredData, setFilteredData] = React.useState([]);
  const [error, setError] = React.useState(null);
  // const [selectedPokemon, setSelectedPokemon] = React.useState(
  //   JSON.parse(localStorage.getItem('selectedPokemon') || '[]')
  // );
  
  // React.useEffect(() => {
  //   localStorage.setItem('selectedPokemon', JSON.stringify(selectedPokemon));
  // }, [selectedPokemon]);
  

  useEffect(() => {
   

    getAllPokemon();
    console.log(pokemonData)
  }, []);
  async function getAllPokemon() {
    try {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100");
      const data = await response.json();
console.log(data)
const pokemonArr=[]
for(let pokemon of data.results){
  const test =await fetch(pokemon.url)
  const test2=await test.json()
  const fullInfo={...pokemon,...test2}
  pokemonArr.push(fullInfo)

}
// data.results.forEach(async (res)=>{
// const test= await fetch(res.url)
// const test2=await test.json();
// const fullinfo={...res,...test2}
// pokemonArr.push(fullinfo)

// })

console.log(pokemonArr)
      if (!data) {
        return null;
      }

      // const pokemonData = data.results.map((pokemon) => ({
      //   name: pokemon.name,
      //   url: pokemon.url,
      //   type: pokemon.types,
      //   id: pokemon.url.split("/")[6],
      // }));

      setPokemonData(pokemonArr.sort((a,b)=>a.id-b.id));
      setFilteredData(pokemonArr.sort((a,b)=>a.id-b.id));
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async function handleSearch() {
    if (searchInput === "") {
      setFilteredData(pokemonData);
      return;
    }

    const filteredPokemon = pokemonData.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchInput.toLowerCase())
    );

    if (filteredPokemon.length > 0) {
      setFilteredData(filteredPokemon);
      setError(null);
    } else {
      setFilteredData([]);
      setError("Pokemon not found");
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSearchInput(event.target.value)
    handleSearch();
  }
  // function handleAddToIndex(pokemon) {
  //   // pokemon.preventDefault();
  //   if (selectedPokemon.length >= 7) {
      
  //     setError("You can only select up to 7 Pokémon");
  //     return;
  //   }
  
    
    // setSelectedPokemon((prevSelectedPokemon) => [
    //   ...prevSelectedPokemon,
    //   pokemon,
    // ]);
  async function addPokemon(userId,pokemon,pokemonUrl){
    const pokemonAndUser={userId:userId,pokemon:pokemon,url:pokemonUrl}
    const response= await fetch("/addPokemonsByUserId",{
      method:"post",
      headers:{"content-type":"application/json"},
      body: JSON.stringify(pokemonAndUser)
    })

    const res=await response.json()
    console.log(res)
  }
    
    // setFilteredData((prevFilteredData) =>
    //   prevFilteredData.filter((item) => item.id !== pokemon.id)
    // );
  
  
  

  return (
    <div>
      <h1>POKEDEX</h1>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField id="outlined-basic" label="Pokemon Name" variant="outlined" value={searchInput} onChange={(event) => setSearchInput(event.target.value)} />
        </Box>
        <Button variant="contained" type="submit">Search</Button>
      </form>
      <div className="cards" >
        {filteredData.length>0 ? filteredData.map((pokemon) => (
          <div key={pokemon.id} className="card">
            <h3 className="title">{pokemon.name}</h3> 
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`} alt={pokemon.name} />
            <h5 className="type-name">{pokemon.types[0].type.name}</h5>
            <ul>
            <li className="ability">Abilities: {pokemon.abilities[0].ability.name}</li><br/>
            <li className="stats">{pokemon.stats[0].stat.name}: {pokemon.stats[0].base_stat}</li>
            </ul>
            <button className="btn btn-primary" onClick={() => addPokemon(JSON.parse(localStorage.getItem('user')).id,pokemon.name,pokemon.url)}>add to my index</button>
            <p className="id">#{pokemon.id}</p>
          </div>
        )) : <CircularProgress />}
      </div>
      {error && <p>{error}</p>}
    </div>
  )}  
        

export default Main;

