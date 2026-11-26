export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const MIN_QUALITY = 0;
const MAX_QUALITY = 50;
const CONJURED_FACTOR = 2;

// Any item with "Sulfuras" in its name is considered Legendary grade
export const isLegendary = (item: Item) =>
  item?.name !== null && item?.name !== undefined && /Sulfuras/.test(item.name);
// Any item with name starting with "Backstage passes" is backstage pass
export const isBackstagePasses = (item: Item) =>
  item?.name !== null &&
  item?.name !== undefined &&
  /^Backstage passes/.test(item.name);
export const isAgedBrie = (item: Item) => item?.name === "Aged Brie";
export const isConjured = (item: Item) =>
  item?.name !== null &&
  item?.name !== undefined &&
  (item.name === "Conjured" || item.name.startsWith("Conjured "));

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];

      if (!item || isLegendary(item)) continue;

      const { sellIn, quality } = item;
      const isExpired = sellIn <= 0;

      if (isBackstagePasses(item)) {
        if (isExpired) {
          item.quality = 0;
        } else {
          let gain = 1;
          if (sellIn <= 5) {
            gain = 3;
          } else if (sellIn <= 10) {
            gain = 2;
          }
          item.quality = Math.min(MAX_QUALITY, quality + gain);
        }
      } else if (isAgedBrie(item)) {
        const gain = isExpired ? 2 : 1;
        item.quality = Math.min(MAX_QUALITY, quality + gain);
      } else {
        const regularLoss = isExpired ? 2 : 1;
        const loss = isConjured(item)
          ? regularLoss * CONJURED_FACTOR
          : regularLoss;
        item.quality = Math.max(MIN_QUALITY, item.quality - loss);
      }

      item.sellIn = sellIn - 1;
    }

    return this.items;
  }
}
