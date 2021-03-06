import { useState, useEffect } from "react";

import "./ChampionSelector.css";
import ChampionSearch from "../championSearch/ChampionSearch.js";

const ChampionSelector = (props) => {
  const [champNames, setChampNames] = useState([]);
  const [filteredChampNames, setFilteredChampNames] = useState([]);

  useEffect(() => {
    const getChampsInfo = async () => {
      try {
        const champsInfoResponse = await fetch(
          `http://ddragon.leagueoflegends.com/cdn/${props.version}/data/en_US/champion.json`
        );
        const champsInfo = await champsInfoResponse.json();
        setChampNames(Object.keys(champsInfo.data));
        setFilteredChampNames(Object.keys(champsInfo.data));
      } catch (error) {
        console.log(error);
      }
    };

    getChampsInfo();
  }, []);

  return (
    <div>
      <div className="container">
        <ChampionSearch
          champNames={champNames}
          setFilteredChampNames={setFilteredChampNames}
        />
        <div className="selectionBoxContainer">
          <div className="selectionBox">
            {filteredChampNames.map((champName) => (
              <button className="selectionChamp">
                <img
                  src={`http://ddragon.leagueoflegends.com/cdn/${props.version}/img/champion/${champName}.png`}
                  alt={`${champName}`}
                  className="champImg"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
      <br />
    </div>
  );
};

export default ChampionSelector;
