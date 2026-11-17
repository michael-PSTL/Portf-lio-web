import test from 'node:test';
import assert from 'node:assert/strict';
import { safeUrl, validatePayload, fetchResource } from './api.js';

test('only accepts web links and optional email, rejecting executable and relative URLs', () => {
  assert.equal(safeUrl('javascript:alert(1)'), '');
  assert.equal(safeUrl('/broken'), '');
  assert.equal(safeUrl('https://github.com/michael-PSTL'), 'https://github.com/michael-PSTL');
  assert.equal(safeUrl('mailto:hello@example.com', false), '');
  assert.equal(safeUrl('mailto:hello@example.com'), 'mailto:hello@example.com');
});

test('rejects incompatible responses before React renders them', () => {
  assert.throws(() => validatePayload('projects', { error: 'offline' }));
  assert.throws(() => validatePayload('technologies', [{ id: 1, name: 'React', icon: 'React', isActive: 'false' }]));
  assert.throws(() => validatePayload('translations', [{ contentKey: 'key', pt: {} }]));
  assert.deepEqual(validatePayload('projects', [{ id: 1, titleKey: 'demo', url: 'javascript:bad()' }]),
    [{ id: 1, titleKey: 'demo', url: '' }]);
  assert.deepEqual(validatePayload('heroStatus', { projects: 0, experience: '1 ano' }),
    { projects: 0, experience: '1 ano' });
});

test('HTTP errors reject and timeouts abort pending requests', async (t) => {
  t.mock.method(globalThis, 'fetch', async () => ({ ok: false, status: 503 }));
  await assert.rejects(fetchResource('https://example.com/', '/project', 'projects'), /HTTP 503/);
  globalThis.fetch.mock.mockImplementation((_url, { signal }) => new Promise((_resolve, reject) => {
    signal.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')), { once: true });
  }));
  await assert.rejects(fetchResource('https://example.com', '/project', 'projects', undefined, 5), { name: 'AbortError' });
});

test('unmount cancellation is forwarded to the request', async (t) => {
  t.mock.method(globalThis, 'fetch', (_url, { signal }) => new Promise((_resolve, reject) => {
    signal.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')), { once: true });
  }));
  const controller = new AbortController();
  const pending = fetchResource('https://example.com', '/project', 'projects', controller.signal);
  controller.abort();
  await assert.rejects(pending, { name: 'AbortError' });
});
