import { getBookDetails } from "../src/book-details";

test("A Zsoltárok könyve", async () => {
  const zsoltarokKonyve = await getBookDetails("Zsolt");

  expect(zsoltarokKonyve.name).toBe("A Zsoltárok könyve");
  expect(zsoltarokKonyve.chapters).toBe(150);
  expect(zsoltarokKonyve.abbreviationEng).toBe("PSA");
});

test("Mózes első könyve", async () => {
  const genesis = await getBookDetails("1Móz");

  expect(genesis.name).toBe("Mózes első könyve");
  expect(genesis.chapters).toBe(50);
  expect(genesis.abbreviationEng).toBe("GEN");
});

test("Throws for invalid book", async () => {
  await expect(getBookDetails("InvalidBook")).rejects.toThrow();
});
