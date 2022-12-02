import { useState, useEffect } from 'react';

import rankedProvisionalIcon from '../../assets/rankedEmblems/provisional.png';
import rankedIronIcon from '../../assets/rankedEmblems/iron.png';
import rankedBronzeIcon from '../../assets/rankedEmblems/bronze.png';
import rankedSilverIcon from '../../assets/rankedEmblems/silver.png';
import rankedGoldIcon from '../../assets/rankedEmblems/gold.png';
import rankedPlatinumIcon from '../../assets/rankedEmblems/platinum.png';
import rankedDiamondIcon from '../../assets/rankedEmblems/diamond.png';
import rankedMasterIcon from '../../assets/rankedEmblems/master.png';
import rankedGrandMasterIcon from '../../assets/rankedEmblems/grandMaster.png';
import rankedChallengerIcon from '../../assets/rankedEmblems/challenger.png';

const provisionalSummIcon = (min, max) =>
  Math.ceil(Math.random() * (max - min)) + 1;

const BasicSummonerInfo = ({ summInfo, summLeaguesInfo, version }) => {
  const [summName, setSummName] = useState('Summoner');
  const [summLvl, setSummLvl] = useState('Lvl');
  const [summPIcon, setSummPIcon] = useState(provisionalSummIcon(1, 28));

  const [summSoloIcon, setSummSoloIcon] = useState(rankedProvisionalIcon);
  const [summSoloTierRank, setSummSoloTierRank] = useState('Tier/Rank');
  const [summSoloLP, setSummSoloLP] = useState('LP');

  const [summFlexIcon, setSummFlexIcon] = useState(rankedProvisionalIcon);
  const [summFlexTierRank, setSummFlexTierRank] = useState('Tier/Rank');
  const [summFlexLP, setSummFlexLP] = useState('LP');

  useEffect(() => {
    if (summInfo) {
      setSummDisplayInfo();
    }
  }, [summInfo]);

  const setSummLeagueInfo = (queueIcon, queueTierRank, queueLP, leagueInfo) => {
    switch (leagueInfo.tier) {
      case 'IRON':
        queueIcon(rankedIronIcon);
        break;
      case 'BRONZE':
        queueIcon(rankedBronzeIcon);
        break;
      case 'SILVER':
        queueIcon(rankedSilverIcon);
        break;
      case 'GOLD':
        queueIcon(rankedGoldIcon);
        break;
      case 'PLATINUM':
        queueIcon(rankedPlatinumIcon);
        break;
      case 'DIAMOND':
        queueIcon(rankedDiamondIcon);
        break;
      case 'MASTER':
        queueIcon(rankedMasterIcon);
        break;
      case 'GRANDMASTER':
        queueIcon(rankedGrandMasterIcon);
        break;
      case 'CHALLENGER':
        queueIcon(rankedChallengerIcon);
        break;
      default:
        queueIcon(rankedProvisionalIcon);
        break;
    }

    if (
      leagueInfo.tier === 'MASTER' ||
      leagueInfo.tier === 'GRANDMASTER' ||
      leagueInfo.tier === 'CHALLENGER'
    ) {
      queueTierRank(`${leagueInfo.tier}`);
    } else {
      queueTierRank(`${leagueInfo.tier} ${leagueInfo.rank}`);
    }

    queueLP(leagueInfo.leaguePoints);
  };

  const setSummDisplayInfo = () => {
    if (summInfo.profileIconId) {
      setSummPIcon(summInfo.profileIconId);
      setSummName(summInfo.name);
      setSummLvl(summInfo.summonerLevel);
    } else {
      setSummPIcon(provisionalSummIcon(1, 28));
      setSummName('NOT-FOUND');
      setSummLvl('Lvl');
    }

    for (let i = 0; i < 2; i++) {
      if (summLeaguesInfo[i]?.queueType === 'RANKED_SOLO_5x5') {
        setSummLeagueInfo(
          setSummSoloIcon,
          setSummSoloTierRank,
          setSummSoloLP,
          summLeaguesInfo[i]
        );
      } else if (summLeaguesInfo[i]?.queueType === 'RANKED_FLEX_SR') {
        setSummLeagueInfo(
          setSummFlexIcon,
          setSummFlexTierRank,
          setSummFlexLP,
          summLeaguesInfo[i]
        );
      } else {
        if (summLeaguesInfo[0]?.queueType === 'RANKED_SOLO_5x5') {
          setSummFlexIcon(rankedProvisionalIcon);
          setSummFlexTierRank('UNRANKED');
          setSummFlexLP('---');
        } else if (summLeaguesInfo[0]?.queueType === 'RANKED_FLEX_SR') {
          setSummSoloIcon(rankedProvisionalIcon);
          setSummSoloTierRank('UNRANKED');
          setSummSoloLP('---');
        } else {
          setSummSoloIcon(rankedProvisionalIcon);
          setSummSoloTierRank('UNRANKED');
          setSummSoloLP('---');
          setSummFlexIcon(rankedProvisionalIcon);
          setSummFlexTierRank('UNRANKED');
          setSummFlexLP('---');
          break;
        }
      }
    }
  };

  return (
    <div className='summonerInfoContainer'>
      <div className='infoContainers'>
        <div id='summLvl'>{summLvl}</div>
        <img
          className='summPIcon'
          src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${summPIcon}.png`}
          alt='Summoner Icon'
        ></img>
        <br />
        <strong id='summName'>{summName}</strong>
      </div>

      <div className='infoContainers'>
        <div>Solo/Duo</div>
        <img
          className='summLIcon'
          src={summSoloIcon}
          alt='Summoner Solo-Ranked Icon'
        ></img>
        <div id='summSoloTierRank'>{summSoloTierRank}</div>
        <div id='summSoloLP'>{summSoloLP}</div>
      </div>

      <div className='infoContainers'>
        <div>Flex</div>
        <img
          className='summLIcon'
          src={summFlexIcon}
          alt='Summoner Flex-Ranked Icon'
        ></img>
        <div id='summFlexTierRank'>{summFlexTierRank}</div>
        <div id='summFlexLP'>{summFlexLP}</div>
      </div>
    </div>
  );
};

export default BasicSummonerInfo;
