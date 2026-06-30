import { searchBible } from '../src/search';

test('Search finds results for a common word', () => {
  const results = searchBible('szeretet', { limit: 10 });
  expect(results.length).toBeGreaterThan(0);
  results.forEach((r) => {
    expect(r.text.toLowerCase()).toContain('szeretet');
  });
});

test('Search returns empty for nonexistent text', () => {
  const results = searchBible('xyznonexistent12345');
  expect(results).toHaveLength(0);
});

test('Search respects limit option', () => {
  const results = searchBible('az', { limit: 5 });
  expect(results.length).toBeLessThanOrEqual(5);
});

test('Search filters by testament', () => {
  const otResults = searchBible('Isten', {
    testament: 'old',
    limit: 5,
  });
  const ntResults = searchBible('Isten', {
    testament: 'new',
    limit: 5,
  });

  expect(otResults.length).toBeGreaterThan(0);
  expect(ntResults.length).toBeGreaterThan(0);
});

test('Search filters by book', () => {
  const results = searchBible('szeretet', { book: 'Jn', limit: 10 });
  expect(results.length).toBeGreaterThan(0);
  results.forEach((r) => {
    expect(r.book).toBe('Jn');
  });
});

test('Search result has correct shape', () => {
  const results = searchBible('Isten', { limit: 1 });
  expect(results).toHaveLength(1);
  const r = results[0];
  expect(r).toHaveProperty('book');
  expect(r).toHaveProperty('bookName');
  expect(r).toHaveProperty('chapter');
  expect(r).toHaveProperty('verse');
  expect(r).toHaveProperty('text');
  expect(r).toHaveProperty('reference');
});

test('Case insensitive search by default', () => {
  const lower = searchBible('isten', { limit: 5 });
  const upper = searchBible('Isten', { limit: 5 });
  expect(lower.length).toBeGreaterThan(0);
  expect(upper.length).toBeGreaterThan(0);
});
