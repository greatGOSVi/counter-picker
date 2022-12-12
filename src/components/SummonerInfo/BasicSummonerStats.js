import midRoleIcon from '../../assets/midRoleIcon.png';

const BasicSummonerStats = () => {
  return (
    <div className='summonerStatsContainer'>
      <div className='info'>
        <strong>Win rate</strong>%
        <div className='winsLosesContainer'>
          <div>
            <div>Wins</div>
            <div>Loses</div>
          </div>

          <div>
            <div>0</div>
            <div>0</div>
          </div>
        </div>
      </div>

      <div>
        <div className='info'>
          <strong>Most played champion</strong>

          <img
            className='champIcon'
            src='http://ddragon.leagueoflegends.com/cdn/12.9.1/img/champion/Gangplank.png'
          />

          <div>Gangplank</div>
        </div>
        <br />
        <div className='info'>
          <strong>Most played role</strong>

          <img className='roleIcon' src={midRoleIcon} />

          <div>MID</div>
        </div>
      </div>
    </div>
  );
};

export default BasicSummonerStats;
