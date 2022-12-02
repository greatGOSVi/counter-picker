import ReactTooltip from 'react-tooltip';

const Item = ({ dataTip, itemId, itemName, version }) => {
  if (itemId === 0) {
    return <div className='noItem' />;
  } else {
    return (
      <img
        data-tip={dataTip}
        data-multiline={true}
        alt={itemName}
        className='matchItem'
        src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${itemId}.png`}
      />
    );
  }
};

export default Item;
