import PokeDetails from "./components/PokeDetails";
import PokeTable from "./components/PokeTable";
import About from "./components/About";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/Pokedex" element={<PokeTable />} />
        <Route path="/Pokedex/pokemon/:pokeId" element={<PokeDetails />} />
        <Route path="/Pokedex/About" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
