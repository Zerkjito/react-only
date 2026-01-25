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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const increment = () => setCount((c) => c + 1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/posts',
        );
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

        const result = await response.json();
        setData(result);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Unknown error');
        }
        console.error('Error loading data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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

      {loading && <p>Loading data...</p>}
      {error && <p style={{ color: 'red' }}>Error: ${error}</p>}

      {!loading && !error && (
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
