function BibleBook(abbreviation, name) {
  this.abbreviation = abbreviation;
  this.name = name;
}

const getBibleBooks = (testament) => {
  const bibleBooks = {
    old: [
      new BibleBook("1Móz", "Mózes első könyve"),
      new BibleBook("2Móz", "Mózes második könyve"),
      new BibleBook("3Móz", "Mózes harmadik könyve"),
      new BibleBook("4Móz", "Mózes negyedik könyve"),
      new BibleBook("5Móz", "Mózes ötödik könyve"),
      new BibleBook("Józs", "Józsué könyve"),
      new BibleBook("Bír", "A bírák könyve"),
      new BibleBook("Ruth", "Ruth könyve"),
      new BibleBook("1Sám", "Sámuel első könyve"),
      new BibleBook("2Sám", "Sámuel második könyve"),
      new BibleBook("1Kir", "A királyok első könyve"),
      new BibleBook("2Kir", "A királyok második könyve"),
      new BibleBook("1Krón", "A krónikák első könyve"),
      new BibleBook("2Krón", "A krónikák második könyve"),
      new BibleBook("Ezsd", "Ezsdrás könyve"),
      new BibleBook("Neh", "Nehémiás könyve"),
      new BibleBook("Eszt", "Eszter könyve"),
      new BibleBook("Jób", "Jób könyve"),
      new BibleBook("Zsolt", "A Zsoltárok könyve"),
      new BibleBook("Péld", "A példabeszédek könyve"),
      new BibleBook("Préd", "A prédikátor könyve"),
      new BibleBook("Énekek", "Énekek éneke"),
      new BibleBook("Ézs", "Ézsaiás próféta könyve"),
      new BibleBook("Jer", "Jeremiás próféta könyve"),
      new BibleBook("JSir", "Jeremiás siralmai"),
      new BibleBook("Ez", "Ezékiel próféta könyve"),
      new BibleBook("Dán", "Dániel próféta könyve"),
      new BibleBook("Hós", "Hóseás próféta könyve"),
      new BibleBook("Jóel", "Jóel próféta könyve"),
      new BibleBook("Ám", "Ámósz próféta könyve"),
      new BibleBook("Abd", "Abdiás próféta könyve"),
      new BibleBook("Jón", "Jónás próféta könyve"),
      new BibleBook("Mik", "Mikeás próféta könyve"),
      new BibleBook("Náh", "Náhum próféta könyve"),
      new BibleBook("Hab", "Habakuk próféta könyve"),
      new BibleBook("Zof", "Zofóniás próféta könyve"),
      new BibleBook("Hag", "Haggeus próféta könyve"),
      new BibleBook("Zak", "Zakariás próféta könyve"),
      new BibleBook("Mal", "Malakiás próféta könyve"),
    ],
    new: [
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
    ],
  };

  if (testament === "Old") {
    return [...bibleBooks.old];
  }

  if (testament === "New") {
    return [...bibleBooks.new];
  }

  return [...bibleBooks.old, ...bibleBooks.new];
};

module.exports = {
  getBibleBooks: getBibleBooks,
};
