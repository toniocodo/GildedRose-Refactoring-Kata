import { Item, GildedRose } from "@/gilded-rose";

const makeMixedItems = () => [
  new Item("Sulfuras", 5, 80),
  new Item("Backstage passes", 11, 0),
  new Item("Aged Brie", 10, 0),
  new Item("regular", 10, 10),
  new Item("Conjured", 10, 10),
];

describe("Gilded Rose", () => {
  describe("when items are regular", () => {
    it.todo("lowers sellIn by 1");
    it.todo("lowers quality by 1 when sellIn is above 0");
    it.todo("lowers quality by 2 when sellIn starts at 0 or below");
    it.todo("prevents quality to be lower than 0");
  });

  describe("isAgedBrie", () => {
    it.todo('returns true for an item named "Aged Brie"');
    it.todo("returns false for an item with a different name");
  });

  describe("when items are Aged Brie", () => {
    it.todo("lowers sellIn by 1");
    it.todo("increases quality by 1 when sellIn is above 0");
    it.todo("increases quality by 2 when sellIn starts at 0 or below");
    it.todo("prevents quality to exceeds 50");
  });

  describe("isBackstagePasses", () => {
    it.todo('returns true for an item starting with "Backstage passes"');
    it.todo("returns false for an item starting with a different name");
  });

  describe("when items are Backstage passes", () => {
    it.todo("lowers sellIn by 1");
    it.todo("increases quality by 1 when sellIn > 10");
    it.todo("increases quality by 2 when sellIn is > 5 and <= 10 ");
    it.todo("increases quality by 3 when sellIn is > 0 and <= 5");
    it.todo("sets quality to 0 when sellIn starts at 0 or below");
    it.todo("prevents quality to exceeds 50");
  });

  describe("isLegendary", () => {
    it.todo('returns true for an item containing "Sulfuras"');
    it.todo('returns false for an item not containing "Sulfuras"');
  });

  describe("when items are legendary", () => {
    it.todo("ensures sellIn is preserved");
    it.todo("preserves quality at 80");
  });

  describe("isConjured", () => {
    it.todo('returns true for an item named or starting with "Conjured"');
    it.todo('returns false for an item not starting with "Conjured"');
  });

  describe("when items are Conjured", () => {
    it.todo("lowers sellIn by 1");
    it.todo("lowers quality by 2 when sellIn is above 0");
    it.todo("lowers quality by 4 when sellIn starts at 0 or below");
    it.todo("prevents quality to be lower than 0");
  });

  describe("when items are mixed", () => {
    it("preserves item name after an update", () => {
      const mixedItems = makeMixedItems()
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
      const mixedItems = makeMixedItems()
      const gildedRose = new GildedRose(mixedItems);
      const items = gildedRose.updateQuality();
      expect(items).toBe(mixedItems);
    });

    it.todo(
      "leaves legendary item unchanged and updates the items that follow it",
    );
  });
});
