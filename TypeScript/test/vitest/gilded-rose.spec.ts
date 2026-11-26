import { Item, GildedRose } from "@/gilded-rose";

const mixedItems = [
  new Item("Sulfuras", 5, 80),
  new Item("Backstage passes", 11, 0),
  new Item("Aged Brie", 10, 0),
  new Item("regular", 10, 10),
  new Item("Conjured", 10, 10),
];

describe("Gilded Rose", () => {
  it("preserves item name after an update", () => {
    const gildedRose = new GildedRose(mixedItems);
    const items = gildedRose.updateQuality();

    expect(items.map(({ name }) => ({ name }))).toEqual([
      { name: "Sulfuras" },
      { name: "Backstage passes" },
      { name: "Aged Brie" },
      { name: "regular" },
      { name: "Conjured" },
    ]);
  });

  it("returns the items when updateQuality is called", () => {
    const gildedRose = new GildedRose(mixedItems);
    const items = gildedRose.updateQuality();
    expect(items).toBe(mixedItems);
  });
});
