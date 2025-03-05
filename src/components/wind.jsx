export const Wind = () => {
  return (
    <div className='col'>
      <div>
        <img src={'/assets/wind.png'} alt='wind icon' data-testid="current-wind"/>
        <p>Wind Speed</p>
        <p>10 km/h</p>
      </div>
    </div>
  );
}

export default Wind;
