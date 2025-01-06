'use client';

import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { TWeather } from '@/types';
import { useEffect, FC } from 'react';

const WEATHER_API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

async function fetchWeather(): Promise<TWeather> {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=auto:ip`
    );
    const data = await response.json();
    return {
      temperature: data.current.temp_c,
      condition: data.current.condition.text,
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return {
      temperature: 0,
      condition: 'Unknown',
    };
  }
}

interface WeatherProps {
  weather?: TWeather;
  setWeather: (weather: TWeather) => void;
}
const Weather: FC<WeatherProps> = ({ setWeather, weather }) => {
  useEffect(() => {
    async function getWeather() {
      const weatherData = await fetchWeather();
      setWeather(weatherData);
    }
    getWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card className='p-4 bg-muted'>
      <p className='text-sm font-medium'>Current Weather</p>
      {weather ? (
        <p className='text-lg'>
          <>
            {weather.temperature}°C - {weather.condition}
          </>
        </p>
      ) : (
        <div className='flex gap-2 items-center'>
          <Skeleton className='h-6 w-1/4' /> <Skeleton className='h-4 w-1/3' />{' '}
        </div>
      )}
    </Card>
  );
};
export default Weather;
