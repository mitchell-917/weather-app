export const Wind = ({ currentWindSpeed }) => {
  return (
    <div className='col'>
      <div>
        <img src={'/assets/wind.png'} alt='wind icon' data-testid="current-wind"/>
        <p>Wind</p>
        <p>{currentWindSpeed} km/h</p>
      </div>
    </div>
  );
};

export default Wind;
