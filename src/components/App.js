import React, { useEffect, useState } from "react";
import SushiContainer from "./SushiContainer";
import Table from "./Table";

import Sushi from "./Sushi";

const API = "http://localhost:3001/sushis";

function App() {
  const [sushis, setSushis] = useState([]);
  const [fourSushis, setFourSushis] = useState([]);
  const [budget, setBudget] = useState(100);

  useEffect(() => {
    fetch(API)
      .then((r) => r.json())
      .then((data) => {
        const allSushi = data.map((s) => {
          return { ...s, eaten: false };
        });

        const four = allSushi.splice(0, 4);
        setSushis(allSushi);
        setFourSushis(four);
      });
  }, []);

  const getSushi = () => {
    const allSushis = sushis;
    const four = allSushis.splice(0, 4);
    setFourSushis(four);
    setSushis(allSushis);
  };

  const eatSushi = (e) => {
    const newSushis = fourSushis.map((s) =>
      s.id == e.target.id ? { ...s, eaten: true } : s
    );
    setFourSushis(newSushis);
  };

  return (
    <div className="app">
      <SushiContainer
        fourSushis={fourSushis}
        eatSushi={eatSushi}
        getSushi={getSushi}
      />
      <Table fourSushis={fourSushis} />
    </div>
  );
}

export default App;
