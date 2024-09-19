import "./Search.css";
import { Buscar } from "../icons/Icons";

function Search({search, setSearch, lookForPokemon}) {
  return (
    <>
      <h3 className="tittle">Más de 800 Pokémons, elige tu favorito</h3>
      <form className="search-container" onSubmit={lookForPokemon}>
        <input type="text" placeholder="Encuentra tu pokémon" className="search-input"
        value={search}
        onChange={(e)=> setSearch(e.target.value)}/>
        <button className="search-btn" type="submit">
          <Buscar />
          Buscar
        </button>
      </form>
    </>
  );
}

export default Search;
