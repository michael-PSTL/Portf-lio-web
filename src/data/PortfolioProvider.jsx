import { useCallback, useEffect, useState } from 'react';
import { PortfolioContext } from './PortfolioContext.js';
import { fallback } from './fallback.js';
import { fetchResource } from './api.js';

const baseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080/';
const resources = {
  projects: '/project',
  translations: '/translations',
  competencies: '/competency',
  technologies: '/technologies',
  socialLinks: '/sociallinks',
  heroStatus: '/api/hero/status',
};

export function PortfolioProvider({ children }) {
  const [state, setState] = useState({ ...fallback, loading: Boolean(baseUrl), error: false });
  const [attempt, setAttempt] = useState(0);
  const retry = useCallback(() => {
    if (!baseUrl) return;
    setState((previous) => ({ ...previous, loading: true }));
    setAttempt((previous) => previous + 1);
  }, []);

  useEffect(() => {
    if (!baseUrl) return;
    const controller = new AbortController();
    const entries = Object.entries(resources);
    Promise.allSettled(entries.map(([key, path]) =>
      fetchResource(baseUrl, path, key, controller.signal),
    )).then((results) => {
      if (controller.signal.aborted) return;
      setState((previous) => {
        const data = { ...previous, loading: false, error: false, failedResources: [] };
        results.forEach((result, index) => {
          const key = entries[index][0];
          if (result.status === 'fulfilled') data[key] = result.value;
          else {
            data.error = true;
            data.failedResources.push(key);
          }
        });
        return data;
      });
    });
    return () => controller.abort();
  }, [attempt]);

  return <PortfolioContext.Provider value={{ ...state, retry }}>{children}</PortfolioContext.Provider>;
}
