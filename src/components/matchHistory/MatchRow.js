import { useState } from 'react';

import './MatchHistory.css';
import csIcon from '../../assets/csIcon.png';

const MatchRow = ({matchInfo, summName, version, runesInfo, summSpellsInfo}) => {
    const summMatchInfo = matchInfo.info.participants.find(participant => participant.summonerName === summName);
    console.log(summMatchInfo);
    const matchWinLoseStyle = summMatchInfo.win ? 'matchRow' : 'matchRowLose';

    let gameMode = '';
    switch(matchInfo?.info.gameMode) {
        case "CLASSIC":
            switch(matchInfo?.info.queueId) {
                case 430:
                    gameMode = `BLINDPICK`;
                    break;
                case 400:
                    gameMode = `DRAFTPICK`;
                    break;
                case 420:
                    gameMode = `SOLOQ`;
                    break;
                case 440:
                    gameMode = `FLEX`;
                    break;
                case 700:
                    gameMode = `CLASH`;
                    break;
            }
            break;
        case "DOOMBOTSTEEMO":
        case "ONEFORALL":
        case "FIRSTBLOOD":
        case "KINGPORO":
        case "DARKSTAR":
        case "STARGUARDIAN":
        case "NEXUSBLITZ":
        default:
            switch(matchInfo?.info.queueId) {
                case 0:
                    gameMode = `CUSTOM`;
                    break;
                default:
                    gameMode = `${matchInfo?.info.gameMode}`;
                    break;
            }
            break;
    }

    const gameDuration = matchInfo.info.gameEndTimestamp - matchInfo.info.gameStartTimestamp-15;
    const gameDurationMins = Math.trunc((gameDuration)/60000);
    const gameDurationSegs = Math.trunc(
        (((gameDuration)/60000)-(Math.trunc((gameDuration)/60000)))*60);

    const champImgSrc = `http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${summMatchInfo.championName}.png`;

    let primaryRunesIcon = "";
    let secondaryRunesIcon = "";
    for (let i=0; i < runesInfo.length; i ++) {
        if (runesInfo[i].id === summMatchInfo.perks.styles[0].style) {
            for (let j=0; j < runesInfo[i].slots[0].runes.length; j++) {
                if (runesInfo[i].slots[0].runes[j].id === summMatchInfo.perks.styles[0].selections[0].perk) {
                    primaryRunesIcon = `https://ddragon.canisback.com/img/${runesInfo[i].slots[0].runes[j].icon}`;
                }
            }
        } else if (runesInfo[i].id === summMatchInfo.perks.styles[1].style) {
            secondaryRunesIcon = `https://ddragon.canisback.com/img/${runesInfo[i].icon}`;
        }
    }

    const summSpellsInfoKeys = Object.keys(summSpellsInfo.data);
    let summSpell1Src;
    let summSpell2Src;
    for (let i = 0; i < summSpellsInfoKeys.length; i++) {
        if (parseInt(summSpellsInfo.data[summSpellsInfoKeys[i]].key) === summMatchInfo.summoner1Id) {
            summSpell1Src = `https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${summSpellsInfoKeys[i]}.png`;
        } else if (parseInt(summSpellsInfo.data[summSpellsInfoKeys[i]].key) === summMatchInfo.summoner2Id) {
            summSpell2Src = `https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${summSpellsInfoKeys[i]}.png`;
        }
    }

    const itemsArr = ["item0", "item1", "item2", "item3", "item4", "item5", "item6"];

    const kda = `${summMatchInfo.kills}/${summMatchInfo.deaths}/${summMatchInfo.assists}`;
    const cs = `${summMatchInfo.totalMinionsKilled + summMatchInfo.neutralMinionsKilled}`;

    return(
        <div className={matchWinLoseStyle}>

            <div className='matchGameInfo'>
                <strong>{gameMode}</strong>
                <div>{gameDurationMins}m {gameDurationSegs}s</div>
            </div>

            <div className='matchChampInfo'>
                <div className='matchChampImgContainer'>
                    <img className='matchChampImg' src={champImgSrc}/>
                    <div className='matchChampLvl'>{summMatchInfo.champLevel}</div>
                </div>
                
                <strong>{summMatchInfo.championName}</strong>
            </div>

            <div className='runesInfo'>
                <img className='primaryRuneImg' src={primaryRunesIcon}/>
                <img className='secondaryRuneImg' src={secondaryRunesIcon}/>
            </div>

            <div className='matchSummSpellsInfo'>
                <img className='matchSummSpellsImg' src={summSpell1Src}/>
                <img className='matchSummSpellsImg' src={summSpell2Src}/>
            </div>

            <div className='matchItemsInfo'>
                {itemsArr.map(item => {
                    if (summMatchInfo[item] === 0) {
                        return(<div className='noItem'/>);
                    } else if (item === 'item6') {
                        return(<img className='matchItem' src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${summMatchInfo[item]}.png`}/>);
                    } else {
                        return(<img className='matchItem' src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${summMatchInfo[item]}.png`}/>);
                    }
                })}
            </div>

            <div className='matchScoreInfo'>
                <strong>{kda}</strong>
                <div className='csScore'>{cs} <img src={csIcon} className='csIcon'/></div>
            </div>

        </div>
    );
}

export default MatchRow;