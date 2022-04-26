import { useState, useEffect } from 'react';

import './MatchHistory.css';
import MatchList from './MatchList.js';

const MatchHistory = (props) => {
    const [matchType, setMatchType] = useState("");
    const [count, setCount] = useState(20);
    const [matchIdList, setMatchIdList] = useState([]);
    const [matchesInfo, setMatchesInfo] = useState([]);
    const host = "http://localhost:3001";
    console.log(matchesInfo);

    useEffect(() => {
        const getData = async () => {
            await fetchMatchIdList();
        }
        getData();

    }, [props.summName]);
    useEffect(() => {
        fetchMatchesInfo();
    }, [matchIdList])

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
        console.log(matchIdList.length);
        for (let i=0; i < matchIdList.lenght; i++) {
            try {
                const matchInfoResponse = await fetch(`${host}/match-info?region=${props.region}&matchId=${matchIdList[i]}`);
                const asd = await matchInfoResponse.json();
                mInfo.push(asd);

                console.log(asd);
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
                <div className='matchDisplayBox'>
                    <MatchList summName={props.summName} matchList={matchesInfo}/>
                </div>
            </div>
        </div>
    );
}

export default MatchHistory;