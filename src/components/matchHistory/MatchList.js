import MatchRow from './MatchRow';

const MatchList = ({
  itemsInfo,
  matchesInfo,
  runesInfo,
  summName,
  summSpellsInfo,
  version,
}) => {
  return matchesInfo?.map((matchInfo) => {
    return (
      <MatchRow
        itemsInfo={itemsInfo}
        key={matchInfo?.metadata?.matchId}
        matchInfo={matchInfo}
        runesInfo={runesInfo}
        summName={summName}
        summSpellsInfo={summSpellsInfo}
        version={version}
      />
    );
  });
};

export default MatchList;
