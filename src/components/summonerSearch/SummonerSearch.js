import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SummonerSearch.css';

import searchIcon from '../../assets/searchIcon.png';

const SummonerSearch = () => {
  const [summRegion, setSummRegion] = useState('la1');
  const [summName, setSummName] = useState('');
  const navigate = useNavigate();

  const handleChangeRegion = (evnt) => {
    setSummRegion(evnt.target.value);
  };
  const handleKeyDownInput = (evnt) => {
    if (evnt.key === 'Enter') {
      if (evnt.target.value.length > 2) {
        return navigate(
          `/summonerProfile?region=${summRegion}&summonerName=${summName}`
        );
      }
    }
  };
  const handleKeyUp = (evnt) => {
    setSummName(evnt.target.value);
  };

  return (
    <div className='summonerSearchContainer'>
      <select
        id='summRegion'
        className='borderNone'
        defaultValue='la1'
        onChange={handleChangeRegion}
      >
        <option value='na'>NA</option>
        <option value='la1'>LAN</option>
        <option value='la2'>LAS</option>|<option value='br1'>BRZ</option>
        <option value='euw1'>EUW</option>
        <option value='eun1'>EUN</option>
        <option value='ru'>RU</option>
        <option value='kr'>KR</option>
        <option value='jp1'>JP</option>
        <option value='tr1'>TR</option>
        <option value='oc1'>OC</option>
      </select>

      <input
        placeholder='Summoner name'
        className='borderNone'
        onKeyUp={handleKeyUp}
        onKeyDown={handleKeyDownInput}
      ></input>

      <Link
        to={`/summonerProfile?region=${summRegion}&summonerName=${summName}`}
      >
        <button className='searchButton borderNone'>
          <img
            src={searchIcon}
            alt='Search button'
            style={{ maxWidth: '35%', maxHeight: '100%' }}
          ></img>
        </button>
      </Link>
    </div>
  );
};

export default SummonerSearch;
