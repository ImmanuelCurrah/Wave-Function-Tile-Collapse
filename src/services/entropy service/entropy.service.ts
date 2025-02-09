import { Injectable } from '@angular/core';
import { EntropySummary, TileNeighbors } from './entropy.model';
import {
  EntropyTile,
  Grid,
  Tile,
  tileUp,
} from '../grid service/utils/tile.util';
import { GridService } from '../grid service/grid.service';
import { EntropyRulesEngine } from './utils/entropy-rules-engine';

@Injectable()
export class EntropyService {
  private readonly rulesEngine = new EntropyRulesEngine();
  private readonly grid: Grid;
  private readonly startIndices: number[] = [];
  private readonly endIndices: number[] = [];

  constructor(private readonly gridService: GridService) {
    this.grid = this.gridService.generatedGrid();
    this.parseStartAndEndIndices();
  }

  private parseStartAndEndIndices(): void {
    const rowLength = Math.sqrt(this.grid.length);
    for (let i = 0; i < rowLength; i++) {
      const startIndex = i * rowLength;
      this.startIndices.push(startIndex);
      const endIndex = i * rowLength + (rowLength - 1);
      this.endIndices.push(endIndex);
    }
  }

  private getEntropyScore(): EntropySummary[] {
    const results: EntropySummary[] = Array<EntropySummary>();

    this.grid.forEach((tile, index) => {
      if (!tile.isCollapsed) {
        results.push(this.summarizeEntropy(tile, index));
      }
    });

    return results;
  }

  private summarizeEntropy(
    entropyTile: EntropyTile,
    forIndex: number
  ): EntropySummary {
    if (entropyTile.isCollapsed) {
      return { options: [], atIndex: forIndex };
    }
    return {
      options: [
        ...this.rulesEngine.findOptions(this.parseTileNeighbors(forIndex)),
      ],
      atIndex: forIndex,
    };
  }

  private parseTileNeighbors(indexOfFocusedTile: number): TileNeighbors {
    const rowLength = Math.sqrt(this.grid.length);
    const isStart = this.startIndices.includes(indexOfFocusedTile);
    const isEnd = this.endIndices.includes(indexOfFocusedTile);

    return {
      top: this.grid[indexOfFocusedTile - rowLength],
      bottom: this.grid[indexOfFocusedTile + rowLength],
      left: isStart ? undefined : this.grid[indexOfFocusedTile - 1],
      right: isEnd ? undefined : this.grid[indexOfFocusedTile + 1],
    };
  }

  getTileToSet(): { index: number; tile: Tile } {
    const summary = this.getEntropyScore().filter(
      (tileSummary) => tileSummary.options.length !== 0
    );

    const smallestEntropyInSummary = Math.min(
      ...summary.map((o) => o.options.length)
    );

    const tileToTransform = summary.filter(
      (tileSummary) => tileSummary.options.length === smallestEntropyInSummary
    );
    if (tileToTransform.length === 1) {
      return {
        index: tileToTransform[0].atIndex,
        tile: tileToTransform[0].options[
          Math.round(Math.random() * (tileToTransform[0].options.length - 1))
        ],
      };
    } else {
      const randomTile =
        tileToTransform[
          Math.round(Math.random() * (tileToTransform.length - 1))
        ];
      return {
        index: randomTile.atIndex,
        tile: randomTile.options[
          Math.round(Math.random() * (randomTile.options.length - 1))
        ],
      };
    }
  }
}
