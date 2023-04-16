import * as React from 'react';

function Result(props) {
  
  const [pokemons,setPokemons]= React.useState([])
  // const selectedPokemon = JSON.parse(localStorage.getItem('selectedPokemon') || '[]');

  // const removePokemon = (id) => {
  //   // id.preventDefault();
  //   const updatedPokemon = selectedPokemon.filter((pokemon) => pokemon.id !== id);
  //   localStorage.setItem('selectedPokemon', JSON.stringify(updatedPokemon));
  //   window.location.reload()};
  React.useEffect(()=>{
    getPokemonsByUserId()
  },[])
  async function getPokemonsByUserId (){
    const response= await fetch("/getPokemonsByUserId",{
      method:"post",
      headers:{"content-type":"application/json"},
      body:JSON.stringify({userId:JSON.parse(localStorage.getItem('user')).id})
    })
    
    const pokemons=await response.json();
    console.log(pokemons)
    const pokemonArr=[]
    for(let pokemon of pokemons){
      console.log(pokemon.pokemonUrl)
      const test =await fetch(pokemon.pokemonUrl)
      console.log(test)
      const test2=await test.json()
      console.log(test2)
      const fullInfo={...pokemon,...test2}
      pokemonArr.push(fullInfo)
    
    }
    console.log(pokemonArr)
    setPokemons(pokemonArr)
  }
  async function deletePokemonById(id) {
    try {
      const response = await fetch("/removePokemonsByUserId", {
        method: 'DELETE',
      });
      if (response.ok) {
        const updatedPokemons = pokemons.filter((pokemon) => pokemon.id !== id);
        setPokemons(updatedPokemons);
      } else {
        console.error('Failed to delete Pokemon');
      }
    } catch (error) {
      console.error('Error deleting Pokemon', error);
    }
  }
  
  
  return (
    <div className="cards">
      { pokemons.length>0 && pokemons.map((pokemon) => (
       
       <div key={pokemon.id} className="card">
          <button className="remove-btn" onClick={() => deletePokemonById(pokemon.id)}>


            <span className="remove-icon">X</span>
          </button>
          <h3 className="title">{pokemon.name}</h3> 
          <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`} alt={pokemon.name} />
          <h5 className="type-name">{pokemon.types[0].type.name}</h5>
          <ul>
            <li className="ability">Abilities: {pokemon.abilities[0].ability.name}</li><br/>
            <li className="stats">{pokemon.stats[0].stat.name}: {pokemon.stats[0].base_stat}</li>
          </ul>
          <p className="id">#{pokemon.id}</p>
        </div>
      ))}
    </div>
  );
}

export default Result;
