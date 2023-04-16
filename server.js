const express = require("express");
const path = require("path");
const app = express();

const cors = require("cors");
require("dotenv").config();
const db = require("knex")({
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  },
});

app.use(cors());
app.use(express.json());

app.get('/users',async (req, res)=>{
  const users = await db("users").select()
  res.json(users)
})

app.post('/register', async(req, res)=>{
  try{
const newUser = await db('users').insert({
      username: req.body.username, password: req.body.password
    })
    res.json(newUser)
  } catch(e){
    res.status(409).json(e.detail)
  }
 
})


 app.post("/login",async(req,res)=>{
try{
  const info=await db("users").select().where({username:req.body.username,password:req.body.password});

  if (info.length>0){
    const localStorageData={id:info[0].id,username:info[0].username}
    res.json(localStorageData)
  }else{
  res.status(409).json("Wrong info")
  }
}catch(e){
  res.status(409).json(e)
}

 })

 app.post("/addPokemonsByUserId",async(req,res)=>{


  try{
    const addPokemon = await db('pokemon').insert({
          userid:req.body.userId,pokemon:req.body.pokemon,pokemonUrl:req.body.url
        })
        console.log(addPokemon)
        res.json(addPokemon)
      } catch(e){
        console.log(e)
        res.status(409).json(e.detail)
      }
 })

 app.post("/getPokemonsByUserId",async(req,res)=>{
  console.log(req.body)
  try{
    const pokemon=await db("pokemon").select().where({userid:req.body.userId});
  console.log(pokemon)
    if (pokemon.length>0){
      res.json(pokemon)
    }else{
    res.status(409).json("No Pokemons :(")
    }
  }catch(e){
    res.status(409).json(e)
  }
 })

 app.delete("/removePokemonsByUserId",async(req,res)=>{
  try{
    const pokemon=await db("pokemon").where({userId:req.body.userId,pokemon:req.body.pokemonName})
  
  }catch(e){
    res.status(409).json(e)
  }
 })
 

app.listen(process.env.PORT, ()=>console.log("listening"))

app.use(express.static(path.join(__dirname, "client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});