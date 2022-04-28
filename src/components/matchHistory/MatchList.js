import MatchRow from './MatchRow.js';
import './MatchHistory.css';

const MatchList = ({matchesInfo, summName, version, summSpellsInfo}) => {

    return (
        matchesInfo.map(matchInfo => {
            return(
                <MatchRow matchInfo={matchInfo} summName={summName} version={version} summSpellsInfo={summSpellsInfo} key={matchInfo.metadata.matchId}/>
            );
        })  
    );
}

export default MatchList;