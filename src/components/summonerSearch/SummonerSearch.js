import { useState } from 'react';
import './SummonerSearch.css';

import searchIcon from '../../assets/searchIcon.png';

const host = "http://localhost:3001";

const SummonerSearch = ({setRegionZone, setSummInfo, setSummLeaguesInfo}) => {
    const [summRegion, setSummRegion] = useState("la1");

    const fetchSummInfo = async(sumName, region) => {
        const summInfoResponse = await fetch(`${host}/summoner-info?region=${region}&sumName=${sumName}`);
        const summInfo = await summInfoResponse.json();
        const summLeaguesInfoResponse = await fetch(`${host}/summoner-league?region=${region}&sumID=${summInfo?.id}`);
        setSummLeaguesInfo(await summLeaguesInfoResponse.json());
        setSummInfo(summInfo);
    }

    const handleChangeRegion = (evnt) => {
        setSummRegion(evnt.target.value);
    }
    const handleKeyDownInput = (evnt) => {
        if (evnt.key === "Enter") {
            if (evnt.target.value.length > 2) {
                switch (summRegion) {
                    case "na":
                    case "la1":
                    case "la2":
                    case "br1":
                    case "oc1":
                        setRegionZone("americas");
                        break;
                    case "euw1":
                    case "eun1":
                    case "ru":
                    case "tr1":
                        setRegionZone("europe");
                        break;
                    case "kr":
                    case "jp1":
                        setRegionZone("asia");
                        break;
                };

                fetchSummInfo(evnt.target.value, summRegion);
            }
        }
    }

    return (
        <div>
            <div className='summonerSearchContainer'>
                <select id="summRegion" className="borderNone" defaultValue="la1" onChange={handleChangeRegion}>
                    <option value="na">NA</option>
                    <option value="la1">LAN</option>
                    <option value="la2">LAS</option>|
                    <option value="br1">BRZ</option>
                    <option value="euw1">EUW</option>
                    <option value="eun1">EUN</option>
                    <option value="ru">RU</option>
                    <option value="kr">KR</option>
                    <option value="jp1">JP</option>
                    <option value="tr1">TR</option>
                    <option value="oc1">OC</option>
                </select>

                <input placeholder="Summoner name" className='borderNone' onKeyDown={handleKeyDownInput}></input>

                <button className='searchButton borderNone'>
                    <img src={searchIcon} alt="Search button" style={{maxWidth: "35%", maxHeight: "100%"}}></img>
                </button>
            </div>
            <br/>
        </div>
    );

}

export default SummonerSearch;