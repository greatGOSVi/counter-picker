import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './ProfilePage.css';
import Page from '../../components/Page';
import SummonerSearch from '../../components/summonerSearch/SummonerSearch';
import SummonerInfo from '../../components/SummonerInfo/SummonerInfo';
import ChampionSelector from '../../components/championSelector/ChampionSelector';
import MathcHistory from '../../components/matchHistory/MatchHistory';

/* // --- For development ---
  const host = 'http://localhost:3002/';
  const api = 'api/v1/';
  const NEED_FIX_urlSpliter = '/'; */
// --- For production ---
const host = 'https://counter-picker-backend.vercel.app/';
const api = '';
const NEED_FIX_urlSpliter = '-';
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const ProfilePage = () => {
  const [gameVersion, setGameVersion] = useState(0);
  const [regionZone, setRegionZone] = useState('americas');
  const [summInfo, setSummInfo] = useState({});
  const [summLeaguesInfo, setSummLeaguesInfo] = useState([]);
  const [puuid, setPuuid] = useState('');
  const [summName, setSummName] = useState('');
  const query = useQuery();

  useEffect(() => {
    const fetchGameVersion = async () => {
      const versionsResponse = await fetch(
        'https://ddragon.leagueoflegends.com/api/versions.json'
      );
      const versions = await versionsResponse.json();
      setGameVersion(versions[0]);
    };

    fetchGameVersion();
  }, []);

  const fetchSummInfo = async (sumName, region) => {
    const summInfoResponse = await fetch(
      `${host}${api}summoner${NEED_FIX_urlSpliter}info?region=${region}&sumName=${sumName}`
    );
    const summInfo = await summInfoResponse.json();
    const summLeaguesInfoResponse = await fetch(
      `${host}${api}summoner${NEED_FIX_urlSpliter}league?region=${region}&sumID=${summInfo?.id}`
    );
    setSummLeaguesInfo(await summLeaguesInfoResponse.json());
    setSummInfo(summInfo);
    setSummName(summInfo?.name);
    setPuuid(summInfo?.puuid);
    document.title = `${summInfo?.name} | CounterPicker!`;

    // -----------------------------------------------------------------------------

    if (summInfo?.name) {
      if (summInfo.name.length > 2) {
        try {
          const body = { summonerName: summInfo.name, region };
          const summDbInfoResponse = await fetch(`${host}${api}summoner/`, {
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
          });

          const summDbInfo = await summDbInfoResponse.json();
          console.log(summDbInfo);
        } catch (error) {
          console.error(error);
        }
      }
    }

    // -----------------------------------------------------------------------------

    switch (region) {
      case 'euw1':
      case 'eun1':
      case 'ru':
      case 'tr1':
        setRegionZone('europe');
        break;
      case 'kr':
      case 'jp1':
        setRegionZone('asia');
        break;
      case 'na':
      case 'la1':
      case 'la2':
      case 'br1':
      case 'oc1':
      default:
        setRegionZone('americas');
        break;
    }
  };

  useEffect(() => {
    let region = query.get('region');
    let summonerName = query.get('summonerName');
    fetchSummInfo(summonerName, region);
  }, [query.get('summonerName')]);

  return (
    <Page>
      <div>
        <br />
        <div className='summSearch'>
          <SummonerSearch />
        </div>
        <br />
        {gameVersion !== 0 && Object.keys(summInfo).length !== 0 && (
          <SummonerInfo
            version={gameVersion}
            summInfo={summInfo}
            summLeaguesInfo={summLeaguesInfo}
          />
        )}
        {puuid !== '' && (
          <MathcHistory
            version={gameVersion}
            region={regionZone}
            puuid={puuid}
            summName={summName}
          />
        )}
        {gameVersion !== 0 && <ChampionSelector version={gameVersion} />}
      </div>
    </Page>
  );
};

export default ProfilePage;
