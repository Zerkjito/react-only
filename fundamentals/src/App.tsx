import React, { useEffect, useState } from 'react';
import './App.css';
import { Button, SessionTimer, Timer, WeatherApp } from './components';
import { useFetch } from './hooks';

interface Post {
  id: number;
  title: string;
  body: string;
}

const url = 'https://jsonplaceholder.typicode.com/posts';

function GlobalMouseTracker() {
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
}

interface AnotherCounterProps {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}

function AnotherCounter({ count, setCount }: AnotherCounterProps) {
  return (
    <>
      <Button
        label={`Count is ${count}`}
        onClick={() => setCount((c: number) => c + 1)}
      />
    </>
  );
}

function App() {
  const [count, setCount] = useState(0);

  const [note, setNote] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const { data, isLoading, hasError } = useFetch<Post[]>(url);

  // aquí es importante abortar una vez se desmonta el componente o si alguien fue a otra página para que no se acumulen
  // useEffect(() => {
  //   const controller = new AbortController();

  //   const fetchData = async () => {
  //     setIsLoading(true);
  //     setHasError('');
  //     try {
  //       const response = await fetch(
  //         'https://jsonplaceholder.typicode.com/posts',
  //         { signal: controller.signal },
  //       );
  //       if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

  //       const result = await response.json();
  //       setData(result);
  //     } catch (err) {
  //       if (err instanceof DOMException && err.name === 'AbortError') {
  //         return;
  //       }

  //       if (err instanceof Error) {
  //         setHasError(err.message);
  //       } else {
  //         setHasError('Unknown error');
  //       }
  //       console.error('Error loading data:', err);
  //     } finally {
  //       if (!controller.signal.aborted) {
  //         setIsLoading(false);
  //       }
  //     }
  //   };
  //   fetchData();
  //   return () => {
  //     controller.abort();
  //   };
  // }, []);

  // aquí no tiene sentido cancelar o abortar nada, no hay penalización por no hacerlo
  useEffect(() => {
    document.title = `Posts cargados: ${data?.length ?? 0} | Click: ${count}`;
  }, [data, count]);

  // también se podría usar useRef para controlar el estado inicial, aunque con !note ya sirve
  useEffect(() => {
    if (!note || note.trim() === '') return;

    setIsSaving(true);
    const timeoutId = setTimeout(() => {
      console.log('Guardando nota:', note);
      setIsSaving(false);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [note]);

  return (
    <div className="App">
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h1 style={{ color: 'red' }}>Ejemplo con debounce</h1>
        <input
          style={{ marginBlock: '1.5rem', padding: '0.8rem' }}
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Escribe algo..."
        />
        <p>{note}</p>
      </div>
      <hr />
      <GlobalMouseTracker />
      <hr />
      <AnotherCounter count={count} setCount={setCount} />
      <hr />
      <Timer />
      <hr />
      <WeatherApp />
      <hr />
      <SessionTimer />
      <h3
        style={{
          backgroundColor: 'blue',
          padding: '10px',
        }}
      >
        Fetched posts:
      </h3>

      {isLoading && <p>Loading data...</p>}
      {hasError && <p style={{ color: 'red' }}>Error: {hasError}</p>}

      {!isLoading && !hasError && data && (
        <ol>
          {data.map((item) => (
            <li key={item.id}>
              <strong>{item.title}</strong>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

export default App;
