import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../css/PokeDetails.css";
export default function PokeDetails() {
  const [pokemon, setPokemon] = useState([]);
  let { pokeId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getOnePokemon();
  }, []);

  function getOnePokemon() {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}`)
      .then((response) => response.json())
      .then((data) => {
        setPokemon({
          name: data.name,
          height: data.height,
          ability1: data.abilities[0].ability.name,
          ability2: data.abilities[1].ability.name,
          move: data.moves[0].move.name,
        });
      });
  }
  function back() {
    navigate(`/Pokedex`);
  }

  return (
    <div className="details-container">
      <h1> {pokemon.name}</h1>
      <p> Height: {pokemon.height}</p>
      <p> Move: {pokemon.move}</p>
      <p>
        {" "}
        Abilities: {pokemon.ability1}, {pokemon.ability2}{" "}
      </p>

      <button className="button-5" onClick={back}>
        Back
      </button>
    </div>
  );
}
