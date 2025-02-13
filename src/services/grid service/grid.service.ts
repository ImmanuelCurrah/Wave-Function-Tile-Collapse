import {
  computed,
  Inject,
  Injectable,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import {
  EntropyTile,
  Grid,
  Tile,
  blankTile,
  tileDown,
  tileLeft,
  tileRight,
  tileUp,
} from './utils/tile.util';
import { GRID_SIZE } from './injection-tokens/grid.tokens';

@Injectable()
export class GridService {
  private readonly grid: WritableSignal<Grid>;

  constructor(@Inject(GRID_SIZE) gridSize: number) {
    this.grid = signal(this.generateBlankGrid(gridSize));
  }

  public generatedGrid: Signal<Grid> = computed(() => this.grid());
  private firstTileOptions: Tile[] = [tileUp, tileDown, tileLeft, tileRight];

  private generateBlankGrid(rowLength: number): Grid {
    const grid: EntropyTile[] = [];
    for (let i = 1; i <= rowLength * rowLength; i++) {
      grid.push({ tile: blankTile, isCollapsed: false });
    }
    return grid;
  }

  setTile(index: number, newTile: Tile) {
    this.grid.update((grid) => {
      grid[index] = { tile: newTile, isCollapsed: true };
      return grid;
    });
  }

  private pickRandomFirstTile(): { tile: Tile; index: number } {
    const index = Math.round(
      Math.random() * (this.firstTileOptions.length - 1)
    );
    return {
      tile: this.firstTileOptions[index],
      index: Math.round(Math.random() * (this.grid().length - 1)),
    };
  }

  setRandomFirstTile(): void {
    const { index, tile } = this.pickRandomFirstTile();
    this.setTile(index, tile);
  }

  resetGrid(): void {
    window.location.reload();
  }
}
