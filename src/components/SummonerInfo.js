import { useState } from 'react';
import '../App.css';

import searchIcon from '../assets/searchIcon.png';

import rankedProvisionalIcon from '../assets/rankedEmblems/provisional.png';
import rankedIronIcon from '../assets/rankedEmblems/iron.png';
import rankedBronzeIcon from '../assets/rankedEmblems/bronze.png';
import rankedSilverIcon from '../assets/rankedEmblems/silver.png';
import rankedGoldIcon from '../assets/rankedEmblems/gold.png';
import rankedPlatinumIcon from '../assets/rankedEmblems/platinum.png';
import rankedDiamondIcon from '../assets/rankedEmblems/diamond.png';
import rankedMasterIcon from '../assets/rankedEmblems/master.png';
import rankedGrandMasterIcon from '../assets/rankedEmblems/grandMaster.png';
import rankedChallengerIcon from '../assets/rankedEmblems/challenger.png';

const provisionalSummIcon = (min, max) => Math.ceil(Math.random() * (max - min)) + 1;
const host = "http://localhost:3001";

const SummonerInfo = (props) => {
    const [summRegion, setSummRegion] = useState("la1");
    const [summName, setSummName] = useState("Summoner");

    const [summLvl, setSummLvl] = useState("Lvl");
    const [summPIcon, setSummPIcon] = useState(provisionalSummIcon(1, 28));

    const [summSoloIcon, setSummSoloIcon] = useState(rankedProvisionalIcon);
    const [summSoloTierRank, setSummSoloTierRank] = useState("Tier/Rank");
    const [summSoloLP, setSummSoloLP] = useState("LP");
    const [summFlexIcon, setSummFlexIcon] = useState(rankedProvisionalIcon);
    const [summFlexTierRank, setSummFlexTierRank] = useState("Tier/Rank");
    const [summFlexLP, setSummFlexLP] = useState("LP");

    const fetchSummInfo = async(sumName, region) => {
        const summInfoResponse = await fetch(`${host}/summoner-info?region=${region}&sumName=${sumName}`);
        const summInfo = await summInfoResponse.json();
        const summLeagueResponse = await fetch(`${host}/summoner-league?region=${region}&sumID=${summInfo?.id}`);
        const summLeague = await summLeagueResponse.json();

        if (summInfo.profileIconId) {
            setSummPIcon(summInfo?.profileIconId);
            setSummName(summInfo?.name);
            setSummLvl(summInfo?.summonerLevel);
        } else {
            setSummPIcon(provisionalSummIcon(1, 28));
            setSummName("NOT-FOUND");
            setSummLvl("Lvl");
        }
        
        for (let i=0; i<2; i++) {
            if (summLeague[i]?.queueType === "RANKED_SOLO_5x5") {
                setSummLeagueInfo(setSummSoloIcon, setSummSoloTierRank, setSummSoloLP, summLeague[i]);
            } else if (summLeague[i]?.queueType === "RANKED_FLEX_SR") {
                setSummLeagueInfo(setSummFlexIcon, setSummFlexTierRank, setSummFlexLP, summLeague[i]);
            } else {
                if (summLeague[0]?.queueType === "RANKED_SOLO_5x5") {
                    setSummFlexIcon(rankedProvisionalIcon);
                    setSummFlexTierRank("UNRANKED");
                    setSummFlexLP("---");
                } else if (summLeague[0]?.queueType === "RANKED_FLEX_SR") {
                    setSummSoloIcon(rankedProvisionalIcon);
                    setSummSoloTierRank("UNRANKED");
                    setSummSoloLP("---");
                } else {
                    setSummSoloIcon(rankedProvisionalIcon);
                    setSummSoloTierRank("UNRANKED");
                    setSummSoloLP("---");
                    setSummFlexIcon(rankedProvisionalIcon);
                    setSummFlexTierRank("UNRANKED");
                    setSummFlexLP("---");
                    break;
                }
            }
        }
    }

    const setSummLeagueInfo = (queueIcon, queueTierRank, queueLP, leagueInfo) => {
        switch (leagueInfo.tier) {
            case "IRON":
                queueIcon(rankedIronIcon);
                break;
            case "BRONZE":
                queueIcon(rankedBronzeIcon);
                break;
            case "SILVER":
                queueIcon(rankedSilverIcon);
                break;
            case "GOLD":
                queueIcon(rankedGoldIcon);
                break;
            case "PLATINUM":
                queueIcon(rankedPlatinumIcon);
                break;
            case "DIAMOND":
                queueIcon(rankedDiamondIcon);
                break;
            case "MASTER":
                queueIcon(rankedMasterIcon);
                break;
            case "GRANDMASTER":
                queueIcon(rankedGrandMasterIcon);
                break;
            case "CHALLENGER":
                queueIcon(rankedChallengerIcon);
                break;
            default:
                queueIcon(rankedProvisionalIcon);
                break;
        }

        if (leagueInfo.tier === "MASTER" || leagueInfo.tier === "GRANDMASTER" || leagueInfo.tier === "CHALLENGER") {
            queueTierRank(`${leagueInfo.tier}`);
        } else {
            queueTierRank(`${leagueInfo.tier} ${leagueInfo.rank}`);
        }

        queueLP(leagueInfo.leaguePoints);
    }
    const handleChangeRegion = (evnt) => {
        setSummRegion(evnt.target.value);
    }
    const handleKeyDownInput = (evnt) => {
        if (evnt.key === "Enter") {
            if (evnt.target.value.length > 2) {
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
                    <img src={searchIcon} alt="Search button" style={{maxWidth: "35%", maxHeight: "100%"}}></img>
                </button>
            </div><br/>

            <div className="summonerInfoContainer">
                <div className="infoContainers">
                    <div id="summLvl">{summLvl}</div>
                    <img className="summPIcon" src={`http://ddragon.leagueoflegends.com/cdn/${props.version}/img/profileicon/${summPIcon}.png`} alt="Summoner Icon"></img><br/>
                    <div id="summName">{summName}</div>
                </div>

                <div className="infoContainers">
                    <div>Solo/Duo</div>
                    <img className="summLIcon" src={summSoloIcon} alt="Summoner Solo-Ranked Icon"></img>
                    <div id="summSoloTierRank">{summSoloTierRank}</div>
                    <div id="summSoloLP">{summSoloLP}</div>
                </div>

                <div className="infoContainers">
                    <div>Flex</div>
                    <img className="summLIcon" src={summFlexIcon} alt="Summoner Flex-Ranked Icon"></img>
                    <div id="summFlexTierRank">{summFlexTierRank}</div>
                    <div id="summFlexLP">{summFlexLP}</div>
                </div>
            </div>

        </div>
    );
}

export default SummonerInfo;