const { parsePassage } = require("./passageParser");

test("Passage with full chapter", async () => {
  const passage = "Zsolt 139";
  const parsedPassage = await parsePassage(passage);
  const expectedParsedPassage = [
    {
      book: "Zsolt",
      chapter: "139",
      startVerse: 1,
      endVerse: 24,
    },
  ];

  expect(parsedPassage).toEqual(expectedParsedPassage);
});

test("Passage with with consecutive verses from a chapter", async () => {
  const passage = "Zsolt 139:23-24";
  const parsedPassage = await parsePassage(passage);
  const expectedParsedPassage = [
    {
      book: "Zsolt",
      chapter: "139",
      startVerse: 23,
      endVerse: 24,
    },
  ];

  expect(parsedPassage).toEqual(expectedParsedPassage);
});

test("Passage with with specific verses from a chapter", async () => {
  const passage = "Zsolt 139:3,23-24";
  const parsedPassage = await parsePassage(passage);
  const expectedParsedPassage = [
    {
      book: "Zsolt",
      chapter: "139",
      startVerse: 3,
      endVerse: 3,
    },
    {
      book: "Zsolt",
      chapter: "139",
      startVerse: 23,
      endVerse: 24,
    },
  ];

  expect(parsedPassage).toEqual(expectedParsedPassage);
});

test.skip("Parser test 3", async () => {
  const passage = "Zsolt 139:3,23-24; Zsolt 100";
  const parsedPassage = await parsePassage(passage);
  const expectedParsedPassage = [
    {
      book: "Zsolt",
      chapter: "139",
      startVerse: "3",
      endVerse: "3",
    },
    {
      book: "Zsolt",
      chapter: "139",
      startVerse: "23",
      endVerse: "24",
    },
  ];

  expect(parsedPassage).toEqual(expectedParsedPassage);
});
