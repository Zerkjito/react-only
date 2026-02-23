import { useFetch } from '../../hooks';

type CurrentWeather = {
  temperature_2m: number;
  time: string;
};

type WeatherUnits = {
  temperature_2m: string;
};

type WeatherResponseAPI = {
  current_units: WeatherUnits;
  current: CurrentWeather;
};
const url =
  'https://api.open-meteo.com/v1/forecast?latitude=38.2499&longitude=-0.8097&current=temperature_2m&forecast_days=1';

export const WeatherApp = () => {
  const { data, isLoading, hasError } = useFetch<WeatherResponseAPI>(url);

  if (isLoading) return <p>Cargando clima...</p>;
  if (hasError) return <p>Error al obtener el clima</p>;

  return (
    <div>
      <h2>
        Temperatura actual en Crevillente: {data?.current.temperature_2m}
        {data?.current_units.temperature_2m}
      </h2>
    </div>
  );
};
