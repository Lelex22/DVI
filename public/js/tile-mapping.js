// Our custom tile mapping with:
// - Single index for putTileAt
// - Array of weights for weightedRandomize
// - Array or 2D array for putTilesAt
const TILE_MAPPING = {
  BLANK:16,
  WALL: {
    TOP_LEFT: 0,
    TOP_RIGHT: 1,
    BOTTOM_RIGHT: 9,
    BOTTOM_LEFT: 8,
    TOP: [{ index: 11, weight: 4 }],
    LEFT: [{ index: 2, weight: 4 }],
    RIGHT: [{ index: 10, weight: 4 }],
    BOTTOM: [{ index: 3, weight: 4 }]
  },
  FLOOR: [{ index: 4, weight: 9 }, { index: 12, weight: 8 }],
  POT: [{ index: 34, weight: 1 }],
  DOOR: {
    TOP: [11, 12, 11],
    // prettier-ignore
    LEFT: [
      [24],
      [12],
      [24]
    ],
    BOTTOM: [3, 12, 3],
    // prettier-ignore
    RIGHT: [
      [24],
      [12],
      [24]
    ]
  },
  STAIRS: 20,
  // prettier-ignore
  TOWER: [
    [40],
    [41]
  ]
};

export default TILE_MAPPING;
