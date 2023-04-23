import { useState, useEffect } from "react";
import PokeCard from "./PokeCard";
import "../css/PokeTable.css";
import { useParams, useNavigate } from "react-router-dom";

function PokeTable(props) {
  const [pokemons, setPokemons] = useState([]);
  const navigate = useNavigate();
  const [previousPage, setPreviousPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(
    `https://pokeapi.co/api/v2/pokemon/?limit=15&offset=0`
  );
  const [nextPage, setNextPage] = useState(null);

  useEffect(() => {
    fetchPoke();
  }, [currentPage]);

  async function fetchPoke() {
    const response = await fetch(currentPage);
    if (response.ok) {
      const pokemonJsonList = await response.json();
      let pokemonsPromises = [];
      pokemonJsonList.results.forEach((element) => {
        pokemonsPromises.push(getPokemon(element.url));
      });
      setPreviousPage(pokemonJsonList.previous);
      setNextPage(pokemonJsonList.next);
      const responses = await Promise.all(pokemonsPromises);
      const promises = responses.map((r) => r.json());
      const pokemonList = await Promise.all(promises);
      const pokemonsToBeSaved = [];
      pokemonList.forEach((pokemon) =>
        pokemonsToBeSaved.push(setValues(pokemon))
      );
      setPokemons(pokemonsToBeSaved);
    }
  }

  function getPokemon(url) {
    return fetch(`${url}`);
  }

  function handleNext() {
    setCurrentPage(nextPage);
  }
  function handlePrevious() {
    setCurrentPage(previousPage);
  }

  function about() {
    navigate(`/Pokedex/about`);
  }

  function setValues(pokemon) {
    return {
      name: pokemon.name,
      type: pokemon.types[0].type.name,
      img: pokemon.sprites.front_default,
      id: pokemon.id,
    };
  }
  return (
    <div>
      <h1>Welcome to Pokedex!</h1>
      <button className="button-5" onClick={about}>
        About
      </button>
      <div className="grid">
        <button className="button-5" onClick={handlePrevious}>
          Previous
        </button>

        <div className="flex-container">
          {pokemons.map((pokemon) => (
            <PokeCard pokemon={pokemon} />
          ))}
        </div>

        <button className="button-5" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
  //use map function to display an array of 12Pokemon objects,
}

export default PokeTable;
