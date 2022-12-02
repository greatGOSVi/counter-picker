import ReactTooltip from 'react-tooltip';
import ReactDOMServer from 'react-dom/server';
import Item from './RowComponents/Item';
import csIcon from '../../assets/csIcon.svg';

const MatchRow = ({
  itemsInfo,
  matchInfo,
  runesInfo,
  summName,
  summSpellsInfo,
  version,
}) => {
  const summMatchInfo = matchInfo?.info?.participants.find(
    (participant) => participant.summonerName === summName
  );
  if (!summMatchInfo) return null;

  const matchWinLoseStyle = summMatchInfo?.win ? 'matchRow' : 'matchRowLose';
  const matchWinLoseText = summMatchInfo?.win ? 'VICTORY' : 'DEFEAT';
  const matchWinLoseTextStyle = summMatchInfo?.win ? 'winText' : 'loseText';

  let gameMode = '';
  switch (matchInfo?.info?.gameMode) {
    case 'CLASSIC':
      switch (matchInfo?.info?.queueId) {
        case 430:
          gameMode = 'Blindpick';
          break;
        case 400:
          gameMode = 'Draftpick';
          break;
        case 420:
          gameMode = 'SoloQ';
          break;
        case 440:
          gameMode = 'Flex';
          break;
        case 700:
          gameMode = 'Clash';
          break;
        default:
          gameMode = 'Classic';
          break;
      }
      break;
    case 'DOOMBOTSTEEMO':
      gameMode = 'DoomBots-Teemo';
      break;
    case 'ONEFORALL':
      gameMode = 'One for All';
      break;
    case 'FIRSTBLOOD':
      gameMode = 'Firstblood';
      break;
    case 'KINGPORO':
      gameMode = 'King Poro';
      break;
    case 'DARKSTAR':
      gameMode = 'Dark Star';
      break;
    case 'STARGUARDIAN':
      gameMode = 'Star Guardian';
      break;
    case 'NEXUSBLITZ':
      gameMode = 'Nexus Blitz';
      break;
    default:
      switch (matchInfo?.info?.queueId) {
        case 0:
          gameMode = `Custom`;
          break;
        default:
          gameMode = `${matchInfo?.info?.gameMode}`;
          break;
      }
      break;
  }

  const gameDuration =
    matchInfo?.info?.gameEndTimestamp -
    matchInfo?.info?.gameStartTimestamp -
    15;
  const gameDurationMins = Math.trunc(gameDuration / 60000);
  const gameDurationSegs = Math.trunc(
    (gameDuration / 60000 - Math.trunc(gameDuration / 60000)) * 60
  );

  const champImgSrc = `http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${summMatchInfo?.championName}.png`;

  let primaryRunesIcon = '';
  let primaryRunesIconAlt = '';
  let secondaryRunesIcon = '';
  let secondaryRunesIconAlt = '';
  for (let i = 0; i < runesInfo?.length; i++) {
    if (runesInfo[i]?.id === summMatchInfo?.perks?.styles[0].style) {
      for (let j = 0; j < runesInfo[i]?.slots[0]?.runes.length; j++) {
        if (
          runesInfo[i]?.slots[0].runes[j].id ===
          summMatchInfo?.perks.styles[0].selections[0].perk
        ) {
          primaryRunesIcon = `https://ddragon.canisback.com/img/${runesInfo[i]?.slots[0].runes[j].icon}`;
          primaryRunesIconAlt = `Primary Rune: ${runesInfo[i]?.slots[0].runes[j].name}`;
        }
      }
    } else if (runesInfo[i].id === summMatchInfo?.perks.styles[1].style) {
      secondaryRunesIcon = `https://ddragon.canisback.com/img/${runesInfo[i]?.icon}`;
      secondaryRunesIconAlt = `Secondary Rune: ${runesInfo[i]?.name}`;
    }
  }

  const summSpellsInfoKeys = Object.keys(summSpellsInfo.data);
  let summSpell1Src;
  let summSpell1Alt;
  let summSpell2Src;
  let summSpell2Alt;
  for (let i = 0; i < summSpellsInfoKeys?.length; i++) {
    if (
      parseInt(summSpellsInfo?.data[summSpellsInfoKeys[i]].key) ===
      summMatchInfo?.summoner1Id
    ) {
      summSpell1Src = `https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${summSpellsInfoKeys[i]}.png`;
      summSpell1Alt = `Spell: ${
        summSpellsInfo?.data[summSpellsInfoKeys[i]].name
      }`;
    } else if (
      parseInt(summSpellsInfo?.data[summSpellsInfoKeys[i]].key) ===
      summMatchInfo?.summoner2Id
    ) {
      summSpell2Src = `https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${summSpellsInfoKeys[i]}.png`;
      summSpell2Alt = `Spell: ${
        summSpellsInfo.data[summSpellsInfoKeys[i]].name
      }`;
    }
  }

  const itemsArr = [
    'item0',
    'item1',
    'item2',
    'item3',
    'item4',
    'item5',
    'item6',
  ];

  const kda = `${summMatchInfo?.kills}/${summMatchInfo?.deaths}/${summMatchInfo.assists}`;
  const cs = `${
    summMatchInfo.totalMinionsKilled + summMatchInfo.neutralMinionsKilled
  }`;

  return (
    <div className={matchWinLoseStyle}>
      <div className='matchGameInfo'>
        <strong className={matchWinLoseTextStyle}>{matchWinLoseText}</strong>
        <div>{gameMode}</div>
        <div>
          {gameDurationMins}m {gameDurationSegs}s
        </div>
      </div>

      <div className='matchChampInfo'>
        <div className='matchChampImgContainer'>
          <img
            alt={summMatchInfo.championName}
            className='matchChampImg'
            src={champImgSrc}
          />
          <div className='matchChampLvl'>{summMatchInfo.champLevel}</div>
        </div>

        <strong>{summMatchInfo.championName}</strong>
      </div>

      <div className='runesInfo'>
        <img
          alt={primaryRunesIconAlt}
          className='primaryRuneImg'
          src={primaryRunesIcon}
        />
        <img
          alt={secondaryRunesIconAlt}
          className='secondaryRuneImg'
          src={secondaryRunesIcon}
        />
      </div>

      <div className='matchSummSpellsInfo'>
        <img
          alt={summSpell1Alt}
          className='matchSummSpellsImg'
          src={summSpell1Src}
        />
        <img
          alt={summSpell2Alt}
          className='matchSummSpellsImg'
          src={summSpell2Src}
        />
      </div>

      <div className='matchItemsInfo'>
        {itemsArr.map((item) => {
          let itemName = 'None';
          let itemStats = '';
          let itemDesc = '';

          if (itemsInfo.data[summMatchInfo[item]]) {
            itemName = itemsInfo.data[summMatchInfo[item]].name;
            if (
              Object.keys(itemsInfo.data[summMatchInfo[item]].stats).length > 0
            ) {
              //console.log(itemsInfo.data);
              itemStats = JSON.stringify(
                { ...itemsInfo.data[summMatchInfo[item]].stats },
                null,
                2
              )
                .replace('FlatPhysicalDamageMod', 'Attack Damage')
                .replace('FlatCritChanceMod', 'Critical Strike Chance')
                .replace(/['"{}]+/g, '');
              console.log(itemStats);
            }
            itemDesc = itemsInfo.data[summMatchInfo[item]].plaintext;
            const itemDesc2 = itemsInfo.data[summMatchInfo[item]].description;
            console.log(itemDesc2);
          }

          return (
            <Item
              dataTip={ReactDOMServer.renderToString(
                <div>
                  <h3>{itemName}</h3>
                  {itemsInfo?.data[summMatchInfo[item]] &&
                    Object.keys(itemsInfo?.data[summMatchInfo[item]].stats)
                      .length !== 0 && (
                      <p>
                        <strong>Stats:</strong>
                        {itemStats}
                      </p>
                    )}

                  <p>{itemDesc}</p>
                </div>
              )}
              itemId={summMatchInfo[item]}
              itemName={itemName}
              key={item}
              version={version}
            />
          );
        })}
        <ReactTooltip className='tooltip' html={true} multiline={true} />
      </div>

      <div className='matchScoreInfo'>
        <strong>{kda}</strong>
        <div className='csScore'>
          {cs} <img alt='Creep Score' src={csIcon} className='csIcon' />
        </div>
      </div>
    </div>
  );
};

export default MatchRow;
