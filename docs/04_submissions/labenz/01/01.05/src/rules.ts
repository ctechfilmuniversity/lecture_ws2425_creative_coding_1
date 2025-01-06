import { Rules, TILES } from './types';

const ANY = [...Object.values(TILES)];

export const RULES: Rules = {
  // Leeres Tile (0)
  [TILES.EMPTY]: {
    top: ANY,
    right: ANY,
    bottom: ANY,
    left: ANY,
  },

  // ARM_BOTTOM_LEFT (1)
  [TILES.ARM_BOTTOM_LEFT]: {
    top: [...ANY],
    right: [...ANY],
    bottom: [
      TILES.ARM_VERTICAL,
      TILES.ARM_TOP_LEFT,
      TILES.ARM_RIGHT_TOP,
      TILES.CORPUSE,
    ],
    left: [
      TILES.ARM_HORIZONTAL,
      TILES.ARM_RIGHT_BOTTOM,
      TILES.ARM_RIGHT_TOP,
      TILES.CORPUSE,
    ],
  },

  // ARM_HORIZONTAL (2)
  [TILES.ARM_HORIZONTAL]: {
    top: [...ANY],
    right: [TILES.ARM_HORIZONTAL, TILES.CORPUSE, TILES.ARM_BOTTOM_LEFT],
    bottom: [...ANY],
    left: [TILES.ARM_HORIZONTAL, TILES.CORPUSE, TILES.ARM_RIGHT_BOTTOM],
  },

  // ARM_RIGHT_BOTTOM (3)
  [TILES.ARM_RIGHT_BOTTOM]: {
    top: [...ANY],
    right: [TILES.ARM_HORIZONTAL, TILES.ARM_BOTTOM_LEFT],
    bottom: [TILES.ARM_VERTICAL, TILES.ARM_TOP_LEFT],
    left: [...ANY],
  },

  // ARM_RIGHT_TOP (4)
  [TILES.ARM_RIGHT_TOP]: {
    top: [TILES.ARM_VERTICAL, TILES.ARM_BOTTOM_LEFT],
    right: [TILES.ARM_HORIZONTAL, TILES.ARM_BOTTOM_LEFT],
    bottom: [...ANY],
    left: [...ANY],
  },

  // ARM_TOP_LEFT (5)
  [TILES.ARM_TOP_LEFT]: {
    top: [TILES.ARM_VERTICAL, TILES.ARM_BOTTOM_LEFT],
    right: [...ANY],
    bottom: [...ANY],
    left: [TILES.ARM_HORIZONTAL, TILES.ARM_RIGHT_BOTTOM, TILES.ARM_RIGHT_TOP],
  },

  // ARM_VERTICAL (6)
  [TILES.ARM_VERTICAL]: {
    top: [TILES.ARM_VERTICAL, TILES.ARM_BOTTOM_LEFT],
    right: [...ANY],
    bottom: [TILES.ARM_VERTICAL, TILES.ARM_TOP_LEFT],
    left: [...ANY],
  },

  // CORPUSE (7)
  [TILES.CORPUSE]: {
    top: [TILES.NECK_LEFT, TILES.NECK_RIGHT, TILES.CORPUSE],
    right: [...ANY, TILES.CORPUSE],
    bottom: [...ANY, TILES.CORPUSE],
    left: [...ANY, TILES.CORPUSE],
  },

  // HEAD_BOTTOM_LEFT (8)
  [TILES.HEAD_BOTTOM_LEFT]: {
    top: [TILES.HEAD_LEFT_TOP],
    right: [TILES.HEAD_BOTTOM_RIGHT],
    bottom: [TILES.NECK_LEFT],
    left: [...ANY],
  },

  // HEAD_BOTTOM_RIGHT (9)
  [TILES.HEAD_BOTTOM_RIGHT]: {
    top: [TILES.HEAD_RIGHT_TOP],
    right: [...ANY],
    bottom: [TILES.NECK_RIGHT],
    left: [TILES.HEAD_BOTTOM_LEFT],
  },

  // HEAD_LEFT_TOP (10)
  [TILES.HEAD_LEFT_TOP]: {
    top: [...ANY],
    right: [TILES.HEAD_RIGHT_TOP],
    bottom: [TILES.HEAD_BOTTOM_LEFT],
    left: [...ANY],
  },

  // HEAD_RIGHT_TOP (11)
  [TILES.HEAD_RIGHT_TOP]: {
    top: [...ANY],
    right: [...ANY],
    bottom: [TILES.HEAD_BOTTOM_RIGHT],
    left: [TILES.HEAD_LEFT_TOP],
  },

  // NECK_LEFT (12)
  [TILES.NECK_LEFT]: {
    top: [TILES.HEAD_BOTTOM_LEFT],
    right: [TILES.NECK_RIGHT],
    bottom: [TILES.CORPUSE],
    left: [...ANY],
  },

  // NECK_RIGHT (13)
  [TILES.NECK_RIGHT]: {
    top: [TILES.HEAD_BOTTOM_RIGHT],
    right: [...ANY],
    bottom: [TILES.CORPUSE],
    left: [TILES.NECK_LEFT],
  },
};
