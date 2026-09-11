import assert from 'node:assert/strict';
import test from 'node:test';
import { getAuthDestination, getAuthState } from './authRedirect.js';

test('preserves internal destinations including query strings and fragments', () => {
  for (const path of ['/', '/dashboard', '/interviews', '/interviews/new',
    '/interviews/report/123?tab=plan#questions', '/resume/123']) {
    assert.equal(getAuthDestination(path), path);
  }
});

test('rejects external, malformed, normalized protocol-relative and auth-loop destinations', () => {
  for (const path of [undefined, null, {}, 42, '', 'https://example.org',
    '//example.org', '/\\example.org', ' /interviews', '/\t/example.org',
    '/a/..//example.org', '/a/../login', '/login', '/register?from=/interviews', '/LOGIN/']) {
    assert.equal(getAuthDestination(path), '/dashboard');
  }
});

test('retains intent when moving between login and registration', () => {
  const intent = getAuthState('/interviews/new?source=home#details');
  assert.deepEqual(getAuthState(intent.from), intent);
  assert.equal(getAuthDestination(intent.from), '/interviews/new?source=home#details');
});
