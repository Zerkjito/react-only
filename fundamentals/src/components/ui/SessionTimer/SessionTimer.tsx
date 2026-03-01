import { useEffect, useState } from 'react';

export const SessionTimer = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
      console.log('Timer destruido');
    };
  }, []);

  return (
    <>
      <h3 style={{ color: 'yellowgreen' }}>
        Tiempo activo en esta página: {seconds}s
      </h3>
    </>
  );
};
