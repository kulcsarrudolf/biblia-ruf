const { default: axios } = require("axios");

const fetchBibleBook = async (book) => {
  const encodedBook = encodeURI(book);
  const BOOK_URL = `https://raw.githubusercontent.com/kulcsarrudolf/biblia-ruf/main/json/${encodedBook}.json`;

  const response = await axios.get(BOOK_URL);

  return response.data;
};

function BibleBook(abbreviation, name) {
  this.abbreviation = abbreviation;
  this.name = name;
}

const showBibleBooks = () => {
  var bibleBooks = [
    new BibleBook("4Móz", "Mózes negyedik könyve"),
    new BibleBook("Zsolt", "A zsoltárok könyve"),
    new BibleBook("Mt", "Máté evangéliuma"),
    new BibleBook("Mk", "Márk evangéliuma"),
    new BibleBook("Lk", "Lukács evangéliuma"),
    new BibleBook("Jn", "János evangéliuma"),
    new BibleBook("ApCsel", "Az apostolok cselekedetei"),
    new BibleBook("Róm", "Pál levele a rómaiakhoz"),
    new BibleBook("1Kor", "Pál első levele a korinthusiakhoz"),
    new BibleBook("2Kor", "Pál második levele a korinthusiakhoz"),
    new BibleBook("Gal", "Pál levele a galatákhoz"),
    new BibleBook("Ef", "Pál levele az efezusiakkoz"),
    new BibleBook("Fil", "Pál levele a filippiekhez"),
    new BibleBook("Kol", "Pál levele a kolosséiakhoz"),
    new BibleBook("1Thessz", "Pál első levele a thesszalonikaiakhoz"),
    new BibleBook("2Thessz", "Pál második levele a thesszalonikaiakhoz"),
    new BibleBook("1Tim", "Pál első levele Timóteushoz"),
    new BibleBook("2Tim", "Pál második levele Timóteushoz"),
    new BibleBook("Tit", "Pál levele Tituszhoz"),
    new BibleBook("Filem", "Pál levele Filemonhoz"),
    new BibleBook("Zsid", "A zsidókhoz írt levél"),
    new BibleBook("Jak", "Jakab levele"),
    new BibleBook("1Pt", "Péter első levele"),
    new BibleBook("2Pt", "Péter második levele"),
    new BibleBook("1Jn", "János első levele"),
    new BibleBook("2Jn", "János második levele"),
    new BibleBook("3Jn", "János harmadik levele"),
    new BibleBook("Júd", "Júdás levele"),
    new BibleBook("Jel", "A jelenések könyve"),
  ];
  console.table(bibleBooks);
};

const fetchBible = async () => {
  const passage = process.argv
    .find((val) => val.includes("--passage") || val.includes("--p"))
    .split("=")[1];

  const book = passage.split(" ")[0];

  const chapter = passage.split(" ")[1].split(":")[0];
  const startVerse = passage.split(" ")[1].split(":")[1]?.split("-")[0];
  const endVerse = passage.split(" ")[1].split(":")[1]?.split("-")[1];

  console.log(passage + "\n");

  const currentBook = await fetchBibleBook(book);
  const currentChapter = currentBook.find((d) => d.chapter == chapter);

  currentChapter.verses.forEach((v) => {
    if (
      (!startVerse && !endVerse) ||
      (startVerse && !endVerse && v.verse == startVerse) ||
      (startVerse && endVerse && v.verse >= startVerse && v.verse <= endVerse)
    ) {
      console.log(`${v.verse}. ${v.text}`);
    }
  });
};

const main = () => {
  const command = process.argv.find(
    (val) => val.includes("--passage") || val.includes("--p")
  )
    ? "showBible"
    : "showBibleBooks";

  if (command === "showBible") {
    fetchBible();
  } else {
    showBibleBooks();
  }
};

main();
