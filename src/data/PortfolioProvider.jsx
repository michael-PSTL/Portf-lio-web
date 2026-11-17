import { useEffect, useState } from 'react';
import { PortfolioContext } from './PortfolioContext.js';
import { fallback } from './fallback.js';
import { fetchResource } from './api.js';

const baseUrl = import.meta.env.VITE_API_BASE_URL ?? 'https://curriculo-api-qirm.onrender.com';
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

  useEffect(() => {
    if (!baseUrl) return;
    const controller = new AbortController();
    const entries = Object.entries(resources);
    Promise.allSettled(entries.map(([key, path]) =>
      fetchResource(baseUrl, path, key, controller.signal),
    )).then((results) => {
      if (controller.signal.aborted) return;
      const data = { ...fallback, loading: false, error: false };
      results.forEach((result, index) => {
        if (result.status === 'fulfilled') data[entries[index][0]] = result.value;
        else data.error = true;
      });
      setState(data);
    });
    return () => controller.abort();
  }, []);

  return <PortfolioContext.Provider value={state}>{children}</PortfolioContext.Provider>;
}
