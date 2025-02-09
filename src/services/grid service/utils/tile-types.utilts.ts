import {
  blankTile,
  Tile,
  TileBlank,
  tileDown,
  TileDown,
  tileLeft,
  TileLeft,
  tileRight,
  TileRight,
  tileUp,
  TileUp,
} from './tile.util';

export function isBlankTile(tile: Tile): tile is TileBlank {
  return tile === blankTile;
}

export function isTileUp(tile: Tile): tile is TileUp {
  return tile === tileUp;
}

export function isTileDown(tile: Tile): tile is TileDown {
  return tile === tileDown;
}

export function isTileRight(tile: Tile): tile is TileRight {
  return tile === tileRight;
}

export function isTileLeft(tile: Tile): tile is TileLeft {
  return tile === tileLeft;
}
