const { getBookDetails } = require("./index");

test("A Zsoltárok könyve", async () => {
  const zsoltarokKonyve = await getBookDetails("Zsolt");

  expect(zsoltarokKonyve.name).toBe("A Zsoltárok könyve");
  expect(zsoltarokKonyve.chapters).toBe(150);
  expect(zsoltarokKonyve.abbreviationEng).toBe("PSA");
});
