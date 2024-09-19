import { useState } from "react";
import usePokemons from "../../Hooks/usePokenons";
import PokemonDetails from "../Details/PokemonDetails";
import Loading from "../Loading/Loading";
import Search from "../Search/Search"
import "./Pokemons.css";
import InfiniteScroll from "react-infinite-scroll-component";


function Pokemon({ id, name, image, showPokemon }) {
  return (
    <div className="pokemon-card" onClick={showPokemon}>
      <img className="pokemon-img" src={image} alt={name} />
      <p className="pokemon-tittle">
        <span>#{id}</span>
        <span>{name}</span>
      </p>
    </div>
  );
}

function Pokemons() {
  const { pokemons, morePokemons, verMas, searchPokemon} = usePokemons();
  const [show, setShow] = useState({ show: false, pokemon: {} });
  const [search, setSearch] = useState('')

  const showPokemon = (pokemon) => setShow({ show: true, pokemon });
  const hidePokemon = () => {
    setShow({ show: false, pokemon: {} });
    setSearch('')
  }


  const lookForPokemon = async (e) =>{
    e.preventDefault();
    
    if(!search) return

    const pokemon = await searchPokemon(search);

    setShow({show: true, pokemon})
    
  }

  return (
    <>
      <PokemonDetails {...show} close={hidePokemon} />
      <Search search={search} setSearch={setSearch} lookForPokemon={lookForPokemon} />
      <InfiniteScroll
        dataLength={pokemons.length}
        next={morePokemons}
        hasMore={verMas}
        loader={<Loading />}
        endMessage={
          <h3 className="tittle" style={{ gridColumn: "1/6" }}>
            Lo siento, no hay más pokémons para mostrar
          </h3>
        }
        className="pokemon-container"
      >
        {pokemons.map((pokemon) => (
          <Pokemon
            {...pokemon}
            key={pokemon.id}
            showPokemon={() => showPokemon(pokemon)}
          />
        ))}
      </InfiniteScroll>
    </>
  );
}

export default Pokemons;
