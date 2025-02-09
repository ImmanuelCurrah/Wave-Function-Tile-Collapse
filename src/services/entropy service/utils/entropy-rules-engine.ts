import {
  isBlankTile,
  isTileDown,
  isTileLeft,
  isTileRight,
  isTileUp,
} from '../../grid service/utils/tile-types.utilts';
import {
  blankTile,
  Tile,
  TileBlank,
  TileDown,
  tileDown,
  TileLeft,
  tileLeft,
  TileRight,
  tileRight,
  TileUp,
  tileUp,
} from '../../grid service/utils/tile.util';
import { TileNeighbors } from '../entropy.model';

export class EntropyRulesEngine {
  private aboveTileRules(
    tileAbove: Tile,
    tileTopRight: Tile | undefined,
    tileTopLeft: Tile | undefined
  ): Tile[] {
    const allowedTiles: Tile[] = [];
    if (isTileUp(tileAbove)) {
      allowedTiles.push(tileDown, blankTile);
    } else if (isTileDown(tileAbove)) {
      allowedTiles.push(tileUp, tileLeft, tileRight);
    } else if (isTileRight(tileAbove)) {
      allowedTiles.push(tileUp, tileLeft, tileRight);
    } else if (isTileLeft(tileAbove)) {
      allowedTiles.push(tileUp, tileLeft, tileRight);
    } else if (isBlankTile(tileAbove)) {
      allowedTiles.push(blankTile, tileDown);
    }

    return allowedTiles;
  }

  private belowTileRules(belowTile: Tile): Tile[] {
    const allowedTiles: Tile[] = [];
    if (isTileUp(belowTile)) {
      allowedTiles.push(tileLeft, tileRight, tileDown);
    } else if (isTileDown(belowTile)) {
      allowedTiles.push(tileUp, blankTile);
    } else if (isTileRight(belowTile)) {
      allowedTiles.push(tileDown, tileRight, tileLeft);
    } else if (isTileLeft(belowTile)) {
      allowedTiles.push(tileDown, tileRight, tileLeft);
    } else if (isBlankTile(belowTile)) {
      allowedTiles.push(blankTile, tileUp);
    }
    return allowedTiles;
  }

  private rightTileRules(rightTile: Tile): Tile[] {
    const allowedTiles: Tile[] = [];
    if (isTileUp(rightTile)) {
      allowedTiles.push(tileRight, tileUp, tileDown);
    } else if (isTileDown(rightTile)) {
      allowedTiles.push(tileRight, tileUp, tileDown);
    } else if (isTileRight(rightTile)) {
      allowedTiles.push(tileLeft, blankTile);
    } else if (isTileLeft(rightTile)) {
      allowedTiles.push(tileRight, tileUp, tileDown);
    } else if (isBlankTile(rightTile)) {
      allowedTiles.push(tileLeft, blankTile);
    }
    return allowedTiles;
  }

  private leftTileRules(leftTile: Tile): Tile[] {
    const allowedTiles: Tile[] = [];
    if (isTileUp(leftTile)) {
      allowedTiles.push(tileLeft, tileUp, tileDown);
    } else if (isTileDown(leftTile)) {
      allowedTiles.push(tileLeft, tileUp, tileDown);
    } else if (isTileRight(leftTile)) {
      allowedTiles.push(tileLeft, tileUp, tileDown);
    } else if (isTileLeft(leftTile)) {
      allowedTiles.push(tileRight, blankTile);
    } else if (isBlankTile(leftTile)) {
      allowedTiles.push(tileRight, blankTile);
    }
    return allowedTiles;
  }

  findOptions(tileNeighbors: TileNeighbors, atIndex: number): Tile[] {
    const totalTileOptions: (
      | TileUp
      | TileDown
      | TileRight
      | TileLeft
      | TileBlank
    )[][] = [];

    const topOptions = [];
    const bottomOptions = [];
    const rightOptions = [];
    const leftOptions = [];
    const {
      top,
      bottom,
      left,
      right,
      topRight,
      topLeft,
      bottomRight,
      bottomLeft,
    } = tileNeighbors;

    if (top !== undefined && top.isCollapsed) {
      topOptions.push(
        ...this.aboveTileRules(top.tile, topRight?.tile, topLeft?.tile)
      );
    }

    if (bottom !== undefined && bottom.isCollapsed) {
      bottomOptions.push(...this.belowTileRules(bottom.tile));
    }

    if (left !== undefined && left.isCollapsed) {
      leftOptions.push(...this.leftTileRules(left.tile));
    }

    if (right !== undefined && right.isCollapsed) {
      rightOptions.push(...this.rightTileRules(right.tile));
    }

    if (topOptions.length > 0) {
      totalTileOptions.push(topOptions);
    }

    if (bottomOptions.length > 0) {
      totalTileOptions.push(bottomOptions);
    }

    if (leftOptions.length > 0) {
      totalTileOptions.push(leftOptions);
    }

    if (rightOptions.length > 0) {
      totalTileOptions.push(rightOptions);
    }

    if (totalTileOptions.length > 0) {
      const reduce = totalTileOptions.reduce((p, c) =>
        p.filter((e) => c.includes(e))
      );

      if (reduce.length === 0) {
        return [blankTile];
      }

      return reduce;
    }

    return [];
  }
}
