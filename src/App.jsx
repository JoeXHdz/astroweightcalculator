import { useState, useEffect } from "react";
import "./index.css";

const planets = [
  ["Sun", 27.9],
  ["Mercury", 0.377],
  ["Venus", 0.9032],
  ["Earth", 1],
  ["Moon", 0.1655],
  ["Mars", 0.3895],
  ["Jupiter", 2.64],
  ["Saturn", 1.139],
  ["Uranus", 0.917],
  ["Neptune", 1.148],
  ["Pluto", 0.06],
];

function App() {
  const [userWeight, setUserWeight] = useState("");
  const [selectedPlanet, setSelectedPlanet] = useState("Earth");
  const [result, setResult] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      createStar();
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const createStar = () => {
    const star = document.createElement("div");
    star.className = "star";
    document.body.appendChild(star);
    star.style.left = Math.random() * window.innerWidth + "px";

    setTimeout(() => {
      document.body.removeChild(star);
    }, 5000);
  };

  const handleCalculate = () => {
    const weight = parseFloat(userWeight);
    if (isNaN(weight) || weight <= 0) {
      setResult("Please enter a valid weight.");
      return;
    }

    const gravityFactor = planets.find((planet) => planet[0] === selectedPlanet)[1];
    const calculatedWeight = (weight * gravityFactor).toFixed(2);
    setResult(`If you were on ${selectedPlanet}, you would weigh ${parseFloat(calculatedWeight)} lbs!`);
  };

  return (
    <main>
      <h1>Astro Calculator</h1>
      <div className="container">
        <input
          type="text"
          className="input-text"
          placeholder="Input Your Weight"
          value={userWeight}
          onChange={(e) => setUserWeight(e.target.value)}
        />
        <select className="dropdown" value={selectedPlanet} onChange={(e) => setSelectedPlanet(e.target.value)}>
          {planets.map(([name]) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
        <button className="btn" onClick={handleCalculate}>
          Calculate
        </button>
      </div>
      <div id="result">
        <p className="output">{result}</p>
      </div>
    </main>
  );
}

export default App;
