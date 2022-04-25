import { useState } from 'react';

import './MatchHistory.css';
import MatchList from './MatchList.js';

const MatchHistory = (props) => {
    const [matchType, setMatchType] = useState("");
    const [count, setCount] = useState(20);
    let matchList;
    const host = "http://localhost:3001";

    const fetchMatchList = async() => {
        try {
            const matchListResponse = await fetch(
                `${host}/match-list?region=${props.region}&puuid=${props.puuid}&matchType=${matchType}&count=${count}`);
            matchList = await matchListResponse.json();
        } catch (error) {
            console.log(error);
        }
    }

    /*const createMatchList = async() => {
        let matchInfo;

        for (let i=0; i < count; i++) {
            try {
                const matchInfoResponse = await fetch(`${host}/match-info?region=${props.region}&matchId=${matchList[i]}`);
                matchInfo = await matchInfoResponse.json();
            } catch (error) {
                console.log(error);
            }

            createMatchDisplayRow(matchInfo);
        }
    }

    const createMatchDisplayRow = (matchInfo) => {
        for (let i=0; i < matchInfo?.info.participants.length; i++) {
            if (matchInfo?.info.participants[i].summonerName === props.summName) {
                console.log('si entro');
                return (
                    <div>
                        {i}, {matchInfo?.info.participants[i].summonerName}, {props.summName}
                    </div>
                );
            }
        }
    }*/

    return(
        <div>
            <br/>
            <div className='bigContainer'>
                <div className='matchDisplayBox'>
                    {<MatchList region={props.region} summName={props.summName} matchList={matchList} count={count}/>}
                </div>
            </div>
        </div>
    );
}

export default MatchHistory;