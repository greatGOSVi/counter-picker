import { useState, useEffect } from 'react';
import './App.css';
import SummonerInfo from './components/SummonerInfo';

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
    </div>
  );
}

export default App;
