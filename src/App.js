import { useState, useEffect } from 'react';
import './App.css';
import SummonerInfo from './components/SummonerInfo.js';
import ChampionSelector from './components/championSelector/ChampionSelector.js';

function App() {
  const [gameVersion, setGameVersion] = useState(0);
  useEffect(() => {
    const fetchGameVersion = async() => {
      const versionsResponse = await fetch("https://ddragon.leagueoflegends.com/api/versions.json");
      const versions = await versionsResponse.json();
      setGameVersion(versions[0]);
    };

    fetchGameVersion();
  }, [])

  return (
    <div>
      {gameVersion !== 0 && <SummonerInfo version={gameVersion}/>}
      {gameVersion !== 0 && <ChampionSelector version={gameVersion}/>}
    </div>
  );
}

export default App;
