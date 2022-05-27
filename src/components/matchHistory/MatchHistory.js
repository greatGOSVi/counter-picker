import { useState, useEffect } from 'react';

import './MatchHistory.css';
import MatchList from './MatchList.js';

const MatchHistory = (props) => {
    const [matchType, setMatchType] = useState("");
    const [count, setCount] = useState(20);
    const [matchIdList, setMatchIdList] = useState([]);
    const [matchesInfo, setMatchesInfo] = useState([]);
    const [runesInfo, setRunesInfo] = useState({});
    const [summSpellsInfo, setSummSpellsInfo] = useState({});
    const host = "http://localhost:3001";
    console.log(props.summName, matchesInfo);
    console.log(summSpellsInfo);
    console.log(runesInfo);

    useEffect(() => {
        fetchRunesInfo();
        fetchSummSpellsInfo();
    }, []);
    useEffect(() => {
        if(props.summName) {
            fetchMatchIdList();
        }
    }, [props.summName]);
    useEffect(() => {
        if (matchIdList.length !== 0 && Object.keys(summSpellsInfo).length !== 0) {
            fetchMatchesInfo();
        }
    }, [matchIdList]);

    const fetchRunesInfo = async() => {
        try {
            const runesInfoResponse = await fetch(`https://ddragon.leagueoflegends.com/cdn/${props.version}/data/en_US/runesReforged.json`);
            setRunesInfo(await runesInfoResponse.json());
        } catch (error) {
            console.log(error);
        }
    }

    const fetchSummSpellsInfo = async() => {
        try {
            const summSpellsInfoResponse = await fetch(`http://ddragon.leagueoflegends.com/cdn/${props.version}/data/en_US/summoner.json`);
            setSummSpellsInfo(await summSpellsInfoResponse.json());
        } catch (error) {
            console.log(error); 
        }
    }

    const fetchMatchIdList = async() => {
        try {
            const matchIdListResponse = await fetch(
                `${host}/match-list?region=${props.region}&puuid=${props.puuid}&matchType=${matchType}&count=${count}`);
            setMatchIdList(await matchIdListResponse.json());
        } catch (error) {
            console.log(error);
        }
    }

    const fetchMatchesInfo = async() => {
        const promises = matchIdList.map(id => fetch(`${host}/match-info?region=${props.region}&matchId=${id}`));
        try {
            const responses = await Promise.all(promises);
            const matches = [];

            for (let i=0; i < responses.length; i++) {
                matches.push(await responses[i].json());
            }
            setMatchesInfo(matches);
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <div>
            <div className='bigContainer'>
                <div className='displayBoxContainer'>
                    <div className='matchDisplayBox'>
                        {matchesInfo.length !== 0 &&
                         <MatchList version={props.version} summName={props.summName} matchesInfo={matchesInfo} runesInfo={runesInfo} summSpellsInfo={summSpellsInfo}/>}
                    </div>
                </div>
            </div>
            <br/>
        </div>
    );
}

export default MatchHistory;