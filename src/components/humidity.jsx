export const Humidity = () => {
  return (
    <div className='col'>
      <div>
        <img src={'/assets/humidity.png'} alt='humidity icon' data-testid="current-humidity"/>
        <p>Humidity</p>
        <p>20%</p>
      </div>
    </div>
  );
}

export default Humidity;
