import { useState, useEffect } from 'react';
import '../../components/championSelector/ChampionSelector.css';

const ChampionSelector = (props) => {
    const [champNames, setChampNames] = useState([]);
    const [filteredChampNames, setFilteredChampNames] = useState([]);

    useEffect (() => {
        const getChampsInfo = async () => {
            try {
                const champsInfoResponse = await fetch(`http://ddragon.leagueoflegends.com/cdn/${props.version}/data/en_US/champion.json`);
                const champsInfo = await champsInfoResponse.json();
                setChampNames(Object.keys(champsInfo.data));
            } catch (error) {
               console.log(error);
            }    
        };

        getChampsInfo();
    }, [])

    return(
        <div>
            <br/>
            <div className='bigContainer'>
                {champNames.map((name) =>
                    <button>
                        <img src={`http://ddragon.leagueoflegends.com/cdn/${props.version}/img/champion/${name}.png`} alt={`${name}`}/>
                    </button>
                )}
            </div>
        </div>
    );
}

export default ChampionSelector;