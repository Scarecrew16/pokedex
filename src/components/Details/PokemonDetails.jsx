import "./PokemonDetails.css";
function PokemonDetails({ show, pokemon, close }) {
  return (
    <div className="modal-container" onClick={close} style={{ display: show ? "grid" : "none" }}>
      <section className="modal-body">
        <div className="imagen-container">
          <img src={pokemon.image} alt={pokemon.name} className="imagen-detalle"/>
          <section>
            {pokemon.types?.map(type=> <span className="tag">{type}</span>)}
          </section>
        </div>
        <div className="data">
            <h2 className="titulo">{pokemon.name} ({pokemon.id})</h2>
            <h3 className="titutlo-seccion">Abilities</h3>
            {pokemon.abilities?.map(ability => <span className="tag">{ability}</span>)}

            <h3 className="titutlo-seccion">Stats</h3>
            <div className="stats">
                {pokemon.stats?.map(stat=> 
                <section>
                    <span className="puntos">{stat.base}</span>
                    <span>{stat.name}</span>
                </section>)}
            </div>
        </div>
      </section>
    </div>
  );
}

export default PokemonDetails;
