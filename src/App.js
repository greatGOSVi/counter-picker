import { useState, useEffect } from "react";
import "./App.css";
import Page from "./components/Page.js";
import SummonerSearch from "./components/summonerSearch/SummonerSearch.js";
import SummonerInfo from "./components/userInfo/SummonerInfo.js";
import ChampionSelector from "./components/championSelector/ChampionSelector.js";
import MathcHistory from "./components/matchHistory/MatchHistory.js";

function App() {
  const [gameVersion, setGameVersion] = useState(0);
  useEffect(() => {
    const fetchGameVersion = async () => {
      const versionsResponse = await fetch(
        "https://ddragon.leagueoflegends.com/api/versions.json"
      );
      const versions = await versionsResponse.json();
      setGameVersion(versions[0]);
    };

    fetchGameVersion();
  }, []);
  const [regionZone, setRegionZone] = useState("americas");
  const [summInfo, setSummInfo] = useState({});
  const [summLeaguesInfo, setSummLeaguesInfo] = useState([]);
  const [puuid, setPuuid] = useState("");
  const [summName, setSummName] = useState("");

  return (
    <Page>
      <div>
        <br />
        <SummonerSearch
          setRegionZone={setRegionZone}
          setSummInfo={setSummInfo}
          setSummLeaguesInfo={setSummLeaguesInfo}
        />
        {gameVersion !== 0 && Object.keys(summInfo).length !== 0 && (
          <SummonerInfo
            version={gameVersion}
            summInfo={summInfo}
            summLeaguesInfo={summLeaguesInfo}
            setPuuid={setPuuid}
            setSummName={setSummName}
          />
        )}
        {gameVersion !== 0 && <ChampionSelector version={gameVersion} />}
        {puuid !== "" && (
          <MathcHistory
            version={gameVersion}
            region={regionZone}
            puuid={puuid}
            summName={summName}
          />
        )}
      </div>
    </Page>
  );
}

export default App;
