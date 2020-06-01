// Our custom tile mapping with:
// - Single index for putTileAt
// - Array of weights for weightedRandomize
// - Array or 2D array for putTilesAt
const TILE_MAPPING = {
  BLANK: 16,
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
  POT: [{ index: 13, weight: 1 }],
  EXTR: [{ index: 22, weight: 1 }],
  CHEST: [{ index: 6, weight: 1 }],
  DOOR: {
    TOP: [11, 4, 11],
    // prettier-ignore
    LEFT: [
      [2],
      [4],
      [2]
    ],
    BOTTOM: [3, 4, 3],
    // prettier-ignore
    RIGHT: [
      [10],
      [4],
      [10]
    ]
  },
  SHOP: 5,
  MAPAVERDE: 20,
  MAPALAVA: 21,
  // prettier-ignore
  TOWER: [
    [14]
  ]
};

export default TILE_MAPPING;
