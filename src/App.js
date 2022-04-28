import { useState, useEffect } from 'react';
import './App.css';
import SummonerInfo from './components/SummonerInfo.js';
import ChampionSelector from './components/championSelector/ChampionSelector.js';
import MathcHistory from './components/matchHistory/MatchHistory.js';

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
  const [regionZone, setRegionZone] = useState("americas");
  const [puuid, setPuuid] = useState("");
  const [summName, setSummName] = useState("");

  return (
    <div>
      {gameVersion !== 0 && <SummonerInfo version={gameVersion} setRegionZone={setRegionZone} setPuuid={setPuuid} setSummName={setSummName}/>}
      {gameVersion !== 0 && <ChampionSelector version={gameVersion}/>}
      {puuid !== "" && <MathcHistory version={gameVersion} region={regionZone} puuid={puuid} summName={summName}/>}
    </div>
  );
}

export default App;
