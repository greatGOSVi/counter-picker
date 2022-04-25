import { useState } from 'react';

const MatchList = async (props) => {
    const host = "http://localhost:3001";
    let matchInfo;

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
    }

    for (let i=0; i < props.count; i++) {
        try {
            const matchInfoResponse = await fetch(`${host}/match-info?region=${props.region}&matchId=${props.matchList[i]}`);
            matchInfo = await matchInfoResponse.json();
        } catch (error) {
            console.log(error);
        }

        createMatchDisplayRow(matchInfo);
    }
}

export default MatchList;