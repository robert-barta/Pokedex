import { useNavigate } from "react-router-dom";
import "../css/PokeCard.css";

export default function PokeCard(props) {
  const navigate = useNavigate();
  function openDetails() {
    navigate(`/Pokedex/pokemon/${props.pokemon.id}`);
  }
  return (
    <div className="card-flex-container">
      <div onClick={openDetails} className="card">
        <h4>
          #{props.pokemon.id} - {props.pokemon.name}{" "}
        </h4>

        <img alt="ok" src={props.pokemon.img} />
      </div>
    </div>
  );
}
