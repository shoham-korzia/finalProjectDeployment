
// import React from "react"
// import { useEffect,useState } from "react"
// const Test = ()=>{
//     const [pokemon,setPokemon]=useState();
//     useEffect(()=>{
//         fetch("https://pokeapi.co/api/v2/pokemon?limit=300").then((res)=>{
//             return res.json()
//         }).then((res)=>{
//             const pokemonArr=[]
//             for (const player of players) {
//                 await givePrizeToPlayer(player);
//               }
//             res.results.forEach(async (res)=>{
//                 const test= await fetch(res.url)
//                 const test2=await test.json();
//                 const fullinfo={...res,...test2}
//                 pokemonArr.push(fullinfo)
//         }
//         )
//         })
// const data = await response.json();
// console.log(data)


// console.log(pokemonArr)
// // setPokemon(pokemonArr)
//     },[])
//     return(
//         <div>hi</div>
//     )
// }

// export default Test