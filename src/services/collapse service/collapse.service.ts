import { Injectable } from '@angular/core';
import { GridService } from '../grid service/grid.service';
import { EntropyService } from '../entropy service/entropy.service';

@Injectable()
export class CollapseService {
  constructor(
    private readonly gridService: GridService,
    private readonly entropyService: EntropyService
  ) {}

  collapse(): void {
    this.gridService.setRandomFirstTile();
    const intervalId = setInterval(() => {
      const { index, tile } = this.entropyService.getTileToSet();
      this.gridService.setTile(index, tile);
      if (this.gridService.generatedGrid().every((tile) => tile.isCollapsed)) {
        clearInterval(intervalId);
        return;
      }
    }, 10);
  }

  resetGrid(): void {
    this.gridService.resetGrid()
  }
}
