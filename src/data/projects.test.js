import test from 'node:test';
import assert from 'node:assert/strict';
import { getProjectDestination } from './projects.js';

test('distinguishes repositories from deployed sites, including GitHub Pages', () => {
  assert.equal(getProjectDestination({ url: 'https://github.com/owner/repo' }).icon, 'repo');
  assert.equal(getProjectDestination({ url: 'https://gist.github.com/owner/id' }).icon, 'repo');
  for (const url of ['https://owner.github.io/repo/', 'https://example.vercel.app', 'https://github.com.example.org']) {
    assert.equal(getProjectDestination({ url }).icon, 'site');
  }
});

test('projects without a usable URL stay under construction and have no link', () => {
  for (const url of [undefined, '', 'Em construção', 'javascript:alert(1)']) {
    assert.deepEqual(getProjectDestination({ url }), { href: '', icon: 'build', label: 'Em construção' });
  }
});
