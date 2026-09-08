import test from 'node:test';
import assert from 'node:assert/strict';
import { mayMeasure, PRODUCTION_HOST } from '../lib/analytics-policy.mjs';

const allowed = {
  hostname: PRODUCTION_HOST,
  token: 'a'.repeat(32),
  preference: 'allowed',
  doNotTrack: null,
  globalPrivacyControl: false,
};
test('only explicit consent permits production measurement', () => {
  assert.equal(mayMeasure(allowed), true);
  for (const preference of [null, undefined, 'denied', 'true', 'unavailable'])
    assert.equal(mayMeasure({ ...allowed, preference }), false);
});
test('development, forks and similar hostnames are excluded', () => {
  for (const hostname of [
    'localhost',
    '127.0.0.1',
    'example.com',
    PRODUCTION_HOST + '.example.com',
    'preview.' + PRODUCTION_HOST,
  ])
    assert.equal(mayMeasure({ ...allowed, hostname }), false);
});
test('missing or malformed configuration cannot activate measurement', () => {
  for (const token of [
    '',
    null,
    undefined,
    'placeholder',
    '<script>',
    'a'.repeat(31),
  ])
    assert.equal(mayMeasure({ ...allowed, token }), false);
});
test('browser privacy signals override saved consent', () => {
  assert.equal(mayMeasure({ ...allowed, doNotTrack: '1' }), false);
  assert.equal(mayMeasure({ ...allowed, globalPrivacyControl: true }), false);
});
