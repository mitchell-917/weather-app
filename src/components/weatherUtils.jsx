import React, { useState } from 'react';


export const DisplayTimeOfDay = (data) => {

const [backgroundColor, setBackgroundColor] = useState('#009ef3');

    const utcTime = data.dt;
    const timezoneOffset = data.timezone;
    const localTime = new Date((utcTime + timezoneOffset) * 1000);
    const hours = localTime.getHours();

    if (hours >= 6 && hours < 12) {
      setBackgroundColor('#FFD700');
    } else if (hours >= 12 && hours < 18) {
      setBackgroundColor('#009EF3');
    } else if (hours >= 18 && hours < 21) {
      setBackgroundColor('#FF8C00');
    } else {
      setBackgroundColor('#2C3E50');
    }
  };
