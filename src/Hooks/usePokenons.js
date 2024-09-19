import { useEffect, useState } from "react";

const url_default = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0";
const url_endpoint ="https://pokeapi.co/api/v2/pokemon/";

function usePokemons() {
  const [pokemons, setPokemons] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const [verMas, setVerMas] = useState(true);


  const fetchPokemon = async (url) =>{
    const response = await fetch(url);
    const poke = await response.json();

    const abilities = poke.abilities.map((a) => a.ability.name);
    const stats = poke.stats.map((s) => {
      return { name: s.stat.name, base: s.base_stat }});
      const types = poke.types.map((t) => t.type.name);

      return {
        id: poke.id,
        name: poke.name,
        image:
          poke.sprites.other.dream_world.front_default ||
          poke.sprites.front_default,
        abilities,
        stats,
        types,
      };
  }

  const getPokemons = async (url = url_default) => {
    //Get the pokemons list
    const response = await fetch(url);
    const pokemonsList = await response.json();
    const { next, results } = pokemonsList;

    const newPokemons = await Promise.all(
      results.map((pokemon) => fetchPokemon(pokemon.url))
    );
    return { next, newPokemons };
  };

  const getNextPokemons = async () => {
    const { next, newPokemons } = await getPokemons();
    setPokemons(newPokemons);
    setNextUrl(next);
  };

  const morePokemons = async () => {
    const { next, newPokemons } = await getPokemons(nextUrl);
    setPokemons((prev) => [...prev, ...newPokemons]);
    next === null && setVerMas(false);
    setNextUrl(next);
  };

  const searchPokemon = async (search) =>{
    const url = `${url_endpoint}${search.toLocaleLowerCase()}`
    return await fetchPokemon(url);
  }

  useEffect(() => {
    getNextPokemons();
  }, []);

  return { pokemons, morePokemons, verMas, searchPokemon };
}

export default usePokemons;
