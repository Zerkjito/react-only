import { useEffect, useState } from 'react';

export const Timer = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat('es', {
      hour12: false,
      timeStyle: 'short',
    });

    const intervalId = setInterval(() => {
      setTime(formatter.format(new Date()));
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      <h2 style={{ color: 'lightseagreen' }}>La hora actual es {time}</h2>
    </>
  );
};
