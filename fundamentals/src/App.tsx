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

  return (
    <div className="App">
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
