import {
  Item,
  GildedRose,
  isAgedBrie,
  isBackstagePasses,
  isLegendary,
  isConjured,
} from "@/gilded-rose";

const makeMixedItems = () => [
  new Item("+5 Dexterity Vest", 10, 20),
  new Item("Aged Brie", 2, 0),
  new Item("Elixir of the Mongoose", 5, 7),
  new Item("Sulfuras, Hand of Ragnaros", 0, 80),
  new Item("Sulfuras, Hand of Ragnaros", -1, 80),
  new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
  new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
  new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
  new Item("Conjured Mana Cake", 3, 6),
];

describe("Gilded Rose", () => {
  describe("when items are regular", () => {
    it("lowers sellIn by 1", () => {
      const regularItem = new Item("regular", 3, 10);
      const gildedRose = new GildedRose([regularItem]);

      for (let i = 0; i < 5; i++) {
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).toBe(3 - (i + 1));
      }
    });
    it("lowers quality by 1 when sellIn is above 0", () => {
      const regularItem = new Item("regular", 10, 10);
      const gildedRose = new GildedRose([regularItem]);

      for (let i = 0; i < 5; i++) {
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toBe(10 - (i + 1));
      }
    });
    it("lowers quality by 2 when sellIn starts at 0 or below", () => {
      const regularItem = new Item("regular", 1, 10);
      const gildedRose = new GildedRose([regularItem]);
      let items = gildedRose.updateQuality();

      expect(items[0].quality).toBe(9);

      items = gildedRose.updateQuality();

      expect(items[0].quality).toBe(7);
    });
    it("prevents quality to be lower than 0", () => {
      const regularItem = new Item("regular", 0, 1);
      const gildedRose = new GildedRose([regularItem]);

      for (let i = 0; i < 3; i++) {
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toBe(0);
      }
    });
  });

  describe("isAgedBrie", () => {
    it('returns true for an item named "Aged Brie"', () => {
      const item = new Item("Aged Brie", 10, 10);
      expect(isAgedBrie(item)).toBe(true);
    });
    it("returns false for an item with a different name", () => {
      const item = new Item("Aged Brie cheese", 10, 10);
      expect(isAgedBrie(item)).toBe(false);
    });
  });

  describe("when items are Aged Brie", () => {
    it("lowers sellIn by 1", () => {
      const agedBrieItem = new Item("Aged Brie", 3, 10);
      const gildedRose = new GildedRose([agedBrieItem]);

      for (let i = 0; i < 5; i++) {
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).toBe(3 - (i + 1));
      }
    });
    it("increases quality by 1 when sellIn is above 0", () => {
      const agedBrieItem = new Item("Aged Brie", 10, 10);
      const gildedRose = new GildedRose([agedBrieItem]);

      for (let i = 0; i < 5; i++) {
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toBe(10 + (i + 1));
      }
    });
    it("increases quality by 2 when sellIn starts at 0 or below", () => {
      const agedBrieItem = new Item("Aged Brie", 0, 10);
      const gildedRose = new GildedRose([agedBrieItem]);
      const items = gildedRose.updateQuality();

      expect(items[0].quality).toBe(12);
    });
    it("prevents quality to exceeds 50", () => {
      const agedBrieItem = new Item("Aged Brie", 0, 49);
      const gildedRose = new GildedRose([agedBrieItem]);

      for (let i = 0; i < 3; i++) {
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toBe(50);
      }
    });
  });

  describe("isBackstagePasses", () => {
    it('returns true for an item starting with "Backstage passes"', () => {
      let item = new Item("Backstage passes", 10, 10);
      expect(isBackstagePasses(item)).toBe(true);
      item = new Item("Backstage passes to a TAFKAL80ETC concert", 10, 10);
      expect(isBackstagePasses(item)).toBe(true);
    });
    it("returns false for an item starting with a different name", () => {
      const item = new Item("Not a Backstage passes", 10, 10);
      expect(isBackstagePasses(item)).toBe(false);
    });
  });

  describe("when items are Backstage passes", () => {
    it("lowers sellIn by 1", () => {
      const backstagePassesItem = new Item("Backstage passes", 3, 10);
      const gildedRose = new GildedRose([backstagePassesItem]);

      for (let i = 0; i < 5; i++) {
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).toBe(3 - (i + 1));
      }
    });
    it("increases quality by 1 when sellIn > 10", () => {
      const backstagePassesItem = new Item("Backstage passes", 11, 0);
      const gildedRose = new GildedRose([backstagePassesItem]);
      const items = gildedRose.updateQuality();

      expect(items[0].quality).toBe(1);
    });
    it("increases quality by 2 when sellIn is > 5 and <= 10 ", () => {
      const backstagePassesItem = new Item("Backstage passes", 10, 0);
      const gildedRose = new GildedRose([backstagePassesItem]);

      for (let i = 0; i < 5; i++) {
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toBe(2 * (i + 1));
      }
    });
    it("increases quality by 3 when sellIn is > 0 and <= 5", () => {
      const backstagePassesItem = new Item("Backstage passes", 5, 0);
      const gildedRose = new GildedRose([backstagePassesItem]);

      for (let i = 0; i < 5; i++) {
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toBe(3 * (i + 1));
      }
    });
    it("sets quality to 0 when sellIn starts at 0 or below", () => {
      const backstagePassesItem = new Item("Backstage passes", 0, 10);
      const gildedRose = new GildedRose([backstagePassesItem]);
      const items = gildedRose.updateQuality();

      expect(items[0].quality).toBe(0);
    });
    it("prevents quality to exceeds 50", () => {
      const backstagePassesItem = new Item("Backstage passes", 1, 49);
      const gildedRose = new GildedRose([backstagePassesItem]);
      let items = gildedRose.updateQuality();

      expect(items[0].quality).toBe(50);

      items = gildedRose.updateQuality();

      expect(items[0].quality).toBe(0);
    });
  });

  describe("isLegendary", () => {
    it('returns true for an item containing "Sulfuras"', () => {
      let item = new Item("Sulfuras, Hand of Ragnaros", 0, 80);
      expect(isLegendary(item)).toBe(true);
      item = new Item("Hand of Ragnaros, Sulfuras", 0, 80);
      expect(isLegendary(item)).toBe(true);
    });
    it('returns false for an item not containing "Sulfuras"', () => {
      const item = new Item("regular", 0, 80);
      expect(isLegendary(item)).toBe(false);
    });
  });

  describe("when items are legendary", () => {
    it("ensures sellIn is preserved", () => {
      const legendaryItem = new Item("Sulfuras", 5, 80);
      const gildedRose = new GildedRose([legendaryItem]);
      const items = gildedRose.updateQuality();

      expect(items[0].sellIn).toBe(5);
    });
    it("preserves quality at 80", () => {
      const legendaryItem = new Item("Sulfuras", 0, 80);
      const gildedRose = new GildedRose([legendaryItem]);
      const items = gildedRose.updateQuality();

      expect(items[0].quality).toBe(80);
    });
  });

  describe("isConjured", () => {
    it('returns true for an item named or starting with "Conjured"', () => {
      let item = new Item("Conjured Mana Cake", 10, 10);
      expect(isConjured(item)).toBe(true);
      item = new Item("Conjured", 10, 10);
      expect(isConjured(item)).toBe(true);
    });
    it('returns false for an item not starting with "Conjured"', () => {
      let item = new Item("Not Conjured Mana Cake", 10, 10);
      expect(isConjured(item)).toBe(false);
      item = new Item("Conjuredness", 10, 10);
      expect(isConjured(item)).toBe(false);
    });
  });

  describe("when items are Conjured", () => {
    it("lowers sellIn by 1", () => {
      const conjuredItem = new Item("Conjured", 3, 10);
      const gildedRose = new GildedRose([conjuredItem]);

      for (let i = 0; i < 5; i++) {
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).toBe(3 - (i + 1));
      }
    });
    it("lowers quality by 2 when sellIn is above 0", () => {
      const conjuredItem = new Item("Conjured", 10, 10);
      const gildedRose = new GildedRose([conjuredItem]);

      for (let i = 0; i < 5; i++) {
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toBe(10 - 2 * (i + 1));
      }
    });
    it("lowers quality by 4 when sellIn starts at 0 or below", () => {
      const conjuredItem = new Item("Conjured", 1, 10);
      const gildedRose = new GildedRose([conjuredItem]);
      let items = gildedRose.updateQuality();

      expect(items[0].quality).toBe(8);

      items = gildedRose.updateQuality();

      expect(items[0].quality).toBe(4);
    });
    it("prevents quality to be lower than 0", () => {
      const conjuredItem = new Item("Conjured", 0, 1);
      const gildedRose = new GildedRose([conjuredItem]);

      for (let i = 0; i < 3; i++) {
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toBe(0);
      }
    });
  });

  describe("when items are mixed", () => {
    it("preserves item name after an update", () => {
      const mixedItems = makeMixedItems();
      const gildedRose = new GildedRose(mixedItems);
      const items = gildedRose.updateQuality();

      expect(items.map(({ name }) => ({ name }))).toEqual([
        { name: "+5 Dexterity Vest" },
        { name: "Aged Brie" },
        { name: "Elixir of the Mongoose" },
        { name: "Sulfuras, Hand of Ragnaros" },
        { name: "Sulfuras, Hand of Ragnaros" },
        { name: "Backstage passes to a TAFKAL80ETC concert" },
        { name: "Backstage passes to a TAFKAL80ETC concert" },
        { name: "Backstage passes to a TAFKAL80ETC concert" },
        { name: "Conjured Mana Cake" },
      ]);
    });

    it("returns the items when updateQuality is called", () => {
      const mixedItems = makeMixedItems();
      const gildedRose = new GildedRose(mixedItems);
      const items = gildedRose.updateQuality();
      expect(items).toBe(mixedItems);
    });

    it("leaves legendary item unchanged and updates the other items", () => {
      const gildedRose = new GildedRose([
        new Item("Sulfuras", 5, 80),
        new Item("Backstage passes", 11, 0),
        new Item("Aged Brie", 10, 0),
        new Item("regular", 10, 10),
        new Item("Conjured", 10, 10),
      ]);
      const items = gildedRose.updateQuality();

      expect(items.map(({ sellIn, quality }) => ({ sellIn, quality }))).toEqual([
        { sellIn: 5, quality: 80 },
        { sellIn: 10, quality: 1 },
        { sellIn: 9, quality: 1 },
        { sellIn: 9, quality: 9 },
        { sellIn: 9, quality: 8 },
      ]);
    });

    it("updates all the items correctly", () => {
      const mixedItems = makeMixedItems();
      const gildedRose = new GildedRose(mixedItems);
      const items = gildedRose.updateQuality();

      expect(items.map(({ sellIn, quality }) => ({ sellIn, quality }))).toEqual([
        { sellIn: 9, quality: 19 },
        { sellIn: 1, quality: 1 },
        { sellIn: 4, quality: 6 },
        { sellIn: 0, quality: 80 },
        { sellIn: -1, quality: 80 },
        { sellIn: 14, quality: 21 },
        { sellIn: 9, quality: 50 },
        { sellIn: 4, quality: 50 },
        { sellIn: 2, quality: 4 },
      ]);
    });
  });
});
