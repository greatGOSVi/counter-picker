import './ChampionSelector.css';

const ChampionButton = ({ champName, version }) => {
  return (
    <button className='selectionChamp'>
      <img
        alt={`${champName}`}
        className='champImg'
        src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champName}.png`}
      />
    </button>
  );
};

export default ChampionButton;
