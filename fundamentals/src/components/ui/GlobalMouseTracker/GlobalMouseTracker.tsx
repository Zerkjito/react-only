import { useEffect, useState } from 'react';

export const GlobalMouseTracker = () => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCoords({
        x: e.clientX,
        y: e.clientY,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      console.log('Limpieza: Evento eliminado');
    };
  }, []);

  return (
    <>
      <h1>Real time coordinates:</h1>
      <p>X-axis: {coords.x}</p>
      <p>Y-axis: {coords.y}</p>
    </>
  );
};
