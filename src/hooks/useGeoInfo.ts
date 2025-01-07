'use client';

import { TLocation, TWeather } from '@/types';
import { useEffect, useState } from 'react';

const WEATHER_API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

export const useGeoInfo = () => {
  const [geoInfo, setGeoInfo] = useState<
    { weather: TWeather; location: TLocation } | undefined
  >(undefined);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    const fetchWeather = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=auto:ip`,
          { signal }
        );
        const data = await response.json();
        setGeoInfo({
          weather: {
            temperature: data.current.temp_c,
            condition: data.current.condition.text,
          },
          location: {
            country: data.location.country,
            localtime: data.location.localtime,
            name: data.location.name,
            region: data.location.region,
          },
        });
      } catch (_error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
    return () => {
      controller.abort();
    };
  }, []);

  return { geoInfo, error, loading };
};
