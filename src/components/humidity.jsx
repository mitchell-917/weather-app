export const Humidity = ({currentHumidity}) => {
  return (
    <div className='col'>
      <div>
        <img src={'/assets/humidity.png'} alt='humidity icon' data-testid="current-humidity"/>
        <p>Humidity</p>
        <p>{currentHumidity}%</p>
      </div>
    </div>
  );
}

export default Humidity;
