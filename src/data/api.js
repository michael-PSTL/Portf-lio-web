export function safeUrl(value, allowEmail = true) {
  if (typeof value !== 'string') return '';
  try {
    const url = new URL(value.trim());
    return ['https:', 'http:', ...(allowEmail ? ['mailto:'] : [])].includes(url.protocol)
      ? url.href : '';
  } catch {
    return '';
  }
}

const isRecord = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);
const isText = (value) => typeof value === 'string' && value.trim().length > 0;
const hasId = (value) => typeof value === 'number' || isText(value);

const validators = {
  projects: (item) => isRecord(item) && hasId(item.id) && isText(item.titleKey),
  translations: (item) => isRecord(item) && isText(item.contentKey) && isText(item.pt),
  competencies: (item) => isRecord(item) && isText(item.contentKey),
  technologies: (item) => isRecord(item) && hasId(item.id) && isText(item.name)
    && isText(item.icon) && typeof item.isActive === 'boolean',
  socialLinks: (item) => isRecord(item) && Boolean(safeUrl(item.url)),
};

export function validatePayload(key, payload) {
  if (key === 'heroStatus') {
    if (!isRecord(payload)) throw new Error('Formato de estatísticas inválido');
    const projects = Number.isFinite(payload.projects) && payload.projects >= 0 ? payload.projects : null;
    const experience = (isText(payload.experience) || (Number.isFinite(payload.experience) && payload.experience >= 0))
      ? payload.experience : null;
    if (projects === null && experience === null) throw new Error('Estatísticas inválidas');
    return { projects, experience };
  }
  const validator = validators[key];
  if (!validator || !Array.isArray(payload) || !payload.every(validator)) {
    throw new Error(`Formato de ${key} inválido`);
  }
  const unique = new Map();
  payload.forEach((item) => {
    const normalized = key === 'projects' ? { ...item, url: safeUrl(item.url, false) }
      : key === 'socialLinks' ? { ...item, url: safeUrl(item.url) } : item;
    unique.set(item.id ?? item.contentKey ?? normalized.url, normalized);
  });
  return [...unique.values()];
}

export async function fetchResource(baseUrl, path, key, signal, timeoutMs = 12000) {
  const controller = new AbortController();
  const abort = () => controller.abort();
  signal?.addEventListener('abort', abort, { once: true });
  if (signal?.aborted) controller.abort();
  const timeout = setTimeout(abort, timeoutMs);
  try {
    const response = await fetch(`${baseUrl.replace(/\/$/, '')}${path}`, { signal: controller.signal });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return validatePayload(key, await response.json());
  } finally {
    clearTimeout(timeout);
    signal?.removeEventListener('abort', abort);
  }
}
