import { useState } from 'react';
import '../App.css';
import provisional from '../assets/provisional.png';
import searchIcon from '../assets/searchIcon.png';

const provisionalPIcon = (min, max) => Math.ceil(Math.random() * (max - min)) + 1;
const host = "http://localhost:3001";

const SummonerInfo = (props) => {
    const [summRegion, setSummRegion] = useState("la1");
    const [summName, setSummName] = useState("Summoner");

    const [summLvl, setSummLvl] = useState("Lvl");
    const [summPIcon, setSummPIcon] = useState(provisionalPIcon(1, 28));

    const [summSoloIcon, setSummSoloIcon] = useState(provisional);
    const [summSoloTierRank, setSummSoloTierRank] = useState("Tier/Rank");
    const [summSoloLP, setSummSoloLP] = useState("LP");
    const [summFlexIcon, setSummFlexIcon] = useState(provisional);
    const [summFlexTierRank, setSummFlexTierRank] = useState("Tier/Rank");
    const [summFlexLP, setSummFlexLP] = useState("LP");

    const fetchSummInfo = async(sumName, region) => {
        const summInfoResponse = await fetch(`${host}/summoner-info?region=${region}&sumName=${sumName}`);
        const summInfo = await summInfoResponse.json();
        const summLeagueResponse = await fetch(`${host}/summoner-league?region=${region}&sumID=${summInfo?.id}`);
        const summLeague = await summLeagueResponse.json();

        if (summInfo.profileIconId) {
            setSummLvl(summInfo?.summonerLevel);
            setSummPIcon(summInfo?.profileIconId);
            setSummName(summInfo?.name);
        } else {
            setSummLvl("Lvl");
            setSummPIcon(provisionalPIcon(1, 28));
            setSummName("NOT-FOUND");
        }
        
        for (let i=0; i<2; i++) {
            if (summLeague[i]?.queueType === "RANKED_SOLO_5x5") {
                const leagueSoloImgResponse = await fetch(`${host}/league-img?tierRank=${(summLeague[i].tier).toLowerCase()}${(summLeague[i].rank).toLowerCase()}`);
                const leagueSoloImg = await leagueSoloImgResponse.json();
                console.log(leagueSoloImg);
                setSummSoloIcon(leagueSoloImg);
                switch (summLeague[i].tier) {
                    case "MASTER":
                    case "GRANDMASTER":
                    case "CHALLENGER":
                        setSummSoloTierRank(`${summLeague[i].tier}`);
                        break;
                    default:
                        setSummSoloTierRank(`${summLeague[i].tier} ${summLeague[i].rank}`);
                        break;
                }
                setSummSoloLP(summLeague[i].leaguePoints);
            } else if (summLeague[i]?.queueType === "RANKED_FLEX_SR") {
                const leagueFlexImgResponse = await fetch(`${host}/league-img?tierRank=${summLeague[i].tier}${summLeague[i].rank}`);
                const leagueFlexImg = await leagueFlexImgResponse.json();
                console.log(leagueFlexImg);
                setSummFlexIcon(leagueFlexImg);
                switch (summLeague[i].tier) {
                    case "MASTER":
                    case "GRANDMASTER":
                    case "CHALLENGER":
                        setSummFlexTierRank(`${summLeague[i].tier}`);
                        break;
                    default:
                        setSummFlexTierRank(`${summLeague[i].tier} ${summLeague[i].rank}`);
                        break;
                }
                setSummFlexLP(summLeague[i].leaguePoints);
            } else {
                if (summLeague[0]?.queueType === "RANKED_SOLO_5x5") {
                    setSummFlexIcon(provisional);
                    setSummFlexTierRank("UNRANKED");
                    setSummFlexLP("0 LP");
                } else if (summLeague[0]?.queueType === "RANKED_FLEX_SR") {
                    setSummSoloIcon(provisional);
                    setSummSoloTierRank("UNRANKED");
                    setSummSoloLP("0 LP");
                } else {
                    setSummFlexIcon(provisional);
                    setSummFlexTierRank("UNRANKED");
                    setSummFlexLP("---");
                    setSummSoloIcon(provisional);
                    setSummSoloTierRank("UNRANKED");
                    setSummSoloLP("---");
                }
            }
        }
    }

    const handleChangeRegion = (evnt) => {
        setSummRegion(evnt.target.value);
    }
    const handleKeyDownInput = (evnt) => {
        if (evnt.key === "Enter") {
            if (evnt.target.value.length > 2) {
                setSummName(evnt.target.value);
                fetchSummInfo(evnt.target.value, summRegion);
            }
        }
    }

    return (
        <div>
            <br/>
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
                    <img src={searchIcon} style={{maxWidth: "60%", maxHeight: "100%"}}></img>
                </button>
            </div><br/>

            <div className="summonerInfoContainer">
                <div className="infoContainers">
                    <div id="summLvl">{summLvl}</div>
                    <img className="summPIcon" src={`http://ddragon.leagueoflegends.com/cdn/${props.version}/img/profileicon/${summPIcon}.png`}></img><br/>
                    <div id="summName">{summName}</div>
                </div>

                <div className="infoContainers">
                    <div>Solo/Duo</div>
                    <img className="summLIcon" src={summSoloIcon}></img>
                    <div id="summSoloTierRank">{summSoloTierRank}</div>
                    <div id="summSoloLP">{summSoloLP}</div>
                </div>

                <div className="infoContainers">
                    <div>Flex</div>
                    <img className="summLIcon" src={summFlexIcon}></img>
                    <div id="summFlexTierRank">{summFlexTierRank}</div>
                    <div id="summFlexLP">{summFlexLP}</div>
                </div>
            </div>

        </div>
    );
}

export default SummonerInfo;