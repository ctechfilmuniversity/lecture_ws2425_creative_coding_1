export interface Position {
  x: number;
  y: number;
}

export interface Neighbor {
  dx: number;
  dy: number;
  direction: 'top' | 'right' | 'bottom' | 'left';
}

export const TILES = {
  EMPTY: 0,
  ARM_BOTTOM_LEFT: 1,
  ARM_HORIZONTAL: 2,
  ARM_RIGHT_BOTTOM: 3,
  ARM_RIGHT_TOP: 4,
  ARM_TOP_LEFT: 5,
  ARM_VERTICAL: 6,
  CORPUSE: 7,
  HEAD_BOTTOM_LEFT: 8,
  HEAD_BOTTOM_RIGHT: 9,
  HEAD_LEFT_TOP: 10,
  HEAD_RIGHT_TOP: 11,
  NECK_LEFT: 12,
  NECK_RIGHT: 13,
} as const;

export type TileType = (typeof TILES)[keyof typeof TILES];

export interface Cell {
  collapsed: boolean;
  options: TileType[];
}

export interface Position {
  x: number;
  y: number;
}

export interface Neighbor {
  dx: number;
  dy: number;
  direction: 'top' | 'right' | 'bottom' | 'left';
}

export interface Rules {
  [key: number]: {
    [key: string]: TileType[];
  };
}
