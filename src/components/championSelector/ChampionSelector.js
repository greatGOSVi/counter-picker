import { useState, useEffect } from 'react';

import './ChampionSelector.css';
import ChampionSearch from '../championSearch/ChampionSearch.js';
import ChampionButton from './ChampionButton';

const ChampionSelector = ({ version }) => {
  const [champNames, setChampNames] = useState([]);
  const [filteredChampNames, setFilteredChampNames] = useState([]);

  useEffect(() => {
    const getChampsInfo = async () => {
      try {
        const champsInfoResponse = await fetch(
          `http://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`
        );
        const champsInfo = await champsInfoResponse.json();
        setChampNames(Object.keys(champsInfo.data));
        setFilteredChampNames(Object.keys(champsInfo.data));
      } catch (error) {
        console.log(error);
      }
    };

    getChampsInfo();
  }, [version]);

  return (
    <div>
      <div className='container'>
        <ChampionSearch
          champNames={champNames}
          setFilteredChampNames={setFilteredChampNames}
        />
        <div className='selectionBoxContainer'>
          <div className='selectionBox'>
            {filteredChampNames.map((champName) => {
              return (
                <ChampionButton
                  champName={champName}
                  key={champName}
                  version={version}
                />
              );
            })}
          </div>
        </div>
      </div>
      <br />
    </div>
  );
};

export default ChampionSelector;
