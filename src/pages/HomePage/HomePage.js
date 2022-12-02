import './HomePage.css';
import Page from '../../components/Page.js';
import SummonerSearch from '../../components/summonerSearch/SummonerSearch.js';
import { useEffect } from 'react';

const HomePage = (props) => {
  useEffect(() => {
    document.title = 'Home | CounterPicker!';
  }, []);

  return (
    <Page>
      <div className='home'>
        <SummonerSearch />
        <br />
        <strong>CounterPicker!</strong>
      </div>
    </Page>
  );
};

export default HomePage;
