type BlankColumn = [0, 0, 0];
type FirstTileColumnMiddleFilled = [0, 1, 0];
type FirstTileColumnBlank = [0, 0, 0];
type SecondTileColumnFull = [1, 1, 1];
type SecondTileColumnUp = [1, 1, 0];
type SecondTileColumnDown = [0, 1, 1];
type LastTileColumnMiddleFilled = [0, 1, 0];
type LastTileColumnMiddleBlank = [0, 0, 0];

const blankColumn: BlankColumn = [0, 0, 0];
const firstTileColumnMiddleFilled: FirstTileColumnMiddleFilled = [0, 1, 0];
const firstTileColumnBlank: FirstTileColumnBlank = [0, 0, 0];
const secondTileColumnFull: SecondTileColumnFull = [1, 1, 1];
const secondTileColumnUp: SecondTileColumnUp = [1, 1, 0];
const secondTileColumnDown: SecondTileColumnDown = [0, 1, 1];
const lastTileColumnMiddleFilled: LastTileColumnMiddleFilled = [0, 1, 0];
const lastTileColumnMiddleBlank: LastTileColumnMiddleBlank = [0, 0, 0];

export type TileBlank = [BlankColumn, BlankColumn, BlankColumn];
export type TileUp = [
  FirstTileColumnMiddleFilled,
  SecondTileColumnUp,
  LastTileColumnMiddleFilled
];
export type TileDown = [
  FirstTileColumnMiddleFilled,
  SecondTileColumnDown,
  LastTileColumnMiddleFilled
];
export type TileRight = [
  FirstTileColumnBlank,
  SecondTileColumnFull,
  LastTileColumnMiddleFilled
];
export type TileLeft = [
  FirstTileColumnMiddleFilled,
  SecondTileColumnFull,
  LastTileColumnMiddleBlank
];
export type Tile = TileUp | TileDown | TileRight | TileLeft | TileBlank;

export const tileUp: TileUp = [
  firstTileColumnMiddleFilled,
  secondTileColumnUp,
  lastTileColumnMiddleFilled,
];
export const tileDown: TileDown = [
  firstTileColumnMiddleFilled,
  secondTileColumnDown,
  lastTileColumnMiddleFilled,
];
export const tileRight: TileRight = [
  firstTileColumnBlank,
  secondTileColumnFull,
  lastTileColumnMiddleFilled,
];
export const tileLeft: TileLeft = [
  firstTileColumnMiddleFilled,
  secondTileColumnFull,
  lastTileColumnMiddleBlank,
];
export const blankTile: TileBlank = [blankColumn, blankColumn, blankColumn];

export interface EntropyTile {
  tile: Tile, 
  isCollapsed: boolean
  isOrder?: number
}

export type Grid = EntropyTile[];
