import React, { useEffect, useState } from 'react';
import './App.css';
import {
  Button,
  SessionTimer,
  Timer,
  WeatherApp,
  GlobalMouseTracker,
} from './components';
import { useFetch } from './hooks';

interface Post {
  id: number;
  title: string;
  body: string;
}

const url = 'https://jsonplaceholder.typicode.com/posts';

interface AnotherCounterProps {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}

function AnotherCounter({ count, setCount }: AnotherCounterProps) {
  return (
    <>
      <Button onClick={() => setCount((c) => c + 1)}>
        <Button.Text>Aumentar</Button.Text>
      </Button>
    </>
  );
}

function App() {
  const [count, setCount] = useState(0);

  const [note, setNote] = useState('');

  const { data, isLoading, hasError } = useFetch<Post[]>(url);

  const [showWidgets, setShowWidgets] = useState(true);

  // aquí no tiene sentido cancelar o abortar nada, no hay penalización por no hacerlo
  useEffect(() => {
    document.title = `Posts cargados: ${data?.length ?? 0} | Click: ${count}`;
  }, [data, count]);

  // también se podría usar useRef para controlar el estado inicial, aunque con !note ya sirve
  useEffect(() => {
    if (!note || note.trim() === '') return;
    const timeoutId = setTimeout(() => {
      console.log('Guardando nota:', note);
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
      <Button onClick={() => setShowWidgets(!showWidgets)}>
        <Button.Text>
          {showWidgets ? 'Ocultar widgets' : 'Mostrar widgets'}
        </Button.Text>
      </Button>
      <hr />

      {showWidgets && (
        <>
          <GlobalMouseTracker />
          <hr />
          <AnotherCounter count={count} setCount={setCount} />
          <hr />
          <Timer />
          <hr />
          <WeatherApp />
          <hr />
          <SessionTimer />
        </>
      )}
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
