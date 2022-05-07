import { useState, useEffect } from 'react';

import './MatchHistory.css';
import MatchList from './MatchList.js';

const MatchHistory = (props) => {
    const [matchType, setMatchType] = useState("");
    const [count, setCount] = useState(20);
    const [matchIdList, setMatchIdList] = useState([]);
    const [matchesInfo, setMatchesInfo] = useState([]);
    const [summSpellsInfo, setSummSpellsInfo] = useState({});
    const host = "http://localhost:3001";
    console.log(props.summName, matchesInfo);

    useEffect(() => {
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

    const fetchSummSpellsInfo = async() => {
        try {
            const summSpellsInfoResponse = await fetch(`http://ddragon.leagueoflegends.com/cdn/${props.version}/data/en_US/summoner.json`);
            setSummSpellsInfo(await summSpellsInfoResponse.json());
            console.log(summSpellsInfo);
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
        const mInfo = [];
        for (let i=0; i < matchIdList.length; i++) {
            try {
                const matchInfoResponse = await fetch(`${host}/match-info?region=${props.region}&matchId=${matchIdList[i]}`);
                mInfo.push(await matchInfoResponse.json());
            } catch (error) {
                console.log(error);
            }
        }
        setMatchesInfo(mInfo);
    }

    return(
        <div>
            <br/>
            <div className='bigContainer'>
                <div className='displayBoxContainer'>
                    <div className='matchDisplayBox'>
                        {matchesInfo.length !== 0 &&
                         <MatchList version={props.version} summName={props.summName} matchesInfo={matchesInfo} summSpellsInfo={summSpellsInfo}/>}
                    </div>
                </div>
            </div>
            <br/>
        </div>
    );
}

export default MatchHistory;