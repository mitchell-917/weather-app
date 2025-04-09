
export const Temperature = ({temperature}) => {
  return (
    <div className='temperature'>
      <p>{temperature}°</p>
    </div>
  );
}

Temperature.defaultProps = {
  temperature: 20,
};

export default Temperature;
