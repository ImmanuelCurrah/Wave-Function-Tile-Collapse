import { Component } from '@angular/core';
import { GridService } from '../services/grid service/grid.service';
import { Grid } from '../services/grid service/utils/tile.util';

import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { EntropyService } from '../services/entropy service/entropy.service';
import { GRID_SIZE } from '../services/grid service/injection-tokens/grid.tokens';

@Component({
  selector: 'app-root',
  imports: [CommonModule, MatGridListModule],
  providers: [
    GridService,
    EntropyService,
    { provide: GRID_SIZE, useValue: 80 },
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  generatedGrid: Grid;
  numberOfColumns: number;

  constructor(
    private readonly gridService: GridService,
    private readonly entropyService: EntropyService
  ) {
    this.generatedGrid = this.gridService.generatedGrid();
    this.numberOfColumns = Math.sqrt(this.generatedGrid.length);
    this.gridService.setRandomFirstTile();
  }

  start(): void {
    let count = 2;
    const intervalId = setInterval(() => {
      const tile = this.entropyService.getTileToSet();

      this.gridService.setGrid(tile.index, tile.tile, count);
      count++;

      if (this.generatedGrid.every((tile) => tile.isCollapsed)) {
        clearInterval(intervalId);
        return;
      }
    }, 1);
  }

  reset(): void {
    this.gridService.resetGrid();
  }
}
