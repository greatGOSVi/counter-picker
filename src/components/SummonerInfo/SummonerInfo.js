import './SummonerInfo.css';
import BasicSummonerInfo from './BasicSummonerInfo';
import BasicSummonerStats from './BasicSummonerStats';

const SummonerInfo = ({ summInfo, summLeaguesInfo, version }) => {
  return (
    <div>
      <div className='infoStatsContainer'>
        <BasicSummonerInfo
          summInfo={summInfo}
          summLeaguesInfo={summLeaguesInfo}
          version={version}
        />

        <BasicSummonerStats />
      </div>
      <br />
    </div>
  );
};

export default SummonerInfo;
