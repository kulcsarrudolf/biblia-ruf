const { getBiblePassage } = require("./passage");

test("Get on verse from a chapter", async () => {
  const targetPassage = "Jn 3:16";
  const resultPassage = await getBiblePassage(targetPassage);

  const expectedPassage = [
    {
      verse: "16",
      text: "Mert úgy szerette Isten a világot, hogy egyszülött Fiát adta, hogy aki hisz őbenne, el ne vesszen, hanem örök élete legyen.",
    },
  ];

  expect(resultPassage).toEqual(expectedPassage);
});

test("Get specific verses from a chapter", async () => {
  const targetPassage = "Zsolt 139:23-24";
  const resultPassage = await getBiblePassage(targetPassage);

  const expectedPassage = [
    {
      verse: "23",
      text: "Vizsgálj meg, Istenem, ismerd meg szívemet! Próbálj meg, és ismerd meg gondolataimat! ",
    },
    {
      verse: "24",
      text: "Nézd meg, nem járok-e téves úton, és vezess az örökkévalóság útján!",
    },
  ];

  expect(resultPassage).toEqual(expectedPassage);
});

test("Get all verses from a chapter", async () => {
  const targetPassage = "Zsolt 100";
  const resultPassage = await getBiblePassage(targetPassage);

  const expectedPassage = [
    {
      verse: "1",
      text: "Hálaadó zsoltár. Ujjongjatok az  Úr előtt az egész földön! ",
    },
    {
      verse: "2",
      text: "Szolgáljatok az  Úrnak örömmel, vigadozva járuljatok színe elé! ",
    },
    {
      verse: "3",
      text: "Tudjátok meg, hogy az  Úr az Isten! Ő alkotott minket, az övéi vagyunk: az ő népe és legelőjének nyája. ",
    },
    {
      verse: "4",
      text: "Menjetek be kapuin hálaénekkel, udvaraiba dicsérettel! Adjatok hálát neki, áldjátok nevét! ",
    },
    {
      verse: "5",
      text: "Mert jó az  Úr, örökké tart szeretete, és hűsége nemzedékről nemzedékre.",
    },
  ];

  expect(resultPassage).toEqual(expectedPassage);
});
