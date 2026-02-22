import { useEffect, useState } from 'react';
import './App.css';
import { Button } from './components';

interface Post {
  id: number;
  title: string;
  body: string;
}

function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState('');

  const [note, setNote] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const increment = () => setCount((c) => c + 1);

  // aquí es importante abortar una vez se desmonta el componente o si alguien fue a otra página para que no se acumulen
  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setIsLoading(true);
      setHasError('');
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/posts',
          { signal: controller.signal },
        );
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

        const result = await response.json();
        setData(result);
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          return;
        }

        if (err instanceof Error) {
          setHasError(err.message);
        } else {
          setHasError('Unknown error');
        }
        console.error('Error loading data:', err);
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };
    fetchData();
    return () => {
      controller.abort();
    };
  }, []);

  // aquí no tiene sentido cancelar o abortar nada, no hay penalización por no hacerlo
  useEffect(() => {
    document.title = `Posts cargados: ${data.length} | Click: ${count}`;
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
      <Button label={`Count is ${count}`} onClick={increment} />
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

      {!isLoading && !hasError && (
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
