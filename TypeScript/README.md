# Gilded Rose Refactoring Kata · TypeScript

Gilded Rose is an inventory kata about refactoring legacy code with tests and adding a new item type. The exercise is to preserve the existing daily update rules while adding Conjured items, which lose quality twice as fast as regular items. The kata asks you to leave the `Item` class and the `items` property intact. See the [original requirements](../GildedRoseRequirements.md).

## Daily inventory rules

[`GildedRose.updateQuality()`](app/gilded-rose.ts) updates the inventory in place and returns the same array. It lowers `sellIn` by 1 for every item except Sulfuras. An item starting the update with `sellIn <= 0` uses the expired rule.

| Item | Daily quality change |
| --- | --- |
| Regular | Loses 1 before expiry and 2 once expired. |
| Aged Brie | Gains 1 before expiry and 2 once expired. |
| Backstage passes | Gain 1 with more than 10 days left, 2 with 6–10 days left, and 3 with 1–5 days left. Quality drops to 0 once expired. |
| Sulfuras | Quality stays at 80 and `sellIn` stays unchanged. |
| Conjured | Loses 2 before expiry and 4 once expired. |

Quality gains cap at 50 and quality losses stop at 0.

## Run locally

From the `TypeScript` directory, with Node.js and pnpm installed:

```sh
pnpm install
pnpm test:vitest
```

The second command runs the [unit tests](test/vitest/gilded-rose.spec.ts) and [approval tests](test/vitest/approvals.spec.ts) once with coverage. The HTML report is in `coverage/index.html`. Run `pnpm test:vitest` for watch mode.

To print a day-by-day inventory simulation, pass the number of days to the same fixture used by the approval test:

```sh
pnpm exec ts-node test/golden-master-text-test.ts 30
```

## Plan and execution

1. I translated the requirements into pending unit tests, then implemented them by item type. The tests cover item detection, daily changes to `sellIn` and `quality`, expiry boundaries, quality limits, and updates across a mixed inventory.
2. With the expected behavior in tests, I refactored `updateQuality()` to use item-type helpers and added the Conjured decay rule.
3. I compared the 30-day simulation with the existing approval snapshot. I verified that only the Conjured Mana Cake rows changed and that the new values followed the twice-as-fast decay rule before updating the snapshot.
4. I finished by documenting the rules and commands in this README and cleaning up the unused Jest and Mocha test files and configuration.

## AI usage

I used AI to review test coverage, identify missing boundary cases, and give feedback on the refactor. I also used it to check the simulation output against the approval snapshot and help draft this README.
