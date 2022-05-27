import './HomeView.css';
import SummonerSearch from '../summonerSearch/SummonerSearch.js';

const HomeView = (props) => {

    return(
        <div className='home'>
            <SummonerSearch />
            <strong>CounterPicker!</strong>
        </div>
    );

}

export default HomeView;