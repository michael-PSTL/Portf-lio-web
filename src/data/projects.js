import { safeUrl } from './api.js';

export const PROJECT_STATUSES = [
  { icon: 'site', label: 'Site no ar' },
  { icon: 'repo', label: 'Código no GitHub' },
  { icon: 'build', label: 'Em construção' },
];

export function getProjectDestination(project) {
  const href = safeUrl(project.url, false);
  if (!href) return { href, ...PROJECT_STATUSES[2] };
  const hostname = new URL(href).hostname.toLowerCase();
  const isRepository = ['github.com', 'www.github.com', 'gist.github.com'].includes(hostname);
  return { href, ...PROJECT_STATUSES[isRepository ? 1 : 0] };
}
