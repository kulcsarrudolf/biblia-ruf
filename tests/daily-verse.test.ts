import { getDailyVerse } from "../src/daily-verse";

test("Returns a daily verse", () => {
  const result = getDailyVerse();
  expect(result).toHaveProperty("reference");
  expect(result).toHaveProperty("book");
  expect(result).toHaveProperty("chapter");
  expect(result).toHaveProperty("verse");
  expect(result).toHaveProperty("text");
  expect(result.text.length).toBeGreaterThan(0);
});

test("Same date returns same verse (deterministic)", () => {
  const date = new Date(2024, 0, 1);
  const result1 = getDailyVerse(date);
  const result2 = getDailyVerse(date);
  expect(result1).toEqual(result2);
});

test("Different dates can return different verses", () => {
  const results = new Set<string>();
  for (let i = 0; i < 30; i++) {
    const date = new Date(2024, 0, i + 1);
    const result = getDailyVerse(date);
    results.add(result.reference);
  }
  expect(results.size).toBeGreaterThan(1);
});

test("Verse text is not an error message", () => {
  const date = new Date(2024, 5, 15);
  const result = getDailyVerse(date);
  expect(result.text).not.toBe("Verse not found");
  expect(result.text).not.toBe("Could not load verse data");
});
