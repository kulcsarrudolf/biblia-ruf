const { parsePassage } = require("./passageParser");

test("Passage with full chapter", async () => {
  const passage = "Zsolt 139";
  const parsedPassage = await parsePassage(passage);
  const expectedParsedPassage = [
    {
      book: "Zsolt",
      chapter: 139,
      startVerse: 1,
      endVerse: 24,
    },
  ];

  expect(parsedPassage).toEqual(expectedParsedPassage);
});

test("Passage with consecutive verses from a chapter", async () => {
  const passage = "Zsolt 139:23-24";
  const parsedPassage = await parsePassage(passage);
  const expectedParsedPassage = [
    {
      book: "Zsolt",
      chapter: 139,
      startVerse: 23,
      endVerse: 24,
    },
  ];

  expect(parsedPassage).toEqual(expectedParsedPassage);
});

test("Passage with specific verses from a chapter", async () => {
  const passage = "Zsolt 139:3,23-24";
  const parsedPassage = await parsePassage(passage);
  const expectedParsedPassage = [
    {
      book: "Zsolt",
      chapter: 139,
      startVerse: 3,
      endVerse: 3,
    },
    {
      book: "Zsolt",
      chapter: 139,
      startVerse: 23,
      endVerse: 24,
    },
  ];

  expect(parsedPassage).toEqual(expectedParsedPassage);
});

test("Multiple passages", async () => {
  const passage = "Zsolt 139:3,23-24; Zsolt 100:1-2; Zsolt 1;Péld 10";
  const parsedPassage = await parsePassage(passage);

  const expectedParsedPassage = [
    {
      book: "Zsolt",
      chapter: 139,
      startVerse: 3,
      endVerse: 3,
    },
    {
      book: "Zsolt",
      chapter: 139,
      startVerse: 23,
      endVerse: 24,
    },
    {
      book: "Zsolt",
      chapter: 100,
      startVerse: 1,
      endVerse: 2,
    },
    {
      book: "Zsolt",
      chapter: 1,
      startVerse: 1,
      endVerse: 6,
    },
    {
      book: "Péld",
      chapter: 10,
      startVerse: 1,
      endVerse: 32,
    },
  ];

  expect(parsedPassage).toEqual(expectedParsedPassage);
});

test("Passage with 2 verses", async () => {
  const passage = "Zsolt 139:3,23";
  const parsedPassage = await parsePassage(passage);
  const expectedParsedPassage = [
    {
      book: "Zsolt",
      chapter: 139,
      startVerse: 3,
      endVerse: 3,
    },
    {
      book: "Zsolt",
      chapter: 139,
      startVerse: 23,
      endVerse: 23,
    },
  ];

  expect(parsedPassage).toEqual(expectedParsedPassage);
});
