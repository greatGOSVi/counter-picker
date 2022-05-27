import './ChampionSearch.css';

import searchIcon from '../../assets/searchIcon.png';

const ChampionSearch = (props) => {

    const handleKeyUpInput = () => {
        
    }

    return (
        <div className='championSearchContainer'>
            <input placeholder='Champion name' className='borderNone' onKeyUp={handleKeyUpInput}></input>

            <button className='searchButton borderNone'>
                <img src={searchIcon} alt='Search button' style={{maxWidth: '35%', maxHeight: '100%'}}></img>
            </button>
        </div>
    );

}

export default ChampionSearch;